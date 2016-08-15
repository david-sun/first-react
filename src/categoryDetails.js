import $ from 'jquery';
import React, { Component } from 'react';
import {loadCategory} from './services/Dao';

/**
  Props:
    - categoryId:
  States:
    - category: The details of category
 */
class CategoryDetails extends Component {
  constructor() {
    super();
    this.state = {
      category: null
    };
  }

  backClicked() {
    $('#category-container').trigger('event.switch.view', {name: 'list'});
  }

  componentDidMount() {
    loadCategory('https://api.content.vodeclic.com/eproduct/v1/categories', this.props.categoryId)
    .done((function(res){
      this.setState({
        category:res
      });
    }).bind(this));
  }

  render() {
    var categoryNode;
    if(this.state.category) {
      categoryNode =
        <div className="row">
          <form className="form-horizontal">
            {/* ID */}
            <div className="form-group">
              <label htmlFor="id" className="col-md-2 control-label">ID: </label>
              <div className="col-md-10">
                <input
                  id="id"
                  type="text"
                  className="form-control"
                  placeholder="ID"
                  readOnly
                  value={this.state.category.id}/>
              </div>
            </div>
            {/* Library ID */}
            <div className="form-group">
              <label htmlFor="library-id" className="col-md-2 control-label">Library Id: </label>
              <div className="col-md-10">
                <input
                  id="library-id"
                  type="text"
                  className="form-control"
                  placeholder="ID"
                  readOnly
                  value={this.state.category.library_id}/>
              </div>
            </div>
            {/* Name */}
            <div className="form-group">
              <label htmlFor="name" className="col-md-2 control-label">Name: </label>
              <div className="col-md-10">
                <input
                  id="name"
                  type="text"
                  className="form-control"
                  placeholder="ID"
                  readOnly
                  value={this.state.category.name}/>
              </div>
            </div>
          </form>
        </div>;
    }

    return(
      <div className="row text-align-left">
        <div className="col-md-12">
          {/* Back Button */}
          <div className="row margin-bottom-15px">
            <button
              type="button"
              className="btn btn-primary col-md-3"
              onClick={this.backClicked.bind(this)}>
                Back
            </button>
          </div>
          {/* category details info */}
          {categoryNode}
        </div>
      </div>
    );
  }
}

export default CategoryDetails;
