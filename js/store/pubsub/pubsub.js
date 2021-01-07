export default class PubSub {
    constructor() {
        this.events = {}
    }

    subscribe(eventName, callback) {
        if(eventName in this.events) {
            this.events[eventName].push(callback)
        }
        else {
            this.events[eventName] = [callback];
        }
    }

    publish(eventName, data) {
        if(eventName in this.events) {
            this.events[eventName].forEach(fun => {
                fun(data);
            })
        }
    }
}