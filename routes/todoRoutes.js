const express = require("express");
const router = express.Router();
const Todo = require("../models/todo");
const { authenticateAccessToken } = require("../middlewares/authenticateAccessToken");

router.get("/", authenticateAccessToken, async (req, res) => {
    try{
        const todos = await Todo.find();
        res.json(todos); 
    } catch (err){
        res.status(500).json({ message: err.message });
    }
});


router.get("/:id", authenticateAccessToken, async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (todo) {
            res.json(todo);
        } else {
            res.status(404).json({ message: 'Todo not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.put("/edit/:id", authenticateAccessToken, async (req, res) => {
    try{
        const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            content: req.body.content,
            completed: req.body.completed,
        });

        if (updatedTodo) {
            res.json(updatedTodo);
        } else {
            res.status(404).json({ message: 'Todo not found' });
        }
    } catch (err){
        res.status(500).json({ message: err.message });
    }
});


router.delete("/delete/:id", authenticateAccessToken,  async (req, res) => {
    try{
        const status = await Todo.findByIdAndDelete(req.params.id);
        res.json(status ? "Successfully deleted" : "Error");
    } catch (err){
        res.status(500).json({ message: err.message });
    }
});



router.post("/create", authenticateAccessToken, async (req, res) => {
    try {
        const { title, content, completed } = req.body;
        const newTodo = new Todo({
            title,
            content,
            completed
        });

        await newTodo.save();
        res.status(201).json(newTodo);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


module.exports = router;