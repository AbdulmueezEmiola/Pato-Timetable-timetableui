import { useState } from "react";
import Divider from "../Components/Divider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { Form, Button,Alert } from "react-bootstrap";
import "./Registration.css";
import { register } from "../Services/AuthenticationService";
import { useHistory } from "react-router";

export default function Registration() {
  const [teacher, setTeacher] = useState(false);
  const [department, setDepartment] = useState("");
  const [faculty, setFaculty] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [errors,setErrors] = useState([])

  const history = useHistory();

  return (
    <div className="vertical-centered">
      <div className="registration">
        <h2>Registration</h2>
        <Divider>
          <FontAwesomeIcon icon={faStar} spin />
        </Divider>
        <Form>
          <Form.Group controlId="formUserName" className="my-3">
            <Form.Control
              type="text"
              placeholder="Username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </Form.Group>

          <Form.Control
            as="select"
            size="lg"
            custom
            className="p-2 fullWidth"
            onChange={(e) => {
              setTeacher(e.target.value === "1");
            }}
          >
            <option value="">Please select the role</option>
            <option value="1">Teacher</option>
            <option value="2">None</option>
          </Form.Control>

          {teacher && (
            <div>
              <Form.Group controlId="Department" className="my-3">
                <Form.Control
                  type="text"
                  placeholder="Department"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="Faculty" className="my-3">
                <Form.Control
                  type="text"
                  placeholder="Faculty"
                  value={faculty}
                  onChange={(e) => setFaculty(e.target.value)}
                />
              </Form.Group>
            </div>
          )}

          <Form.Group controlId="formBasicPassword" className="my-3">
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

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
          <Button
            variant="success"
            type="button"
            className="mx-2"
            onClick={async () => {
                setErrors([])
              let role = teacher === true ? "teacher" : "";
              try {
                let value = await register(
                  userName,
                  password,
                  department,
                  faculty,
                  role
                );
                if (value === true) {
                  history.push("login");
                }
              } catch (err) {
                  switch(err.message){
                      case "Exists":
                          setErrors(["A user with the details already exists"])
                          break
                    case "Details":
                        setErrors(err.errors)
                        break
                    default:
                        setErrors("Error in registering user")                    
                  }
              }
            }}
          >
            Register
          </Button>
          <Button variant="success" type="button" href="/login">
            Login
          </Button>
        </Form>
      </div>
    </div>
  );
}
