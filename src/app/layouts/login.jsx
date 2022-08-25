import React, { useEffect, useState } from 'react';
import TextField from '../components/textField';
import { validator } from '../lib/validator';

const Login = () => {
   const [data, setData] = useState({ email: '', password: '' });
   const [errors, serErrors] = useState({});

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
      serErrors(errors);
      return Object.keys(errors).length === 0;
   };

   const isValid = Object.keys(errors).length === 0;

   const handleChange = (e) => {
      const { name, value } = e.target;
      setData((prev) => ({
         ...prev,
         [name]: value
      }));
   };
   const handleSubmit = (e) => {
      e.preventDefault();

      const isValid = validate();
      if (!isValid) return;

      console.log('submit');
   };
   return (
      <div className="container mt-4">
         <div className="row">
            <div className="col-md-6 offset-md-3 shadow p-4">
               <h3 className="mb-3">Login</h3>
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
                  <button
                     type="submit"
                     disabled={!isValid}
                     className="btn btn-primary w-100 mx-auto"
                  >
                     Отправить
                  </button>
               </form>
            </div>
         </div>
      </div>
   );
};

export default Login;
