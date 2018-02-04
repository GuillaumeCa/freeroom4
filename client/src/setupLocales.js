import translate from 'counterpart';

const supportedLangs = ["en", "fr", "es", "zh", "ja"];

supportedLangs.forEach(lang => {
  translate.registerTranslations(lang, require(`./locales/${lang}.json`));
})
// translate.registerTranslations('en', require('./locales/en.json'));
// translate.registerTranslations('zh', require('./locales/zh.json'));
// translate.registerTranslations('ja', require('./locales/ja.json'));

let lang = localStorage.getItem('lang');
if (!lang && supportedLangs.includes(navigator.language)) {
  lang = navigator.language;
}
translate.setLocale(lang || 'fr');