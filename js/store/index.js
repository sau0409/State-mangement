import Store from "./store.js";

let state = {
  shoppingList: [],
};

let actions = {
  addItem(context, item) {
    context.commit("addItem", item);
  },

  removeItem(context, item) {
    context.commit("removeItem", item);
  },
};

let mutations = {
  addItem(state, item) {
    
    if (state.shoppingList) {
      state.shoppingList.push(item);
      return state;
    }
  },

  removeItem(state, item) {
    if (state.shoppingList) {
      let index = state.shoppingList.indexOf(item);

      if (index) {
        state.shoppingList.splice(index,1);
        return state;
      }
    }
  },
};

export default new Store({
    state,
    actions,
    mutations
})