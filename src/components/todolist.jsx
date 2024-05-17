import { useState, useEffect } from 'react'
import { IoAddCircle } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import '../App.css'

function Todo() {
  const [getTodo, setGetTodo] = useState("")
  const [listTodo, setListTodo] = useState(() => {
    // Initialize state with data from localStorage, or an empty array if no data found
    const storedData = localStorage.getItem('todoList');
    return storedData ? JSON.parse(storedData) : [];
  });

  useEffect(() => {
    // Save todo list to localStorage whenever it changes
    localStorage.setItem('todoList', JSON.stringify(listTodo));
  }, [listTodo]);

  const addTodo = () => {
    if (getTodo.trim() !== "") {
      setListTodo((listTodo) => {
        const todo = [...listTodo, getTodo]
        return todo
      })
      setGetTodo(""); // Clear input after adding todo
    }
  }
  const deleteAllItem = ()=>{
    setListTodo('')
  }

  const removeItem = (index) => {
    const updatedData = listTodo.filter((elem, id) => {
      return index !== id;
    });
    setListTodo(updatedData);
  }

  return (
    <>
      <h1 className='heading'>What's the Plan for today? </h1>

      <div className='box'>
        <div>
          <input type="text" className='input' value={getTodo} onChange={(e) => setGetTodo(e.target.value)} placeholder='Enter your plans here ..' />
        </div>
        <div>
          {getTodo.trim() !== "" && (
            <button onClick={addTodo} className='btn'>Add todo <IoAddCircle className='icon' /></button>
          )}
        </div>
      </div>

      {
        listTodo.length !== 0 && listTodo.map((list, index) => {
          return (
            <div key={index} className='items'>
              <h5 className='showlist'>{list}</h5>
              <button className='btn1' onClick={() => removeItem(index)}>Remove <MdDelete className='icon1'/></button>
            </div>
          )
        })
      }
      {
        listTodo.length > 1 && <button className='btn1 removeall' onClick={deleteAllItem}>Remove All <MdDelete className='icon1'/> </button>
      }
     
    </>
  )
}

export default Todo
