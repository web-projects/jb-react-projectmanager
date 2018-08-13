import React, { Component } from 'react';

import PropTypes from 'prop-types';
import uuid      from 'uuid';
import $         from 'jquery';

import './App.css';

import Projects   from './components/Projects.js';
import AddProject from './components/AddProject.js';
import Todos      from './components/Todos.js';

class App extends Component {

  constructor() {

    super();

    this.state = {
      projects: [],
      todos   : []
    }
  }

  getToDos() {
    $.ajax({
      url     : 'https://jsonplaceholder.typicode.com/todos',
      dataType: 'json',
      cache   : false,
      success : function(data) {
        this.setState({todos: data}, function() {
          console.log(this.state);
        });
      }.bind(this),
      error   : function(xhr, status, err) {
        console.log(err);
      }
    })
  }

  getProjects() {
    this.setState({projects: [
      {
        id      : uuid.v4(),
        title   : 'Business Website',
        category: 'Web Design'
      },
      {
        id      : uuid.v4(),
        title   : 'Social App',
        category: 'Mobile Development'
      },
      {
        id      : uuid.v4(),
        title   : 'eCommerce Shopping Cart',
        category: 'Web Develpment'
      }
    ]});
  }

  // Lifecycle Method to Initialize objects
  componentWillMount() {
    this.getProjects();
    this.getToDos();
  }

  componentDidMount() {
    this.getToDos();
  }

  handleAddProject(project) {
    //console.log(project);
    let projects = this.state.projects;
    projects.push(project);
    // reset the state
    this.setState({projects:projects});
  }

  handleDeleteProject(id) {
    let projects = this.state.projects;
    let index = projects.findIndex(x => x.id === id);
    projects.splice(index, 1);
    // reset the state
    this.setState({projects:projects});
  }

  render() {

    //console.log(this.state);

    return (
      <div className="App">
        <AddProject addProject={this.handleAddProject.bind(this)}/>
        <Projects projects={this.state.projects} onDelete={this.handleDeleteProject.bind(this)}/>
        <hr />
        <Todos todos={this.state.todos}/>
      </div>
    );
  }
}

App.propTypes = {
  projects: PropTypes.array,
  onDelete: PropTypes.func
}

export default App;
