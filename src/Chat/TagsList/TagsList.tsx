import { useEffect } from 'react';
import { Socket } from 'socket.io-client';
import Tag from './Tag/Tag';
import { Typography } from '@mui/material';
import './TagsList.css';
import { useTagsContext } from '../../contexts/TagContext';

interface Props {
    socket: Socket;
}
const TagsList = ({ socket }: Props) => {
    const { storedTags, setStoredTags } = useTagsContext();

    useEffect(() => {
        const handler = (data: Tag[]) => setStoredTags(data);
        socket.on('recive_stored_tags', handler);
        return () => {
            socket.off('recive_stored_tags', handler);
        };
    }, [socket, setStoredTags]);

    return (
        <div>
            <Typography variant='h6'>My tags: </Typography>
            <div className='tags-list'>
                {storedTags.map((tag) => {
                    return <Tag tag={tag} key={tag.id} />;
                })}
            </div>
        </div>
    );
};
export default TagsList;
