import React, { Fragment }  from "react";

import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
export default function Appointment({id,time,interview}) {
  console.log("propsFromAppointment:",id,time,interview)
  return (
  <article className="appointment">
    <Header time={time}/>
    {interview ? <Show student={interview.student} interviewer={interview.interviewer.name}/> : <Empty/> }
  </article>

  );
}

{/* <article className="appointment">{props.time ? `Appointment at ${props.time}` : "No Appointments"}</article> */}