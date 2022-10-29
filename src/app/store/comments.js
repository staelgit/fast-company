import { createSlice } from '@reduxjs/toolkit';
import commentService from '../services/comment.service';

const commentsSlice = createSlice({
   name: 'comments',
   initialState: {
      entities: null,
      isLoading: true,
      error: null
   },
   reducers: {
      requested: (state) => {
         state.isLoading = true;
      },
      received: (state, action) => {
         state.entities = action.payload;
         state.isLoading = false;
      },
      requestFiled: (state, action) => {
         state.error = action.payload;
         state.isLoading = false;
      }
   }
});

const { reducer: commentsReducer, actions } = commentsSlice;
const { requested, received, requestFiled } = actions;

export const loadCommentsList = (userId) => async (dispatch) => {
   dispatch(requested());
   try {
      const { content } = await commentService.getComments(userId);
      dispatch(received(content));
   } catch (error) {
      dispatch(requestFiled(error.message));
   }
};

export const getComments = () => (state) => state.comments.entities;
export const getCommentsLoadingStatus = () => (state) =>
   state.comments.isLoading;

export default commentsReducer;
