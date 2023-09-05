import { en } from './en';

const data = {
    en,
};

export const locale = (key: string, language = 'en') => data[language][key];
