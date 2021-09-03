import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import Header from "./Header";
import Plant from "./Plant";
import CreateArea from "./CreateArea";
import UndoBtn from "./UndoBtn";
import axios from 'axios';

const _ = require('lodash');

const RenderPlants = () => {

  const [plants, setPlants] = useState([]);
  const [userId, setUserId] = useState("");
  
  // Grab from URL
  let {username} = useParams();
  username = _.toLower(username);
  
  useEffect(() => {

    let userDNE = true;

    // Update from database by grabbing user
    axios.get(`http://localhost:3000/users`)
      .then(usersArray => {

        // Find specific user
        for (let i = 0; i < usersArray.data.length; i++) {
          if (usersArray.data[i].name === username) {
            userDNE = false;
            setUserId(usersArray.data[i]._id);
          }
        }

        // If didn't exist, send a post request
        if (userDNE) {
          axios.post(`http://localhost:3000/users/add`, {
            name: username
          })
            .then(() => {
              // Search again
              setUserId(" ");
            })
        }
        
        axios.get(`http://localhost:3000/users/${userId}`)
          .then(res => {
            // Sort by watering date
            setPlants(res.data.plants.sort((a, b) => {
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
      })
      .catch(err => console.log(err));
  }, [username, userId])

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

    // Post request already made, just update state
    axios.get(`http://localhost:3000/users/${userId}`)
      .then(res => {

        // Sort by watering date
        setPlants(res.data.plants.sort((a, b) => {
          const msPerDay = 1000*60*60*24;

          let dateA = new Date(a.lastWatered);
          let dateB = new Date(b.lastWatered);

          let freqA = a.frequency*msPerDay;
          let freqB = b.frequency*msPerDay;

          let nextA = dateA.getTime() + freqA;
          let nextB = dateB.getTime() + freqB

          return nextA-nextB;
        }));

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
      })
      .catch(err => console.log(err));
  }
 
  // Deletes a plant
  const deletePlant = (id) => {

    // First save a copy
    axios.get(`http://localhost:3000/users/${userId}`)
      .then(res => {

        for (let i = 0; i < res.data.plants.length; i++) {
          if (res.data.plants[i]._id === id) {
            setBackup({
              name: res.data.plants[i].name,
              lastWatered: res.data.plants[i].lastWatered,
              frequency: res.data.plants[i].frequency,
              lastFertilized: res.data.plants[i].lastFertilized,
              imgUrl: res.data.plants[i].imgUrl
            });
          }
        }

        // Delete from database
        const name = res.data.name;
        const newPlants = res.data.plants.filter((item) => {
          return item._id !== id;
        })

        axios.post(`http://localhost:3000/users/update/${userId}`, {
          name: name,
          plants: newPlants
        });

      })
      .catch(err => console.log('Error ' + err));
    
    // Take this out maybe? Test later when everything working
    setPlants(prev => {
      return prev.filter((item) => {
        return item._id !== id;
      });
    });

    setShouldUpdate(false);

  }

  // Function to undo last delete
  const undoDelete = () => {

    // Post request using the backup plant
    axios.get(`http://localhost:3000/users/${userId}`)
      .then(res => {
        // Push new plant into the array
        const name = res.data.name;
        const newPlants = res.data.plants;
        newPlants.push(backup);

        axios.post(`http://localhost:3000/users/update/${userId}`, {
          name: name,
          plants: newPlants
        })
          .then(() => {
            addPlant();
          })

      })
      .catch(err => console.log(err));
      
    // Reset undo states
    setShouldUndo(false);
    setBackup({
      name: "",
      lastWatered: "",
      frequency: 0,
      lastFertilized: "",
      imgUrl: ""
    });

    // Call add function
    addPlant();
  }

  // Function to show undo button after a delete
  const showUndo = () => {
    setShouldUpdate(false);
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

    // Pull user object from database
    axios.get(`http://localhost:3000/users/${userId}`)
      .then(res => {

        for (let i = 0; i < res.data.plants.length; i++) {
          if (res.data.plants[i]._id === id) {

            // Need to convert dates to yyyy-mm-dd to show up properly in CreateArea component
            let waterDate = new Date(res.data.plants[i].lastWatered);
            let waterString = `${waterDate.getUTCFullYear()}-${zeroFormat(waterDate.getUTCMonth()+1)}-${zeroFormat(waterDate.getUTCDate())}`;

            let fertDate = new Date(res.data.plants[i].lastFertilized);
            let fertString = `${fertDate.getUTCFullYear()}-${zeroFormat(fertDate.getUTCMonth()+1)}-${zeroFormat(fertDate.getUTCDate())}`;
          
            setPlantToUpdate({
              name: res.data.plants[i].name,
              lastWatered: waterString,
              frequency: res.data.plants[i].frequency,
              lastFertilized: fertString,
              imgUrl: res.data.plants[i].imgUrl
            });
          }
        }
        setShouldUpdate(true);
      })
      .catch(err => console.log(err));
  }

  return (
    <div className="root-div">
      <Header welcomeMode={false} user={username}/>
      
      <div>
        {shouldAdd ? <CreateArea userId={userId} onAdd={addPlant} startingPlant={plantToUpdate} updateMode={shouldUpdate} onCancel={onCancel} onDelete={showUndo}/> : (shouldUpdate ? <CreateArea userId={userId} onAdd={addPlant} startingPlant={plantToUpdate} updateMode={shouldUpdate} onCancel={addPlant} onDelete={showUndo}/> : <button id="initialAdd" onClick={handleClick}>Add Plant</button>)}
      </div>

      {plants.map((plant) => {
        return (
          <Plant
            key={plant._id}
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
      
      {shouldUndo && <UndoBtn onUndo={undoDelete}/>}
    </div>
  );
}

export default RenderPlants;
