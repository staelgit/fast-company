import { createSlice } from '@reduxjs/toolkit';
import qualityService from '../services/quality.service';
import isOutdated from '../utils/isOutdated';

const qualitiesSlice = createSlice({
   name: 'qualities',
   initialState: {
      entities: null,
      isLoading: true,
      error: null,
      lastFetch: null
   },
   reducers: {
      requested: (state) => {
         state.isLoading = true;
      },
      received: (state, action) => {
         state.entities = action.payload;
         state.lastFetch = Date.now();
         state.isLoading = false;
      },
      requestFiled: (state, action) => {
         state.error = action.payload;
         state.isLoading = false;
      }
   }
});

const { reducer: qualitiesReducer, actions } = qualitiesSlice;
const { requested, received, requestFiled } = actions;

export const loadQualitiesList = () => async (dispatch, getState) => {
   const { lastFetch } = getState().qualities;
   if (isOutdated(lastFetch)) {
      dispatch(requested());
      try {
         const { content } = await qualityService.fetchAll();
         dispatch(received(content));
      } catch (error) {
         dispatch(requestFiled(error.message));
      }
   }
};

export const getQualities = () => (state) => state.qualities.entities;
export const getQualitiesLoadingStatus = () => (state) =>
   state.qualities.isLoading;
export const getQualitiesByIds = (qualitiesIds) => (state) => {
   if (state.qualities.entities) {
      const qualitiesArray = [];
      for (const qualId of qualitiesIds) {
         for (const quality of state.qualities.entities) {
            if (quality._id === qualId) {
               qualitiesArray.push(quality);
               break;
            }
         }
      }
      return qualitiesArray;
   }
   return [];
};

export default qualitiesReducer;
