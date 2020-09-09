import axios from "axios";
const databaseUrl = "http://localhost:3001/notes";

const getAll = () => {
  return axios.get(databaseUrl);
};

const create = (newObject) => {
  return axios.post(databaseUrl, newObject);
};

const update = (id, newObject) => {
  return axios.put(`${databaseUrl}/${id}`, newObject);
};

export default {
  getAll: getAll,
  create: create,
  update: update,
};
