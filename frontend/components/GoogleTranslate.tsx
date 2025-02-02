'use client';
import { useEffect } from 'react';

declare global {
    interface Window {
        google: any;
        googleTranslateElementInit: () => void;
    }
}

const GoogleTranslate = () => {
    useEffect(() => {
        // Dynamically load the Google Translate script and initialize it
        const script = document.createElement('script');
        script.src =
            'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
        script.async = true;
        document.body.appendChild(script);

        // Initialize Google Translate widget once the script has loaded
        window.googleTranslateElementInit = () => {
            new window.google.translate.TranslateElement(
                { pageLanguage: 'en' },
                'google_translate_element'
            );
        };

        // Cleanup the script when the component is unmounted
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return <div id="google_translate_element"></div>;
};

export default GoogleTranslate;
