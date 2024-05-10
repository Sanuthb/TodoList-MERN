import React, { useEffect, useState } from "react";
import axios from "axios";
import "./main.css";
import { Link } from "react-router-dom";

const Home = () => {
  const [listdetails, setlistdetails] = useState([]);
  const [task, settask] = useState("");
  const [status, setstatus] = useState("");
  const [date, setdate] = useState("");
  const [time, settime] = useState("");

  useEffect(() => {
    fetchtaskdetails();
  }, []);

  function fetchtaskdetails() {
    axios.get("http://localhost:8888/todolist").then((response) => {
      setlistdetails(response.data);
    });
  }

  const addtask = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8888/todolist", {
        Task: task,
        Status: status,
        Date: date,
        Time: time,
      })
      .then((response) => {
        console.log(response.data);
        fetchtaskdetails(); 
      });
  };

  const deletetask = (id) => {
    axios.delete(`http://localhost:8888/todolist/${id}`).then((response) => {
      console.log(response.data);
      fetchtaskdetails(); 
    });
  };

  return (
    <div className="hero">
      <h1>ToDo List</h1>
      <div className="content">
        {listdetails.length === 0 ? (
          <p>No tasks available</p>
        ) : (
          <table className="list_table">
            <thead>
              <tr>
                <th>Sno</th>
                <th>Task</th>
                <th>Status</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {listdetails.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.Task}</td>
                  <td>{item.Status}</td>
                  <td>
                    {item.Date} {item.Time}
                  </td>
                  <td className="button-list">
                          <Link to={`/edit/${item._id}`} className="button button-edit">
                      Edit
                    </Link>
                    <button
                      className="button button-delete"
                      onClick={() => deletetask(item._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <form
          method="POST"
          action=""
          onSubmit={addtask}
          className="list_entry_details"
        >
          <h3>Enter Task</h3>
          <label>Task</label>
          <input
            type="text"
            name="Task"
            placeholder="Task"
            value={task}
            onChange={(e) => {
              settask(e.target.value);
            }}
          />
          <label>Status</label>
          <select
            name="status"
            id="status"
            placeholder="--Select None--"
            value={status}
            onChange={(e) => {
              setstatus(e.target.value);
            }}
          >
            <option value="--select none--">--Select None--</option>
            <option value="Not Yet">Not Yet</option>
          </select>
          <label>Date</label>
          <input
            type="date"
            name="Date"
            placeholder="Date"
            value={date}
            onChange={(e) => {
              setdate(e.target.value);
            }}
          />
          <label>Time</label>
          <input
            type="time"
            name="Time"
            placeholder="Time"
            value={time}
            onChange={(e) => {
              settime(e.target.value);
            }}
          />
          <button onClick={addtask}>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Home;
