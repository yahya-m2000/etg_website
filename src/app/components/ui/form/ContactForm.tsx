"use client";

import React, { useState } from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { richTextRenderOptions } from "@/lib/common/src/ui/richTextRenderOptions";
import { getTextSizeClass } from "@/lib/common/src/utils";

const ContactForm: React.FC<{ form: FormProps }> = ({ form }) => {
  const [formValues, setFormValues] = useState<{ [key: string]: string }>({});
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [generalError, setGeneralError] = useState<string | null>(null); // New state

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    setFormErrors({ ...formErrors, [name]: "" }); // Clear error when typing
    setGeneralError(null); // Clear general error when typing
    e.target.setCustomValidity("");
  };
  const validateForm = () => {
    const errors: { [key: string]: string } = {};
    let isValid = true;

    form?.formFields?.forEach((field) => {
      const fieldName = field.label.toLowerCase().replace(" ", "-");
      const value = formValues[fieldName]?.trim() || ""; // Default to empty string if no value
      const rules = field.validationRules?.split("|") || [];

      // Required field validation
      if (rules.includes("required") && !value) {
        errors[fieldName] = `${field.label} is required.`;
        isValid = false;
      }

      // Additional validation based on field type
      if (value) {
        if (field.type === "email" && !/^\S+@\S+\.\S+$/.test(value)) {
          errors[fieldName] = "Please enter a valid email address.";
          isValid = false;
        }

        if (field.type === "tel" && !/^\d+$/.test(value)) {
          errors[fieldName] = "Phone number must contain only digits.";
          isValid = false;
        }

        if (field.label.toLowerCase() === "name" && !/^[A-Z]/.test(value)) {
          errors[fieldName] = "Name must start with an uppercase letter.";
          isValid = false;
        }
      }

      // Minimum length validation
      const minLengthRule = rules.find((rule) => rule.startsWith("minLength"));
      if (minLengthRule) {
        const minLength = parseInt(minLengthRule.split(":")[1]);
        if (value.length < minLength) {
          errors[
            fieldName
          ] = `${field.label} must be at least ${minLength} characters.`;
          isValid = false;
        }
      }
    });

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralError(null);
    const isValid = validateForm();

    if (isValid) {
      try {
        const response = await fetch("/api/send-email", {
          method: "POST", // Make sure it's POST
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formValues["name"],
            email: formValues["email"],
            message: formValues["message"],
            subject: formValues["subject"],
            phoneNumber: formValues["phone-number"], // Make sure this matches
          }),
        });

        if (response.ok) {
          setIsSubmitted(true);
          console.log("Email sent successfully");
        } else {
          setGeneralError("Failed to send email. Please try again.");
        }
      } catch (error) {
        console.error("Error submitting the form:", error);
        setGeneralError("An error occurred. Please try again later.");
      }
    } else {
      setGeneralError("Please fill in all required fields."); // Show general error
    }
  };

  return (
    <div className="flex flex-1 md:flex-row flex-col">
      {/* <h2 className="text-2xl font-bold mb-4">{form.title}</h2> */}

      {/* Render rich text for description */}
      {/* <div className={getTextSizeClass(false, "mb-4 flex-[0.33]")}>
        {documentToReactComponents(form.description, richTextRenderOptions)}
      </div> */}
      <div className="p-6 border-gray-300 flex-[0.66] transition-all duration-300">
        {generalError && (
          <div
            className={getTextSizeClass(
              false,
              "text-red-500 font-assistant text-sm mb-4"
            )}
          >
            {generalError}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          {form.formFields?.map((field, index) => (
            <div key={index} className={getTextSizeClass(false, "mb-4")}>
              <label
                htmlFor={`form-field-${field.id}`}
                className={getTextSizeClass(
                  false,
                  "block font-assistant text-sm font-medium text-gray-700"
                )}
              >
                {field.label}
              </label>
              {field.label === "Message" ? (
                <textarea
                  id={`form-field-${field.id}`}
                  name={field.label.toLowerCase().replace(" ", "-")}
                  placeholder={field.placeholderText}
                  value={
                    formValues[field.label.toLowerCase().replace(" ", "-")] ||
                    ""
                  }
                  onChange={handleChange}
                  required
                  className={`mt-1 font-assistant block w-full p-2 border-b hover:bg-gray-50 transition-colors duration-300 border-gray-300 focus:outline-none focus:border-primary-light focus:bg-gray-50 focus:ring-[0.5px] focus:ring-primary ${
                    formErrors[field.label.toLowerCase().replace(" ", "-")]
                      ? "border-red-500"
                      : ""
                  } h-40 resize-none`}
                />
              ) : (
                <input
                  id={`form-field-${field.id}`}
                  name={field.label.toLowerCase().replace(" ", "-")}
                  type={field.type}
                  placeholder={field.placeholderText}
                  required
                  value={
                    formValues[field.label.toLowerCase().replace(" ", "-")] ||
                    ""
                  }
                  onChange={handleChange}
                  className={`mt-1 font-assistant block w-full p-2 border-b hover:bg-gray-50 transition-colors duration-300 border-gray-300 focus:outline-none focus:border-primary-light focus:bg-gray-50 focus:ring-[0.5px] focus:ring-primary ${
                    formErrors[field.label.toLowerCase().replace(" ", "-")]
                      ? "border-red-500"
                      : ""
                  }`}
                />
              )}

              {formErrors[field.label.toLowerCase().replace(" ", "-")] && (
                <p
                  className={getTextSizeClass(
                    false,
                    "text-red-500 font-assistant text-sm mt-1"
                  )}
                >
                  {formErrors[field.label.toLowerCase().replace(" ", "-")]}
                </p>
              )}
            </div>
          ))}
          <button
            type="submit"
            className={getTextSizeClass(
              false,
              "mt-4 font-assistant text-primary px-4 py-2 rounded-md"
            )}
          >
            {form.submitText}
          </button>
        </form>
        {isSubmitted && (
          <div
            className={getTextSizeClass(
              false,
              "mt-4 font-assistant text-green-600"
            )}
          >
            {documentToReactComponents(form.successMessage)}
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactForm;
