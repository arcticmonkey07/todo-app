import {ADD_TASK, COMPLETE_TASK, REMOVE_TASK, CHANGE_FILTER} from "../constants";

export const addTaskActionCreator = (id, text, isCompleted) => ({type: ADD_TASK, id, text, isCompleted});
export const removeTaskActionCreator = id => ({type: REMOVE_TASK, id});
export const completeTaskActionCreator = id => ({type: COMPLETE_TASK, id});
export const changeFilterActionCreator = activeFilter => ({type: CHANGE_FILTER, activeFilter});