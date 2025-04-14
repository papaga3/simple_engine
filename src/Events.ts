interface CallBack {
    id: number;
    eventName: string;
    caller: Object;
    callback: (arg: any) => void;
}

class Events {
    callbacks: CallBack[] = [];
    nextID = 0;

    // emit events
    emit(eventName: string, arg: any) {
        this.callbacks.forEach((stored) => {
            if(stored.eventName === eventName) stored.callback(arg)
        })
    }

    // subscribe something happening
    on = (eventName: string, caller: Object, callback: (arg: any) => void) => {
        this.nextID += 1;
        this.callbacks.push({
            id: this.nextID,
            eventName: eventName,
            caller: caller,
            callback: callback
        });
        return this.nextID;
    }

    // remove event
    off = (id: number) => {
        this.callbacks = this.callbacks.filter((stored) => stored.id !== id);
    }

    unsunscribe(caller: Object) {
        this.callbacks = this.callbacks.filter((stored) => stored.caller !== caller );
    }
}

export const events = new Events();