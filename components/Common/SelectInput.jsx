import React from "react";
import Select from "react-select";

const customStyles = {
  control: (base, state) => ({
    ...base,
    background: "transparent",
    borderRadius: "5px",
    border: state.isFocused ? "solid 1px #3F485F" : "solid 1px #3F485F",
    boxShadow: state.isFocused ? "solid 1px #3F485F" : "solid 1px #3F485F",
    "&:hover": {
      border: "solid 1px #3F485F",
    },
  }),
  menu: (base) => ({
    ...base,
    borderRadius: 0,
    marginTop: 0,
    backgroundColor: "#21293D",
    zIndex: 2,
  }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      backgroundColor: isFocused ? "#3F485F" : "#21293D",
      color: "#FFFFFF",
    };
  },
  placeholder: (defaultStyles) => {
    return {
      ...defaultStyles,
      color: "#ffffff",
    };
  },
  singleValue: (defaultStyles) => {
    return {
      ...defaultStyles,
      color: "#ffffff",
    };
  },
};

export default function SelectInput(props) {
  return (
    <div className={`wrap-input ${props.className ? props.className : ""}`}>
      <label className="label-input" style={{ left: "5px" }}>
        {props.label}
      </label>
      <Select
        instanceId={`select-${props.label}`}
        styles={customStyles}
        options={props.options}
        placeholder={props.placeholder ? props.placeholder : "Select..."}
        components={{
          IndicatorSeparator: () => null,
        }}
        defaultValue={props.defaultValue ? props.defaultValue : ""}
        value={props.defaultValue ? props.defaultValue : ""}
        onChange={(val) => props.onChange(val)}
      />
    </div>
  );
}
