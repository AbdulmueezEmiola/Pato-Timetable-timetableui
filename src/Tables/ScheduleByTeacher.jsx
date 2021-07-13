import {  Button, Form, Row, Col } from "react-bootstrap";
import ScheduleTable from "./Table";
import { useState, useEffect } from "react";
import { getLessonsByTeachers, getTeachers } from "../Services/LessonService";
import { getTeacherId } from "../Services/AuthenticationService";

export default function ScheduleByTeacher() {
  const [items, setItems] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [selectedFaculty, setSelectedFaculty] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState("");

  const teacherId = getTeacherId();
  useEffect(() => {
    getTeachers().then((value) => {
      setTeachers(value);
    });
  }, []);

  return (
    <div>
      <Row>
        <Col>
          <Form.Control
            as="select"
            size="lg"
            custom
            className="p-2 my-2 fullWidth"            
            onChange={(e) => {
              setSelectedFaculty(e.target.value);
              setSelectedDepartment("");
              setSelectedTeacher("")
            }}
          >
            <option value="">Select Faculty</option>
            {teachers
              .map((x) => x.faculty.toLowerCase())
              .filter((v, i, a) => a.indexOf(v) === i)
              .map((x) => (
                <option value={x}>{x}</option>
              ))}
          </Form.Control>
        </Col>
        <Col>
          <Form.Control
            as="select"
            size="lg"
            custom
            className="p-2 my-2 fullWidth"
            value={selectedDepartment}
            onChange={(e) => {
              setSelectedDepartment(e.target.value);
              setSelectedTeacher("")
            }}
          >
            <option value="">Select Department</option>
            {teachers
              .filter((x) => x.faculty.toLowerCase() === selectedFaculty)
              .map((x) => x.department.toLowerCase())
              .filter((v, i, a) => a.indexOf(v) === i)              
              .map((y) => (
                <option value={y}>{y}</option>
              ))}
          </Form.Control>
        </Col>
        <Col>
          <Form.Control
            as="select"
            size="lg"
            custom
            className="p-2 my-2 fullWidth"
            onChange={(e) => {
              setSelectedTeacher(e.target.value);
            }}
          >
            <option value="">Select Teacher</option>
            {teachers
              .filter((x) => x.faculty.toLowerCase() === selectedFaculty)
              .filter((z) => z.department.toLowerCase() === selectedDepartment)
              .map((x) => {return {id:x.id,userName:x.userName}})    
              .filter((v, i, a) => a.indexOf(v) === i)                            
              .map((y) => (
                <option value={y.id}>{y.userName}</option>
              ))}
          </Form.Control>
        </Col>
        <Col>
          <Button
            variant="success"
            disabled={!selectedTeacher}
            type="submit"
            className="mx-2 my-2 blockButton"
            onClick={async () => {
              let items = await getLessonsByTeachers(selectedTeacher);
              let values = items.map((x) => {
                return {
                  id: x.id,
                  name: x.courseName,
                  type: x.lessonType,
                  teacher: x.teacher.userName,
                  classNumber: x.classroom.roomNumber,
                  group: x.group.groupNumber,
                  day: x.day,
                  week: x.week,
                  start: x.startTime,
                  end: x.endTime,
                  canEdit: teacherId !== null && teacherId === x.teacher.id,
                };
              });
              setItems(values);
            }}
          >
            Search
          </Button>
        </Col>
      </Row>
      <ScheduleTable items={items} onDelete={async () => {
              let items = await getLessonsByTeachers(selectedTeacher);
              let values = items.map((x) => {
                return {
                  id: x.id,
                  name: x.courseName,
                  type: x.lessonType,
                  teacher: x.teacher.userName,
                  classNumber: x.classroom.roomNumber,
                  group: x.group.groupNumber,
                  day: x.day,
                  week: x.week,
                  start: x.startTime,
                  end: x.endTime,
                  canEdit: teacherId !== null && teacherId === x.teacher.id,
                };
              });
              setItems(values);
            }}/>
    </div>
  );
}
