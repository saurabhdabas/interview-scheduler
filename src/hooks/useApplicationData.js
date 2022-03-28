import { useEffect, useState } from "react";
import axios from "axios";

export default function useApplicationData() {
  
  //Sets empty default state
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  const setDay = day => setState({ ...state, day });
  //Add interviews from the database using axios.put

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
    return axios.put(`/api/appointments/${id}`, appointment).then(() => {
      setState({ ...state, appointments});
    })
  }

  //Deletes interviews from the database using axios.delete

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.delete(`/api/appointments/${id}`, appointment).then(() => {
      setState({ ...state, appointments});
    });
  }
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
return { state, setDay, bookInterview, cancelInterview };
}