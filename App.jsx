import { useState, useEffect } from 'react'
import './App.css'
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [editid, setEditid] = useState("")
  const [showOptions, setShowOptions] = useState(false)
  const [filterText, setFilterText] = useState("All")

  const handsv = () => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }




  useEffect(() => {
    if (localStorage.getItem("todos") != null) {
      const data = JSON.parse(localStorage.getItem("todos"))
      setTodos(data)
      console.log(data)
    }

  }, [])


  const handchange = (e) => {
    setTodo(e.target.value)
  }

  const handadd = async () => {
    if (editid != "") {
      let index = todos.findIndex(item => item.id === editid)
      let newtodos = [...todos]
      newtodos[index].task = todo
      await setTodos(newtodos)
    } else {
      await setTodos([...todos, { task: todo, iscomplete: false, id: uuidv4() }])
    }
    setEditid("")
    setTodo("")
    handsv()


  }

  const handcheck = (e) => {
    let id = e.target.name
    let index = todos.findIndex(item => item.id === id)
    let newtodos = [...todos]
    newtodos[index].iscomplete = !newtodos[index].iscomplete
    setTodos(newtodos)
    handsv()

  }

  const handdelete = (e) => {
    let id = e.target.name
    let index = todos.findIndex(item => item.id === id)
    let newtodos = todos.slice(0, index).concat(todos.slice(index + 1, todos.length))
    setTodos(newtodos)
    handsv()

  }

  const handedit = (e) => {
    let id = e.target.name
    setEditid(id)
    let index = todos.findIndex(item => item.id === id)
    let data = todos[index].task
    setTodo(data)
    handsv()

  }

  const handleOptionClick = (option) => {
    setFilterText(option)
    setShowOptions(false)
  }




  const filteredTodos = todos.filter(todo => {
    if (filterText === "All") {
      return true
    } else if (filterText === "Completed") {
      return todo.iscomplete
    } else if (filterText === "Not completed") {
      return !todo.iscomplete
    }
    return true
  })

  return (
    <div className=''>
      <div className="containe ">
        <div className='mx-auto w-max font-bold text-green-200 heading company'>Complete Todo in one Frame!</div>
        <div className=" mt-3   editor">
          <span className='text-white font-bold add'>Add Task</span>
          <div className='subeditor'>
          <input className="input"
            onChange={handchange}
            onKeyDown={(event) => {
              if (event.key == "Enter" & todo.length >= 3) {
                handadd()

              }

            }
            }
            className='w-[30vw] bg-slate-400 '
            type="text"
            value={todo}
            placeholder="Type something and press Enter"
          />
          <button
            name={editid}
            onClick={handadd}
            disabled={todo.length < 3 ? true : false}
            className='save font-bold bg-green-600 rounded-md  '
          >
            Save
          </button>
          </div>
        </div>
        
        <div className="line "></div>
        <div className='select0'>
        <div className='font-bold text-white underline relative'>
            <div
              className="select"
              onMouseEnter={() => setShowOptions(true)}
              onMouseLeave={() => setShowOptions(false)}
            >
              {filterText}
              {showOptions && (
                <div className="options absolute top-full left-0 bg-white text-black">
                  <div onClick={() => handleOptionClick("All")}>All</div>
                  <div onClick={() => handleOptionClick("Completed")}>Completed</div>
                  <div onClick={() => handleOptionClick("Not completed")}>Not completed</div>
                </div>
              )}
            </div>
          </div>
          <div className='font-bold text-white select1'>{filterText} Task:&nbsp;{filteredTodos.length}</div>

          </div>

      
        <div className="task overflow-scroll no-scrollbar">
          

          {todos.length === 0 && (
            <div className="text-white">No todos to display</div>
          )}

          <div className="todos overflow-scroll no-scrollbar  mt-2">
            {filteredTodos.map((element) => {
              return (
                <div key={element.id} className='flex justify-between w-[95%] mx-auto my-2 '>
                  <div className={`flex justify-center items-center`}>
                    <input type="checkbox" name={element.id} onChange={handcheck} checked={element.iscomplete} />
                    <div className={element.iscomplete ? "line-through" : ""}>&nbsp;{element.task}</div>
                  </div>
                  <div className="buttons flex gap-[4px] h-max no-underline ">
                    <button name={element.id} edit={editid} className='px-5 bg-blue-700 py-[10px] text-[10px] font-bold rounded-[3px]' onClick={handedit}>Edit</button>
                    <button name={element.id} className='px-5 bg-red-700 py-[10px] text-[10px] font-bold rounded-[3px]' onClick={handdelete}>Delete</button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
