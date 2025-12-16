import type { Language } from '@/types';

const dictionaries = {
    ar: () => import('@/dictionaries/ar.json').then((module) => module.default),
    en: () => import('@/dictionaries/en.json').then((module) => module.default),
};

export const getDictionary = async (locale: Language) => {
    return dictionaries[locale]();
};

export const getDirection = (locale: Language): 'rtl' | 'ltr' => {
    return locale === 'ar' ? 'rtl' : 'ltr';
};

export const getOppositeLanguage = (locale: Language): Language => {
    return locale === 'ar' ? 'en' : 'ar';
};

export const formatDate = (date: string, locale: Language): string => {
    return new Date(date).toLocaleDateString(
        locale === 'ar' ? 'ar-SA' : 'en-US',
        {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        }
    );
};

export const languages: Language[] = ['ar', 'en'];

export const languageNames: Record<Language, string> = {
    ar: 'العربية',
    en: 'English',
};
