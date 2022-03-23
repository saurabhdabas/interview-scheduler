import React from "react";
import InterviewerListItem from "components/InterviewerListItem";
import "components/InterviewList.scss";


export default function InterviewerList({interviewers,selectedInterviewer,setInterviewer}) {
  // We have destructured the prop directly here, to avoid using props in every single line.
  const interviewersList = interviewers.map((interviewer)=>{
    // console.log(interviewer);
    return (
    <InterviewerListItem
    key={interviewer.id} // Important to note: We need this to avoid a key prop error for child.
    name={interviewer.name} 
    avatar={interviewer.avatar} 
    selected={interviewer.id === selectedInterviewer}//selected={interviewer.id === interviewer}
    setInterviewer={()=> setInterviewer(interviewer.id)}
    />
    );
  });
  return (
    <section className="interviewers">
    <h4 className="interviewers__header text--light">Interviewer</h4>
    <ul className="interviewers__list">{interviewersList}</ul>
  </section>
  ); 
}