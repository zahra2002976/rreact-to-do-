import React, { useState } from 'react';
import'./App.css';

const AddTask = ({ onAdd }) => {
  const [task, setTask] = useState('');

  const handleAdd = () => {
    if (task.trim()) {
      onAdd(task);
      setTask('');
    }
  };

  return (
    <div>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Add a new task"
      />
      <button onClick={handleAdd}>Add Task</button>
    </div>
  );
};

const Search = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search tasks"
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

const Task = ({ task, onRemove }) => {
  return (
    <div>
      <span>{task}</span>
      <button onClick={onRemove}>Remove</button>
      <input type="checkbox" />
      </div>
  );
};

const TaskList = ({ tasks, onRemove }) => {
  return (
    <div>
      {tasks.map((task, index) => (
        <Task key={index} task={task} onRemove={() => onRemove(index)} />
      ))}
    </div>
  );
};

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);

  const addTask = (task) => {
    setTasks([...tasks, task]);
    setFilteredTasks([...tasks, task]);
  };

  const removeTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
    setFilteredTasks(newTasks);
  };

  const searchTasks = (query) => {
    const filtered = tasks.filter((task) =>
      task.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredTasks(filtered);
  };

  return (
    <div>
      <h1>Todo List</h1>
      <AddTask onAdd={addTask} />
      <Search onSearch={searchTasks} />
      <TaskList tasks={filteredTasks} onRemove={removeTask} />
    </div>
  );
};

export default App;
