import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Plant from "./Plant";
import CreateArea from "./CreateArea";

const App = () => {
  const [plants, setPlants] = useState([]);
  const [shouldAdd, setShouldAdd] = useState(false);
  const [shouldUpdate, setShouldUpdate] = useState(false);

  const handleClick = () => {
    setShouldAdd(true);
  }

  const addPlant = (newPlant) => {
    setPlants(prev => {
      return [...prev, newPlant];
    });
    setShouldAdd(false);
  }


  const deletePlant = (id) => {
    setPlants(prev => {
      return prev.filter((item, index) => {
        return index !== id;
      });
    });
  }

  return (
    <div>
      <Header />
      <div>
        {shouldAdd ? <CreateArea onAdd={addPlant} /> : <button id="initialAdd" onClick={handleClick}>Add New Plant</button>}
      </div>
      {plants.map((plant, index) => {
        return (
          <Plant
            key={index}
            id={index}
            name={plant.name}
            lastWatered={plant.lastWatered}
            frequency={plant.frequency}
            lastFertilized={plant.lastFertilized}
            imgUrl={plant.imgUrl}
            onDelete={deletePlant}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
