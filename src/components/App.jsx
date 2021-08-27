import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Plant from "./Plant";
import CreateArea from "./CreateArea";
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

  const [shouldAdd, setShouldAdd] = useState(false);

  const [shouldUpdate, setShouldUpdate] = useState(false);
  const [plantToUpdate, setPlantToUpdate] = useState({
    name: "",
    lastWatered: "",
    frequency: 0,
    lastFertilized: "",
    imgUrl: ""
  });

  const handleClick = () => {
    setShouldAdd(true);
    setShouldUpdate(false);
  }

  const addPlant = (newPlant) => {
    axios.get('http://localhost:3000/plants')
      .then(res => {
        setPlants(res.data);
      })
      .catch(err => console.log(err));
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
 

  const deletePlant = (id) => {
    axios.delete('http://localhost:3000/plants/'+id)

    setPlants(prev => {
      return prev.filter((item) => {
        return item._id !== id;
      });
    });
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
        {shouldAdd ? <CreateArea onAdd={addPlant} startingPlant={plantToUpdate} updateMode={shouldUpdate} onCancel={onCancel} /> : (shouldUpdate ? <CreateArea onAdd={addPlant} startingPlant={plantToUpdate} updateMode={shouldUpdate} onCancel={addPlant}/> : <button id="initialAdd" onClick={handleClick}>Add New Plant</button>)}
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
    </div>
  );
}

export default App;
