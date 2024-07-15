import { useState } from 'react'
import './App.css'
import { v4 as uuidv4 } from 'uuid';

function App() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [editid, setEditid] = useState("")
  const [showOptions, setShowOptions] = useState(false)
  const [filterText, setFilterText] = useState("All")

  const handchange = (e) => {
    setTodo(e.target.value)
  }

  const handadd = () => {
    if (editid !== "") {
      let index = todos.findIndex(item => item.id === editid)
      let newtodos = [...todos]
      newtodos[index].task = todo
      setTodos(newtodos)
    } else {
      setTodos([...todos, { task: todo, iscomplete: false, id: uuidv4() }])
    }
    setEditid("")
    setTodo("")
  }

  const handcheck = (e) => {
    let id = e.target.name
    let index = todos.findIndex(item => item.id === id)
    let newtodos = [...todos]
    newtodos[index].iscomplete = !newtodos[index].iscomplete
    setTodos(newtodos)
  }

  const handdelete = (e) => {
    let id = e.target.name
    let index = todos.findIndex(item => item.id === id)
    let newtodos = todos.slice(0, index).concat(todos.slice(index + 1, todos.length))
    setTodos(newtodos)
  }

  const handedit = (e) => {
    let id = e.target.name
    setEditid(id)
    let index = todos.findIndex(item => item.id === id)
    let data = todos[index].task
    setTodo(data)
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
      <div className="container h-[80vh] w-[60vw] mx-auto bg-slate-500 mt-4 relative">
        <div className='mx-auto w-max font-bold text-green-100'>Complete Todo in one Frame!</div>
        <div className="w-max mt-3 flex gap-3 mx-auto">
          <span className='text-white font-bold '>Add Task</span>
          <input onChange={handchange} className='w-[30vw] bg-slate-400 rounded-sm' type="text" value={todo} />
          <button name={editid} onClick={handadd} className='font-bold bg-green-600 rounded-md text-[10px] px-[15px]'>Save</button>
        </div>
        <div className="line w-[42vw] bg-green-300 h-[1px] mx-auto mt-3"></div>
        <div className="task w-[42vw] h-[70%] mt-4 mx-auto overflow-scroll no-scrollbar">
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

          {todos.length === 0 && (
            <div className="text-white">No todos to display</div>
          )}

          <div className="todos mt-2">
            {filteredTodos.map((element) => {
              return (
                <div key={element.id} className='flex justify-between w-[95%] mx-auto my-2'>
                  <div className={`flex justify-center items-center`}>
                    <input type="checkbox" name={element.id} onChange={handcheck} checked={element.iscomplete} />
                    <div className={element.iscomplete ? "line-through" : ""}>&nbsp;{element.task}</div>
                  </div>
                  <div className="buttons flex gap-[4px] h-max no-underline ">
                    <button name={element.id} edit={editid} className='px-2 bg-blue-700 py-[3px] text-[10px] font-bold rounded-[3px]' onClick={handedit}>Edit</button>
                    <button name={element.id} className='px-2 bg-red-700 py-[3px] text-[10px] font-bold rounded-[3px]' onClick={handdelete}>Delete</button>
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
