import React, { useState, useEffect } from "react"
import { Form } from 'react-bootstrap'

import useForm from '../hooks/useForm'

function Interface({ addNewToDoItem }) {
  let [count, setCount] = useState(0);

  async function postToDoItem () {
    values.status = false;
    values.assigned = "Kevin";
    const raw = await fetch('http://localhost:3001/items', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    })
    const response = await raw.json();
    addNewToDoItem(response);
  }

  const [
    handleSubmit,
    handleChange,
    handleTextInput,
    values,
  ] = useForm(postToDoItem)

  useEffect(() => {
    // setCount(todoItems.length);
    document.title = `ToDo App | ${count} item`;
  });

  
  return (
    <main className="Interface">
      <title>To Do List | {count}</title>
      <div className="App-form">
        <Form onSubmit={handleSubmit}>
          <div className="input-group d-flex">
            <div className="input-group-prepend">
              <span className="input-group-text">To Do:</span>
            </div>
            <input
              type="text"
              id="description"
              name="description"
              placeholder="To Do Description"
              aria-label="Description"
              className="form-control"
              onChange={handleChange}
            />
            <input
              type="number"
              id="difficulty"
              name="difficulty"
              min="0"
              max="10"
              placeholder="To Do Difficulty"
              aria-label="Difficulty"
              className="form-control"
              onChange={handleChange}
            />
            <input type="submit" value="Add to do item" className="form-control btn btn-primary"/>
          </div>
        </Form>
      </div>
    </main>
  );
}

export default Interface;
