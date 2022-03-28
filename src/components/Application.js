import React, {useState, useEffect} from "react";
import axios from 'axios';
import DayList from "components/DayList";
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay} from "../helpers/selectors";
import useApplicationData from "hooks/useApplicationData";
import "components/Application.scss"
export default function Application() {
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  } = useApplicationData();
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day);
  const appointmentList = dailyAppointments.map((appointment)=>{
    const interview = getInterview(state, appointment.interview);
    return (
      <Appointment
      key={appointment.id}
      id={appointment.id}
      time={appointment.time}
      interview={interview}
      interviewers={interviewers}
      bookInterview={bookInterview}
      cancelInterview={cancelInterview}
      />
    );
  });
  return (
    <main className="layout">
      <section className="sidebar">
        <img className="sidebar--centered" src="images/logo.png" alt="Interview Scheduler"/>
        <hr className="sidebar__separator sidebar--centered"/>
        <nav className="sidebar menu">
        <DayList 
          onClick={(event)=>{setDay(event.target.value)}}
          days={state.days}
          value={state.day}// day={day}
          onChange={setDay}// setDay={setDay}
        />
      </nav>
      </section>
      <section className="schedule">
        <ul>{appointmentList}</ul>
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
