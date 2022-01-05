import React, { useEffect, useState } from "react";
import "./App.css";
import TaskList from "./components/TaskList";
import NewTaskForm from "./components/NewTaskForm";
import axios from "axios";

const URL = "https://adas-task-list.herokuapp.com";

const App = () => {
  const [stateTasks, setTasks] = useState([]);

  const updateAPI = (task) => {
    console.log("Update API was called");
    const completeOrIncomplete = task.done ? "incomplete" : "complete";
    axios
      .patch(URL + "/tasks/" + task.id + "/" + completeOrIncomplete)
      .then((response) => {
        console.log("RESPONSE RECIEVED");
        console.log(response.data);
      })
      .catch((error) => console.log(error.response.data));
  };

  const getTasks = () => {
    console.log("get tasks");

    axios
      .get(URL + "/tasks")
      .then((response) => {
        console.log(response.data);
        const newTasks = response.data.map((task) => {
          return {
            id: task.id,
            text: task.title,
            showDesc: true,
            done: task.is_complete,
          };
        });
        console.log("NEW TASKS", newTasks);
        setTasks(newTasks);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  useEffect(getTasks, []); // run once after the component loads

  // a closure! It continues to have access to all of the information that it needs to run
  // this function lives in App, so we are in a way passing down a link to the function, which will send the message back up to where it lives when it's called
  // so it seems like where the function lives is very important
  const toggleTask = (id) => {
    let newTasks = [...stateTasks];

    newTasks.map((task) => {
      if (task.id == id) {
        updateAPI(task);
        task.done = !task.done;
      }
      return task;
    });

    setTasks(newTasks);
  };

  const toggleDesc = (id) => {
    let newTasks = [...stateTasks];

    newTasks.map((task) => {
      if (task.id == id) {
        task.showDesc = !task.showDesc;
      }
      return task;
    });

    setTasks(newTasks);
  };

  const deleteTask = (id) => {
    console.log("Inside delete tasks for id", id);

    // let updatedTasks = stateTasks.filter((task) => task.id != id);

    axios
      .delete(URL + "/tasks/" + id)
      .then((response) => {
        console.log(response.data);

        // setTasks(updatedTasks);
        // could use either setTasks or getTasks here
        // getTasks calls the API again and will be more reliable, not let the interface and the database get out of sync
        // however, it will also be slower and may overload the API with too many calls or be expensive
        // both ways are fine, it's a judgmenet call
        getTasks();
      })
      .catch((error) => console.log(error.response.data));
  };

  const addTask = (task) => {
    console.log(task);

    axios
      .post(URL + "/tasks", {
        title: task.text,
        // eslint-disable-next-line camelcase
        completed_at: task.done ? new Date() : null,
        description: "",
      })
      .then((response) => getTasks())
      .catch((error) => console.log(error.response.data));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <div>
          <TaskList
            tasks={stateTasks}
            toggleFn={toggleTask}
            deleteFn={deleteTask}
            descFn={toggleDesc}
          />
        </div>
        <div>
          <NewTaskForm onSubmitCallback={addTask} />
        </div>
      </main>
    </div>
  );
};

export default App;
