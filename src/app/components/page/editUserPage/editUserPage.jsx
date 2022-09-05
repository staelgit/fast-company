import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { validator } from '../../../lib/validator';
import api from '../../../api';
import TextField from '../../common/form/textField';
import SelectField from '../../common/form/selectField';
import RadioField from '../../common/form/radioField';
import MultiSelectField from '../../common/form/multiSelectField';
import Loader from '../../common/loader';

const EditUserPage = ({ id }) => {
   const history = useHistory();
   const [isLoading, setIsLoading] = useState(false);
   const [errors, serErrors] = useState({});
   const [professions, setProfession] = useState([]);
   const [qualities, setQualities] = useState([]);
   const [data, setData] = useState({
      name: '',
      email: '',
      profession: '',
      sex: '',
      qualities: []
   });

   useEffect(() => {
      setIsLoading(true);
      api.users.getById(id).then(({ profession, qualities, ...data }) => {
         setData((prevState) => ({
            ...prevState,
            ...data,
            qualities: getQualities(qualities, 'fromApi'),
            profession: profession._id
         }));
      });
      api.professions.fetchAll().then((data) =>
         setProfession(
            Object.keys(data).map((professionName) => ({
               label: data[professionName].name,
               value: data[professionName]._id
            }))
         )
      );
      api.qualities.fetchAll().then((data) =>
         setQualities(
            Object.keys(data).map((optionName) => ({
               label: data[optionName].name,
               value: data[optionName]._id,
               color: data[optionName].color
            }))
         )
      );
   }, []);

   useEffect(() => {
      if (data._id) {
         setIsLoading(false);
         validate();
      }
   }, [data]);

   const validatorConfig = {
      name: {
         isRequired: {
            massage: 'Поле имя обязательно для заполнения'
         }
      },
      email: {
         isRequired: {
            massage: 'Электронная почта обязательная для заполнения'
         },
         isEmail: {
            massage: 'Неверный email'
         }
      },
      profession: {
         isRequired: {
            massage: 'Обязательно выберите свою профессию'
         }
      }
   };

   const validate = () => {
      const errors = validator(data, validatorConfig);
      serErrors(errors);
      return Object.keys(errors).length === 0;
   };

   const getProfessionById = (id) => {
      for (const prof of professions) {
         if (prof.value === id) {
            return { _id: prof.value, name: prof.label };
         }
      }
   };

   const getQualities = (elements, key) => {
      let qualitiesArray = [];
      switch (key) {
         case 'fromApi': {
            qualitiesArray = Object.keys(elements).map((optionName) => ({
               label: elements[optionName].name,
               value: elements[optionName]._id,
               color: elements[optionName].color
            }));
            break;
         }
         case 'fromComponent': {
            qualitiesArray = Object.keys(elements).map((optionName) => ({
               name: elements[optionName].label,
               _id: elements[optionName].value,
               color: elements[optionName].color
            }));
            break;
         }
         default:
            break;
      }

      return qualitiesArray;
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
      const newUserData = {
         ...data,
         profession: getProfessionById(profession),
         qualities: getQualities(qualities, 'fromComponent')
      };
      api.users
         .update(id, newUserData)
         .then((data) => history.push(`/users/${data._id}`));
   };

   return !isLoading && Object.keys(professions).length > 0 ? (
      <div className="container mt-4">
         <div className="row">
            <div className="col-md-6 offset-md-3 shadow p-4">
               <h3 className="mb-3">Редактируем данные пользователя</h3>
               <form onSubmit={handleSubmit}>
                  <TextField
                     onChange={handleChange}
                     name="name"
                     value={data.name}
                     label="Имя (Имя Фамилия)"
                     error={errors.name}
                  />
                  <TextField
                     onChange={handleChange}
                     name="email"
                     value={data.email}
                     label="Электронная почта"
                     error={errors.email}
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
                  <button
                     type="submit"
                     disabled={!isValid}
                     className="btn btn-primary w-100 mx-auto"
                  >
                     Обновить
                  </button>
               </form>
            </div>
         </div>
      </div>
   ) : (
      <Loader />
   );
};

EditUserPage.propTypes = {
   id: PropTypes.string
};

export default EditUserPage;
