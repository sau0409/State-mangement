import PubSub from "./pubsub/pubsub.js";

export default class Store {
  constructor(args) {
    let self = this;
    //create pubsub class instance
    self.events = new PubSub();

    //initializing actions, mutations, state
    self.actions = {};
    self.mutations = {};
    self.state = {};

    //assigning actions, mutations
    if ("mutations" in args) {
      self.mutations = args.mutations;
    }

    if ("actions" in args) {
      self.actions = args.actions;
    }

    //creating proxy for state
    self.state = new Proxy(args.state, {
      set(obj, key, value) {
        obj[key] = value;
        console.log(`STORE: StateChange Obj: ${obj} Key: ${key} Data: ${value}`);
        //publishing event
        self.events.publish("stateChange", self.state);
        return true;
      },
    });
  }

  dispatch(actionName, data) {
    let self = this;
    if (self.actions[actionName]) {
      self.actions[actionName](self, data);
      return true;
    } else {
      throw new Error(`Action: ${actionName} does not exist`);
    }
  }

  commit(mutationName, data) {
    let self = this;

    if (self.mutations[mutationName]) {
      //return new state
      let newState = self.mutations[mutationName](self.state, data);
      //merging new state and currwnt state
      self.state = Object.assign(self.state, newState);
      return true;
    } else {
      throw new Error(`Mutation: ${mutationName} does not exist`);
    }
  }
}
