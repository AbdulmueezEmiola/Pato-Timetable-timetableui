import "./Table.css";
import TableCell from "./TableCelll";
import { Table } from "react-bootstrap";
import { getEndTime, getStartTime,getPeriods } from "../Services/LessonService";

const schedules = [
  {
    id: 1,
    name: "Maths",
    type: "lab",
    teacher: "Emiola Abdulmueez",
    classNumber: 8,
    group: 12,
    day: "Tuesday",
    week: 1,
    start: "10:00",
    periods: 1,
    canEdit:true
  },
  {
    id: 2,
    name: "Maths",
    type: "practical",
    teacher: "Emiola Abdulmueez",
    classNumber: 8,
    group: 12,
    day: "Monday",
    week: 2,
    start: "12:00",
    periods: 4,
    canEdit:false
  },
  {
    id: 3,
    name: "Maths",
    type: "lecture",
    teacher: "Emiola Abdulmueez",
    classNumber: 8,
    group: 12,
    day: "Friday",
    week: 1,
    start: "12:00",
    periods: 4,
    canEdit:false
  },
  {
    id: 2,
    name: "Maths",
    type: "lab",
    teacher: "Emiola Abdulmueez",
    classNumber: 8,
    group: 12,
    day: "Friday",
    week: 1,
    start: "13:00",
    periods: 1,
    canEdit:true
  },
];
export default function ScheduleTable({items}) {
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const startHours = getStartTime()
  
  const getLesson = (day, week, hour) => {
    let item = items.find(
      (x) => days[x.day] === day && x.week === week && x.start === hour
    );

    if(item !== undefined){
        return <td rowSpan={getPeriods(item.start,item.end)} style={{
            verticalAlign:"middle"
        }}>
                    <TableCell name={item.name} type={item.type} teacher={item.teacher} 
                        classroom={item.classNumber} group={item.group} start={item.start}
                        end={item.end} canEdit={item.canEdit} id={item.id}/>
                </td>
    }else{
        return <td></td>
    }
  };

  return (
    <div className="table">
      <Table bordered>
        <thead>
          <tr>
            <th rowSpan="2"></th>
            {days.map((x) => (
              <th colSpan="2" key={x}>
                {x}
              </th>
            ))}
          </tr>
          <tr>
            {days.map((x) => [1, 2].map((y) => <th key={x + y}>{y}</th>))}
          </tr>
        </thead>
        <tbody>
          {startHours.map((hour) => (
            <tr key={hour}> 
              <th>{hour}</th>
              {days.map((day) =>
                [1, 2].map((week) =>getLesson(day,week,hour))
              )}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
