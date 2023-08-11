import { Paper, Typography } from '@mui/material';
import { useTagsContext } from '../../../contexts/TagContext';
import './Tag.css';

interface Props {
    tag: Tag;
}
const Tag = ({ tag }: Props) => {
    const { selectedTags, setSelectedTags } = useTagsContext();
    const selected = selectedTags.find((t) => t.id === tag.id);

    const handleClick = () => {
        if (selected) {
            const filtered = selectedTags.filter((t) => t.id !== tag.id);
            setSelectedTags(filtered);
        } else {
            setSelectedTags([...selectedTags, tag]);
        }
    };

    return (
        <Paper
            sx={{ backgroundColor: selected ? 'azure' : 'inherit' }}
            className='taglist-tag'
            onClick={handleClick}
        >
            <Typography variant='caption'>#{tag.text}</Typography>
        </Paper>
    );
};

export default Tag;
