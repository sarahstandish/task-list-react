import React from "react";
import "./TaskList.css";
import Task from "./Task";
import PropTypes from "prop-types";

const TaskList = (props) => {
  const tasksComponentList = props.tasks.map((task) => {
    return (
      <Task
        id={task.id}
        key={task.id}
        text={task.text}
        done={task.done}
        showDesc={task.showDesc}
        toggleFn={props.toggleFn}
        deleteFn={props.deleteFn}
        descFn={props.descFn}
      />
    );
  });

  return <ul className="tasks__list">{tasksComponentList}</ul>;
};

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
      done: PropTypes.bool.isRequired,
    }).isRequired
  ).isRequired,
  toggleFn: PropTypes.func.isRequired,
  deleteFn: PropTypes.func.isRequired,
  descFn: PropTypes.func.isRequired,
};

export default TaskList;
