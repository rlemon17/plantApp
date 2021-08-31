const router = require('express').Router();
let User = require('../models/user.model');

// Connect other routes
const plantRouter = require('./plant.route');
router.use('/plants', plantRouter);

router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const newUser = new User({
        name: req.body.name,
        plants: []
    });

    newUser.save()
        .then(() => res.json("User added successfully!"))
        .catch(err => res.status(400).json('User Adding Error: ' + err));
});

router.route('/:id').get((req, res) => {
    User.findById(req.params.id)
        .then(foundPlant => res.json(foundPlant))
        .catch(err => res.status(400).json("Error: " + err));
});

router.route('/:id').delete((req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(() => res.json("User deleted."))
        .catch(err => res.status(400).json("Error: " + err));
});

router.route('/update/:id').post((req, res) => {
    User.findById(req.params.id)
        .then(foundUser => {
            foundUser.name = req.body.name;
            foundUser.plants = req.body.plants;

            foundUser.save()
                .then(() => res.json("User updated."))
                .catch(err => res.status(400).json("Error: " + err));
        })
        .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;