export const BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URL ?? '';

export const HttpMethods = {
  GET: 'GET',
  POST: 'POST',
  DELETE: 'DELETE',
  PUT: 'PUT',
} as const;

const AUTH = '/auth';

export const REGISTER_URL = `${AUTH}/signup`;
export const LOGIN_URL = `${AUTH}/signin`;
export const LOGOUT_URL = `${AUTH}/signout`;

export const GET_LANGUAGES_URL = '/languages';

export const WORDS_BASE_URL = '/words'

export const ADD_WORD_URL = `${WORDS_BASE_URL}/add-word`;

export const USERS_BASE_URL = '/users';

export const CURRENT_USER_URL = `${USERS_BASE_URL}/current`;