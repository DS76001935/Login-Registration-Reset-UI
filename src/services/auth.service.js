import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";
const API_URL_RESET = "http://localhost:8080/api/test/";

const register = (username, email, password) => {
  return axios.post(API_URL + "signup", {
    username,
    email,
    password,
  });
};
const login = (username, password) => {
  return axios
    .post(API_URL + "signin", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.username) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = async () => {
  localStorage.removeItem("user");
  const response = await axios.post(API_URL + "signout");
  return response.data;
};

const verifyAccount = async (email) => {
  const response = await axios.post(
    API_URL_RESET + "resetPasswordForUser?email=" + email
  );
  return response;
};

const goToResetPage = async (token) => {
  getUserFromToken(token);
  const response = await axios.get(
    API_URL_RESET + "redirectToResetPage?token=" + token
  );
  return response;
};

const resetPassword = async (password, token) => {
  const verfied_user = JSON.parse(localStorage.getItem("verifiedUser"));

  console.log("verfied_user", verfied_user);

  const user = {
    id: verfied_user.id,
    username: verfied_user.username,
    email: verfied_user.email,
    password: verfied_user.password,
  };
  const response = await axios.post(
    API_URL_RESET + "changeUserPassword/" + password,
    user
  );
  return response;
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const getUserFromToken = async (token) => {
  const response = await axios.get(
    API_URL_RESET + "getUserFromToken?token=" + token
  );
  if (response.data) {
    console.log(response.data.data);
    localStorage.setItem("verifiedUser", JSON.stringify(response.data.data));
  }
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
  verifyAccount,
  goToResetPage,
  resetPassword,
};

export default AuthService;

// import axios from "axios";

// const API_URL = "";

// const register = (username, email, password) => {
//   return axios.post(API_URL + "signup", {
//     username,
//     email,
//     password,
//   });
// };

// const login = (username, password) => {
//   return axios
//     .post(API_URL + "signin", {
//       username,
//       password,
//     })
//     .then((response) => {
//       if (response.data.username) {
//         localStorage.setItem("user", JSON.stringify(response.data));
//       }

//       return response.data;
//     });
// };

// const logout = async () => {
//   localStorage.removeItem("user");
//   return Promise.resolve();
// };

// const getCurrentUser = () => {
//   const user = JSON.parse(localStorage.getItem("user"));
//   if (user) {
//     return user;
//   } else {
//     return { username: "Guest" };
//   }
// };

// const AuthService = {
//   register,
//   login,
//   logout,
//   getCurrentUser,
// }

// export default AuthService;
