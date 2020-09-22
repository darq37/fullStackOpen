import axios from "axios";
const backEndURL = "/api/notes";

let token = null;

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getNotes = async () => {
  const response =  await axios.get(backEndURL);
  return response.data;
};

const addNote = async (newObject) => {
  const config = {
    headers: {Authorization: token}
  }
  const response = await axios.post(backEndURL, newObject, config);
  return response.data;
};

const updateStatus = async (id, newObject) => {
  const response = await axios.put(`${backEndURL}/${id}`, newObject);
  return response.data;
};

export default {
  getNotes,
  addNote,
  updateStatus,
  setToken
};
