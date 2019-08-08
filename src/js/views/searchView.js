import { elements } from './base';

export const getInput = () => elements.searchInput.value;

export const clearInput = () => { 
    elements.searchInput.value = '';
};

export const clearResults = () => {
    elements.searchResultList.innerHTML = '';
    elements.searchResultPages.innerHTML = '';
};

const limitRecipeTitle = (recipeTitle, limit = 17) => {
    const newTitle = [];
    if(recipeTitle.length > limit){
        recipeTitle.split(' ').reduce((acc, cur) => {
            if(acc + cur.length <= limit){
                newTitle.push(cur);
              }
              return acc + cur.length;
          }, 0);
          return `${newTitle.join(' ')}...`;
      }
    return recipeTitle;
};

const renderRecipe = recipe => {
    const getID = (uri) => uri.split('#')[1];
    const markup = `
        <li>
            <a class="results__link" href="#${getID(recipe.recipe.uri)}">
                <figure class="results__fig">
                    <img src="${recipe.recipe.image}" alt="${recipe.recipe.label}">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${limitRecipeTitle(recipe.recipe.label)}</h4>
                    <p class="results__author">${recipe.recipe.source}</p>
                </div>
            </a>
        </li>
    `;
    elements.searchResultList.insertAdjacentHTML('beforeend', markup);
};

/*
export const renderResults = recipes => {
    recipes.forEach(renderRecipe);
};
*/

const createButton = (page, type) =>
     `<button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1}>
            <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
            <svg class="search__icon">
                <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
            </svg>
      </button>
   `;  


const renderButtons = (page, totalResults, resultsPerPage) => {
    const pages = Math.ceil(totalResults / resultsPerPage);
    let button;
    // first page
    if(page === 1 && pages > 1){
        // next button
        button = createButton(page, 'next');
      }

    // middle page
    else if(page < pages){
        // next and previous buttons
        button = `
                ${createButton(page, 'next')}
                ${createButton(page, 'prev')}
          `;
      }

    // last page
    else if(page === pages && pages > 1){
        // previous button
        button = createButton(page, 'prev');
      }
    elements.searchResultPages.insertAdjacentHTML('afterbegin', button);
};

export const renderResults = (recipes, page = 1, resultsPerPage = 10) => {
    // render results of current page
    const start = (page - 1) * resultsPerPage;
    const end = page * resultsPerPage;
    recipes.slice(start, end).forEach(renderRecipe);

    //render pagination buttons
    renderButtons(page, recipes.length, resultsPerPage);
};