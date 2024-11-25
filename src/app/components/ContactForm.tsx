"use client";

import React, { useState } from "react";

const ContactForm = () => {
  const [formValues, setFormValues] = useState<{ [key: string]: string }>({});
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [generalError, setGeneralError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    setFormErrors({ ...formErrors, [name]: "" }); // Clear error when typing
    setGeneralError(null); // Clear general error when typing
  };

  const validateForm = () => {
    const errors: { [key: string]: string } = {};
    let isValid = true;

    const requiredFields = [
      "name",
      "email",
      "company",
      "phoneNumber",
      "subject",
      "message",
    ];
    requiredFields.forEach((field) => {
      if (!formValues[field]?.trim()) {
        errors[field] = `${field.replace(/([A-Z])/g, " $1")} is required.`;
        isValid = false;
      }
    });

    if (formValues.email && !/^\S+@\S+\.\S+$/.test(formValues.email)) {
      errors.email = "Please enter a valid email address.";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralError(null);

    const isValid = validateForm();

    if (isValid) {
      try {
        const payload = {
          name: formValues.name,
          email: formValues.email,
          company: formValues.company || "",
          phoneNumber: formValues.phoneNumber || "",
          subject: formValues.subject,
          message: formValues.message,
        };

        const response = await fetch("/api/send-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          setIsSubmitted(true);
        } else {
          const errorData = await response.json();
          setGeneralError(errorData.message || "Failed to send email.");
        }
      } catch (error) {
        setGeneralError("An error occurred. Please try again later.");
      }
    } else {
      setGeneralError("Please fill in all required fields.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {["name", "email", "company", "phoneNumber", "subject"].map((field) => (
        <div className="mb-4" key={field}>
          <label
            htmlFor={field}
            className="block font-semibold mb-1 capitalize"
          >
            {field.replace(/([A-Z])/g, " $1")}
          </label>
          <input
            type={field === "email" ? "email" : "text"}
            id={field}
            name={field}
            value={formValues[field] || ""}
            onChange={handleChange}
            className={`w-full border px-3 py-2 ${
              formErrors[field] ? "border-red-500" : ""
            }`}
            placeholder={`Your ${field.replace(/([A-Z])/g, " $1")}`}
            required={["name", "email", "subject"].includes(field)}
          />
          {formErrors[field] && (
            <p className="text-red-500 text-sm mt-1">{formErrors[field]}</p>
          )}
        </div>
      ))}
      <div className="mb-4">
        <label
          htmlFor="message"
          className="block font-semibold mb-1 capitalize"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formValues["message"] || ""}
          onChange={handleChange}
          className={`w-full border px-3 py-2 h-32 ${
            formErrors["message"] ? "border-red-500" : ""
          }`}
          placeholder="Your message"
          required
        ></textarea>
        {formErrors["message"] && (
          <p className="text-red-500 text-sm mt-1">{formErrors["message"]}</p>
        )}
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-5 py-2 rounded hover:bg-blue-600"
      >
        Submit
      </button>
      {generalError && (
        <div className="text-red-500 font-assistant text-sm mt-4">
          {generalError}
        </div>
      )}
      {isSubmitted && (
        <div className="text-green-500 font-assistant text-sm mt-4">
          Thank you for reaching out! We'll get back to you soon.
        </div>
      )}
    </form>
  );
};

export default ContactForm;
