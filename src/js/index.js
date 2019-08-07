import Search from './models/Search';
import { elements } from './views/base';

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

    const query = 'pizza'
    if(query){
        // 2. New search object and add to state
        state.search = new Search(query);

        // 3. prepare UI for results

        // 4 Search for recipes
        await state.search.getResults();

        // 5. render results for recipes
        console.log(state.search.recipes); 
    }
  };

  // event listener on search form
elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
  });


