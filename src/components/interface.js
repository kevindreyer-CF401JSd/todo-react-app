import React, { useState, useEffect } from "react";

import useFetch from '../hooks/useFetch'
import useForm from '../hooks/useForm'

function Interface() {
  // let [todoItems, setToDoItems] = useState([]);
  // const [newItem, setNewItem] = useState({});
  let [count, setCount] = useState(0);
  const [todoItems, error, isLoading] = useFetch();

  async function postToDoItem () {
    const raw = await fetch('http://localhost:3001/items', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    })
    const response = await raw.json();
    console.log(response);
  }

  const [
    handleSubmit,
    handleChange,
    handleTextInput,
    values,
  ] = useForm(postToDoItem)

  // const handleSubmit = e => {
  //   e.preventDefault();
  //   newItem.completed = false;
  //   console.log("in submit:", Object.values(newItem));
  //   setToDoItems([...todoItems, newItem]);
  //   const newCount = count + 1;
  //   setCount(newCount);
  //   e.target.reset();
  //   setNewItem({});
  // };

  const handleChangeofToDo = e => {
    // newItem.todo = e.target.value;
    // // setNewItem(newItem);
  };

  const handleChangeofDifficulty = e => {
    // newItem.difficulty = e.target.value;
    // setNewItem(newItem);
  };

  const handleDelete = e => {
    // todoItems.splice(e, 1);
    // setToDoItems([...todoItems]);
    // const newCount = count - 1;
    // setCount(newCount);
  };

  const handleCompleted = e => {
    // todoItems[e].completed = !todoItems[e].completed;
    // setToDoItems([...todoItems]);
  };

  useEffect(() => {
    setCount(todoItems.length);
    document.title = `ToDo App | ${count} item`;
  });

  
  return (
    <main className="Interface">
      <title>To Do List | {count}</title>
      <div className="App-form">
        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend>To Do List input:</legend>
            <label htmlFor="listitem">To Do item:</label>
            <input
              onChange={handleChangeofToDo}
              type="text"
              id="listitem"
              name="listitem"
            />
            <label htmlFor="difficulty">Difficulty:</label>
            <input
              onChange={handleChangeofDifficulty}
              type="number"
              id="difficulty"
              name="difficulty"
            />
            <input type="submit" value="Add to do item" />
          </fieldset>
        </form>
        <div className="App-todolist">
        {error && <div>{error}</div>}
        {isLoading ? <div>Loading</div> : 
        <ul>
          {todoItems.map((item, index) => (
            <li
              className={item.status ? "completed" : "notcompleted"}
              key={item.id}
            >
              <span className="todo">{item.description}</span>
              <span className="diff">DIFFICULTY: {item.difficulty}</span>
              <button onClick={() => handleCompleted(item.id)}>
                Completed:{item.status.toString()}
              </button>
              <button onClick={() => handleDelete(item.id)}>del</button>
            </li>
          ))}
        </ul>
        }
        </div>
      </div>
    </main>
  );
}

export default Interface;
