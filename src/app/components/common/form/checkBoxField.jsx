import React from 'react';
import PropTypes from 'prop-types';

const CheckBoxField = ({ name, value, onChange, children, error }) => {
   const inputClasses = `form-check-input ${error ? 'is-invalid' : ''}`;

   const handleChange = () => {
      onChange({ name, value: !value });
   };

   return (
      <div className="form-check mb-4">
         <input
            className={inputClasses}
            type="checkbox"
            value=""
            id={name}
            onChange={handleChange}
            checked={value}
         />
         <label className="form-check-label" htmlFor={name}>
            {children}
         </label>
         {error && <div className="invalid-feedback">{error}</div>}
      </div>
   );
};

CheckBoxField.propTypes = {
   name: PropTypes.string,
   value: PropTypes.bool,
   onChange: PropTypes.func,
   error: PropTypes.string,
   children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
   ])
};

export default CheckBoxField;
