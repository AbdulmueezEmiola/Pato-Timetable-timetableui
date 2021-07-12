import "./Table.css";
import TableCell from "./TableCelll";
import { Table } from "react-bootstrap";
import {
  getEndTime,
  getStartTime,
  getPeriods,
} from "../Services/LessonService";

export default function ScheduleTable({ items }) {
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const startHours = getStartTime();
  const endHours = getEndTime();

  const checkFree = (day, week, hourStart) => {
    let itemsFiltered = items.filter(
      (x) => days[x.day] === day && x.week === week
    );
    let startHourIndex = startHours.findIndex((hour) => hour === hourStart);
    let item = itemsFiltered.find(
      (item) =>
        startHours.findIndex((hour) => hour === item.start) <= startHourIndex &&
        endHours.findIndex((hour) => hour === item.end) >= startHourIndex
    );
    return item === undefined
  };

  const getLesson = (day, week, hour) => {
    let item = items.find(
      (x) => days[x.day] === day && x.week === week && x.start === hour
    );

    if (item !== undefined) {
      return (
        <td
          rowSpan={getPeriods(item.start, item.end)}
          style={{
            verticalAlign: "middle",
          }}
        >
          <TableCell

            name={item.name}
            type={item.type}
            teacher={item.teacher}
            classroom={item.classNumber}
            group={item.group}
            start={item.start}
            end={item.end}
            canEdit={item.canEdit}
            id={item.id}
          />
        </td>
      );
    } else {
      if(checkFree(day,week,hour)){
        return <td></td>;
      }else{
        return ""
      }
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
                [1, 2].map((week) => getLesson(day, week, hour))
              )}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
