import React from "react";

const Input = ({ name, label, error, description, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        //   autoFocus
        //   ref={this.username}
        {...rest}
        className="form-control"
        id={name}
        name={name}
        aria-describedby={`${name}Help`}
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
