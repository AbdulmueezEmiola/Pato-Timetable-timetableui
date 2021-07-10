import { Button, Form, Row, Col } from "react-bootstrap";
import ScheduleTable from "./Table";
import { useEffect, useState } from "react";
import { getBuildings } from "../Services/LessonService";
import { getLessonsByClassroom } from "../Services/LessonService";
import { getTeacherId } from "../Services/AuthenticationService";

export default function ScheduleByClassroom() {
  const [classrooms, setClassrooms] = useState([]);
  const [selectedBuilding, setSelectedBuilding] = useState("");
  const [selectedClassroom, setSelectedClassroom] = useState("");
  const [items, setItems] = useState([]);

  const teacherId = getTeacherId();
  useEffect(() => {
    getBuildings().then((x) => {
      setClassrooms(x);
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
              setSelectedBuilding(e.target.value);
            }}
          >
            <option value="">Select the building</option>
            {classrooms
              .map((x) => x.buildingNumber.toLowerCase())
              .filter((v, i, a) => a.indexOf(v) === i)
              .map((x) => (
                <option value={x}>{x}</option>
              ))
            }
          </Form.Control>
        </Col>
        <Col>
          <Form.Control
            as="select"
            size="lg"
            custom
            className="p-2 my-2 fullWidth"
            onChange={(e) => setSelectedClassroom(e.target.value)}
          >
            <option value="">Please select the classroom</option>
            {classrooms
              .filter((x) => x.buildingNumber.toLowerCase() === selectedBuilding)
              .map((x) => {return{id:x.id,roomNumber:x.roomNumber}})
              .filter((v, i, a) => a.indexOf(v) === i)
              .map((y) => (
                <option value={y.id}>{y.roomNumber}</option>
              ))
            }
          </Form.Control>
        </Col>
        <Col>
          <Button
            variant="success"
            type="submit"
            className="mx-2 my-2 blockButton"
            onClick={async () => {
              let items = await getLessonsByClassroom(selectedClassroom);
              let values = items.map((x) => {
                return {
                  id: x.id,
                  name: x.courseName,
                  type: x.lessonType,
                  teacher: x.teacher.department,
                  classNumber: x.classroom.roomNumber,
                  group: x.group.groupNumber,
                  day: x.day,
                  week: x.week,
                  start: x.startTime,
                  end: x.endTime,
                  canEdit: teacherId !== null && teacherId === x.teacher.id                  
                }
              })
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
