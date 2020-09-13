import axios from "axios";
const databaseUrl = "http://localhost:3002/api/notes";

const getNotes = async () => {
  const request = axios.get(databaseUrl);
  const response = await request;
  return response.data;
};

const addNote = async (newObject) => {
  const request = axios.post(databaseUrl, newObject);
  const response = await request;
  return response.data;
};

const updateStatus = async (id, newObject) => {
  const request = axios.put(`${databaseUrl}/${id}`, newObject);
  const response = await request;
  return response.data;
};

export default {
  getNotes,
  addNote,
  updateStatus,
};
