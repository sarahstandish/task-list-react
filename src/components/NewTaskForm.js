import React, { useState } from "react";
import PropTypes from "prop-types";
import "./NewTaskForm.css";
import { text } from "@fortawesome/fontawesome-svg-core";

const NewTaskForm = ({ onSubmitCallback }) => {
  const [taskState, setTaskState] = useState({
    text: "",
    done: false,
  });

  const handleChange = (event) => {
    // taking all the items in taskState and placing them in a new object
    const newState = {
      ...taskState,
    };

    newState[event.target.name] = event.target.value;
    setTaskState(newState);
  };

  const onSubmit = (event) => {
    if (!inputValid()) {
      return;
    }
    event.preventDefault();
    onSubmitCallback(taskState);
    setTaskState({
      text: "",
      done: false,
    });
  };

  const inputValid = () => {
    return taskState.text.length > 3;
  };

  return (
    <div className="NewTaskForm">
      {/* It's better to  */}
      <form onSubmit={onSubmit} className="new-task__form">
        <div className="new-task__fields">
          <label htmlFor="text" className="new-task__fields">
            Task
          </label>
          <input
            name="text"
            className={inputValid() ? "valid" : "invalid"}
            id="text"
            value={taskState.text}
            type="text"
            onChange={handleChange}
          ></input>
        </div>
        <div className="new-task__fields">
          <label
            htmlFor="done"
            className="new-task__fields"
            onChange={handleChange}
          >
            Done?
          </label>
          <select
            name="done"
            id="done"
            value={taskState.done}
            onChange={handleChange}
          >
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
        </div>
        <div>
          <button
            className="new-task__submit"
            type="submit"
            disabled={!inputValid()}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

NewTaskForm.propTypes = {
  onSubmitCallback: PropTypes.func.isRequired,
};

export default NewTaskForm;
