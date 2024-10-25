"use client";

import React, { useState } from "react";
import Section from "../Section";

const ServiceTabs: React.FC<{ services: Section[] }> = ({ services }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (index: number) => {
    setActiveTab(index);
  };

  return (
    <div className="main">
      {/* Tabs for each service */}
      <div className="flex justify-between py-0 border-b border-black ">
        {services.map((service, index) => (
          <button
            key={index}
            onClick={() => handleTabChange(index)}
            className={`font-assistant px-4 py-2 rounded-md ${
              activeTab === index ? "text-black font-bold" : "text-gray-500"
            }`}
          >
            {service.title}
          </button>
        ))}
      </div>

      <Section
        // isReversed={activeTab % 2 === 0}
        section={{
          title: services[activeTab].title,
          subtitle: "",
          body: services[activeTab].body,
          image: services[activeTab].image,
          id: 0,
        }}
        isReversed={false}
      />
    </div>
  );
};

export default ServiceTabs;
