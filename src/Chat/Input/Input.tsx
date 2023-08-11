import { Button } from '@mui/material';
import './Input.css';
import { useState } from 'react';
import { useTagsContext } from '../../contexts/TagContext';
import { useParseInput } from './hooks/useParseInput';
import { InlineAutocomplete } from '@primer/react/drafts';
import { ThemeProvider, Textarea } from '@primer/react';

interface Props {
    sendMessage: (arg0: string, arg1: string[]) => void;
}

const InputText = ({ sendMessage }: Props) => {
    const [inputText, setInputText] = useState('');
    const { storedTags } = useTagsContext();
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const { message, tags } = useParseInput(inputText);

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
                        onChange={(e) => setInputText(e.target.value)}
                        block={true}
                        cols={100}
                        style={{ fontSize: '1.3em', resize: 'none' }}
                    />
                </InlineAutocomplete>
                <Button
                    variant='outlined'
                    disabled={message.length > 0 ? false : true}
                    onClick={() => {
                        setInputText('');
                        sendMessage(message, tags);
                    }}
                >
                    Send
                </Button>
            </div>
        </ThemeProvider>
    );
};

export default InputText;
