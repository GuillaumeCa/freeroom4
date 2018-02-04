import translate from 'counterpart';

translate.registerTranslations('fr', require('./locales/fr.json'));
translate.registerTranslations('en', require('./locales/en.json'));

translate.setLocale('fr');