import React, { useState } from "react";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Fab from '@material-ui/core/Fab';
import Zoom from '@material-ui/core/Zoom';
import SaveIcon from '@material-ui/icons/Save';
import axios from 'axios';

const CreateArea = (props) => {

  const [plant, setPlant] = useState({
    name: props.startingPlant.name,
    lastWatered: props.startingPlant.lastWatered,
    frequency: props.startingPlant.frequency,
    lastFertilized: props.startingPlant.lastFertilized,
    imgUrl: props.startingPlant.imgUrl
  });
  
  const handleChange = (event) => {
    const { name, value } = event.target;

    setPlant(prev => {
      return {
        ...prev,
        [name]: value
      };
    });
  }

  const submitPlant = (event) => {
    // Call onAdd method from App.jsx
    props.onAdd(plant);

    // Add to the database
    axios.post('http://localhost:3000/plants/add', plant)
      .then(res => console.log(res.data));

    // Reset form back to empty
    setPlant({
      name: "",
      lastWatered: "",
      frequency: "",
      lastFertilized: "",
      imgUrl: ""
    });

    // Prevent refreshing
    event.preventDefault();
  }

  const cancelPlant = (event) => {
    props.onCancel();
    event.preventDefault();
  }

  return (
    <div>
      <form className="create-plant">

        <div className="container">

          <div className="row">
            <div className="col-md my-auto">Plant's Name:</div>
            <div className="col-md">
              <input
              autoComplete="off"
              name="name"
              onChange={handleChange}
              value={plant.name}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md my-auto">Last watered on:</div>
            <div className="col-md">
              <input
              type="date"
              name="lastWatered"
              onChange={handleChange}
              value={plant.lastWatered}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md my-auto">Watering Frequency (days):</div>
            <div className="col-md">
              <input
              type="number"
              name="frequency"
              onChange={handleChange}
              value={plant.frequency}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md my-auto">Last fertilized on:</div>
            <div className="col-md">
              <input
              type="date"
              name="lastFertilized"
              onChange={handleChange}
              value={plant.lastFertilized}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md my-auto">Image URL:</div>
            <div className="col-md">
              <input
              autoComplete="off"
              type="url"
              name="imgUrl"
              onChange={handleChange}
              value={plant.imgUrl}
              />
            </div>
          </div>

        </div>
        <Zoom in={true}>
          <Fab onClick={submitPlant}>
            {props.updateMode ? <SaveIcon /> : <AddCircleIcon />}
          </Fab>
        </Zoom>
        <button className="btn cancel" onClick={props.updateMode ? submitPlant: cancelPlant}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default CreateArea;
