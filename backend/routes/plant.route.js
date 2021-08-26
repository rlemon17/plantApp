const router = require('express').Router();
let Plant = require('../models/plant.model');

router.route('/').get((req, res) => {
    Plant.find()
        .then(plants => res.json(plants))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const newPlant = new Plant({
        name: req.body.name,
        lastWatered: req.body.lastWatered,
        frequency: req.body.frequency,
        lastFertilized: req.body.lastFertilized,
        imgUrl: req.body.imgUrl
    });

    newPlant.save()
        .then(() => res.json("Plant Added Successfully!"))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Plant.findById(req.params.id)
        .then(foundPlant => res.json(foundPlant))
        .catch(err => res.status(400).json("Error: " + err));
});

router.route('/:id').delete((req, res) => {
    Plant.findByIdAndDelete(req.params.id)
        .then(() => res.json("Plant deleted."))
        .catch(err => res.status(400).json("Error: " + err));
})

router.route('/update/:id').post((req, res) => {
    Plant.findById(req.params.id)
        .then(foundPlant => {
            foundPlant.name = req.body.name;
            foundPlant.lastWatered = req.body.lastWatered;
            foundPlant.frequency = req.body.frequency;
            foundPlant.lastFertilized = req.body.lastFertilized;
            foundPlant.imgUrl = req.body.imgUrl;

            foundPlant.save()
                .then(() => res.json('Plant updated.'))
                .catch(err => res.status(400).json('Error ' + err));
        })
        .catch(err => res.status(400).json('Error ' + err));
})

module.exports = router;