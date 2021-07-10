import axios from "axios";
import { getBaseUrl } from "./BaseUrl";
export async function login(username, password) {
  const url = getBaseUrl() + "user/login";
  let value = await axios
    .post(url, { username: username, password: password })
    .then((response) => {
      if (response.data.isAuthenticated) {
        let roles = response.data.roles.join(" ");
        localStorage.setItem("x-access-token", response.data.token);
        localStorage.setItem(
          "x-access-token-expiration",
          Date.now() + 2 * 60 * 60 * 1000
        );
        localStorage.setItem("teacherId",response.data.teacherId)
        localStorage.setItem("username", response.data.userName);
        localStorage.setItem("roles", roles);
        return true;
      } else {
        throw Error(response.message);
      }
    })
    .catch((error) => {
      return false;
    });
  return value;
}

export async function register(username, password, department, faculty, role) {
  const url = getBaseUrl() + "user/register";

  let value = await axios
    .post(url, {
      username: username,
      password: password,
      department: department,
      faculty: faculty,
      role: role,
    })
    .then((response) => {
      if (response.data.statusCode === 200) {
        return true;
      } else {
        throw Error(response.data.value);
      }
    })
    .catch((err) => {
      return false;
    });
  return value;
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

export function getTeacherId(){
    return parseInt(localStorage.getItem("teacherId"));
}