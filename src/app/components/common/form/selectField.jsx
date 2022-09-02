import React from 'react';
import PropTypes from 'prop-types';

const SelectField = ({
   label,
   value,
   onChange,
   defaultOption,
   options,
   error,
   name
}) => {
   const optionsArray =
      !Array.isArray(options) && typeof options === 'object'
         ? Object.values(options)
         : options;

   const inputClasses = `form-select ${error ? 'is-invalid' : ''}`;

   const handleChange = ({ target }) => {
      onChange({ name: target.name, value: target.value });
   };

   return (
      <div className="mb-4">
         <label htmlFor={name} className="form-label">
            {label}
         </label>
         <select
            className={inputClasses}
            id={name}
            name={name}
            value={value}
            onChange={handleChange}
         >
            <option disabled value="">
               {defaultOption}
            </option>
            {optionsArray.length > 0 &&
               optionsArray.map((option) => (
                  <option key={option.value} value={option.value}>
                     {option.label}
                  </option>
               ))}
         </select>
         {error && <div className="invalid-feedback">{error}</div>}
      </div>
   );
};

SelectField.propTypes = {
   label: PropTypes.string,
   value: PropTypes.string,
   onChange: PropTypes.func,
   defaultOption: PropTypes.string,
   options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
   error: PropTypes.string,
   name: PropTypes.string
};

export default SelectField;
