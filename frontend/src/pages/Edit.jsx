import React, { useEffect, useState } from "react";
import axios from "axios";
import "./main.css";
import { useParams } from "react-router-dom";
const Edit = () => {
  const [task, settask] = useState("");
  const [status, setstatus] = useState("");
  const [date, setdate] = useState("");
  const [time, settime] = useState("");

  useEffect(() => {
    fetchtaskdetails();
  }, []);

  const { id } = useParams();
  function fetchtaskdetails() {
    axios.get(`http://localhost:8888/todolist/${id}`).then((response) => {
      settask(response.data.Task);
      setstatus(response.data.Status);
      setdate(response.data.Date);
      settime(response.data.Time);
    });
  }

  const updatetask = () => {
    axios
      .put(`http://localhost:8888/todolist/${id}`, {
        Task: task,
        Status: status,
        Date: date,
        Time: time,
      })
      .then((response) => {
        console.log(response.data);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <form
        method="POST"
        action=""
        onSubmit={updatetask}
        className="list_entry_details"
      >
        <h3>Edit Task</h3>
        <label>Task</label>
        <input
          type="text"
          name="Task"
          value={task}
          onChange={(e) => {
            settask(e.target.value);
          }}
        />
        <label>Status</label>
        <select
          name="status"
          id="status"
          value={status}
          onChange={(e) => {
            setstatus(e.target.value);
          }}
        >
          <option value="--select none--">--Select None--</option>
          <option value="Not Yet">Not Yet</option>
          <option value="Completed">Completed</option>
        </select>
        <label>Date</label>
        <input
          type="date"
          name="Date"
          value={date}
          onChange={(e) => {
            setdate(e.target.value);
          }}
        />
        <label>Time</label>
        <input
          type="time"
          name="Time"
          value={time}
          onChange={(e) => {
            settime(e.target.value);
          }}
        />
        <button onClick={updatetask}>Submit</button>
      </form>
    </div>
  );
};

export default Edit;
