import React from "react";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const Plant = (props) => {
  const handleClick = () => {
    props.onDelete(props.id);
  }

  const msPerDay = 1000*60*60*24;

  const lastWatered = new Date(props.lastWatered + " 00:00");
  const lastFertilized = new Date(props.lastFertilized + " 00:00");
  const frequencyMs = props.frequency*msPerDay;

  const nextDate = new Date(lastWatered.getTime() + frequencyMs);

  return (
    <div className="plant">
      <h1>{props.name}</h1>
      <img 
        src={props.imgUrl}
        className="plant-img"
        alt="houseplant"
      />
      <div className="container plant-info">
        <div className="row">
          <div className="col-sm plant-info-label">Last watered on:</div>
          <div className="col-sm">{lastWatered.toDateString()}</div>
        </div>
        <div className="row">
          <div className="col-sm plant-info-label">Water again on:</div>
          <div className="col-sm">{nextDate.toDateString()}</div>
        </div>
        <div className="row">
          <div className="col-sm plant-info-label">Last fertilized on:</div>
          <div className="col-sm">{lastFertilized.toDateString()}</div>
        </div>
      </div>
      <button onClick={handleClick}>
        <DeleteIcon />
      </button>
      <button>
        <EditIcon />
      </button>
      
    </div>
  );
}

export default Plant;
