import uniqid from 'uniqid';

export default class List{
    constructor(){
        this.items = [];
    }

    addItem (count, unit, ingredient){
        const item = {
            id: uniqid(),
            count,
            unit,
            ingredient
        }
    }

    deleteItem(id){
        // find element to be deleted
        const index = this.items.findIndex(el => el.id === id);
        // delete the item and mutate the array
        this.items.splice(index, 1);
    }

    
}