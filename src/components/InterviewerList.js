import React from "react";
import InterviewerListItem from "components/InterviewerListItem";
import "components/InterviewList.scss";


export default function InterviewerList(props) {
  console.log("propsInterviewerList:",props);
  const interviewers = props.interviewers.map((interviewer)=>{
    // console.log(interviewer);
    return (
    <InterviewerListItem
    key={interviewer.id} // Important to note :This prop can be named only key, i had it as id, there was err.
    name={interviewer.name} 
    avatar={interviewer.avatar} 
    selected={interviewer.id === props.interviewer}
    setInterviewer={props.setInterviewer}  
    />
    );
  });
  return (
    <section className="interviewers">
    <h4 className="interviewers__header text--light">Interviewer</h4>
    <ul className="interviewers__list">{interviewers}</ul>
  </section>
  ); 
}