import { createSlice } from '@reduxjs/toolkit';
import professionService from '../services/profession.service';

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

function isOutdated(date) {
   return Date.now() - date > 600000;
}

export const loadProfessionsList = () => async (dispatch, getState) => {
   const { lastFetch } = getState().qualities;
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

export const getProfessionById = (id) => (state) => {
   return state.professions.entities.find((p) => p._id === id);
};

export const getProfessions = () => (state) => state.professions.entities;
export const getProfessionsLoadingStatus = () => (state) =>
   state.professions.isLoading;

export default professionsReducer;
