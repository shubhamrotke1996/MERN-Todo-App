const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const TodoModel = require("./Models/Todo")


const app = express();


     app.use(express.json());
     app.use(cors());

     
  mongoose.connect("mongodb://localhost:27017/test");   

  app.get("/get" , (req,res) => {
     TodoModel.find()
     .then((data) => {res.json(data)})
     .catch((err) => {
          console.error(err)
          res.status(500).json({message: "Error creating task"})})
  })

  app.put("/update/:id" , (req,res) => {
        const {id} = req.params;
        console.log(id);
        TodoModel.findByIdAndUpdate({_id:id},{done:true})
        .then((result) => res.json(result) )
        .catch((err) => {
          console.error(err)
          res.status(500).json({message: "Error creating task"})})
        
  })

  app.delete("/delete/:id" , (req,res) =>{
     const {id} = req.params;
     TodoModel.findByIdAndDelete({_id:id})
     .then((result) => res.json(result) )
     .catch((err) => {
          console.error(err)
          res.status(500).json({message: "Error creating task"})
     })
  })


  app.post("/add" , (req,res)=>{
      const  {task} = req.body;


      TodoModel.create({task})
       .then( (result) => {
            res.json(result);
       })
       .catch( (err) =>{
            console.error(err);
            res.status(500).json({message: "Error creating task"});
       });  

    });

     

 app.listen(3001 , ()=> { console.log("server is running on port 3001") } ) 