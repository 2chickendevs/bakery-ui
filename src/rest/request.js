import axios from 'axios';
import { API_BASE_URL } from '@/config/serverApiConfig';

function includeToken() {
  axios.defaults.baseURL = API_BASE_URL;

  const token = localStorage.getItem("token");
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  axios.defaults.headers.common['Content-Type'] = 'application/json';
  axios.defaults.headers.common['Accept'] = 'application/json';
  axios.defaults.withCredentials = true;
}

export const request = {
  /**
   * @param {Object} params - An object containing the path parameter.
   * @param {string} params.path - The path to fetch data from.
   * @returns {Promise<FetchResult>}
   */
  get: async ({ path }) => {
    includeToken();
    return await axios.get(path);
  },

  /**
   * @param {Object} params - An object containing the path parameter.
   * @param {string} params.path - The path of the request
   * @param {Object} params.body - The body of the request
   * @param {Object} params.headers - The headers of the request
   * @returns {Promise<FetchResult>}
   */
  post: async ({ path, body, headers }) => {
    includeToken();
    return await axios.post(path, body, { headers });
  },

  /**
   * @param {Object} params - An object containing the path parameter.
   * @param {string} params.path - The path of the request
   * @param {Object} params.body - The body of the request
   * @param {Object} params.headers - The headers of the request
   * @returns {Promise<FetchResult>}
   */
  put: async ({ path, body, headers }) => {
    includeToken();
    return await axios.put(path, body, { headers });
  },

  /**
   * @param {Object} params - An object containing the path parameter.
   * @param {string} params.path - The path of the request
   * @param {Object} params.body - The body of the request
   * @param {Object} params.headers - The headers of the request
   * @returns {Promise<FetchResult>}
   */
  delete: async ({ path, body, headers }) => {
    includeToken();
    return await axios.delete(path, { headers, data: body });
  },
};
