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
        setPlants(res.data);
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

  const queueUpdate = (id) => {
    setShouldAdd(false);


    axios.get('http://localhost:3000/plants/'+id)
      .then(foundPlant => {
        setPlantToUpdate({
          name: foundPlant.data.name,
          lastWatered: foundPlant.data.lastWatered,
          frequency: foundPlant.data.frequency,
          lastFertilized: foundPlant.data.lastFertilized,
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
        {shouldAdd ? <CreateArea onAdd={addPlant} startingPlant={plantToUpdate} updateMode={shouldUpdate} /> : (shouldUpdate ? <CreateArea onAdd={addPlant} startingPlant={plantToUpdate} updateMode={shouldUpdate}/> : <button id="initialAdd" onClick={handleClick}>Add New Plant</button>)}
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
