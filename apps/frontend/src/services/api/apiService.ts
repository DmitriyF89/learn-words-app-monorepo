import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';

import { UserAuthDto, UserRegisterDto } from '@backend/auth-dtos';
import { AddWordDto, UpdateWordDto } from '@backend/word-dtos';
import { User, Language, Word } from '@backend/entities';

import { BASE_URL, LOGIN_URL, REGISTER_URL, HttpMethods, GET_LANGUAGES_URL, WORDS_BASE_URL, ADD_WORD_URL, CURRENT_USER_URL, LOGOUT_URL } from './constants';

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: 'include',
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
  },
  tagTypes: ['Languages', 'Words'],
  endpoints: (build) => ({
    loginUser: build.mutation<User, UserAuthDto>({
      query: (credentials) => ({
        url: LOGIN_URL,
        method: HttpMethods.POST,
        body: credentials,
      })
    }),
    registerUser: build.mutation<User, UserRegisterDto>({
      query: (credentials) => ({
        url: REGISTER_URL,
        method: HttpMethods.POST,
        body: credentials,
      })
    }),
    logoutUser: build.query<boolean, void>({
      query: () => ({
        url: LOGOUT_URL,
      })
    }),
    getLanguages: build.query<Language[], void>({
      query: () => ({
        url: GET_LANGUAGES_URL,
      }),
      providesTags: ['Languages'],
    }),
    getAllWords: build.query<Word[], string>({
      query: (languageId) => ({
        url: `${WORDS_BASE_URL}/${languageId}`,
      }),
      providesTags: ['Words'],
    }),
    getTrainingWords: build.query<Word[], string>({
      query: (languageId) => ({
        url: `${WORDS_BASE_URL}/${languageId}/repeat`
      }),
      providesTags: ['Words'],
    }),
    addWord: build.mutation<Word, { langId: string, word: AddWordDto }>({
      query: ({ langId, word }) => ({
        url: `${ADD_WORD_URL}/${langId}`,
        method: HttpMethods.POST,
        body: word
      }),
    }),
    updateWord: build.mutation<Word, { langId: string, wordId: string, newWord: UpdateWordDto }>({
      query: ({ langId, newWord, wordId }) => ({
        url: `${WORDS_BASE_URL}/${langId}/${wordId}`,
        method: HttpMethods.PUT,
        body: newWord,
      }),
      invalidatesTags: ['Words'],
    }),
    getWord: build.query<Word, { langId: string; wordId: string }>({
      query: ({ langId, wordId }) => ({
        url: `${WORDS_BASE_URL}/${langId}/${wordId}`,
        method: HttpMethods.GET,
      }),
    }),
    deleteWord: build.mutation<Word, { langId: string; wordId: string }>({
      query: ({ langId, wordId }) => ({
        url: `${WORDS_BASE_URL}/${langId}/${wordId}`,
        method: HttpMethods.DELETE,
      }),
      invalidatesTags: ['Words'],
    }),
    addLanguage: build.mutation<undefined, { language: string }>({
      query: ({ language }) => ({
        url: `${GET_LANGUAGES_URL}/${language}`,
        method: HttpMethods.POST,
      }),
      invalidatesTags: ['Languages'],
    }),
    getCurrentUser: build.query<User, void>({
      query: () => ({
        url: CURRENT_USER_URL
      })
    })
  }),
})

export const { useLoginUserMutation, useGetLanguagesQuery, useGetAllWordsQuery, useAddWordMutation, useGetTrainingWordsQuery, useAddLanguageMutation, useGetCurrentUserQuery, useLazyGetCurrentUserQuery, useUpdateWordMutation, useRegisterUserMutation, useLazyLogoutUserQuery, useGetWordQuery, useDeleteWordMutation } = api;
