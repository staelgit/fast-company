import React, { useEffect, useState } from 'react';
import { validator } from '../../utils/validator';
import TextField from '../common/form/textField';
import SelectField from '../common/form/selectField';
import RadioField from '../common/form/radioField';
import MultiSelectField from '../common/form/multiSelectField';
import CheckBoxField from '../common/form/checkBoxField';
import { useDispatch, useSelector } from 'react-redux';
import { getQualities } from '../../store/qualities';
import { getProfessions } from '../../store/professions';
import { signUp } from '../../store/users';

const RegisterForm = () => {
   const dispatch = useDispatch();
   const [data, setData] = useState({
      email: '',
      password: '',
      profession: '',
      sex: 'male',
      name: '',
      qualities: [],
      license: false
   });

   const [errors, setErrors] = useState({});
   const qualities = useSelector(getQualities());
   const qualitiesList = Object.keys(qualities).map((optionName) => ({
      label: qualities[optionName].name,
      value: qualities[optionName]._id,
      color: qualities[optionName].color
   }));
   const professions = useSelector(getProfessions());
   const professionsList = Object.keys(professions).map((professionName) => ({
      label: professions[professionName].name,
      value: professions[professionName]._id
   }));

   useEffect(() => {
      validate();
   }, [data]);

   const validatorConfig = {
      email: {
         isRequired: {
            massage: 'Электронная почта обязательная для заполнения'
         },
         isEmail: {
            massage: 'Неверный email'
         }
      },
      name: {
         isRequired: {
            massage: 'Имя обязательно для заполнения'
         },
         min: {
            massage: 'Имя должно быть 3 и более символов',
            value: 3
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

   const handleSubmit = (e) => {
      e.preventDefault();
      const isValid = validate();
      if (!isValid) return;
      const newData = {
         ...data,
         qualities: data.qualities.map((q) => q.value)
      };
      console.log('submit with data', newData);
      dispatch(signUp(newData));
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
            name="name"
            value={data.name}
            label="Имя"
            error={errors.name}
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
            options={professionsList}
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
            options={qualitiesList}
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
