import {useEffect, useState} from "react";
import List from "./components/List";
import axios from "axios";
import {baseURL} from "./utils/constant";

function App() {
    const [input, setInput] = useState("")
    const [tasks, setTasks] = useState([])
    const [updateUI, setUpdateUI] = useState(false)

    useEffect(() => {
        axios.get(`${baseURL}/get`).then((res) => {
            console.log(res.data)
            setTasks(res.data)
        })
    }, [updateUI])

    const addTask = () => {
        axios.post(`${baseURL}/save`, {task: input}).then((res) => {
            console.log(res.data)
            setInput("")
            setUpdateUI(((prevState) => !prevState))
        })
    }

    const updateMode = (id, text) => {
        text = prompt("Введите новый текст", text)
        axios.put(`${baseURL}/update/${id}`, {task: text}).then((res) => {
            console.log(res.data)
            setUpdateUI((prevState) => !prevState)
        })
    }

    return (
        <main>
          <h1>CRUD</h1>
            <input type={"text"} value={input} onChange={(e) => setInput(e.target.value)}/>
            <button type={"submit"} onClick={addTask}>Добавить</button>
            <ul>
                {tasks.map((task) => <List key={task._id} id={task._id} task={task.task} setUpdateUI={setUpdateUI} updateMode={updateMode}/>)}
            </ul>
        </main>
  );
}

export default App;
