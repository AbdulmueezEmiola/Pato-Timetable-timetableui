import Divider from "../Components/Divider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import "./Create.css";
import {
  getBuildings,
  getGroups,
  getStartTime,
  getEndTime,
  createLesson,
} from "../Services/LessonService";
import { getTeacherId, logout } from "../Services/AuthenticationService";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getLesson, editLesson } from "../Services/LessonService";
import { useHistory } from "react-router";

export default function Create() {
  const { id } = useParams();
  const history = useHistory();

  const [buildings, setBuildings] = useState([]);
  const [selectedBuilding, setSelectedBuilding] = useState("");
  const [selectedFaculty, setSelectedFaculty] = useState("");

  const [selectedYear, setSelectedYear] = useState();
  const [groups, setGroups] = useState([]);
  const [startTimes, setStartTimes] = useState([]);
  const [endTimes, setEndTimes] = useState([]);

  const [formBody, setFormBody] = useState({});
  const [showButton, setShowButton] = useState(false);
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState(false);
  const validateFormBody = () => {
    if (!formBody.courseName) {
      return false;
    }
    if (!formBody.startTime) {
      return false;
    }
    if (!formBody.endTime) {
      return false;
    }
    if (isNaN(formBody.week)) {
      return false;
    }
    if (isNaN(formBody.lessonType)) {
      return false;
    }
    if (isNaN(formBody.day)) {
      return false;
    }
    if (!formBody.classroomId) {
      return false;
    }
    if (!formBody.groupId) {
      return false;
    }
    return true;
  };

  useEffect(() => {
    if (!!id) {
      getLesson(id).then((value) => {
        setFormBody({
          courseName: value.courseName,
          startTime: value.startTime,
          endTime: value.endTime,
          week: parseInt(value.week),
          lessonType: parseInt(value.lessonType),
          day: parseInt(value.day),
          id: id,
        });
      });
    }
    getBuildings().then((x) => setBuildings(x));
    getGroups().then((x) => setGroups(x));
    setStartTimes(getStartTime());
    setEndTimes(getEndTime());
  }, [id]);

  useEffect(() => {
    setShowButton(validateFormBody());
  }, [formBody]);

  return (
    <div className="vertical-centered">
      <div className="create">
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
              value={formBody.courseName}
              onChange={(e) =>
                setFormBody({ ...formBody, courseName: e.target.value })
              }
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
                    value={formBody.week}
                    onChange={(e) =>
                      setFormBody({
                        ...formBody,
                        week: parseInt(e.target.value),
                      })
                    }
                  >
                    <option value="">Please select the week type</option>
                    <option value="1">Odd</option>
                    <option value="2">Even</option>                    
                    {!id && <option value="3">Both</option>}
                  </Form.Control>
                </Col>
                <Col sm="12" lg="6" className="py-2 px-1">
                  <Form.Control
                    as="select"
                    size="lg"
                    custom
                    className="p-2 fullWidth"
                    value={formBody.day}
                    onChange={(e) =>
                      setFormBody({
                        ...formBody,
                        day: parseInt(e.target.value),
                      })
                    }
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
            value={formBody.lessonType}
            onChange={(e) =>
              setFormBody({
                ...formBody,
                lessonType: parseInt(e.target.value),
              })
            }
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
                    value={formBody.startTime}
                    onChange={(e) =>
                      setFormBody({ ...formBody, startTime: e.target.value })
                    }
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
                    value={formBody.endTime}
                    onChange={(e) =>
                      setFormBody({ ...formBody, endTime: e.target.value })
                    }
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
                      setFormBody({ ...formBody, classroomId: "" });
                    }}
                  >
                    <option value="">Please select the building</option>
                    {buildings
                      .map((x) => x.buildingNumber.toLowerCase())
                      .filter((v, i, a) => a.indexOf(v) === i)
                      .map((x) => (
                        <option value={x}>{x}</option>
                      ))}
                  </Form.Control>
                </Col>
                <Col xs="12" lg="6" className="py-2 px-1">
                  <Form.Control
                    as="select"
                    size="lg"
                    custom
                    className="p-2 fullWidth"
                    value={formBody.classroomId}
                    onChange={(e) =>
                      setFormBody({
                        ...formBody,
                        classroomId: e.target.value,
                      })
                    }
                  >
                    <option value="">Please select the classroom</option>
                    {buildings
                      .filter(
                        (x) =>
                          x.buildingNumber.toLowerCase() === selectedBuilding
                      )
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
                      setSelectedYear("");
                      setSelectedFaculty(e.target.value);
                      setFormBody({ ...formBody, groupId: "" });
                    }}
                  >
                    <option value="">Please select the Faculty</option>
                    {groups
                      .map((x) => x.faculty.toLowerCase())
                      .filter((v, i, a) => a.indexOf(v) === i)
                      .map((x) => (
                        <option value={x}>{x}</option>
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
                      setFormBody({ ...formBody, groupId: "" });
                    }}
                  >
                    <option value="">Please select the year</option>
                    {groups
                      .filter(
                        (x) => x.faculty.toLowerCase() === selectedFaculty
                      )
                      .map((x) => x.year)
                      .filter((v, i, a) => a.indexOf(v) === i)
                      .map((y) => (
                        <option value={y}>{y}</option>
                      ))}
                  </Form.Control>
                </Col>

                <Col xs="12" lg="6" className="py-2 px-1">
                  <Form.Control
                    as="select"
                    size="lg"
                    custom
                    className="p-2 fullWidth"
                    value={formBody.groupId}
                    onChange={(e) =>
                      setFormBody({ ...formBody, groupId: e.target.value })
                    }
                  >
                    <option value="">Please select the group</option>
                    {groups
                      .filter(
                        (x) => x.faculty.toLowerCase() === selectedFaculty
                      )
                      .filter((z) => z.year.toString() === selectedYear)
                      .map((x) => {
                        return { id: x.id, groupNumber: x.groupNumber };
                      })
                      .filter((v, i, a) => a.indexOf(v) === i)
                      .map((y) => (
                        <option value={y.id}>{y.groupNumber}</option>
                      ))}
                  </Form.Control>
                </Col>
              </Row>
            </Container>
          </Form.Group>

          {success && (
            <Alert variant="success">
              The lesson has been successfully registered
            </Alert>
          )}

          {errors.length > 0 && (
            <Alert variant="danger">
              <ul>
                {errors.map((error, idx) => (
                  <li key={idx} className="list">
                    {error}
                  </li>
                ))}
              </ul>
            </Alert>
          )}

          {id ? (
            <Button
              variant="success"
              type="button"
              className="mx-2 my-4"
              onClick={async () => {
                setSuccess(false);
                setErrors([]);
                try {
                  await editLesson(id, {
                    ...formBody,
                    teacherId: getTeacherId(),
                  });
                  setSuccess(true);
                } catch (err) {
                  if (err.message === "Unauthorized") {
                    logout();
                    history.push("/login");
                  } else if (err.message === "Details") {
                    setErrors(err.errors);
                  } else {
                    setErrors([
                      "An error occurred, the lesson couldn't be created",
                    ]);
                  }
                }
              }}
              disabled={!showButton}
            >
              Edit
            </Button>
          ) : (
            <Button
              variant="success"
              type="button"
              className="mx-2 my-4"
              onClick={async () => {
                setSuccess(false);
                setErrors([]);
                try {
                  await createLesson({
                    ...formBody,
                    teacherId: getTeacherId(),
                  });
                  setSuccess(true);
                } catch (err) {
                  if (err.message === "Unauthorized") {
                    logout();
                    history.push("/login");
                  } else if (err.message === "Details") {
                    setErrors(err.errors);
                  } else {
                    setErrors([
                      "An error occurred, the lesson couldn't be created",
                    ]);
                  }
                }
              }}
              disabled={!showButton}
            >
              Create
            </Button>
          )}
        </Form>
      </div>
    </div>
  );
}
