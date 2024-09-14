import React, { useState } from "react";

export const Tab = ({ label, active, onClick }) => (
  <button
    className={`px-4 py-2 text-sm font-medium transition-colors duration-200 ${
      active
        ? "text-blue-600 border-b-2 border-blue-500"
        : "text-gray-600 hover:text-gray-800"
    }`}
    onClick={onClick}
  >
    {label}
  </button>
);

export const TabContent = ({ children, active }) => (
  <div className={`w-full h-full ${active ? "block" : "hidden"}`}>
    {children}
  </div>
);
