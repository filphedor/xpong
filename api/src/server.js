import http from "http";
import { Server } from "socket.io";

const server = http.createServer();
const io = new Server(server);
io.listen(4000);

let emit = function() {
    console.log('emitting')
    io.emit('channel', {'data': 'helloooooo socker io'});

    setTimeout(() => {
        emit()
    }, 2000);
};

emit();

