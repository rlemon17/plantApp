import React, { useState } from "react";
import { useParams } from 'react-router-dom';
import Header from "./Header";
import Footer from "./Footer";
import Plant from "./Plant";
import CreateArea from "./CreateArea";
import UndoBtn from "./UndoBtn";
import axios from 'axios';

const App = () => {

  const [plants, setPlants] = useState([]);

  // Update from database
  axios.get('http://localhost:3000/plants')
      .then(res => {
        // Sort by watering date
        setPlants(res.data.sort((a, b) => {
          const msPerDay = 1000*60*60*24;

          let dateA = new Date(a.lastWatered);
          let dateB = new Date(b.lastWatered);

          let freqA = a.frequency*msPerDay;
          let freqB = b.frequency*msPerDay;

          let nextA = dateA.getTime() + freqA;
          let nextB = dateB.getTime() + freqB

          return nextA-nextB;
        }));
      })
      .catch(err => console.log(err));

  // Various states to determine which functionality to use
  const [shouldAdd, setShouldAdd] = useState(false);
  const [shouldUpdate, setShouldUpdate] = useState(false);
  const [shouldUndo, setShouldUndo] = useState(false);

  // Placeholder plant sent to CreateArea component
  const [plantToUpdate, setPlantToUpdate] = useState({
    name: "",
    lastWatered: "",
    frequency: 0,
    lastFertilized: "",
    imgUrl: ""
  });

  // Backup plant to undo a recent delete
  const [backup, setBackup] = useState({
    name: "",
    lastWatered: "",
    frequency: 0,
    lastFertilized: "",
    imgUrl: ""
  });

  // Click event to open CreateArea component
  const handleClick = () => {
    setShouldAdd(true);
    setShouldUpdate(false);
  }

  // Adds a plant
  const addPlant = () => {
    // Post reqest already made, just update state
    axios.get('http://localhost:3000/plants')
      .then(res => {
        setPlants(res.data);
      })
      .catch(err => console.log(err));
    
    //Reset all variables
    setShouldAdd(false);
    setShouldUpdate(false);
    setPlantToUpdate({
      name: "",
      lastWatered: "",
      frequency: 0,
      lastFertilized: "",
      imgUrl: ""
    });
  }
 
  // Deletes a plant
  const deletePlant = (id) => {

    // First save a copy
    axios.get('http://localhost:3000/plants/'+id)
      .then(res => {
        setBackup({
          name: res.data.name,
          lastWatered: res.data.lastWatered,
          frequency: res.data.frequency,
          lastFertilized: res.data.lastFertilized,
          imgUrl: res.data.imgUrl
        });
      })
      .catch(err => console.log('Error ' + err));

    // Now delete the plant from the database, show undo button
    axios.delete('http://localhost:3000/plants/'+id)

    setPlants(prev => {
      return prev.filter((item) => {
        return item._id !== id;
      });
    });

  }

  // Function to undo last delete
  const undoDelete = () => {

    // Post request using the backup plant
    axios.post('http://localhost:3000/plants/add', backup)
      .then(res => console.log(res.data))
      
    // Call add function
    addPlant();

    // Reset undo states
    setShouldUndo(false);
    setBackup({
      name: "",
      lastWatered: "",
      frequency: 0,
      lastFertilized: "",
      imgUrl: ""
    });
  }

  // Function to show undo button after a delete
  const showUndo = () => {
    setShouldUndo(true);
  }

  // Function to help format the date string
  const zeroFormat = (num) => {
    if (num > 9) {
      return `${num}`;
    }
    else {
      return `0${num}`;
    }
  }

  // Handles cancel event and resets all states
  const onCancel = () => {
    setShouldAdd(false);
    setShouldUpdate(false);
    setPlantToUpdate({
      name: "",
      lastWatered: "",
      frequency: 0,
      lastFertilized: "",
      imgUrl: ""
    });
  }

  // Handles update event by fetching data of plant requested and showing CreateArea component in update mode
  const queueUpdate = (id) => {
    setShouldAdd(false);

    axios.get('http://localhost:3000/plants/'+id)
      .then(foundPlant => {

        // Need to convert dates to yyyy-mm-dd to show up properly in CreateArea component
        let waterDate = new Date(foundPlant.data.lastWatered);
        let waterString = `${waterDate.getUTCFullYear()}-${zeroFormat(waterDate.getUTCMonth()+1)}-${zeroFormat(waterDate.getUTCDate())}`;

        let fertDate = new Date(foundPlant.data.lastFertilized);
        let fertString = `${fertDate.getUTCFullYear()}-${zeroFormat(fertDate.getUTCMonth()+1)}-${zeroFormat(fertDate.getUTCDate())}`;

        setPlantToUpdate({
          name: foundPlant.data.name,
          lastWatered: waterString,
          frequency: foundPlant.data.frequency,
          lastFertilized: fertString,
          imgUrl: foundPlant.data.imgUrl
        });
        setShouldUpdate(true);
      })
      .catch(err => console.log(err));
  }

  return (
    <div className="root-div">
      <Header />

      <div>
        {shouldAdd ? <CreateArea onAdd={addPlant} startingPlant={plantToUpdate} updateMode={shouldUpdate} onCancel={onCancel} onDelete={showUndo}/> : (shouldUpdate ? <CreateArea onAdd={addPlant} startingPlant={plantToUpdate} updateMode={shouldUpdate} onCancel={addPlant} onDelete={showUndo}/> : <button id="initialAdd" onClick={handleClick}>Add New Plant</button>)}
      </div>

      {plants.map((plant, index) => {
        return (
          <Plant
            key={index}
            id={plant._id}
            name={plant.name}
            lastWatered={plant.lastWatered}
            frequency={plant.frequency}
            lastFertilized={plant.lastFertilized}
            imgUrl={plant.imgUrl}
            onDelete={deletePlant}
            onUpdate={queueUpdate}
          />
        );
      })}
      
      <Footer />
      {shouldUndo && <UndoBtn onUndo={undoDelete}/>}
    </div>
  );
}

export default App;
