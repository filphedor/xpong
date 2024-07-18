import { io } from "socket.io-client";

import Depender from '/depender/depender';


export default class ServerListener {
    constructor(eventHost) {
        this._eventHost = eventHost;
        this._eventBus = Depender.getDependency('eventBus');
        this._socket = null;
        this._isConnected = false;

        this._connectListeners = [];
        this._disconnectListeners = [];
    }

    async connect() {
        if (!this._socket) {
            const socket = io("ws://" + this._eventHost, {
                reconnectionDelayMax: 10000
            });

            socket.on("connect", () => {
                this._isConnected = true;

                this._connectListeners.forEach((listener) => {
                    listener();
                });
            });

            socket.on("disconnect", () => {
                this._isConnected = false;
                
                this._disconnectListeners.forEach((listener) => {
                    listener();
                });
            });

            socket.on("serverUpdate", (data) => {
                this._eventBus.trigger('serverUpdate', data);
            });

            this._socket = socket;
        }
    }

    onConnect(listener) {
        this._connectListeners.push(listener);

        return (() => {
            this._connectListeners.splice(this._connectListeners.indexOf(listener), 1);
        });
    }

    onDisconnect(listener) {
        this._disconnectListeners.push(listener);

        return (() => {
            this._disconnectListeners.splice(this._disconnectListeners.indexOf(listener), 1);
        });
    }
};