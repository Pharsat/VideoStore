import React from "react";

const Input = ({
  name,
  label,
  value,
  placeholder,
  description,
  error,
  onChange
}) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        //   autoFocus
        //   ref={this.username}
        type="text"
        className="form-control"
        id={name}
        name={name}
        aria-describedby={`${name}Help`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {error && <div className="alert alert-danger">{error}</div>}
      {description && (
        <small id={`${name}Help`} className="form-text text-muted">
          {description}
        </small>
      )}
    </div>
  );
};

export default Input;
