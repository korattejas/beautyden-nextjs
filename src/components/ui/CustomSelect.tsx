"use client";

import React from "react";
import Select, {
  Props as SelectProps,
  SingleValue,
  ActionMeta,
  StylesConfig,
  components,
} from "react-select";
import { HiChevronDown } from "react-icons/hi2";

export interface SelectOption {
  value: string;
  label: string;
  icon?: string;
}

interface CustomSelectProps
  extends Omit<SelectProps<SelectOption, false>, "onChange"> {
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  className,
  ...rest
}) => {
  // Custom styles with proper border colors
  const customStyles: StylesConfig<SelectOption, false> = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: "rgba(255, 255, 255, 0.6)",
      backdropFilter: "blur(8px)",
      // Fixed border colors using standard CSS color values
      border: state.isFocused
        ? "2px solid #3b82f6" // blue-500
        : "1px solid #d1d5db", // gray-300
      borderRadius: "9999px",
      padding: "4px 8px",
      // Fixed boxShadow with proper color values
      boxShadow: state.isFocused
        ? "0 0 0 3px rgba(59, 130, 246, 0.1)" // blue-500 with opacity
        : "none",
      "&:hover": {
        borderColor: "#93c5fd", // blue-300
      },
      minHeight: "48px",
      cursor: "pointer",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "rgba(0, 0, 0, 0.5)",
      fontWeight: "500",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#000000",
      fontWeight: "500",
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "rgba(255, 255, 255, 0.95)",
      backdropFilter: "blur(12px)",
      borderRadius: "16px",
      border: "1px solid #e5e7eb", // gray-200
      boxShadow:
        "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      overflow: "hidden",
      zIndex: 50,
    }),
    menuPortal: (provided) => ({
      ...provided,
      zIndex: 50,
    }),
    menuList: (provided) => ({
      ...provided,
      padding: "8px",
      maxHeight: "200px",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "#3b82f6" // blue-500
        : state.isFocused
        ? "#dbeafe" // blue-100
        : "transparent",
      color: state.isSelected ? "white" : "#000000",
      borderRadius: "8px",
      margin: "2px 0",
      padding: "12px 16px",
      cursor: "pointer",
      fontWeight: "500",
      "&:hover": {
        backgroundColor: state.isSelected
          ? "#3b82f6" // blue-500
          : "#dbeafe", // blue-100
      },
    }),
    indicatorSeparator: () => ({ display: "none" }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: "rgba(0, 0, 0, 0.4)",
      padding: "8px",
      "&:hover": {
        color: "#3b82f6", // blue-500
      },
    }),
    clearIndicator: (provided) => ({
      ...provided,
      color: "rgba(0, 0, 0, 0.4)",
      padding: "8px",
      "&:hover": {
        color: "#3b82f6", // blue-500
      },
    }),
  };

  // Handle the onChange with proper typing
  const handleChange = (
    newValue: SingleValue<SelectOption>,
    actionMeta: ActionMeta<SelectOption>
  ) => {
    onChange(newValue?.value || "");
  };

  // Find the current selected option
  const selectedOption = Array.isArray(options)
    ? options.find((option) => option.value === value)
    : null;

  // Custom components
  const CustomDropdownIndicator = (props: any) => (
    <components.DropdownIndicator {...props}>
      <HiChevronDown className="w-4 h-4" />
    </components.DropdownIndicator>
  );

  const CustomOption = (props: any) => (
    <components.Option {...props}>
      <div className="flex items-center gap-2">
        {props.data.value.match(/^\d$/) && (
          <span className="text-yellow-400">
            {"⭐".repeat(parseInt(props.data.value))}
          </span>
        )}
        <span>{props.data.label}</span>
      </div>
    </components.Option>
  );

  return (
    <Select<SelectOption, false>
      options={options}
      value={selectedOption}
      onChange={handleChange}
      placeholder={placeholder}
      isClearable
      isSearchable
      styles={customStyles}
      components={{
        DropdownIndicator: CustomDropdownIndicator,
        Option: CustomOption,
        IndicatorSeparator: () => null,
      }}
      className={`react-select-container ${className}`}
      classNamePrefix="react-select"
      menuPlacement="auto"
      menuPosition="absolute"
      menuPortalTarget={
        typeof window !== "undefined" ? document.body : undefined
      }
      {...rest}
    />
  );
};

export default CustomSelect;
