import store from "../store/index.js";

export default class ShowList {
  constructor() {
    this.element = document.querySelector(".list-container");
    this.store = store;

    //subscribe to sateChange
    this.store.events.subscribe("stateChange", () => this.render());
    //dispatch delete action
    this.element.addEventListener("click", (ev) => {
      let target = Object.keys(ev.target.dataset)[0];
      let [action, index] = target.split("-");
      if (action === "delete") {
        this.store.dispatch("removeItem", index);
      }
    });
  }

  render() {
    let wholeList = '';
    if (this.store.state.shoppingList.length !== 0) {
      this.store.state.shoppingList.forEach((item, index) => {
        wholeList += `<li>${item} &nbsp;  <span data-delete-${index}>X</span></li>`;
      });
    }
    else {
        wholeList = `<li>No item in list</li>`
    }

    this.element.innerHTML = wholeList;
  }
}
