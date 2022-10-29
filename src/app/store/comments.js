import { createAction, createSlice } from '@reduxjs/toolkit';
import commentService from '../services/comment.service';
import { nanoid } from 'nanoid';
import localStorageService from '../services/localStorage.service';

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

const commentCreateRequested = createAction('comments/commentCreateRequested');
const commentCreateFailed = createAction('comments/commentCreateFailed');
const commentRemoveRequested = createAction('comments/commentRemoveRequested');
const commentRemoveFailed = createAction('comments/commentRemoveFailed');

export const createComment = (data, userId) => async (dispatch) => {
   dispatch(commentCreateRequested());
   const comment = {
      ...data,
      _id: nanoid(),
      pageId: userId,
      created_at: Date.now(),
      userId: localStorageService.getUserId()
   };
   try {
      const { content } = await commentService.createComment(comment);
      dispatch(commentCreated(content));
   } catch (error) {
      dispatch(commentCreateFailed());
   }
};

export const removeComment = (commentId) => async (dispatch) => {
   dispatch(commentRemoveRequested());
   try {
      const { content } = await commentService.removeComment(commentId);
      if (content === null) {
         dispatch(commentRemoved(commentId));
      }
   } catch (error) {
      dispatch(commentRemoveFailed());
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
