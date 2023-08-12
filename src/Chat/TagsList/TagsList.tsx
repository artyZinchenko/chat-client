import { useEffect } from 'react';
import { Socket } from 'socket.io-client';
import Tag from './Tag/Tag';
import { Typography } from '@mui/material';
import './TagsList.css';
import { useTagsContext } from '../../contexts/TagContext';
import SearchTags from './SearchTags/SearchTags';

interface Props {
    socket: Socket;
}

const TagsList = ({ socket }: Props) => {
    const { selectedTags, setStoredTags } = useTagsContext();

    useEffect(() => {
        const handler = (data: Tag[]) => setStoredTags(data);
        socket.on('recive_stored_tags', handler);
        return () => {
            socket.off('recive_stored_tags', handler);
        };
    }, [socket, setStoredTags]);

    return (
        <div>
            <SearchTags />
            <Typography variant='h6'>My tags: </Typography>
            <div className='tags-list'>
                {selectedTags.map((tag) => {
                    return <Tag tag={tag} key={tag} />;
                })}
            </div>
        </div>
    );
};
export default TagsList;
