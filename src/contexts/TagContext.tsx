/* eslint-disable @typescript-eslint/no-empty-function */
import {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    useContext,
    useState,
} from 'react';

interface TagsContextValue {
    selectedTags: Tag[];
    setSelectedTags: Dispatch<SetStateAction<Tag[]>>;
    storedTags: Tag[];
    setStoredTags: Dispatch<SetStateAction<Tag[]>>;
}

const initialData = {
    selectedTags: [],
    setSelectedTags: () => {},
    storedTags: [],
    setStoredTags: () => {},
};

const TagsContext = createContext<TagsContextValue>(initialData);

interface Props {
    children: ReactNode;
}

export const TagsContextProvider = ({ children }: Props) => {
    const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
    const [storedTags, setStoredTags] = useState<Tag[]>([]);

    return (
        <TagsContext.Provider
            value={{ selectedTags, setSelectedTags, storedTags, setStoredTags }}
        >
            {children}
        </TagsContext.Provider>
    );
};

export const useTagsContext = () => useContext(TagsContext);
