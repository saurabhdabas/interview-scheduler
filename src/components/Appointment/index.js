import React from "react";
import "components/Appointment/styles.scss"
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Status from "components/Appointment/Status"
import useVisualMode from "../../hooks/useVisualMode";
import Form from "components/Appointment/Form";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const DELETING = "DELETING";
const EDIT = "EDIT";
const ERROR_SAVE="ERROR_SAVE";
const ERROR_DELETE="ERROR_DELETE"
export default function Appointment(props) {
  
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(() => transition(ERROR_SAVE, true));
  }
  function deleteInterview() {
    transition(DELETING, true)
    props
      .cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(() => transition(ERROR_DELETE, true));
  }

  return (
  <article className="appointment">
    <Header time={props.time}/>
    {mode === EMPTY && <Empty onAdd={() => transition("CREATE")} />}
    {mode === SHOW && props.interview &&(
    <Show
      student={props.interview.student}
      interviewer={props.interview ?props.interview.interviewer.name:""}
      onEdit={() => transition("EDIT")}
      onDelete={() => transition("CONFIRM")}
    />)}
    {mode === CREATE && (
      <Form
        interviewers ={props.interviewers}
        onCancel={back}
        onSave={save}
      />
    )}
    {mode === SAVING && (
      <Status>Saving</Status>
    )}
    {mode === CONFIRM && (
        <Confirm
          message="Do you want to proceed?"
          onCancel={back}
          onConfirm={deleteInterview}
        />
    )}
    {mode === DELETING && (
      <Status>Deleting</Status>
    )}
    {mode === EDIT && (
      <Form
        name={props.interview.student}
        interviewers={props.interviewers}
        interviewer={props.interview.interviewer["id"]}
        onCancel={back}
        onSave={save}
      />
    )}
    {mode === ERROR_SAVE && (
      <Error message="Error occurred while saving" onClose={() => back()}/>
    )}
    {mode === ERROR_DELETE && (
      <Error message="Error occurred while deleting" onClose={() => back()}/>
    )}
  </article>

)}
