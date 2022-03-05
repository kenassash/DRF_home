import React from 'react'
import logo from './logo.svg';
import './App.css';
import MainMenu from './components/MainMenu.js';
import UserList from './components/UserList.js';
import Footer from './components/Footer.js';
import ProjectList from './components/ProjectList.js';
import TodoList from "./components/TodoList.js";
import ProjectPage from "./components/ProjectPage.js";
import axios from 'axios'
import {HashRouter, BrowserRouter, Route, Routes, Link, useLocation, Navigate} from 'react-router-dom'

const NotFound = () => {
    let location = useLocation()
    return (
        <div> Page {location.pathname} not found</div>
    )
}

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'users': [],
            'project': [],
            'todo': [],
        }
    }

    componentDidMount() {
        axios
            .get('http://localhost:8000/api/users/')
            .then(response => {
                const users = response.data.results
                this.setState({
                    'users': users
                })
            })
            .catch(error => console.log(error))
        axios
            .get('http://localhost:8000/api/project/')
            .then(response => {
                const project = response.data.results
                this.setState({
                    'project': project
                })
            })
            .catch(error => console.log(error))

        axios
            .get('http://localhost:8000/api/todo/')
            .then(response => {
                const todo = response.data.results
                this.setState({
                    'todo': todo
                })
            })
            .catch(error => console.log(error))

}
    render() {
        return (
            <div>
                <BrowserRouter>
                    <MainMenu/>
                    <nav>
                        <li><Link to='/'>Project</Link></li>
                        <li><Link to='/users'>Users</Link></li>
                        <li><Link to='/todo'>ToDo</Link></li>
                    </nav>
                    <Routes>
                        <Route exact path='/' element={<ProjectList project={this.state.project}/>}/>
                        <Route exact path='/users' element={<UserList users={this.state.users}/>}/>
                        <Route exact path='/todo' element={<TodoList todo={this.state.todo}/>}/>
                        <Route exact path='/project' element = {<Navigate to='/' />} />
                        <Route path='/projects/:id' element = {<ProjectPage projects={this.state.projects} />} />
                        <Route path="*" element={<NotFound/>}/>
                    </Routes>
                    <Footer/>
                </BrowserRouter>
            </div>

        )
    }
}

//
//     render () {
//         return(
//             <div>
//                 <MainMenu />
//                 <UserList users={this.state.users} />
//                 <Footer />
//             </div>
//         )
//     }
// }

export default App;
