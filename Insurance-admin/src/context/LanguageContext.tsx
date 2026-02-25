import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import en from '../i18n/en.json';
import am from '../i18n/am.json';

type Language = 'en' | 'am';
type TranslationDict = Record<string, any>;

const translations: Record<Language, TranslationDict> = { en, am };

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
    language: 'en',
    setLanguage: () => { },
    t: (key: string) => key,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguageState] = useState<Language>(
        () => (localStorage.getItem('admin-lang') as Language) || 'en'
    );

    const setLanguage = useCallback((lang: Language) => {
        setLanguageState(lang);
        localStorage.setItem('admin-lang', lang);
    }, []);

    const t = useCallback((key: string): string => {
        const keys = key.split('.');
        let value: any = translations[language];
        for (const k of keys) {
            if (value && typeof value === 'object' && k in value) {
                value = value[k];
            } else {
                return key;
            }
        }
        return typeof value === 'string' ? value : key;
    }, [language]);

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useTranslation() {
    return useContext(LanguageContext);
}

export default LanguageContext;
