import React from 'react'
import logo from './logo.svg';
import './App.css';
import MainMenu from './components/MainMenu.js';
import UserList from './components/UserList.js';
import Footer from './components/Footer.js';
import ProjectList from './components/ProjectList.js';
import TodoList from "./components/TodoList.js";
import ProjectPage from "./components/ProjectPage.js";
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
                        <Route exact path='/' element={<ProjectList project={this.state.project}/>}/>
                        <Route exact path='/users' element={<UserList users={this.state.users}/>}/>
                        <Route exact path='/todo' element={<TodoList todo={this.state.todo}/>}/>
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
