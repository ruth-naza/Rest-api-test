const express = require('express');

const router = express.Router();

const User = require('../models/User');

//Posts Routes
//ALL USERS / SEARCH BY FIRSTNAME
router.get('/', async (req, res) => {
  try{
    let filter_value = req.query.filter_value;
    let sort_order_mode = req.query.sort_order_mode;
    if (req.query.filter_value) {
      let users = await User.find({firstname: filter_value});
      res.json(users);
    } else if(sort_order_mode) {
      let users = await User.find().sort({ firstname: sort_order_mode});
      res.json(users);
    } else {
      let users = await User.find();
      res.json(users);
    }
    } catch(err) {
    res.status(400).json({ message: err})
  }
})

//CREATES USER
router.post('/', async (req, res) => {
  const user = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    gender: req.body.gender,
    date_of_birth: req.body.date_of_birth
  });

  try{
    const savedUser = await user.save();
    res.json(savedUser);
  }catch(err) {
    res.status(400).json({ message: err})
  }
})

//GET A SPECIFIC USER BY ID
router.get('/:userId', async (req,res) => {
  try {
    const user = await User.findById(req.params.userId);
    res.json(user);
  } catch(err) {
    res.status(400).json({ message: 'User not found' });
  }
})

//DELETE USER
router.delete('/:userId', async (req, res) => {
  try{
    const deletedUser = await User.deleteOne({ _id: req.params.userId})
    res.status(200).json({ message: 'User has been deleted' });
  }catch(err) {
    res.status(400).json({ message: 'User not found' });
  }
});

//UPDATE USER
router.patch('/:userId', async (req, res) => {
  try{
    const UpdatedUser = await User.updateOne(
      { _id: req.params.userId}, 
      {$set: { firstname: req.body.firstname, 
        lastname: req.body.lastname,
        gender: req.body.gender,
        date_of_birth: req.body.date_of_birth
      }})
    res.status(200).json({ message: 'User has been updated' });
  }catch(err) {
    res.status(400).json({ message: 'User not found' });
  }
});
module.exports = router;