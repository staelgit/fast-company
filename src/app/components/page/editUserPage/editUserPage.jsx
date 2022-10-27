import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { validator } from '../../../lib/validator';
import TextField from '../../common/form/textField';
import SelectField from '../../common/form/selectField';
import RadioField from '../../common/form/radioField';
import MultiSelectField from '../../common/form/multiSelectField';
import Loader from '../../common/loader';
import BackHistoryButton from '../../common/backButton';
import { useAuth } from '../../../hooks/useAuth';
import { useSelector } from 'react-redux';
import {
   getQualities,
   getQualitiesLoadingStatus
} from '../../../store/qualities';
import {
   getProfessions,
   getProfessionsLoadingStatus
} from '../../../store/professions';

const EditUserPage = () => {
   const history = useHistory();
   const [isLoading, setIsLoading] = useState(true);
   const [data, setData] = useState();
   const { currentUser, updateUserData } = useAuth();
   const qualities = useSelector(getQualities());
   const qualitiesLoading = useSelector(getQualitiesLoadingStatus());
   const qualitiesList = Object.keys(qualities).map((optionName) => ({
      label: qualities[optionName].name,
      value: qualities[optionName]._id,
      color: qualities[optionName].color
   }));
   const professions = useSelector(getProfessions());
   const professionLoading = useSelector(getProfessionsLoadingStatus());
   const professionsList = Object.keys(professions).map((professionName) => ({
      label: professions[professionName].name,
      value: professions[professionName]._id
   }));
   const [errors, setErrors] = useState({});

   useEffect(() => {
      if (!professionLoading && !qualitiesLoading && currentUser && !data) {
         setData({
            ...currentUser,
            qualities: transformData(currentUser.qualities)
         });
      }
   }, [professionLoading, qualitiesLoading, currentUser, data]);

   function getQualitiesListByIds(qualitiesIds) {
      const qualitiesArray = [];
      for (const qualId of qualitiesIds) {
         for (const quality of qualities) {
            if (quality._id === qualId) {
               qualitiesArray.push(quality);
               break;
            }
         }
      }
      return qualitiesArray;
   }

   const transformData = (data) => {
      return getQualitiesListByIds(data).map((qual) => ({
         label: qual.name,
         value: qual._id
      }));
   };

   useEffect(() => {
      if (data && isLoading) {
         setIsLoading(false);
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
      await updateUserData({
         ...data,
         qualities: data.qualities.map((q) => q.value)
      });
      history.push(`/users/${currentUser._id}`);
   };

   return !isLoading && Object.keys(professions).length > 0 ? (
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
