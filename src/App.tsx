import { io } from 'socket.io-client';
import Chat from './Chat/Chat';

function App() {
    const socket = io('http://localhost:3001');
    socket.connect();
    socket.on('error', (error) => {
        console.error('Socket error:', error);
    });

    return (
        <div className='container'>
            <Chat socket={socket} />
        </div>
    );
}

export default App;
