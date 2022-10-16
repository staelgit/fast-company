import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { validator } from '../../../lib/validator';
import { useHistory } from 'react-router-dom';
import { useProfession } from '../../../hooks/useProfession';
import { useQualities } from '../../../hooks/useQualities';
import { useUser } from '../../../hooks/useUsers';
import { useAuth } from '../../../hooks/useAuth';
import TextField from '../../common/form/textField';
import SelectField from '../../common/form/selectField';
import RadioField from '../../common/form/radioField';
import MultiSelectField from '../../common/form/multiSelectField';
import Loader from '../../common/loader';
import BackHistoryButton from '../../common/backButton';

const EditUserPage = ({ id }) => {
   const history = useHistory();
   const { updateUser, currentUser } = useAuth();

   if (currentUser._id !== id) {
      history.push(`/users/${currentUser._id}/edit`);
   }

   const [isLoading, setIsLoading] = useState(true);
   const [errors, setErrors] = useState({});
   const { isLoading: professionsLoading, professions: professionsFromHook } =
      useProfession();
   const [professions, setProfessions] = useState([]);
   const { isLoading: qualitiesLoading, qualities: qualitiesFromHook } =
      useQualities();
   const [qualities, setQualities] = useState([]);
   const { isLoading: usersLoading, getUserById } = useUser();
   const [user, setUser] = useState({});
   const [data, setData] = useState({
      name: '',
      email: '',
      profession: '',
      sex: '',
      qualities: []
   });

   useEffect(() => {
      if (!usersLoading) {
         const user = getUserById(id);
         setUser(user);
      }
   }, [usersLoading, id]);

   useEffect(() => {
      if (!professionsLoading) {
         const professions = getProfessions(professionsFromHook);
         setProfessions(professions);
      }
   }, [professionsLoading]);

   useEffect(() => {
      if (!qualitiesLoading) {
         const qualities = getQualities(qualitiesFromHook, 'fromApi');
         setQualities(qualities);
      }
   }, [qualitiesLoading]);

   useEffect(() => {
      if (Object.keys(user).length && qualities.length) {
         const { name, email, profession, sex, qualities } = user;
         setData({
            name,
            email,
            profession,
            sex,
            qualities: getQualities(qualities, 'byIds')
         });
      }
   }, [user, qualities]);

   useEffect(() => {
      if (professions.length && qualities.length && data.name && isLoading) {
         setIsLoading(false);
      }
   }, [professions, qualities, data]);

   useEffect(() => {
      if (data._id) {
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
      setErrors(errors);
      return Object.keys(errors).length === 0;
   };

   const getProfessions = (elements) => {
      return Object.keys(elements).map((professionName) => ({
         label: elements[professionName].name,
         value: elements[professionName]._id
      }));
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
         case 'byIds': {
            qualitiesArray = elements.map((id) =>
               qualities.find((q) => q.value === id)
            );
            break;
         }
         case 'fromComponent': {
            qualitiesArray = elements.map((q) => q.value);
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
      const { qualities } = data;
      const newUserData = {
         ...user,
         ...data,
         qualities: getQualities(qualities, 'fromComponent')
      };
      updateUser(newUserData);
      history.push(`/users/${id}`);
   };

   return !isLoading ? (
      <div className="container mt-4">
         <BackHistoryButton />
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
