import React, { Component } from 'react';
import ToDoInput from '../../components/todo-input/todo-input';
import ToDoList from '../../components/todo-list/todo-list';
import Footer from '../../components/footer/footer';
import './todo.css';
import {connect} from "react-redux";
import {
  addTaskActionCreator,
  changeFilterActionCreator,
  completeTaskActionCreator,
  removeTaskActionCreator
} from "../../actions/actionCreator";

class ToDo extends Component {
  state = {
    taskText: ''
  };

  handleInputChange = ({ target: { value } }) => {
    this.setState({
      taskText: value,
    })
  };

  addTast = ({ key }) => {
    const { taskText } = this.state;

    if (taskText.length > 3 && key === 'Enter') {
      const { addTaskActionCreator } = this.props;

      addTaskActionCreator((new Date()).getTime(), taskText, false);

      this.setState({
        taskText: '',
      })
    }
  };

  filterTasks = (tasks, activeFilter) => {
    switch (activeFilter) {
      case 'completed':
        return tasks.filter(task => task.isCompleted);
      case 'active':
        return tasks.filter(task => !task.isCompleted);
      default:
        return tasks;
    }
  };

  getActiveTasksCounter = tasks => tasks.filter(task => !task.isCompleted).length;

  render() {
    const { taskText } = this.state;
    const { tasks, removeTaskActionCreator, completeTaskActionCreator, filters, changeFilterActionCreator } = this.props;
    const isTasksExist = tasks && tasks.length > 0;
    const filteredTasks = this.filterTasks(tasks, filters);
    const taskCounter = this.getActiveTasksCounter(tasks);

    return (
      <div className="todo-wrapper">
        <ToDoInput onKeyPress={this.addTast} onChange={this.handleInputChange} value={taskText} />
        {isTasksExist && <ToDoList tasksList={filteredTasks} removeTask={removeTaskActionCreator} completeTask={completeTaskActionCreator} />}
        {isTasksExist && <Footer amount={taskCounter} activeFilter={filters} changeFilter={changeFilterActionCreator} />}
      </div>
    );
  }
}

export default connect(({ tasks, filters }) => ({ tasks, filters }), { addTaskActionCreator, removeTaskActionCreator, completeTaskActionCreator, changeFilterActionCreator })(ToDo);
