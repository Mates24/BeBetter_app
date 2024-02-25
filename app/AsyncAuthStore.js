import { BaseAuthStore } from "pocketbase";
import AsyncStorage from "@react-native-async-storage/async-storage";

class AsyncAuthStore extends BaseAuthStore {
    /**
     * @param {String} storageKey
     */
    constructor(storageKey = "pb_auth") {
        super();

        this.storageKey = storageKey;
        this.queue = [];

        this._enqueue(async () => {
            const raw = await AsyncStorage.getItem(this.storageKey);
            if (raw) {
                const decoded = JSON.parse(raw);
                this.save(decoded.token, decoded.model);
            }
        });
    }

    /**
     * @inheritdoc
     */
    save(token, model) {
        super.save(token, model);

        this._enqueue(() => {
            return AsyncStorage.setItem(this.storageKey, JSON.stringify({ token, model }));
        });
    }

    /**
     * @inheritdoc
     */
    clear() {
        super.clear();

        this._enqueue(() => {
            return AsyncStorage.removeItem(this.storageKey);
        });
    }

    /**
     * Appends an async function to the queue.
     */
    _enqueue(asyncCallback) {
        this.queue.push(asyncCallback);

        if (this.queue.length === 1) {
            this._dequeue();
        }
    }

    /**
     * Starts the queue processing.
     */
    _dequeue() {
        if (!this.queue.length) {
            return;
        }

        this.queue[0]().finally(() => {
            this.queue.shift();

            if (this.queue.length) {
                this._dequeue();
            }
        });
    }
}

export default AsyncAuthStore;
