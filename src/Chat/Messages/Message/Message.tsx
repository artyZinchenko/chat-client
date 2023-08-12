import { Typography } from '@mui/material';
import './message.css';
import MessageTags from './MessageTags/MessageTags';

interface Props {
    text: string | null;
    tags: string[];
}
const Message = ({ text, tags }: Props) => {
    return (
        <div className='message'>
            <MessageTags tags={tags} />
            <Typography variant='body1'>{text}</Typography>
        </div>
    );
};

export default Message;
