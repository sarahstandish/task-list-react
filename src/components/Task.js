import React from "react";
import PropTypes from "prop-types";
import "./Task.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const Task = ({ id, text, done, toggleFn, deleteFn, showDesc, descFn }) => {
  console.log("Task rendered");

  const buttonClass = done ? "tasks__item__toggle--completed" : "";

  let displayText = text;

  if (!showDesc) {
    displayText = "";
  }

  return (
    <li className="tasks__item">
      {/* Task button */}
      <button
        onClick={() => {
          toggleFn(id);
        }}
        className={`tasks__item__toggle ${buttonClass}`}
      >
        {displayText}
      </button>

      {/* Delete button */}
      <button
        onClick={() => deleteFn(id)}
        className="tasks__item__remove button alert pull-right"
      >
        <i className="fa fa-times">
          <FontAwesomeIcon icon={faTimes} />
        </i>
      </button>

      <button onClick={() => descFn(id)}>Description Button</button>
    </li>
  );
};

Task.propTypes = {
  text: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  done: PropTypes.bool.isRequired,
  toggleFn: PropTypes.func.isRequired,
  deleteFn: PropTypes.func.isRequired,
  showDesc: PropTypes.bool.isRequired,
  descFn: PropTypes.func.isRequired,
};

export default Task;
