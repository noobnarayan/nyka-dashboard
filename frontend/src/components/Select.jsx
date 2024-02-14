import React from "react";

const Select = ({ options, defaultOption, onChange, ...props }) => {
  return (
    <select
      {...props}
      className="w-full p-2 rounded-lg border border-gray-400 my-2 overflow-auto focus:outline-none focus:border-[#7949FF] focus:border-2"
      required
      onChange={onChange}
    >
      <option value="null" hidden>
        {defaultOption}
      </option>
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default Select;
