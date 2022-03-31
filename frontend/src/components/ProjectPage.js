import {useParams} from 'react-router-dom'


const ProjectItem = ({projects}) =>{
    return (
        <tr>
            <td>
                {projects.repository}
            </td>
            <td>
                {projects.users}
            </td>
        </tr>
    )
}


const ProjectPage = ({project}) => {
    var {id} = useParams()
    var filteredProjects = project.filter((projects) => projects.id.includes(parseInt(id)))


    return (
        <table>
            <th>
               Repository
            </th>
            <th>
               Name
            </th>
            {filteredProjects.map((projects) => <ProjectItem projects={projects} />)}
        </table>
    )
}

export default ProjectPage