import { useEffect, useState } from 'react';

export const useParseInput = (value: string) => {
    const [_message, setMessage] = useState('');
    const [_tags, setTags] = useState<string[]>([]);

    useEffect(() => {
        const { message, tags } = parseValue(value);

        setMessage(message);
        setTags(tags);
    }, [value]);

    return {
        message: _message,
        tags: _tags,
    };
};

const parseValue = (value: string) => {
    let message = [];
    let tags = [];
    const arr = value.split(/[\n ]+/);

    for (const i of arr) {
        if (i.startsWith('#')) {
            tags.push(i.slice(1));
        } else {
            message.push(i);
        }
    }

    return { message: message.join(' '), tags };
};
