import React, { useEffect, useState } from 'react';
import TextField from '../common/form/textField';
import { validator } from '../../lib/validator';
import CheckBoxField from '../common/form/checkBoxField';
import { useAuth } from '../../hooks/useAuth';
import { useHistory } from 'react-router-dom';

const LoginForm = () => {
   const history = useHistory();
   const { signIn } = useAuth();
   const [data, setData] = useState({ email: '', password: '', stayOn: false });
   const [errors, setErrors] = useState({});

   const validatorConfig = {
      email: {
         isRequired: {
            massage: 'Электронная почта обязательная для заполнения'
         },
         isEmail: {
            massage: 'Неверный email'
         }
      },
      password: {
         isRequired: {
            massage: 'Поле пароля обязательно для заполнения'
         },
         isCapitalSymbol: {
            massage: 'Должна быть хотя бы одна Заглавная буква'
         },
         isContainsDigit: {
            massage: 'Должна быть хотя бы одна Цифра'
         },
         min: {
            massage: 'Длинна пароля должны быть более 8 символов',
            value: 8
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
   };

   const handleSubmit = async (e) => {
      e.preventDefault();

      const isValid = validate();
      if (!isValid) return;

      console.log('submit');

      try {
         await signIn(data);
         history.push('/');
      } catch (error) {
         setErrors(error);
      }
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
         <button
            type="submit"
            disabled={!isValid}
            className="btn btn-primary w-100 mx-auto"
         >
            Отправить
         </button>
      </form>
   );
};

export default LoginForm;
