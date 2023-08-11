import { Socket } from 'socket.io-client';
import Input from './Input/Input';
import Messages from './Messages/Messages';
import TagsList from './TagsList/TagsList';
import './Chat.css';
import { Paper } from '@mui/material';
import { TagsContextProvider } from '../contexts/TagContext';

interface Props {
    socket: Socket;
}

const Chat = ({ socket }: Props) => {
    const sendMessage = (text: string, tags: string[]) => {
        socket.emit('send_message', {
            text: text,
            tags: tags,
        });
    };

    return (
        <TagsContextProvider>
            <Paper className='chat-layout' variant='elevation'>
                <TagsList socket={socket} />

                <div className='chat-box'>
                    <Messages socket={socket} />
                    <Input sendMessage={sendMessage} />
                </div>
            </Paper>
        </TagsContextProvider>
    );
};

export default Chat;
