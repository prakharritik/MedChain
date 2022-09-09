import axios from "axios";

const baseURL = "http://localhost:8000/api/";

const handleDocRegister = async (formData) => {
  const res = await axios.post("/user");
};
