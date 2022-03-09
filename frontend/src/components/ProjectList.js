import React from 'react'
import {Link} from 'react-router-dom'


const ProjectItem = ({projects}) => {
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
        </tr>
    )
}

const ProjectList = ({project}) => {
    return (
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
            {project.map((projects) => <ProjectItem projects={projects}/>)}
        </table>
    )
}

export default ProjectList