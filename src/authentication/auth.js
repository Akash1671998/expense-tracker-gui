import axios from "axios";

const application = axios.create({
  baseURL: "http://localhost:9090",
});

const requestHandler = (request) => {
  request.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return request;
};

const responseHandler = (response) => {
  return response;
};

const errorHandler = (error) => {
  if (error.response?.status === 403) {
    window.location = "/login";
  }
  return Promise.reject(error);
};

// const refreshTokenRequest = () => {
//   return axios
//     .post(`${variables.api.services}user/refreshToken`, null, {
//       headers: {
//         Authorization: `Refresh-Bearer ${AuthenticationService.getRefreshToken()}`,
//       },
//     })
//     .then((response) => {
//       AuthenticationService.setRefreshedToken(
//         response.data.data.token,
//         response.data.data.refreshToken
//       );
//       return Promise.resolve();
//     })
//     .catch((error) => {
//       window.location = "/site/log-out";
//     });
// };

application.interceptors.request.use(
  (request) => requestHandler(request),
  (error) => errorHandler(error)
);

application.interceptors.response.use(
  (response) => responseHandler(response),
  (error) => errorHandler(error)
);

export { application };
