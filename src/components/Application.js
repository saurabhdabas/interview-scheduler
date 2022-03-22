import React, {useState} from "react";
import DayList from "components/DayList";
import "components/Application.scss";

const days = [
  {
    id: 1,
    name: "Monday",
    spots: 2,
  },
  {
    id: 2,
    name: "Tuesday",
    spots: 5,
  },
  {
    id: 3,
    name: "Wednesday",
    spots: 0,
  },
];

export default function Application(props) {
  const [day,setDay] = useState("Monday");
  return (
    <main className="layout">
      <section className="sidebar">
        {/* Replace this with the sidebar elements during the "Project Setup & Familiarity" activity. */}
        <nav>
        <DayList onClick={(event)=>{setDay(event.target.value)}}
              days={days}
              day={day}
              setDay={setDay}
            />
      </nav>
      </section>
      <section className="schedule">
        {/* Replace this with the schedule elements durint the "The Scheduler" activity. */}
      </section>
    </main>
  );
}
