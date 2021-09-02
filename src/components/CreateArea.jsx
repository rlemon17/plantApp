import React, { useState } from "react";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Fab from '@material-ui/core/Fab';
import Zoom from '@material-ui/core/Zoom';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios';

const CreateArea = (props) => {

  const [plant, setPlant] = useState({
    name: props.startingPlant.name,
    lastWatered: props.startingPlant.lastWatered,
    frequency: props.startingPlant.frequency,
    lastFertilized: props.startingPlant.lastFertilized,
    imgUrl: props.startingPlant.imgUrl
  });

  const backupPlant = {
    name: props.startingPlant.name,
    lastWatered: props.startingPlant.lastWatered,
    frequency: props.startingPlant.frequency,
    lastFertilized: props.startingPlant.lastFertilized,
    imgUrl: props.startingPlant.imgUrl
  };
  
  const handleChange = (event) => {
    const { name, value } = event.target;

    setPlant(prev => {
      return {
        ...prev,
        [name]: value
      };
    });
  }

  const cancelEdit = (event) => {

    // Add to the database
    axios.get(`http://localhost:3000/users/${props.userId}`)
      .then(res => {
        // Push new plant into the array
        const name = res.data.name;
        const newPlants = res.data.plants;
        newPlants.push(backupPlant);

        axios.post(`http://localhost:3000/users/update/${props.userId}`, {
          name: name,
          plants: newPlants
        })
          .then(() => {
            props.onAdd();
          })

        console.log('Plant RE-added successfully!')

      })
      .catch(err => console.log(err));

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

  const submitPlant = (event) => {
    
    // Add to the database
    axios.get(`http://localhost:3000/users/${props.userId}`)
      .then(res => {
        // Push new plant into the array
        const name = res.data.name;
        const newPlants = res.data.plants;
        newPlants.push(plant);

        axios.post(`http://localhost:3000/users/update/${props.userId}`, {
          name: name,
          plants: newPlants
        })
          .then(() => {
            props.onAdd()
          });

        console.log('Plant added to user successfully!')
      })
      .catch(err => console.log(err));

    // Reset form back to empty (TODO: I think we can take this out, test when everything is working)
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

  const deletePlant = (event) => {
    props.onDelete();
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
        <button className="btn cancel" onClick={props.updateMode ? cancelEdit: cancelPlant}>
          Cancel
        </button>
        {props.updateMode && <button className="delete" onClick={deletePlant}><DeleteIcon /></button>}
      </form>
    </div>
  );
}

export default CreateArea;
