import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import { elements, renderLoader, clearLoader } from './views/base';
import Likes from './models/Likes';


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
        try{
            // 4 Search for recipes
            await state.search.getResults();

            // 5. render results for recipes
            if(state.search.recipes.length === 0 ) {
                // no results found
                clearLoader();
                searchView.noResults(query);
             } 
            else 
             {
                // render results 
                clearLoader();
                searchView.renderResults(state.search.recipes);
             }
        }catch(error){
            alert('Something went wrong');
            clearLoader();
        }   
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
    // console.log(id);
    if(id){
        // prepare ui for changes
        recipeView.clearRecipe();
        renderLoader(elements.recipe);

        // highlight selected search item
       if(state.search) searchView.highLightSelected(id);

        // create new recipe object
        state.recipe = new Recipe(id);

        try {
            // get recipe data and parse Ingredients
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();

            // calculate servings and time
            state.recipe.calcTime();
            state.recipe.calcServings();

            // render recipe
           // console.log(state.recipe);
            clearLoader();
            recipeView.renderRecipe(state.recipe);
        }catch(error){
            alert('Error processing recipe');
        }
    
    }
 }

 ['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));


/**
 * SHOPPING LIST CONTROLLER
 */
const controlList = () => {
    // create a new list if there is none yet
    if(!state.list) state.list = new List();

    // add each ingredient to the list and UI
    state.recipe.ingredients.forEach(el => {
        const item = state.list.addItem(el.count, el.unit, el.ingredient);
        listView.renderItem(item);
    });
}


/**
 * LIKE CONTROLLER
 */

 const controlLike = () =>{
    // create like if there is no likes as yet 
    if(!state.like) state.like = new Likes();

    // add a like
    const currentID = state.recipe.id;
    // user not liked current recipe
    if(state.likes.isLiked(currentID)){
        // add like to the state
        const newLike = state.likes.addLike(currentID, state.recipe.title, state.recipe.author, state.recipe.image);

        // toggle like button

        // add like to the UI
        console.log(state.like);
      }
      // user has liked current recipe
    else
      {
        // remove like from the state
        state.likes.deleteLike(currentID);

        // toggle like button

        // remove like from the UI
        console.log(state.like);
      }

 }



 /**
  * EVENT LISTENERS
  */

// handle delete and update list events
elements.shopping.addEventListener('click', e => {
    const id = e.target.closest('.shopping__item').dataset.itemid;

    // handle the delete button 
    if(e.target.matches('.shopping__delete, .shopping__delete *')){
        // delete from state
        state.list.deleteItem(id);

        // delete from UI
        listView.deleteItem(id);
        }
      // update quantity
      else if(e.target.matches('.shopping__count--value')){
            const val = parseFloat(e.target.value, 10);
            state.list.updateCount(id, val);
        }
  });


 // handling recipe button clicks
elements.recipe.addEventListener('click', e =>{
    if(e.target.matches('.btn-decrease, .btn-decrease *')){
        // decrease button is clicked
        if(state.recipe.servings > 1){
            state.recipe.updateServings('dec');
            recipeView.updateServingsIngredients(state.recipe);
          }
      }
    else if(e.target.matches('.btn-increase, .btn-increase *')){
        // increase button is clicked
        state.recipe.updateServings('inc');
        recipeView.updateServingsIngredients(state.recipe);
      }
    else if(e.target.matches('.recipe__btn--add, .recipe__btn--add *')){
        // add item to shopping list if clicked
        controlList();
      }
    else if(e. target.matches('.recipe__love, .recipe__love *')){
        // like button is clicked
        controlLike();
      }
  });
