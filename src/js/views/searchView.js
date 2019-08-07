import { elements } from './base';

export const getInput = () => elements.searchInput.value;

const renderRecipe = recipe => {
    const getID = (uri) => uri.split('#')[1];

    const markup = `
        <li>
            <a class="results__link" href="#${getID(recipe.uri)}">
                <figure class="results__fig">
                    <img src="${recipe.image}" alt="${recipe.label}">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${recipe.label}</h4>
                    <p class="results__author">${recipe.source}</p>
                </div>
            </a>
        </li>
    `;
    elements.searchResultList.insertAdjacentElement('beforeend', markup);
}

export const renderResults = recipes => {
    recipes.foreach(renderRecipe);
}
