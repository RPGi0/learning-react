import React, { Component } from 'react';
import uuid from 'uuid';
import Projects from './components/Projects';
import AddProject from './components/AddProject'
import $ from 'jquery';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      todos: []
    }
  }

  getTodos(){
    $.ajax({
      url: 'https://jsonplaceholder.typicode.com/todos',
      dataType:'json',
      cache:'fasle',
      success: function(data){
        this.setState({todos: data}, function(){
          console.log(this.state)
        });
      }.bind(this),
      error: function(xhr,status,err){
        console.log(err)
      }
    });
  }

  getProjects(){
    this.setState({projects: [
      {
        id:uuid.v4(),
        title: 'Business Website',
        catagory: 'Web Design'
      },
      {
        id:uuid.v4(),
        title: 'Social App',
        catagory: 'Mobile Development'
      },
      {
        id:uuid.v4(),
        title: 'eCommerce Shopping Cart',
        catagory: 'Web Development'
      }
      ]});
  }

componentWillMount(){
  this.getProjects();
  this.getTodos();
}

componentDidMount() {
  this.getTodos();
}

handleAddProject(project){
  let projects = this.state.projects; //set variable equal to state of 'projects'
  projects.push(project); //push the changes added to new variable onto the old array
  this.setState({projects:projects});//set state to updated variable
};

handleDeleteProject(id){
  let projects = this.state.projects;
  let index = projects.findIndex(x => x.id === id);
  projects.splice(index, 1);
  this.setState({projects:projects});
};

  render() {
    return (
      <div className="App">
        <AddProject
          addProject={this.handleAddProject.bind(this)}
        />
        <Projects
          projects={this.state.projects}
          onDelete={this.handleDeleteProject.bind(this)}
        />
      </div>
    );
  }
}

export default App;
