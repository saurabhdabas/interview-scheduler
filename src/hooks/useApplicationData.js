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
  

  function findSpotsRemaining(state, id, num) {
		const day = state.days.find((day) => day.appointments.includes(id));
		const newDay = { ...day, spots: day.spots + num };
		const newDaysArr = state.days.map((day) => {
			if (day.id === newDay.id) {
				return newDay;
			} else {
				return day;
			}
		});
		return newDaysArr;
	}
  //Add interviews from the database using axios.put and updates the number of available spots
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
    const days = findSpotsRemaining(state, id, state.appointments[id].interview ? 0 : -1);
    return axios.put(`/api/appointments/${id}`, appointment).then(() => {
      console.log("state:",state);
      
      setState({ ...state, appointments, days});
    })
  }

  //Deletes interviews from the database using axios.delete and updates the remaining spots

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const days = findSpotsRemaining(state, id, state.appointments[id].interview ? 1 : 0);
    return axios.delete(`/api/appointments/${id}`, appointment).then(() => {
      setState({ ...state, appointments, days });
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