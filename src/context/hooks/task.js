import { useState, useEffect } from 'react';
import axios from 'axios';

const useTasks = (initialTasks = []) => {
  const [tasks, setTasks] = useState(initialTasks);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_SERVER}/api/myTodoRoutes`
        );
        setTasks(data);
      } catch (error) {
        console.error('Fetch tasks error:', error.message);
      }
    };

    fetchTasks();
  }, []);

  const addTask = async (newTask) => {
    try {
      const { data: task } = await axios.post(
        `${process.env.REACT_APP_SERVER}/api/myTodoRoutes`,
        newTask,
        { headers: { 'Content-Type': 'application/json' } }
      );
      setTasks((prevTasks) => [...prevTasks, task]);
    } catch (error) {
      console.error('Add task error:', error.message);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_SERVER}/api/myTodoRoutes/${id}`
      );
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error('Delete task error:', error.message);
    }
  };

  const toggleTaskCompletion = async (id) => {
    const taskToToggle = tasks.find((task) => task._id === id);
    if (taskToToggle) {
      const updatedTask = { ...taskToToggle, status: !taskToToggle.status };
      try {
        await axios.put(
          `${process.env.REACT_APP_SERVER}/api/myTodoRoutes/${id}`,
          { task: updatedTask }
        );
        setTasks((prevTasks) =>
          prevTasks.map((task) => (task._id === id ? updatedTask : task))
        );
      } catch (error) {
        console.error('Toggle task completion error:', error.message);
      }
    }
  };

  return { tasks, addTask, deleteTask, toggleTaskCompletion };
};

export default useTasks;
