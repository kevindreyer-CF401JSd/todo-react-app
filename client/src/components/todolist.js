import React, { useState, useEffect, useContext } from "react"
import { Alert, Table, Spinner, Button } from "react-bootstrap"
import { SettingsContext } from '../context/Settings'
import useForm from '../hooks/useForm'

import Auth from './Auth'

function ToDoList({ 
  todoItems, 
  error, 
  isLoading, 
  addNewToDoItem, 
  deletionHandler,
  completionHandler,
}) {
  let [count, setCount] = useState(0);
  const settings = useContext(SettingsContext)
  const [page, setPage] = useState(0);
  const [filter, setFilter] = useState(false)
  let perPageCount = parseInt(settings.resultsPerPage)
  let start = page * perPageCount
  let end = start + perPageCount
  let currentList = todoItems.slice(start, end)
  let filterList = currentList.filter(list => list.status === false)
  let itemList = filter ? filterList : currentList

  // const [todoItems, error, isLoading] = useFetch();

  // const [
  //   values,
  // ] = useForm()

  function filterHandler (filterStatus) {
    setFilter(!filterStatus)
  }

  useEffect(() => {
    setCount(todoItems.length);
    // console.log('in use effect, perPageCount:',perPageCount)
    // perPageCount = settings.resultsPerPage
    // start = page * perPageCount
    // end = start + perPageCount
    // currentList = todoItems.slice(start, end)
    // console.log('start:',start)
    // console.log('end:',end)
    const headerCount = `ToDo App | ${count} item`
    // I don't think I should be doing it this way but...
    // document.title = headerCount;
    // document.getElementById("header-counter").innerHTML = headerCount
  });
  
  return (
    <div className="App-todolist">
      {error && <Alert variant="danger">{error}</Alert>}
      {isLoading ? <Spinner animation="grow" /> : (
      <>
      <Table striped size="sm">
        <thead className="thead-dark">
          <tr className="d-flex">
            <th className="text-left flex-sm-grow-1">To Do Description</th>
            <th className="flex-grow-*">Assigned</th>
            <th>Difficulty</th>
            <th><Auth permission="update">Completion Status</Auth></th>
            <th><Auth permission="delete">delete</Auth></th>
          </tr>
        </thead>
        <tbody>
          {itemList.map(item => (
            <tr className={item.status ? "completed d-flex" : "notcompleted d-flex"} key={item.id}>
              <td className="text-left flex-sm-grow-1">{item.description}</td>
              <td className="flex-grow-*">{item.assigned}</td>
              <td>{item.difficulty}</td>
              <td><Auth permission="update"><Button className="btn btn-secondary" onClick={() => completionHandler(item)}>
               Completed:{item.status.toString()}
             </Button></Auth></td>
              <td><Auth permission="delete"><Button className="btn btn-warning" onClick={() => deletionHandler(item.id)}>del</Button></Auth></td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button className="btn btn-secondary" onClick={() => filterHandler(filter)}>Show only incomplete</Button>
      {page > 0 && <Button className="btn btn-secondary" onClick={() => setPage(page - 1)}>Previous</Button>}
      {todoItems.length > end && <Button className="btn btn-secondary" onClick={() => setPage(page + 1)}>Next</Button>}
      </>
     )
     }
    </div>
  );
}

export default ToDoList;
