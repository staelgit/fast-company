import { createAction, createSlice } from '@reduxjs/toolkit';
import commentService from '../services/comment.service';
import { nanoid } from 'nanoid';
import { getCurrentUserId } from './users';

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
      },
      commentCreated: (state, action) => {
         if (!Array.isArray(state.entities)) {
            state.entities = [];
         }
         state.entities.push(action.payload);
      },
      commentRemoved: (state, action) => {
         state.entities = state.entities.filter(
            (c) => c._id !== action.payload
         );
      }
   }
});

const { reducer: commentsReducer, actions } = commentsSlice;
const { requested, received, requestFiled, commentCreated, commentRemoved } =
   actions;

const addCommentRequested = createAction('comments/addCommentRequested');
const removeCommentRequested = createAction('comments/removeCommentRequested');

export const createComment = (payload) => async (dispatch, getState) => {
   dispatch(addCommentRequested());
   const comment = {
      ...payload,
      _id: nanoid(),
      created_at: Date.now(),
      userId: getCurrentUserId()(getState())
   };
   try {
      const { content } = await commentService.createComment(comment);
      dispatch(commentCreated(content));
   } catch (error) {
      dispatch(requestFiled());
   }
};

export const removeComment = (commentId) => async (dispatch) => {
   dispatch(removeCommentRequested());
   try {
      const { content } = await commentService.removeComment(commentId);
      if (content === null) {
         dispatch(commentRemoved(commentId));
      }
   } catch (error) {
      dispatch(requestFiled());
   }
};

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
