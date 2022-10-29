import React, { useEffect, useState } from 'react';
import TextField from '../common/form/textField';
import { validator } from '../../utils/validator';
import CheckBoxField from '../common/form/checkBoxField';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../store/users';

const LoginForm = () => {
   const history = useHistory();
   const dispatch = useDispatch();

   const [data, setData] = useState({ email: '', password: '', stayOn: false });
   const [errors, setErrors] = useState({});
   const [enterError, setEnterError] = useState(null);

   const validatorConfig = {
      email: {
         isRequired: {
            massage: 'Электронная почта обязательная для заполнения'
         }
      },
      password: {
         isRequired: {
            massage: 'Поле пароля обязательно для заполнения'
         }
      }
   };

   useEffect(() => {
      validate();
   }, [data]);

   const validate = () => {
      const errors = validator(data, validatorConfig);
      setErrors(errors);
      return Object.keys(errors).length === 0;
   };

   const isValid = Object.keys(errors).length === 0;

   const handleChange = (target) => {
      setData((prev) => ({
         ...prev,
         [target.name]: target.value
      }));

      setEnterError(null);
   };

   const handleSubmit = (e) => {
      e.preventDefault();

      const isValid = validate();
      if (!isValid) return;
      const redirect = history.location.state
         ? history.location.state.from.pathname
         : '/';
      dispatch(login({ payload: data, redirect }));
   };
   return (
      <form onSubmit={handleSubmit}>
         <TextField
            onChange={handleChange}
            name="email"
            value={data.email}
            label="Электронная почта"
            error={errors.email}
         />
         <TextField
            onChange={handleChange}
            name="password"
            type="password"
            value={data.password}
            label="Пароль"
            error={errors.password}
         />
         <CheckBoxField
            value={data.stayOn}
            onChange={handleChange}
            name="stayOn"
         >
            Оставаться в системе
         </CheckBoxField>
         {enterError && <p className="text-danger">{enterError}</p>}
         <button
            type="submit"
            disabled={!isValid || enterError}
            className="btn btn-primary w-100 mx-auto"
         >
            Отправить
         </button>
      </form>
   );
};

export default LoginForm;
