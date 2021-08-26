import React from "react";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const Plant = (props) => {
  const handleClick = () => {
    props.onDelete(props.id);
  }

  const msPerDay = 1000*60*60*24;

  const lastWatered = new Date(props.lastWatered);
  const lastFertilized = new Date(props.lastFertilized);
  const frequencyMs = props.frequency*msPerDay;

  const nextDate = new Date(lastWatered.getTime() + frequencyMs);

  const todaysDate = new Date();

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
      <button onClick={handleClick}>
        <DeleteIcon />
      </button>
      <button>
        <EditIcon onClick={() => {
          props.onUpdate(props.id);
          props.onDelete(props.id);
        }}/>
      </button>
      
    </div>
  );
}

export default Plant;
