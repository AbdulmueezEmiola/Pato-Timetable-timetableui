import Divider from "../Components/Divider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import "./Create.css";
import {
  getBuildings,
  getGroups,
  getStartTime,
  getEndTime,
  createLesson,
} from "../Services/LessonService";
import { getTeacherId } from "../Services/AuthenticationService";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getLesson, editLesson} from "../Services/LessonService";

export default function Create() {
  const { id } = useParams();
  const [buildings, setBuildings] = useState([]);
  const [selectedBuilding, setSelectedBuilding] = useState("");
  const [selectedFaculty, setSelectedFaculty] = useState("");
  const [selectedYear, setSelectedYear] = useState();
  const [groups, setGroups] = useState([]);
  const [startTimes, setStartTimes] = useState([]);
  const [endTimes, setEndTimes] = useState([]);

  const [courseName, setCourseName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [lessonType, setLessonType] = useState("");
  const [day, setDay] = useState("");
  const [classroomId, setClassroomId] = useState("");
  const [groupId, setGroupId] = useState("");
  const [week, setWeek] = useState("");

  useEffect(() => {
    if (!!id) {
      getLesson(id).then((value) => {
        setCourseName(value.courseName);
        setStartTime(value.startTime);
        setEndTime(value.endTime);
        setLessonType(value.lessonType);
        setDay(value.day);
        setClassroomId(value.classroomId);
        setGroupId(value.groupId);
        setWeek(value.week);
      });
    }
    getBuildings().then((x) => setBuildings(x));
    getGroups().then((x) => setGroups(x));
    setStartTimes(getStartTime());
    setEndTimes(getEndTime());
  }, []);

  return (
    <div className="create">
      <div className="vertical-centered">
        <div className="registration">
          <h2>Create a new lesson</h2>
          <Divider>
            <FontAwesomeIcon icon={faStar} spin />
          </Divider>
          <Form
            onSubmit={(values, data) => {
              console.log(values, data);
            }}
          >
            <Form.Group controlId="subjectName" className="my-3">
              <Form.Control
                type="text"
                placeholder="Subject Name"
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Container fluid>
                <Row>
                  <Col xs="12" lg="6" className="py-2 px-1">
                    <Form.Control
                      as="select"
                      size="lg"
                      custom
                      className="p-2 fullWidth"
                      value={week}
                      onChange={(e) => setWeek(e.target.value)}
                    >
                      <option value="">Please select the week type</option>
                      <option value="1">Odd</option>
                      <option value="2">Even</option>
                    </Form.Control>
                  </Col>
                  <Col sm="12" lg="6" className="py-2 px-1">
                    <Form.Control
                      as="select"
                      size="lg"
                      custom
                      className="p-2 fullWidth"
                      value={day}
                      onChange={(e) => setDay(e.target.value)}
                    >
                      <option value="">Please select the Day Of Week</option>
                      <option value="0">Monday</option>
                      <option value="1">Tuesday</option>
                      <option value="2">Wednesday</option>
                      <option value="3">Thursday</option>
                      <option value="4">Friday</option>
                      <option value="5">Saturday</option>
                    </Form.Control>
                  </Col>
                </Row>
              </Container>
            </Form.Group>

            <Form.Control
              as="select"
              size="lg"
              custom
              className="p-2 my-3 fullWidth"
              value={lessonType}
              onChange={(e) => setLessonType(e.target.value)}
            >
              <option value="">Please select the Lecture type</option>
              <option value="0">Laboratory</option>
              <option value="1">Lecture</option>
              <option value="2">Practical</option>
            </Form.Control>

            <Form.Group>
              <Container fluid>
                <Row>
                  <Col xs="12" lg="6" className="py-2 px-1">
                    <Form.Control
                      as="select"
                      size="lg"
                      custom
                      className="p-2 fullWidth"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                    >
                      <option value="">Please select the start time</option>
                      {startTimes.map((y) => (
                        <option value={y}>{y}</option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col sm="12" lg="6" className="py-2 px-1">
                    <Form.Control
                      as="select"
                      size="lg"
                      custom
                      className="p-2 fullWidth"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                    >
                      <option value="">Please select the end time</option>
                      {endTimes.map((y) => (
                        <option value={y}>{y}</option>
                      ))}
                    </Form.Control>
                  </Col>
                </Row>
              </Container>
            </Form.Group>
            <Divider>
              <FontAwesomeIcon icon={faStar} spin />
            </Divider>
            <Form.Group>
              <Container fluid>
                <Row>
                  <Col xs="12" lg="6" className="py-2 px-1">
                    <Form.Control
                      as="select"
                      size="lg"
                      custom
                      className="p-2 fullWidth"                      
                      onChange={(e) => {
                        setSelectedBuilding(e.target.value);
                      }}
                    >
                      <option value="">Please select the building</option>
                      {buildings.map((x) => (
                        <option value={x.buildingNumber}>
                          {x.buildingNumber}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col xs="12" lg="6" className="py-2 px-1">
                    <Form.Control
                      as="select"
                      size="lg"
                      custom
                      className="p-2 fullWidth"
                      value={classroomId}
                      onChange={(e) => setClassroomId(e.target.value)}
                    >
                      <option value="">Please select the classroom</option>
                      {buildings
                        .filter((x) => x.buildingNumber === selectedBuilding)
                        .map((y) => (
                          <option value={y.id}>{y.roomNumber}</option>
                        ))}
                    </Form.Control>
                  </Col>
                </Row>
              </Container>
            </Form.Group>
            <Divider>
              <FontAwesomeIcon icon={faStar} spin />
            </Divider>
            <Form.Group>
              <Container fluid>
                <Row>
                  <Col xs="12" lg="6" className="py-2 px-1">
                    <Form.Control
                      as="select"
                      size="lg"
                      custom
                      className="p-2 fullWidth"
                      onChange={(e) => {
                        setSelectedFaculty(e.target.value);
                      }}
                    >
                      <option value="">Please select the Faculty</option>
                      {groups.map((x) => (
                        <option value={x.faculty}>{x.faculty}</option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col xs="12" lg="6" className="py-2 px-1">
                    <Form.Control
                      as="select"
                      size="lg"
                      custom
                      className="p-2 fullWidth"
                      onChange={(e) => {
                        setSelectedYear(e.target.value);
                      }}
                    >
                      <option value="">Please select the year</option>
                      {groups
                        .filter((x) => x.faculty === selectedFaculty)
                        .map((y) => (
                          <option value={y.year}>{y.year}</option>
                        ))}
                    </Form.Control>
                  </Col>

                  <Col xs="12" lg="6" className="py-2 px-1">
                    <Form.Control
                      as="select"
                      size="lg"
                      custom
                      className="p-2 fullWidth"
                      value={groupId}
                      onChange={(e) => setGroupId(e.target.value)}
                    >
                      <option value="">Please select the group</option>
                      {groups
                        .filter((x) => x.faculty === selectedFaculty)
                        .filter((z) => z.year.toString() === selectedYear)
                        .map((y) => (
                          <option value={y.id}>{y.groupNumber}</option>
                        ))}
                    </Form.Control>
                  </Col>
                </Row>
              </Container>
            </Form.Group>
            {
                !!id?<Button
                variant="success"
                type="button"
                className="mx-2 my-4"
                onClick={async () => {
                  let data = {
                    courseName: courseName,
                    startTime: startTime,
                    endTime: endTime,
                    week: parseInt(week),
                    lessonType: parseInt(lessonType),
                    day: parseInt(day),
                    classroomId: classroomId,
                    groupId: groupId,
                    teacherId: getTeacherId(),
                    id:id
                  };
                  await editLesson(id,data);
                }}
              >
                Edit
              </Button>:
              <Button
              variant="success"
              type="button"
              className="mx-2 my-4"
              onClick={async () => {
                let data = {
                  courseName: courseName,
                  startTime: startTime,
                  endTime: endTime,
                  week: parseInt(week),
                  lessonType: parseInt(lessonType),
                  day: parseInt(day),
                  classroomId: classroomId,
                  groupId: groupId,
                  teacherId: getTeacherId(),                  
                };
                await createLesson(data);
              }}
            >
              Create
            </Button>

            }
            
          </Form>
        </div>
      </div>
    </div>
  );
}
