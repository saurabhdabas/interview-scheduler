import React from "react";
import "components/DayListItem.scss";
import DayListItem from "components/DayListItem";

// export default function DayList(props){

//   return(
//     <ul>
//       <DayListItem 
//         key={props.days[0].id}
//         name={props.days[0].name} 
//         spots={props.days[0].spots} 
//         selected={props.days[0].name === props.day}
//         setDay={props.setDay}  
//       />
//       <DayListItem
//         key={props.days[1].id} 
//         name={props.days[1].name} 
//         spots={props.days[1].spots} 
//         selected={props.days[1].name === props.day}
//         setDay={props.setDay}  
//       />
//       <DayListItem 
//         key={props.days[2].id}
//         name={props.days[2].name}
//         spots={props.days[2].spots} 
//         selected={props.days[2].name === props.day}
//         setDay={props.setDay}  
//       />      
//     </ul>
//   )
// }
export default function DayList(props){
  console.log("dayListProps:",props);
  const DayListItems = props.days.map((day)=>{
    console.log("DayFromDayListItem:",day)
    return (
      <DayListItem 
        key={day.id}
        name={day.name} 
        spots={day.spots} 
        selected={day.name === props.value} //selected={day.name === props.day}
        setDay={() => props.onChange(day.name)} //setDay={() => props.setDay(day.name)} 
      />
    );
  })
  return(
    <ul>{DayListItems}</ul>
  )

}