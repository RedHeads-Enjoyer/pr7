import React from "react";
import axios from "axios";
import {baseURL} from "../utils/constant";

const List = ({id, task, setUpdateUI, updateMode}) => {
    const removeTask = () => {
        axios.delete(`${baseURL}/delete/${id}`).then((res) => {
            console.log(res);
            setUpdateUI((prevState) => !prevState)
        })
    }

    return <li>
        {task}
        <button onClick={() => updateMode(id, task)}>Изменить</button>
        <button onClick={removeTask}>Удалить</button>
    </li>
}

export default List