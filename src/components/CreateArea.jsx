import React, { useState } from "react";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Fab from '@material-ui/core/Fab';
import Zoom from '@material-ui/core/Zoom';

const CreateArea = (props) => {
  const [plant, setPlant] = useState({
    name: "",
    lastWatered: "",
    frequency: 0,
    lastFertilized: "",
    imgUrl: ""
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
    props.onAdd(plant);
    setPlant({
      name: "",
      lastWatered: "",
      frequency: "",
      lastFertilized: "",
      imgUrl: ""
    });
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
            <AddCircleIcon />
          </Fab>
        </Zoom>  
      </form>
    </div>
  );
}

export default CreateArea;
