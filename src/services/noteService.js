import axios from "axios";
const backEndURL = "/api/notes";

const getNotes = async () => {
  const request = axios.get(backEndURL);
  const response = await request;
  return response.data;
};

const addNote = async (newObject) => {
  const request = axios.post(backEndURL, newObject);
  const response = await request;
  return response.data;
};

const updateStatus = async (id, newObject) => {
  const request = axios.put(`${backEndURL}/${id}`, newObject);
  const response = await request;
  return response.data;
};

export default {
  getNotes,
  addNote,
  updateStatus,
};
