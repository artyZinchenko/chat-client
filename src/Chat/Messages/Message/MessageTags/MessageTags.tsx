import { Typography } from '@mui/material';
import './MessageTags.css';
import { blue } from '@mui/material/colors';

interface Props {
    tags: string[];
}
const MessageTags = ({ tags }: Props) => {
    if (tags.length > 0) {
        return (
            <div className='message-tags'>
                {tags.map((tag) => {
                    return (
                        <Typography
                            variant='caption'
                            color={blue[400]}
                            key={tag}
                        >
                            #{tag}
                        </Typography>
                    );
                })}
            </div>
        );
    } else return null;
};
export default MessageTags;
