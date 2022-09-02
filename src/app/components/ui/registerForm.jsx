import React, { useEffect, useState } from 'react';
import { validator } from '../../lib/validator';
import api from '../../api';
import TextField from '../common/form/textField';
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
   const [professions, setProfession] = useState([]);
   const [qualities, setQualities] = useState([]);

   useEffect(() => {
      api.professions.fetchAll().then((data) => {
         const professionsList = Object.keys(data).map((professionName) => ({
            label: data[professionName].name,
            value: data[professionName]._id
         }));
         setProfession(professionsList);
      });
      api.qualities.fetchAll().then((data) => {
         const qualitiesList = Object.keys(data).map((optionName) => ({
            label: data[optionName].name,
            value: data[optionName]._id,
            color: data[optionName].color
         }));
         setQualities(qualitiesList);
      });
   }, []);

   useEffect(() => {
      validate();
   }, [data]);

   const getProfessionById = (id) => {
      for (const prof of professions) {
         if (prof.value === id) {
            return { _id: prof.value, name: prof.label };
         }
      }
   };
   const getQualities = (elements) => {
      const qualitiesArray = [];
      for (const elem of elements) {
         for (const quality in qualities) {
            if (elem.value === qualities[quality].value) {
               qualitiesArray.push({
                  _id: qualities[quality].value,
                  name: qualities[quality].label,
                  color: qualities[quality].color
               });
            }
         }
      }
      return qualitiesArray;
   };

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
      const { profession, qualities } = data;
      console.log({
         ...data,
         profession: getProfessionById(profession),
         qualities: getQualities(qualities)
      });
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
