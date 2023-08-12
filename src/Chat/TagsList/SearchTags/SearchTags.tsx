import { InlineAutocomplete } from '@primer/react/drafts';
import { ThemeProvider, Textarea } from '@primer/react';
import { useState } from 'react';
import { useTagsContext } from '../../../contexts/TagContext';
import { parseValue } from '../../hooks/useParseInput';

const SearchTags = () => {
    const [inputText, setInputText] = useState('');
    const { storedTags, selectedTags, setSelectedTags } = useTagsContext();
    const [suggestions, setSuggestions] = useState<string[]>([]);

    const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const line = e.target.value;
        setInputText(line);
        if (line.endsWith('\n') || line.endsWith(' ')) {
            const { tags } = parseValue(line);
            setSelectedTags([
                ...selectedTags,
                ...tags.filter((t) => !selectedTags.includes(t)),
            ]);
            setInputText('');
        }
    };

    return (
        <ThemeProvider>
            <div className='input'>
                <InlineAutocomplete
                    triggers={[{ triggerChar: '#' }]}
                    suggestions={suggestions}
                    onShowSuggestions={({ query }) =>
                        setSuggestions(
                            storedTags
                                .filter((tag) => tag.text.startsWith(query))
                                .map((t) => t.text)
                        )
                    }
                    onHideSuggestions={() => setSuggestions([])}
                >
                    <Textarea
                        value={inputText}
                        onChange={handleInput}
                        block={true}
                        cols={50}
                        rows={1}
                        style={{ fontSize: '1.3em', resize: 'none' }}
                        placeholder='#add-tags'
                    />
                </InlineAutocomplete>
            </div>
        </ThemeProvider>
    );
};

export default SearchTags;
