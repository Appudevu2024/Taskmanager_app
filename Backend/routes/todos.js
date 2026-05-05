const express = require('express');
const Todo=require('../models/Todo')
const authenticateToken=require('./middleware')
const router=express.Router();



router.post('/',authenticateToken,async(req,res)=>{
 const{title,description,status,startDate, endDate, estimatedDays,taskType,priority}=req.body;
 const newTodo=new Todo({
    title,
    description,
    status,
    startDate,
    endDate,
    estimatedDays,
    priority,
    taskType,
    user: req.user.id || req.user._id,
 });

 try {
    const savedTodo= await newTodo.save();
    res.status(201).json(savedTodo);
 } catch (error) {
    res.status(500).json({error:"Error creating todo"});
 }
})


router.get('/', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;

    const todos = await Todo.find({ user: userId }).sort({ createdAt: -1 , _id: -1});

    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: "Error fetching todos" });
  }
});

router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({ error: "Error updating todo" });
  }
});


router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: "Todo deleted" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting todo" });
  }
});

module.exports=router;