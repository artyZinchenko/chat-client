import './Messages.css';
import Message from './Message/Message';
import { useEffect, useRef, useState } from 'react';
import { Socket } from 'socket.io-client';
import { Paper } from '@mui/material';
import { useTagsContext } from '../../contexts/TagContext';

interface Props {
    socket: Socket;
}

const Messages = ({ socket }: Props) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const { selectedTags } = useTagsContext();
    const messageEnd = useRef<HTMLDivElement | null>(null);

    const displayedMessages =
        selectedTags.length > 0
            ? messages.filter((message) => {
                  return message.tags.some((tag) =>
                      selectedTags.find((selected) => selected.text === tag)
                  );
              })
            : messages;

    useEffect(() => {
        const handler = (data: Message[]) => setMessages(data);
        socket.on('recieve_stored_messages', handler);
        return () => {
            socket.off('recieve_stored_messages', handler);
        };
    }, [socket]);

    useEffect(() => {
        const handler = (data: Message[]) => setMessages(data);
        socket.on('recieve_message', handler);
        return () => {
            socket.off('recieve_message', handler);
        };
    }, [socket]);

    const scrollToBottom = () => {
        messageEnd.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [socket, messages]);

    return (
        <Paper variant='outlined' className='messages-container'>
            <div className='messages'>
                {displayedMessages.map((message) => {
                    return (
                        <Message
                            text={message.text}
                            key={message.id}
                            tags={message.tags}
                        />
                    );
                })}
                <div ref={messageEnd} />
            </div>
        </Paper>
    );
};

export default Messages;
