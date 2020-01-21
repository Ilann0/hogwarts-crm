import { createAction } from '@reduxjs/toolkit';

export const setServerMsg = createAction('SET_SERVER_MESSAGE');
export const toggleLoading = createAction('SET_LOADING');
export const setFetchingError = createAction('SET_FETCHING_ERROR');
export const resetGlobalState = createAction('RESET_GLOBAL_STATE');
export const setTitle = createAction('SET_TITLE');
