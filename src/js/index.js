import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import { elements, renderLoader, clearLoader } from './views/base';


/**  
 * Global state of the app
 * 1. Search object
 * 2. Current recipe object
 * 3. Shopping list object
 * 4. Liked recipes
 */

const state = {};


/**
 * SEARCH CONTROLLER
 */

const controlSearch = async () => {
    // 1. Get query from view
    const query = searchView.getInput();

    if(query){
        // 2. New search object and add to state
        state.search = new Search(query);

        // 3. prepare UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchResult);

        // 4 Search for recipes
        await state.search.getResults();

        // 5. render results for recipes
        clearLoader();
       searchView.renderResults(state.search.recipes); 
    }
  };

  // event listener on search form
elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
  });

  // event listener on pagination
elements.searchResultPages.addEventListener('click', e => {
    // closest element to click 
    const btn = e.target.closest('.btn-inline');
    if(btn){
        // get the page number
        const goToPage = parseInt(btn.dataset.goto, 10);
        // clear results
        searchView.clearResults();
        // go to the page and render the results
        searchView.renderResults(state.search.recipes, goToPage); 
        console.log(goToPage);
      }
});

/**
 * RECIPE CONTROLLER
 */

 const controlRecipe = async () => {
     // get id from url
    const id = window.location.hash.replace('#', '');
    console.log(id);
    if(id){
        // prepare ui for changes
        
        // create new recipe object
        state.recipe = new Recipe(id);

        // create new recipe object

        // get recipe data
        await state.recipe.getRecipe();

        // calculate servings and time
        state.recipe.calcTime();
        state.recipe.calcServings();

        // render recipe
        console.log(state.recipe);
    }
 }

 ['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));

//window.addEventListener('hashchange', controlRecipe);
//window.addEventListener('load', controlRecipe);

 /*
 const r = new Recipe('recipe_1b6dfeaf0988f96b187c7c9bb69a14fa');
 r.getRecipe();
 console.log(r);
*/

