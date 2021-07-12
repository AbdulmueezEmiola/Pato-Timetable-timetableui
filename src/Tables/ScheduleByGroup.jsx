import { Button, Form, Row, Col } from "react-bootstrap";
import ScheduleTable from "./Table";
import { useState, useEffect } from "react";
import {
  getGroups,
  getLessonsByGroup
} from "../Services/LessonService";
import { getTeacherId } from "../Services/AuthenticationService";

export default function ScheduleByGroup() {
  const [items, setItems] = useState([]);
  const [groups, setGroups] = useState([]);
  const [selectedFaculty, setSelectedFaculty] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("");
  const teacherId = getTeacherId();
  useEffect(() => {
    getGroups().then((x) => {
      setGroups(x);
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
              setSelectedYear("")
              setSelectedGroup("")
            }}
          >
            <option value="">Select Faculty</option>
            {groups
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
            onChange={(e) => {
              setSelectedYear(e.target.value);
              setSelectedGroup("")
            }}
          >
            <option value="">Select Courses</option>
            {groups
              .filter((x) => x.faculty.toLowerCase() === selectedFaculty)
              .map((x) => x.year)
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
            onChange={(e) => setSelectedGroup(e.target.value)}
          >
            <option value="">Please select the group</option>
            {groups
              .filter((x) => x.faculty.toLowerCase() === selectedFaculty)
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
        <Col>
          <Button
            variant="success"
            type="button"
            className="mx-2 my-2 blockButton"
            disabled={!selectedGroup}
            onClick={async () => {
              let items = await getLessonsByGroup(selectedGroup);
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
      <ScheduleTable items={items} />
    </div>
  );
}
