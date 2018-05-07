import React, { Component } from 'react';
import uuid from 'uuid';

class AddProject extends Component {
  constructor(){
    super();
    this.state = {
      newProject: {}
    }
  }

  static defaultProps = {
    catagories: ['Web Design', 'Web Development', 'Mobile Development']
  }

  handelSubmit(e){
    if(this.refs.title.value === ''){
      alert('Title is required')
    } else {
       this.setState({newProject:{
         id:uuid.v4(),
         title: this.refs.title.value,
         catagory: this.refs.catagory.value
       }}, function (){
         // newProject lives in state, so it needs to be called as such
         this.props.addProject(this.state.newProject)
       });
    }
    e.preventDefault();
  }

  render() {
    let catagoryOptions = this.props.catagories.map(catagory => {
      return <option key={catagory} value={catagory}>{catagory}</option>
    })
    return (
      <div>
        <h3>Add Project</h3>
        <form
          onSubmit={this.handelSubmit.bind(this)} //bind to access 'this' in console.log()
          >
          <div>
            <label>Title</label><br />
            <input type="text" ref="title" />
          </div>
          <br />
          <div>
            <label>Catagory</label><br />
            <select ref="catagory">
              {catagoryOptions}
            </select>
          </div>
          <br />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default AddProject;
