import React, {useState, useEffect} from "react";
import axios from 'axios';
import DayList from "components/DayList";
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay} from "../helpers/selectors";
import "components/Application.scss"
export default function Application(){
  const setDay = day => setState({ ...state, day });
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  function bookInterview(id, interview) {
    console.log("interview:",interview)
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    axios.put(`/api/appointments/${id}`,{interview})
        .then((res)=>{
          console.log("response:",res);
          
        })
        setState({
          ...state,
          appointments
        });
  }

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day)

  useEffect(()=>{
    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers')
    ]).then((all) => {
      // set your states here with the correct values...

      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
  
    })
  },[])

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
