import React from 'react'
import {Link} from 'react-router-dom'


const ProjectItem = ({projects, deleteProject}) => {
    return (
        <tr>
            <td>
                {projects.id}
            </td>
            <td>
                <Link to={`projects/${projects.id}`}>{projects.name}</Link>
            </td>
            <td>
                {projects.repository}
            </td>
            <td>
                {projects.users}
            </td>
            <td>
                <button onClick={() => deleteProject(projects.id)} type='button'>Delete</button>
            </td>
        </tr>
    )
}

const ProjectList = ({project, deleteProject}) => {
    return (
        <div>
        <table>
            <th>
                id
            </th>
            <th>
                Project name
            </th>
            <th>
                Repository
            </th>
            <th>
                Users
            </th>
            {project.map((projects) => <ProjectItem projects={projects} deleteProject={deleteProject}/>)}
        </table>
        <Link to='/project/create'>Create</Link>
            /
        <Link to='/project/find'>Find</Link>
        </div>
    )
}

export default ProjectList