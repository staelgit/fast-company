import React, { useEffect, useState } from 'react';
import { validator } from '../../lib/validator';
import TextField from '../common/form/textField';
import api from '../../api';
import SelectField from '../common/form/selectField';
import RadioField from '../common/form/radioField';
import MultiSelectField from '../common/form/multiSelectField';
import CheckBoxField from '../common/form/checkBoxField';

const RegisterForm = () => {
   const [data, setData] = useState({
      email: '',
      password: '',
      profession: '',
      sex: 'male',
      qualities: [],
      license: false
   });
   const [errors, serErrors] = useState({});
   const [professions, setProfessions] = useState([]);
   const [qualities, setQualities] = useState({});

   useEffect(() => {
      api.professions.fetchAll().then((data) => setProfessions(data));
      api.qualities.fetchAll().then((data) => setQualities(data));
   }, []);

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
      },
      profession: {
         isRequired: {
            massage: 'Обязательно выберите свою профессию'
         }
      },
      license: {
         isRequired: {
            massage:
               'Вы не можете использовать наш сервис без подтверждения лицензионного соглашения'
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

   const handleChange = (target) => {
      setData((prev) => ({
         ...prev,
         [target.name]: target.value
      }));
   };

   const handleSubmit = (e) => {
      e.preventDefault();

      const isValid = validate();
      if (!isValid) return;

      console.log('submit');
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
         <SelectField
            label="Выберите вашу профессию"
            defaultOption="Выберите..."
            name="profession"
            options={professions}
            onChange={handleChange}
            value={data.profession}
            error={errors.profession}
         />
         <RadioField
            options={[
               { name: 'Male', value: 'male' },
               { name: 'Female', value: 'female' }
            ]}
            value={data.sex}
            name="sex"
            onChange={handleChange}
            label="Выберите пол"
         />
         <MultiSelectField
            options={qualities}
            onChange={handleChange}
            defaultValue={data.qualities}
            name="qualities"
            label="Выберите ваши качества"
         />
         <CheckBoxField
            value={data.license}
            onChange={handleChange}
            name="license"
            error={errors.license}
         >
            Подтвердить <a>лицензионное соглашение</a>
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

export default RegisterForm;
