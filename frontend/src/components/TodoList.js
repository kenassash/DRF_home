import React from 'react'
import {Link} from 'react-router-dom'


const TodoItem = ({todos, deleteTodo}) => {
    if (todos.is_active) {
        return (
            <tr>
                <td>
                    {todos.id}
                </td>
                <td>
                    {todos.project}
                </td>
                <td>
                    {todos.text}
                </td>
                <td>
                    {todos.user}
                </td>
                <td>
                    <button onClick={() => deleteTodo(todos.id)} type='button'>Delete</button>
                </td>
            </tr>
        )
    }
    return ""
}

const TodoList = ({todo, deleteTodo}) => {
    return (
        <table>
            {/*<th>*/}
            {/*    id*/}
            {/*</th>*/}
            <th>
                Project
            </th>
            <th>
                Text
            </th>
            <th>
                User
            </th>
            {/*{todo.map((todos) => <TodoItem todos={todos}/>)}*/}
            {
                todo.map
                (
                    (todos) => <TodoItem todos={todos} deleteTodo={deleteTodo}/>
                )
            }
        </table>
    )
}
export default TodoList