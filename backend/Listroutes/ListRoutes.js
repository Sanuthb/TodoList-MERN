import express from "express";
import { List_Model } from "../DataSchema/List.js";

const ListRoutes = express.Router();

ListRoutes.get("/", async (req, res) => {
  try {
    const taskdetails = await List_Model.find({});
    if (taskdetails.length > 0) {
      return res.status(200).json(taskdetails);
    }
    return res.status(400).send("NO TASK");
  } catch (err) {
    res.status(500).send(err);
  }
});

ListRoutes.get("/:id", async (req,res) => {
    try { 
        const fetch_task = await List_Model.findById(req.params.id)
        if (!fetch_task) {
            return res.status(400).send("Task Not Found")
        }
        return res.status(200).json(fetch_task)
    } catch (err) {
        res.status(500).send(err)
     }
})

ListRoutes.post("/", async (req, res) => {
  try {
    if (
      !req.body.Task ||
      !req.body.Status ||
      !req.body.Date ||
      !req.body.Time
    ) {
      return res.status(400).send("Provide Task List");
    }

    const task_data = {
      Task: req.body.Task,
      Status: req.body.Status,
      Date: req.body.Date,
      Time: req.body.Time,
    };

    const task = await List_Model.create(task_data);

    return res.status(200).json(task);
  } catch (err) {
    res.status(500).send(err);
  }
});
ListRoutes.put("/:id", async (req, res) => {
  try {
      const task = await List_Model.findById(req.params.id);
      if (!task) {
        return res.status(404).send("Task Not Found");
      }
      const updatetask = {
          Task: req.body.Task,
          Status: req.body.Status,
          Date: req.body.Date,
          Time: req.body.Time,  
      }
      const updatedtaskdata = await List_Model.findByIdAndUpdate(req.params.id, updatetask)
      return res.status(200).json(updatedtaskdata)
  } catch (err) {
    res.status(500).send(err);
  }
});
ListRoutes.delete("/:id", async (req, res) => {
    try { 
        const delete_task = await List_Model.findByIdAndDelete(req.params.id);
        if (!delete_task) {
            return res.status(404).send("Task Not Found");
        }
        return res.status(200).send("Task Deleted");
    } catch (err) { 
        res.status(500).send(err);
    }
});

export default ListRoutes;
