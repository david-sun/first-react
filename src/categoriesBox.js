import $ from 'jquery';
import React, { Component } from 'react';
import {loadCategories} from './services/Dao';

/**
  Props:
  States:
    - filterText:
    - categoryList:
 */
class CategoriesBox extends Component {
  constructor() {
    super();
    // init the state
    this.state = {
      filterText: '',
      categorylist: []
    };
  }

  // Load category list
  componentDidMount() {
    loadCategories('https://api.content.vodeclic.com/eproduct/v1/categories')
    .done((function(res){
      this.setState({
        categoryList:res
      });
    }).bind(this));
  }

  handleUserInput(filterText) {
    // When there's a change in the state, the component and all its
    // sub-components get updated.
    this.setState({
      filterText: filterText
    });
  }

  render() {
    return (
      <div>
        <CategorySearch filterText={this.state.filterText} onUserInput={this.handleUserInput.bind(this)} />
        <CategoriesList filterText={this.state.filterText} categories={this.state.categoryList} />
      </div>
    );
  }
}

/**
  Props:
    - onUserInput: The link to its parent component function to updates its parent state
    - filterText: The value of its input box, and this property is updated by its parent states.
  States:
 */
class CategorySearch extends Component {
  handleChange() {
    // passing filter data up by using a callback
    this.props.onUserInput (
      // ref is like the id
      this.refs.filterTextInput.value
    );
  }

	render() {
		return (
      <div className="row">
        <div className="col-md-6">
          <form>
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                placeholder="Search for one keyword..."
                ref="filterTextInput"
                value={this.props.filterText}
                onChange={this.handleChange.bind(this)} />
            </div>
          </form>
        </div>
      </div>
    );
	}
}

/**
  Props:
    - categories: The array of categories that will render on the screen
    - filterText: The string of key words that will be used to filter categories array
  States:
 */
class CategoriesList extends Component {
  render() {
    var categoryNodes;
    if(this.props.categories) {
      categoryNodes = this.props.categories
      .filter((function(category){
        var filterStr = this.props.filterText;
        return category.name.toLowerCase().indexOf(filterStr.toLowerCase())>=0;
      }).bind(this))
      .map(function(category) {
        return (
          <CategoryItem key={category.id} name={category.name} id={category.id} />
        );
      });
    }

    return(
      <div>
        <ul className="list-group">
          {categoryNodes}
        </ul>
      </div>
    );
  }
}

class CategoryItem extends Component {
  switchVeiwRequested() {
    $('#category-container').trigger('event.switch.view', {name: 'detail', id: this.props.id});
  }
  render() {
    return(
      <li className="list-group-item">
        <span className="badge" title="id">{this.props.id}</span>
        <span>
          <a onClick={this.switchVeiwRequested.bind(this)}
            className="cursor-pointer">
              {this.props.name}
          </a>
        </span>
      </li>
    );
  }
}

export default CategoriesBox;
