import axios from "axios";

export const BASE_URL = "https://localhost:7006/";

export const ENDPOINTS = {
  login: "auth/login",
  getquestion: "quiz/getQuestions",
  getResult: "quiz/getResult",
  createRegister: "auth/register",
  userScore: "quiz/score",
};

export const createAPIEndpoint = (endpoint) => {
  let url = BASE_URL + "api/" + endpoint;
  return {
    fetch: () => axios.get(url),
    fetchById: (id) => axios.get(url + id),
    post: (newRecord) => axios.post(url, newRecord),
    put: (id, updatedRecord) => axios.put(url + id, updatedRecord),
    delete: (id) => axios.delete(url + id),
  };
};

export const AuthCreateEndPoint = (endpoint, token) => {
  let url = BASE_URL + "api/" + endpoint;
  return {
    fetch: () =>
      axios.get(url, { headers: { Authorization: `Bearer ${token}` } }),
    fetchById: (id) =>
      axios.get(url + id, { headers: { Authorization: `Bearer ${token}` } }),
    post: (newRecord) =>
      axios.post(url, newRecord, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    put: (id, updatedRecord) =>
      axios.put(url + id, updatedRecord, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    delete: (id) => axios.delete(url + id),
  };
};
