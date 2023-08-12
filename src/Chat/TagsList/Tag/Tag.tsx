import { Paper, Typography } from '@mui/material';
import { useTagsContext } from '../../../contexts/TagContext';
import './Tag.css';

interface Props {
    tag: string;
}
const Tag = ({ tag }: Props) => {
    const { selectedTags, setSelectedTags } = useTagsContext();

    const handleClick = () => {
        setSelectedTags(selectedTags.filter((t) => t !== tag));
    };

    return (
        <Paper className='taglist-tag' onClick={handleClick}>
            <Typography variant='caption'>#{tag}</Typography>
        </Paper>
    );
};

export default Tag;
