import { API_BASE_URL } from '@/config/serverApiConfig';
import { request, ENDPOINT } from '@/rest';

export const login = async ({ username, password }) => {
  return request.post({
    path: API_BASE_URL + ENDPOINT.LOGIN,
    body: { username, password },
  });
};

export const getGoogleLoginUrl = () => {
  return API_BASE_URL + ENDPOINT.GOOGLE_LOGIN;
}

export const getGoogleToken = async ({ code, state }) => {
  return request.get({
    path: API_BASE_URL + ENDPOINT.GOOGLE_LOGIN_GET_TOKEN + "?code=" + code + "&state=" + state
  });
};

export const signUp = async ({ username, password, firstName, lastName }) => {
  return await request.post({
    path: API_BASE_URL + ENDPOINT.SIGN_UP,
    body: { username, password, firstName, lastName },
  });
};

export const signOut = async () => {
  return await request.post({
    path: API_BASE_URL + ENDPOINT.SIGN_OUT,
  });
};
