import React from "react";
const Select = ({
  name,
  label,
  error,
  options,
  option_value,
  option_text,
  ...rest
}) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select className="form-control" name={name} id={name} {...rest}>
        <option value="" />
        {options.map(option => {
          return (
            <option key={option[option_value]} value={option[option_value]}>
              {option[option_text]}
            </option>
          );
        })}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Select;
