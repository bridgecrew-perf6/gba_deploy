import axios from 'axios'

const ITEMS_REST_API_URL = 'http://localhost:8070/items';

// const ADD_ITEM_URL = "http://localhost:8070/items/additem";

class ItemService{

    getItems(){
        return axios.get(ITEMS_REST_API_URL);
    }

    createItem(item){
        return axios.post(ITEMS_REST_API_URL + '/additem', item);
    }

    getItemById(itemId){
        return axios.get(ITEMS_REST_API_URL + '/find/' + itemId);

    }

    updateItem(item, itemId){
        return axios.put(ITEMS_REST_API_URL + '/update/' + itemId, item)    
    }

    deleteItem(itemId){
        return axios.delete(ITEMS_REST_API_URL + '/delete/' + itemId);
    }

    findItemByName(item){
        return axios.get(ITEMS_REST_API_URL + '/search/' + item);
    }

}

export default new ItemService()