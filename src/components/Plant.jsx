import React from "react";
import EditIcon from '@material-ui/icons/Edit';

const Plant = (props) => {

  const msPerDay = 1000*60*60*24;
  const msPerMin = 1000*60; // Test out at 5pm 

  const lastWatered = new Date(props.lastWatered);
  const lastFertilized = new Date(props.lastFertilized);
  const frequencyMs = props.frequency*msPerDay;

  const nextDate = new Date(lastWatered.getTime() + frequencyMs);

  let todaysDate = new Date();
  const offset = todaysDate.getTimezoneOffset()*msPerMin;
  todaysDate = new Date(todaysDate.getTime()-offset);

  const daysList = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthList = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  let shouldWater = todaysDate > nextDate;

  return (
    <div className={shouldWater ? "action plant" : "plant"}>
      <h1>{props.name}</h1>

      <img 
        src={props.imgUrl}
        className="plant-img"
        alt="houseplant"
      />  

      <div className="container plant-info">
        <div className="row">
          <div className="col-sm plant-info-label">Water again on:</div>
          <div className="col-sm">{daysList[nextDate.getUTCDay()]+", "+(monthList[nextDate.getUTCMonth()])+" "+(nextDate.getUTCDate())}</div>
        </div>

        <div className="row">
          <div className="col-sm plant-info-label">Last watered on:</div>
          <div className="col-sm">{daysList[lastWatered.getUTCDay()]+", "+(monthList[lastWatered.getUTCMonth()])+" "+(lastWatered.getUTCDate())}</div>
        </div>
        
        <div className="row">
          <div className="col-sm plant-info-label">Last fertilized on:</div>
          <div className="col-sm">{daysList[lastFertilized.getUTCDay()]+", "+(monthList[lastFertilized.getUTCMonth()])+" "+(lastFertilized.getUTCDate())}</div>
        </div>
      </div>

      <button className="edit-btn">
        <EditIcon onClick={() => {
          window.scrollTo(0, 0);
          props.onUpdate(props.id);
          props.onDelete(props.id);
        }}/>
      </button>
      
    </div>
  );
}

export default Plant;
