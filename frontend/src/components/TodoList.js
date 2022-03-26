// import React from 'react'
//

const TodoItem = ({todos}) => {
    return (
        <tr>
            {/*<td>*/}
            {/*    {todo.id}*/}
            {/*</td>*/}
            <td>
                {todos.project}
            </td>
            <td>
                {todos.text}
            </td>
            <td>
                {todos.user}
            </td>
        </tr>
    )
}

const TodoList = ({todo}) => {
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
            {todo.map((todos) => <TodoItem todos={todos}/>)}
        </table>
    )
}
export default TodoList