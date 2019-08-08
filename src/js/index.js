import Search from './models/Search';
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
        // go to the page and render the results
        searchView.renderResults(state.search.recipes, goToPage); 
        console.log(goToPage);
      }
});



