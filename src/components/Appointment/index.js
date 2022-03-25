import React, { Fragment }  from "react";

import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Form from "components/Appointment/Form"
import useVisualMode from "../../hooks/useVisualMode";
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
export default function Appointment(props) {
  console.log("propsFromAppointment:",props)
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  return (
  <article className="appointment">
    <Header time={props.time? props.time : "No Appointments"}/>
    {mode === EMPTY && <Empty onAdd={() => transition("CREATE")} />}
    {mode === SHOW && (
    <Show
      student={props.interview.student}
      interviewer={props.interview.interviewer.name}
    />)}
    {mode === CREATE && (
      <Form
        name={props.student}
        interviewers={props.interviewers}
        interviewer={props.interviewer}
        onCancel={back}
      />
    )}
    {/* {props.interview ? <Show student={props.interview.student} interviewer={props.interview.interviewer.name}/> : <Empty/> } */}

  </article>
)}
  
{/* <article className="appointment">{props.time ? `Appointment at ${props.time}` : "No Appointments"}</article> */}