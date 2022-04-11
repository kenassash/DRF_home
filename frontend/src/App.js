import React from 'react'
import logo from './logo.svg';
import './App.css';
import MainMenu from './components/MainMenu.js';
import UserList from './components/UserList.js';
import Footer from './components/Footer.js';
import ProjectList from './components/ProjectList.js';
import TodoList from "./components/TodoList.js";
import ProjectPage from "./components/ProjectPage.js";
import TodoForm from "./components/TodoForm";
import ProjectForm from "./components/ProjectForm";
import ProjectFormFind from "./components/ProjectFormFind";
import LoginForm from "./components/LoginForm.js";
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
            'token': '',
        }
    }

    getData() {
        let headers = this.getHeader()

        axios
            .get('http://localhost:8000/api/users/', {headers})
            .then(response => {
                const users = response.data
                this.setState({
                    'users': users
                })
            })
            .catch(error => {
                console.log(error)
                this.setState({
                    'users': []
                })
            })
        axios
            .get('http://localhost:8000/api/project/', {headers})
            .then(response => {
                const project = response.data
                this.setState({
                    'project': project
                })
            })
            .catch(error => {
                console.log(error)
                this.setState({
                    'project': []
                })
            })

        axios
            .get('http://localhost:8000/api/todo/', {headers})
            .then(response => {
                const todo = response.data
                this.setState({
                    'todo': todo
                })
            })
            .catch(error => {
                console.log(error)
                this.setState({
                    'todo': []
                })
            })
    }

    componentDidMount() {
        let token = localStorage.getItem('token')
        this.setState({
            'token': token
        }, this.getData)
    }

    isAuth() {
        return !!this.state.token
    }

    getHeader() {
        if (this.isAuth()) {
            return {
                'Authorization': 'Token ' + this.state.token
            }
        }
        return {}
    }

    getToken(login, password) {
        console.log(login, password)
        axios
            .post('http://127.0.0.1:8000/api-token-auth/', {'username': login, 'password': password})
            .then(response => {
                const token = response.data.token
                console.log(token)
                localStorage.setItem('token', token)
                this.setState({
                    'token': token
                }, this.getData)
            })
            .catch(error => console.log(error))
    }

    logout() {
        localStorage.setItem('token', '')
        this.setState({
            'token': ''
        }, this.getData)
    }



    deleteTodo(id) {
        const headers = this.get_headers()
        axios
            .delete(`http://127.0.0.1:8000/api/todos/${id}`, {headers})
            .then(response => {
                this.setState({todos: this.state.todos.filter((item) => item.id !== id)})
            })
            .catch(error => console.log(error))
    }

    deleteProject(id) {
        const headers = this.get_headers()
        axios
            .delete(`http://127.0.0.1:8000/api/projects/${id}`, {headers})
            .then(response => {
                this.setState({projects: this.state.projects.filter((item) => item.id !== id)})
            })
            .catch(error => console.log(error))
    }

    createTodo(text, project, user) {
        const headers = this.get_headers()
        const data = {text: text, project: project, user: user}
        axios.post(`http://127.0.0.1:8000/api/todos/`, data, {headers})
            .then(response => {
                let new_todo = response.data
                const project = this.state.projects.filter((item) => item.id === new_todo.project)[0]
                const user = this.state.users.filter((item) => item.id === new_todo.user)[0]
                new_todo.project = project
                new_todo.user = user
                this.setState({todos: [...this.state.todos, new_todo]})
            }).catch(error => console.log(error))
    }

    createProject(name, repository) {
        const headers = this.get_headers()
        const data = {name: name, repository: repository}
        axios.post(`http://127.0.0.1:8000/api/projects/`, data, {headers})
            .then(response => {
                let new_project = response.data
                this.setState({projects: [...this.state.projects, new_project]})
            }).catch(error => console.log(error))

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
                        <li>
                            {this.isAuth() ? <button onClick={() => this.logout()}>Logout</button> :
                                <Link to='/login'>Login</Link>}
                        </li>
                    </nav>
                    <Routes>
                        <Route exact path='/' component={() => <ProjectList projects={this.state.projects}
                                                                                deleteProject={(id) => this.deleteProject(id)}/>}/>
                        <Route exact path='/users' element={<UserList users={this.state.users}/>}/>
                        <Route exact path='/projects/create' component={() => <ProjectForm
                                createProject={(name, repository) => this.createProject(name, repository)}/>}/>
                        <Route exact path='/projects/find' component={() => <ProjectFormFind/>}/>
                        <Route exact path='/todo/create' component={() => <TodoForm projects={this.state.projects}
                                                                                         createTodo={(text, project, user) => this.createTodo(text, project, user)}/>}/>
                        <Route exact path='/todo' element={<TodoList todo={this.state.todo} deleteTodo={(id) => this.deleteTodo(id)}/>}/>
                        <Route exact path='/login'
                               element={<LoginForm getToken={(login, password) => this.getToken(login, password)}/>}/>
                        <Route exact path='/project' element={<Navigate to='/'/>}/>
                        <Route path='/projects/:id' element={<ProjectPage projects={this.state.projects}/>}/>
                        <Route path="*" element={<NotFound/>}/>
                    </Routes>
                    <Footer/>
                </BrowserRouter>
            </div>

        )
    }
}


export default App;
