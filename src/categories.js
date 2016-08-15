import $ from 'jquery';
import React, { Component } from 'react';
import CategoriesBox from './categoriesBox';
import CategoryDetails from './categoryDetails';

/**
  View-1:
    - Categories
      - CategoriesBox
        - CategorySearch
        - CategoriesList
          - CategoryItem
  View-2:
    - Categories
      - CategoryDetails
*/

class Categories extends Component {
  constructor(){
    super();
    this.state = {
      viewName: 'list',
      categoryId: null
    };
  }

  componentDidMount() {
    // List the switch view request
    $('#category-container').on('event.switch.view', (function(event, arg) {
      this.setState({
        viewName: arg.name,
        categoryId: arg.id
      });
    }).bind(this));
  }

  render(){
    var view;
    if(this.state.viewName === 'list') {
      view = <CategoriesBox />;
    }
    else {
      view = <CategoryDetails categoryId={this.state.categoryId}/>
    }

    return (
      <div id="category-container" className="row">
        <div className="page-header">
          <h3>Category Information</h3>
        </div>
        <div className="col-md-12 text-align-left">
          {view}
        </div>
      </div>
    );
  };
}

export default Categories;
