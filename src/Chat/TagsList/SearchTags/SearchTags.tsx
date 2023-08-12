import { SyntheticEvent, useState } from 'react';
import { useTagsContext } from '../../../contexts/TagContext';
import { Autocomplete, TextField } from '@mui/material';

const SearchTags = () => {
    const [inputValue, setInputValue] = useState('');
    const { storedTags, selectedTags, setSelectedTags } = useTagsContext();

    const handleTagSelected = (
        _event: SyntheticEvent<Element, Event>,
        newValue: string | null
    ) => {
        if (!newValue) {
            setInputValue('');
        } else {
            setSelectedTags([...selectedTags, newValue]);
            setInputValue('');
        }
    };

    return (
        <Autocomplete
            disableClearable
            sx={{ width: 300, paddingTop: '1em' }}
            inputValue={inputValue}
            freeSolo
            disablePortal
            options={storedTags
                .map((t) => t.text)
                .filter((t) => !selectedTags.some((tags) => tags === t))}
            renderInput={(params) => (
                <TextField
                    {...params}
                    onChange={(e) => setInputValue(e.target.value)}
                    label='Add tags'
                />
            )}
            onChange={handleTagSelected}
        />
    );
};

export default SearchTags;
