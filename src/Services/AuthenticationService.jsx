import axios from "axios";
import { getBaseUrl } from "./BaseUrl";

export async function login(username, password) {
  const url = getBaseUrl() + "user/login";
  let value = await axios
    .post(url, { username: username, password: password })
    .then((response) => {
      let roles = response.data.roles.join(" ");
      localStorage.setItem("x-access-token", response.data.token);
      localStorage.setItem(
        "x-access-token-expiration",
        Date.now() + 2 * 60 * 60 * 1000
      );
      localStorage.setItem("teacherId", response.data.teacherId);
      localStorage.setItem("username", response.data.userName);
      localStorage.setItem("roles", roles);
      return true;
    })
    .catch((error) => {
      if (error.response.status === 404) {
        throw new Error(error.response.data);
      } else {
        throw new Error("An error has occurred, please try again");
      }
    });
  return value;
}

export async function register(username, password, department, faculty, role) {
  const url = getBaseUrl() + "user/register";
  await axios
    .post(url, {
      username: username,
      password: password,
      department: department,
      faculty: faculty,
      role: role,
    })
    .catch((err) => {
      if (err.response.status === 303) {
        throw Error("Exists");
      } else if (err.response.status === 400) {
        const error = { message: "Details", errors: err.response.data.map(x=>x.description) };
        throw error;
      } else {
        throw Error("Internal Error");
      }
    });
}

export function getUserName() {
  return localStorage.getItem("username");
}

export function isAuthenticated() {
  return (
    localStorage.getItem("x-access-token") &&
    localStorage.getItem("x-access-token-expiration") > Date.now()
  );
}
export function getRole() {
  let roles = localStorage.getItem("roles");
  return roles.split(" ");
}
export function isTeacher() {
  let roles = getRole();
  if (roles.includes("Teacher")) {
    return true;
  }
  return false;
}
export function logout() {
  localStorage.removeItem("x-access-token");
}

export function getTeacherId() {
  return parseInt(localStorage.getItem("teacherId"));
}

export function getAccessToken() {
  return localStorage.getItem("x-access-token");
}
