import $ from 'jquery';
import {categoriesData} from '../data/categories';
import {categoryDetail} from '../data/category';

export function loadCategories(url) {
  return $.ajax({
    method: 'GET',
    accetp: 'application/json',
    url: url,
    headers:{
      'X-Auth-Token':'ad992fc214ffe90f28334745660b525b',
    },
  })
  .then(function(data, textStatus, jqXHR){
    return data;
  }, function(jqXHR, textStatus, errorThrown){
    // This is dumy data
    return categoriesData;
  });
};

export function loadCategory(url, id) {
  return $.ajax({
    method: 'GET',
    accetp: 'application/json',
    url: url + '/' + id,
    headers:{
      'X-Auth-Token':'ad992fc214ffe90f28334745660b525b',
    },
  })
  .then(function(data, textStatus, jqXHR){
    return data;
  }, function(jqXHR, textStatus, errorThrown){
    // this is dumy data
    return categoryDetail;
  });
};
