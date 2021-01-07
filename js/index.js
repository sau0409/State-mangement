import store from './store/index.js';
import ShowList from './components/showList.js';

let btn = document.querySelector('.btn');
let input = document.querySelector('.input');
let showList = new ShowList();
showList.render();

btn.addEventListener('click', (ev)=> {
    let item = input.value;
    if(item) {
        store.dispatch('addItem', item);
        input.value = '';
    }
});