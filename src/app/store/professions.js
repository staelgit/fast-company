import { createSlice } from '@reduxjs/toolkit';
import professionService from '../services/profession.service';
import isOutdated from '../utils/isOutdated';

const professionsSlice = createSlice({
   name: 'professions',
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

const { reducer: professionsReducer, actions } = professionsSlice;
const { requested, received, requestFiled } = actions;

export const loadProfessionsList = () => async (dispatch, getState) => {
   const { lastFetch } = getState().professions;
   if (isOutdated(lastFetch)) {
      dispatch(requested());
      try {
         const { content } = await professionService.get();
         dispatch(received(content));
      } catch (error) {
         dispatch(requestFiled(error.message));
      }
   }
};

export const getProfessions = () => (state) => state.professions.entities;
export const getProfessionsLoadingStatus = () => (state) =>
   state.professions.isLoading;
export const getProfessionById = (id) => (state) => {
   if (state.professions.entities) {
      return state.professions.entities.find((p) => p._id === id);
   }
};

export default professionsReducer;
