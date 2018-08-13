import React, { Component } from 'react';
import uuid from 'uuid';
import PropTypes from 'prop-types'

class AddProject extends Component {

  constructor() {
    super();
    this.state = {
      newProject:{}
    }
  }

  static defaultProps = {
      categories: [ 'Web Design', 'Web Development', 'Mobile Develpment']
  }

  handleSubmit(e) {

    if(this.refs.title.value === '') {
      alert('title is required');
    }
    else {
      console.log(this.refs.title.value);

      this.setState({newProject:{
        id      : uuid.v4(),
        title   : this.refs.title.value,
        category: this.refs.category.value
      }}, function() {
        //console.log(this.state);
        this.props.addProject(this.state.newProject);
      });

    }

    e.preventDefault();
  }

  render() {

    let categoryOptions = this.props.categories.map(category => {
      return <option key={category} value={category}>{category}</option>
    });

    return (
      <div>
        <h3>Add Project</h3>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div>
            <label>Title</label><br />
            <input type="text" ref="title" />
          </div>
          <div>
            <label>Category</label><br />
            <select ref="category">
              {categoryOptions}
            </select>
          </div>
          <br />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

AddProject.propTypes = {
  categories: PropTypes.array,
  addProject: PropTypes.func
}

export default AddProject;
