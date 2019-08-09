import uniqid from 'uniqid';
import { throws } from 'assert';

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
        this.items.push(item);
        return item;
    }

    deleteItem(id){
        // find element to be deleted
        const index = this.items.findIndex(el => el.id === id);
        // delete the item and mutate the array
        this.items.splice(index, 1);
    }

    updateCount(id, newCount){
        this.items.find(el => el.id === id).count = newCount;
    }
}