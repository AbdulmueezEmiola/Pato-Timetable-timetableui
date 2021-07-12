import { getBaseUrl } from "./BaseUrl";
import axios from "axios";
import { getAccessToken } from "./AuthenticationService";

export async function getBuildings() {
  const url = getBaseUrl() + "classrooms";
  let value = await axios.get(url);
  return value.data;
}

export async function getGroups() {
  const url = getBaseUrl() + "groups";
  let value = await axios.get(url);
  return value.data;
}

export async function getTeachers() {
  const url = getBaseUrl() + "teachers";
  let value = await axios.get(url);
  return value.data;
}

export function getStartTime() {
  return ["8:00", "9:45", "11:30", "13:25", "15:10", "16:55", "18:45", "20:10"];
}
export function getEndTime() {
  return [
    "9:35",
    "11:25",
    "13:05",
    "15:00",
    "16:45",
    "18:30",
    "20:00",
    "21:30",
  ];
}

export async function createLesson(data) {
  const url = getBaseUrl() + "Lessons";
  await axios
    .post(url, data, config)
    .then((value) => value)
    .catch((err) => {
      if (err.response.status === 401 || err.response.status === 403) {
        throw new Error("Unauthorized");
      } else if (err.response.status === 400) {
        const error = { message: "Details", errors: err.response.data };
        throw error;
      } else {
        throw new Error("Internal Error");
      }
    });
}

export async function getLessonsByGroup(id) {
  const url = getBaseUrl() + "Lessons/group/" + id;
  let value = await axios
    .get(url)
    .then((value) => value)
    .catch((err) => err);
  console.log(value);
  return value.data;
}

export async function getLessonsByClassroom(id) {
  const url = getBaseUrl() + "Lessons/classroom/" + id;
  let value = await axios
    .get(url)
    .then((value) => value)
    .catch((err) => err);
  console.log(value);
  return value.data;
}
export async function getLessonsByTeachers(id) {
  const url = getBaseUrl() + "Lessons/teacher/" + id;
  let value = await axios
    .get(url)
    .then((value) => value)
    .catch((err) => err);
  console.log(value);
  return value.data;
}

export async function deleteLesson(id) {
  const url = getBaseUrl() + "Lessons/" + id;
  let value = await axios
    .delete(url)
    .then((value) => value)
    .catch((err) => err);
  console.log(value);
  return value;
}

export function getPeriods(startTime, endTime) {
  let startTimes = getStartTime();
  let endTimes = getEndTime();
  let period =
    endTimes.findIndex((x) => x === endTime) -
    startTimes.findIndex((x) => x === startTime) +
    1;
  return period;
}
export async function getLesson(id) {
  const url = getBaseUrl() + "Lessons/" + id;
  let value = await axios
    .get(url)
    .then((value) => value)
    .catch((err) => err);
  console.log(value);
  return value.data;
}

export async function editLesson(id, data) {
  const url = getBaseUrl() + "Lessons/" + id;
  await axios
    .put(url, data, config)
    .then((value) => value)
    .catch((err) => {
      if (err.response.status === 401 || err.response.status === 403) {
        throw new Error("Unauthorized");
      } else if (err.response.status === 400) {
        const error = { message: "Details", errors: err.response.data };
        throw error;
      } else {
        throw new Error("Internal Error");
      }
    });  
}

export function getLessonType(value) {
  switch (value) {
    case 0:
      return "Laboratory";
    case 1:
      return "Lecture";
    case 2:
      return "Practical";
    default:
        return ""
  }
}
const config = {
  headers: { Authorization: `Bearer ${getAccessToken()}` },
};
