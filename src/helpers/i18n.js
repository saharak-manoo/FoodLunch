'use strict';
import RNLanguages from 'react-native-languages';
import I18n from 'react-native-i18n';

I18n.locale = RNLanguages.language;
I18n.fallbacks = true;
I18n.translations = {
  th: require('../translations/th'),
  en: require('../translations/en'),
};

export default I18n;
