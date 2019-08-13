import axios from "axios";
import { toast } from "react-toastify";

axios.interceptors.response.use(null, error => {
  // const { request, response } = error;
  const { response } = error;
  const expectedError =
    response && response.status >= 400 && response.status < 500;

  if (!expectedError) {
    toast.error("an unexpected error");
  }

  return Promise.reject(error);
});

function setJwt(jwt) {
  axios.defaults.headers.common["x-auth-token"] = jwt;
}
export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt
};
