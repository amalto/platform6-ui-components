/**
 * Created by franckmontaigne on 24/06/15.
 */

export interface FlagDef {
  iconShape: string;
  iconColor: string;
  flagLabel: {
    'en-US': string;
    'fr-FR': string;
  };
  //inverse behaviour (true => flag not checked)
  inversed?: boolean;
  defaultSearchState?: boolean;
}

export const flagsDef: { [flagName: string]: FlagDef } = {
  //DESC ORDER (more important to less important)
  //we need desc order because the b2box will display not null values of flags in top of the list only in DESC order

  //BE CAREFUL THIS ONE IS USED HARDCODED IN OTHER FILES
  eunread: {
    iconShape: 'fas fa-envelope',
    iconColor: 'font-color-lighter',
    flagLabel: {
      'en-US': 'Unread',
      'fr-FR': 'Non lu',
    },
  },
  dwarning: {
    iconShape: 'fas fa-exclamation-triangle',
    iconColor: 'danger-color',
    flagLabel: {
      'en-US': 'Warning',
      'fr-FR': 'Attention',
    },
  },
  cimportant: {
    iconShape: 'fas fa-star',
    iconColor: 'warning-color',
    flagLabel: {
      'en-US': 'Important',
      'fr-FR': 'Important',
    },
  },
  binfo: {
    iconShape: 'fas fa-square',
    iconColor: 'info-color',
    flagLabel: {
      'en-US': 'Info',
      'fr-FR': 'Info',
    },
  },
  aok: {
    iconShape: 'fas fa-circle',
    iconColor: 'primary-color',
    flagLabel: {
      'en-US': 'OK',
      'fr-FR': 'OK',
    },
  },
  aavisible: {
    iconShape: 'fas fa-archive',
    iconColor: 'font-color-lighter',
    flagLabel: {
      'en-US': 'Archived',
      'fr-FR': 'Archivé',
    },
    inversed: true,
    defaultSearchState: true,
  },
};

export interface Language {
  languageCode: string;
  languageName: string;
}

export const languageIso: Language[] = [
  {
    languageCode: 'AA',
    languageName: 'Afar',
  },
  {
    languageCode: 'AB',
    languageName: 'Abkhaz',
  },
  {
    languageCode: 'AE',
    languageName: 'Avestan',
  },
  {
    languageCode: 'AF',
    languageName: 'Afrikaans',
  },
  {
    languageCode: 'AK',
    languageName: 'Akan',
  },
  {
    languageCode: 'AM',
    languageName: 'Amharic',
  },
  {
    languageCode: 'AN',
    languageName: 'Aragonese',
  },
  {
    languageCode: 'AR',
    languageName: 'Arabic',
  },
  {
    languageCode: 'AS',
    languageName: 'Assamese',
  },
  {
    languageCode: 'AV',
    languageName: 'Avaric',
  },
  {
    languageCode: 'AY',
    languageName: 'Aymara',
  },
  {
    languageCode: 'AZ',
    languageName: 'Azerbaijani',
  },
  {
    languageCode: 'BA',
    languageName: 'Bashkir',
  },
  {
    languageCode: 'BE',
    languageName: 'Belarusian',
  },
  {
    languageCode: 'BG',
    languageName: 'Bulgarian',
  },
  {
    languageCode: 'BH',
    languageName: 'Bihari',
  },
  {
    languageCode: 'BI',
    languageName: 'Bislama',
  },
  {
    languageCode: 'BM',
    languageName: 'Bambara',
  },
  {
    languageCode: 'BN',
    languageName: 'Bengali',
  },
  {
    languageCode: 'BO',
    languageName: 'Tibetan Standard',
  },
  {
    languageCode: 'BR',
    languageName: 'Breton',
  },
  {
    languageCode: 'BS',
    languageName: 'Bosnian',
  },
  {
    languageCode: 'CA',
    languageName: 'Catalan',
  },
  {
    languageCode: 'CE',
    languageName: 'Chechen',
  },
  {
    languageCode: 'CH',
    languageName: 'Chamorro',
  },
  {
    languageCode: 'CO',
    languageName: 'Corsican',
  },
  {
    languageCode: 'CR',
    languageName: 'Cree',
  },
  {
    languageCode: 'CS',
    languageName: 'Czech',
  },
  {
    languageCode: 'CU',
    languageName: 'Old Church Slavonic',
  },
  {
    languageCode: 'CV',
    languageName: 'Chuvash',
  },
  {
    languageCode: 'CY',
    languageName: 'Welsh',
  },
  {
    languageCode: 'DA',
    languageName: 'Danish',
  },
  {
    languageCode: 'DE',
    languageName: 'German',
  },
  {
    languageCode: 'DV',
    languageName: 'Divehi',
  },
  {
    languageCode: 'DZ',
    languageName: 'Dzongkha',
  },
  {
    languageCode: 'EE',
    languageName: 'Ewe',
  },
  {
    languageCode: 'EL',
    languageName: 'Ewe',
  },
  {
    languageCode: 'EN',
    languageName: 'English',
  },
  {
    languageCode: 'EO',
    languageName: 'Esperanto',
  },
  {
    languageCode: 'ES',
    languageName: 'Spanish',
  },
  {
    languageCode: 'ET',
    languageName: 'Estonian',
  },
  {
    languageCode: 'EU',
    languageName: 'Basque',
  },
  {
    languageCode: 'FA',
    languageName: 'Persian',
  },
  {
    languageCode: 'FF',
    languageName: 'Fula',
  },
  {
    languageCode: 'FI',
    languageName: 'Finnish',
  },
  {
    languageCode: 'FJ',
    languageName: 'Fijian',
  },
  {
    languageCode: 'FO',
    languageName: 'Faroese',
  },
  {
    languageCode: 'FR',
    languageName: 'French',
  },
  {
    languageCode: 'FY',
    languageName: 'Western Frisian',
  },
  {
    languageCode: 'GA',
    languageName: 'Irish',
  },
  {
    languageCode: 'GD',
    languageName: 'Scottish Gaelic',
  },
  {
    languageCode: 'GL',
    languageName: 'Galician',
  },
  {
    languageCode: 'GN',
    languageName: 'Guaraní',
  },
  {
    languageCode: 'GU',
    languageName: 'Gujarati',
  },
  {
    languageCode: 'GV',
    languageName: 'Manx',
  },
  {
    languageCode: 'HA',
    languageName: 'Hausa',
  },
  {
    languageCode: 'HE',
    languageName: 'Hebrew',
  },
  {
    languageCode: 'HI',
    languageName: 'Hindi',
  },
  {
    languageCode: 'HO',
    languageName: 'Hiri Motu',
  },
  {
    languageCode: 'HR',
    languageName: 'Croatian',
  },
  {
    languageCode: 'HT',
    languageName: 'Haitian',
  },
  {
    languageCode: 'HU',
    languageName: 'Hungarian',
  },
  {
    languageCode: 'HY',
    languageName: 'Armenian',
  },
  {
    languageCode: 'HZ',
    languageName: 'Herero',
  },
  {
    languageCode: 'IA',
    languageName: 'Interlingua',
  },
  {
    languageCode: 'ID',
    languageName: 'Indonesian',
  },
  {
    languageCode: 'IE',
    languageName: 'Interlingue',
  },
  {
    languageCode: 'IG',
    languageName: 'Igbo',
  },
  {
    languageCode: 'II',
    languageName: 'Nuosu',
  },
  {
    languageCode: 'IK',
    languageName: 'Inupiaq',
  },
  {
    languageCode: 'IO',
    languageName: 'Ido',
  },
  {
    languageCode: 'IS',
    languageName: 'Icelandic',
  },
  {
    languageCode: 'IT',
    languageName: 'Italian',
  },
  {
    languageCode: 'IU',
    languageName: 'Inuktitut',
  },
  {
    languageCode: 'JA',
    languageName: 'Japanese',
  },
  {
    languageCode: 'JV',
    languageName: 'Javanese',
  },
  {
    languageCode: 'KA',
    languageName: 'Georgian',
  },
  {
    languageCode: 'KG',
    languageName: 'Kongo',
  },
  {
    languageCode: 'KI',
    languageName: 'Kikuyu',
  },
  {
    languageCode: 'KJ',
    languageName: 'Kwanyama',
  },
  {
    languageCode: 'KK',
    languageName: 'Kazakh',
  },
  {
    languageCode: 'KL',
    languageName: 'Kalaallisut',
  },
  {
    languageCode: 'KM',
    languageName: 'Khmer',
  },
  {
    languageCode: 'KN',
    languageName: 'Kannada',
  },
  {
    languageCode: 'KO',
    languageName: 'Korean',
  },
  {
    languageCode: 'KR',
    languageName: 'Kanuri',
  },
  {
    languageCode: 'KS',
    languageName: 'Kashmiri',
  },
  {
    languageCode: 'KU',
    languageName: 'Kurdish',
  },
  {
    languageCode: 'KV',
    languageName: 'Komi',
  },
  {
    languageCode: 'KW',
    languageName: 'Cornish',
  },
  {
    languageCode: 'KY',
    languageName: 'Kyrgyz',
  },
  {
    languageCode: 'LA',
    languageName: 'Latin',
  },
  {
    languageCode: 'LB',
    languageName: 'Luxembourgish',
  },
  {
    languageCode: 'LG',
    languageName: 'Ganda',
  },
  {
    languageCode: 'LI',
    languageName: 'Limburgish',
  },
  {
    languageCode: 'LN',
    languageName: 'Lingala',
  },
  {
    languageCode: 'LO',
    languageName: 'Lao',
  },
  {
    languageCode: 'LT',
    languageName: 'Lithuanian',
  },
  {
    languageCode: 'LU',
    languageName: 'Luba-Katanga',
  },
  {
    languageCode: 'LV',
    languageName: 'Latvian',
  },
  {
    languageCode: 'MG',
    languageName: 'Malagasy',
  },
  {
    languageCode: 'MH',
    languageName: 'Marshallese',
  },
  {
    languageCode: 'MI',
    languageName: 'Māori',
  },
  {
    languageCode: 'MK',
    languageName: 'Macedonian',
  },
  {
    languageCode: 'ML',
    languageName: 'Malayalam',
  },
  {
    languageCode: 'MN',
    languageName: 'Mongolian',
  },
  {
    languageCode: 'MR',
    languageName: 'Marathi',
  },
  {
    languageCode: 'MS',
    languageName: 'Malay‎',
  },
  {
    languageCode: 'MT',
    languageName: 'Maltese',
  },
  {
    languageCode: 'MY',
    languageName: 'Burmese',
  },
  {
    languageCode: 'NA',
    languageName: 'Nauru',
  },
  {
    languageCode: 'NB',
    languageName: 'Norwegian Bokmål',
  },
  {
    languageCode: 'ND',
    languageName: 'Northern Ndebele',
  },
  {
    languageCode: 'NE',
    languageName: 'Nepali',
  },
  {
    languageCode: 'NG',
    languageName: 'Ndonga',
  },
  {
    languageCode: 'NL',
    languageName: 'Dutch',
  },
  {
    languageCode: 'NN',
    languageName: 'Norwegian Nynorsk',
  },
  {
    languageCode: 'NO',
    languageName: 'Norwegian',
  },
  {
    languageCode: 'NR',
    languageName: 'Southern Ndebele',
  },
  {
    languageCode: 'NV',
    languageName: 'Navajo',
  },
  {
    languageCode: 'NY',
    languageName: 'Chichewa',
  },
  {
    languageCode: 'OC',
    languageName: 'Occitan',
  },
  {
    languageCode: 'OJ',
    languageName: 'Ojibwe',
  },
  {
    languageCode: 'OM',
    languageName: 'Oromo',
  },
  {
    languageCode: 'OR',
    languageName: 'Oriya',
  },
  {
    languageCode: 'OS',
    languageName: 'Ossetian',
  },
  {
    languageCode: 'PA',
    languageName: 'Panjabi',
  },
  {
    languageCode: 'PI',
    languageName: 'Pāli',
  },
  {
    languageCode: 'PL',
    languageName: 'Polish',
  },
  {
    languageCode: 'PS',
    languageName: 'Pashto',
  },
  {
    languageCode: 'PT',
    languageName: 'Portuguese',
  },
  {
    languageCode: 'QU',
    languageName: 'Quechua',
  },
  {
    languageCode: 'RM',
    languageName: 'Romansh',
  },
  {
    languageCode: 'RN',
    languageName: 'Kirundi',
  },
  {
    languageCode: 'RO',
    languageName: 'Romanian',
  },
  {
    languageCode: 'RU',
    languageName: 'Russian',
  },
  {
    languageCode: 'RW',
    languageName: 'Kinyarwanda',
  },
  {
    languageCode: 'SA',
    languageName: 'Sanskrit',
  },
  {
    languageCode: 'SC',
    languageName: 'Sardinian',
  },
  {
    languageCode: 'SD',
    languageName: 'Sindhi',
  },
  {
    languageCode: 'SE',
    languageName: 'Northern Sami',
  },
  {
    languageCode: 'SG',
    languageName: 'Sango',
  },
  {
    languageCode: 'SI',
    languageName: 'Sinhala',
  },
  {
    languageCode: 'SK',
    languageName: 'Slovak',
  },
  {
    languageCode: 'SL',
    languageName: 'Slovene',
  },
  {
    languageCode: 'SM',
    languageName: 'Samoan',
  },
  {
    languageCode: 'SN',
    languageName: 'Shona',
  },
  {
    languageCode: 'SO',
    languageName: 'Somali',
  },
  {
    languageCode: 'SQ',
    languageName: 'Albanian',
  },
  {
    languageCode: 'SR',
    languageName: 'Serbian',
  },
  {
    languageCode: 'SS',
    languageName: 'Swati',
  },
  {
    languageCode: 'ST',
    languageName: 'Southern Sotho',
  },
  {
    languageCode: 'SU',
    languageName: 'Sundanese',
  },
  {
    languageCode: 'SV',
    languageName: 'Swedish',
  },
  {
    languageCode: 'SW',
    languageName: 'Swahili',
  },
  {
    languageCode: 'TA',
    languageName: 'Tamil',
  },
  {
    languageCode: 'TE',
    languageName: 'Telugu',
  },
  {
    languageCode: 'TG',
    languageName: 'Tajik',
  },
  {
    languageCode: 'TH',
    languageName: 'Thai',
  },
  {
    languageCode: 'TI',
    languageName: 'Tigrinya',
  },
  {
    languageCode: 'TK',
    languageName: 'Turkmen',
  },
  {
    languageCode: 'TL',
    languageName: 'Tagalog',
  },
  {
    languageCode: 'TN',
    languageName: 'Tswana',
  },
  {
    languageCode: 'TO',
    languageName: 'Tonga',
  },
  {
    languageCode: 'TR',
    languageName: 'Turkish',
  },
  {
    languageCode: 'TS',
    languageName: 'Tsonga',
  },
  {
    languageCode: 'TT',
    languageName: 'Tatar',
  },
  {
    languageCode: 'TW',
    languageName: 'Twi',
  },
  {
    languageCode: 'TY',
    languageName: 'Tahitian',
  },
  {
    languageCode: 'UG',
    languageName: 'Uyghur',
  },
  {
    languageCode: 'UK',
    languageName: 'Ukrainian',
  },
  {
    languageCode: 'UR',
    languageName: 'Urdu',
  },
  {
    languageCode: 'UZ',
    languageName: 'Uzbek',
  },
  {
    languageCode: 'VE',
    languageName: 'Venda',
  },
  {
    languageCode: 'VI',
    languageName: 'Vietnamese',
  },
  {
    languageCode: 'VO',
    languageName: 'Volapük',
  },
  {
    languageCode: 'WA',
    languageName: 'Walloon',
  },
  {
    languageCode: 'WO',
    languageName: 'Wolof',
  },
  {
    languageCode: 'XH',
    languageName: 'Xhosa',
  },
  {
    languageCode: 'YI',
    languageName: 'Yiddish',
  },
  {
    languageCode: 'YO',
    languageName: 'Yoruba',
  },
  {
    languageCode: 'ZA',
    languageName: 'Zhuang',
  },
  {
    languageCode: 'ZH',
    languageName: 'Chinese',
  },
  {
    languageCode: 'ZU',
    languageName: 'Zulu',
  },
];

export const countriesIso: {
  countryCode: string;
  countryName: string;
}[] = [
  {
    countryCode: 'AD',
    countryName: 'Andorra',
  },
  {
    countryCode: 'AE',
    countryName: 'United Arab Emirates',
  },
  {
    countryCode: 'AF',
    countryName: 'Afghanistan',
  },
  {
    countryCode: 'AG',
    countryName: 'Antigua and Barbuda',
  },
  {
    countryCode: 'AI',
    countryName: 'Anguilla',
  },
  {
    countryCode: 'AL',
    countryName: 'Albania',
  },
  {
    countryCode: 'AM',
    countryName: 'Armenia',
  },
  {
    countryCode: 'AO',
    countryName: 'Angola',
  },
  {
    countryCode: 'AQ',
    countryName: 'Antarctica',
  },
  {
    countryCode: 'AR',
    countryName: 'Argentina',
  },
  {
    countryCode: 'AS',
    countryName: 'American Samoa',
  },
  {
    countryCode: 'AT',
    countryName: 'Austria',
  },
  {
    countryCode: 'AU',
    countryName: 'Australia',
  },
  {
    countryCode: 'AW',
    countryName: 'Aruba',
  },
  {
    countryCode: 'AX',
    countryName: 'Åland',
  },
  {
    countryCode: 'AZ',
    countryName: 'Azerbaijan',
  },
  {
    countryCode: 'BA',
    countryName: 'Bosnia and Herzegovina',
  },
  {
    countryCode: 'BB',
    countryName: 'Barbados',
  },
  {
    countryCode: 'BD',
    countryName: 'Bangladesh',
  },
  {
    countryCode: 'BE',
    countryName: 'Belgium',
  },
  {
    countryCode: 'BF',
    countryName: 'Burkina Faso',
  },
  {
    countryCode: 'BG',
    countryName: 'Bulgaria',
  },
  {
    countryCode: 'BH',
    countryName: 'Bahrain',
  },
  {
    countryCode: 'BI',
    countryName: 'Burundi',
  },
  {
    countryCode: 'BJ',
    countryName: 'Benin',
  },
  {
    countryCode: 'BL',
    countryName: 'Saint Barthélemy',
  },
  {
    countryCode: 'BM',
    countryName: 'Bermuda',
  },
  {
    countryCode: 'BN',
    countryName: 'Brunei',
  },
  {
    countryCode: 'BO',
    countryName: 'Bolivia',
  },
  {
    countryCode: 'BQ',
    countryName: 'Bonaire',
  },
  {
    countryCode: 'BR',
    countryName: 'Brazil',
  },
  {
    countryCode: 'BS',
    countryName: 'Bahamas',
  },
  {
    countryCode: 'BT',
    countryName: 'Bhutan',
  },
  {
    countryCode: 'BV',
    countryName: 'Bouvet Island',
  },
  {
    countryCode: 'BW',
    countryName: 'Botswana',
  },
  {
    countryCode: 'BY',
    countryName: 'Belarus',
  },
  {
    countryCode: 'BZ',
    countryName: 'Belize',
  },
  {
    countryCode: 'CA',
    countryName: 'Canada',
  },
  {
    countryCode: 'CC',
    countryName: 'Cocos [Keeling] Islands',
  },
  {
    countryCode: 'CD',
    countryName: 'Democratic Republic of the Congo',
  },
  {
    countryCode: 'CF',
    countryName: 'Central African Republic',
  },
  {
    countryCode: 'CG',
    countryName: 'Republic of the Congo',
  },
  {
    countryCode: 'CH',
    countryName: 'Switzerland',
  },
  {
    countryCode: 'CI',
    countryName: 'Ivory Coast',
  },
  {
    countryCode: 'CK',
    countryName: 'Cook Islands',
  },
  {
    countryCode: 'CL',
    countryName: 'Chile',
  },
  {
    countryCode: 'CM',
    countryName: 'Cameroon',
  },
  {
    countryCode: 'CN',
    countryName: 'China',
  },
  {
    countryCode: 'CO',
    countryName: 'Colombia',
  },
  {
    countryCode: 'CR',
    countryName: 'Costa Rica',
  },
  {
    countryCode: 'CU',
    countryName: 'Cuba',
  },
  {
    countryCode: 'CV',
    countryName: 'Cape Verde',
  },
  {
    countryCode: 'CW',
    countryName: 'Curacao',
  },
  {
    countryCode: 'CX',
    countryName: 'Christmas Island',
  },
  {
    countryCode: 'CY',
    countryName: 'Cyprus',
  },
  {
    countryCode: 'CZ',
    countryName: 'Czech Republic',
  },
  {
    countryCode: 'DE',
    countryName: 'Germany',
  },
  {
    countryCode: 'DJ',
    countryName: 'Djibouti',
  },
  {
    countryCode: 'DK',
    countryName: 'Denmark',
  },
  {
    countryCode: 'DM',
    countryName: 'Dominica',
  },
  {
    countryCode: 'DO',
    countryName: 'Dominican Republic',
  },
  {
    countryCode: 'DZ',
    countryName: 'Algeria',
  },
  {
    countryCode: 'EC',
    countryName: 'Ecuador',
  },
  {
    countryCode: 'EE',
    countryName: 'Estonia',
  },
  {
    countryCode: 'EG',
    countryName: 'Egypt',
  },
  {
    countryCode: 'EH',
    countryName: 'Western Sahara',
  },
  {
    countryCode: 'ER',
    countryName: 'Eritrea',
  },
  {
    countryCode: 'ES',
    countryName: 'Spain',
  },
  {
    countryCode: 'ET',
    countryName: 'Ethiopia',
  },
  {
    countryCode: 'FI',
    countryName: 'Finland',
  },
  {
    countryCode: 'FJ',
    countryName: 'Fiji',
  },
  {
    countryCode: 'FK',
    countryName: 'Falkland Islands',
  },
  {
    countryCode: 'FM',
    countryName: 'Micronesia',
  },
  {
    countryCode: 'FO',
    countryName: 'Faroe Islands',
  },
  {
    countryCode: 'FR',
    countryName: 'France',
  },
  {
    countryCode: 'GA',
    countryName: 'Gabon',
  },
  {
    countryCode: 'GB',
    countryName: 'United Kingdom',
  },
  {
    countryCode: 'GD',
    countryName: 'Grenada',
  },
  {
    countryCode: 'GE',
    countryName: 'Georgia',
  },
  {
    countryCode: 'GF',
    countryName: 'French Guiana',
  },
  {
    countryCode: 'GG',
    countryName: 'Guernsey',
  },
  {
    countryCode: 'GH',
    countryName: 'Ghana',
  },
  {
    countryCode: 'GI',
    countryName: 'Gibraltar',
  },
  {
    countryCode: 'GL',
    countryName: 'Greenland',
  },
  {
    countryCode: 'GM',
    countryName: 'Gambia',
  },
  {
    countryCode: 'GN',
    countryName: 'Guinea',
  },
  {
    countryCode: 'GP',
    countryName: 'Guadeloupe',
  },
  {
    countryCode: 'GQ',
    countryName: 'Equatorial Guinea',
  },
  {
    countryCode: 'GR',
    countryName: 'Greece',
  },
  {
    countryCode: 'GS',
    countryName: 'South Georgia and the South Sandwich Islands',
  },
  {
    countryCode: 'GT',
    countryName: 'Guatemala',
  },
  {
    countryCode: 'GU',
    countryName: 'Guam',
  },
  {
    countryCode: 'GW',
    countryName: 'Guinea-Bissau',
  },
  {
    countryCode: 'GY',
    countryName: 'Guyana',
  },
  {
    countryCode: 'HK',
    countryName: 'Hong Kong',
  },
  {
    countryCode: 'HM',
    countryName: 'Heard Island and McDonald Islands',
  },
  {
    countryCode: 'HN',
    countryName: 'Honduras',
  },
  {
    countryCode: 'HR',
    countryName: 'Croatia',
  },
  {
    countryCode: 'HT',
    countryName: 'Haiti',
  },
  {
    countryCode: 'HU',
    countryName: 'Hungary',
  },
  {
    countryCode: 'ID',
    countryName: 'Indonesia',
  },
  {
    countryCode: 'IE',
    countryName: 'Ireland',
  },
  {
    countryCode: 'IL',
    countryName: 'Israel',
  },
  {
    countryCode: 'IM',
    countryName: 'Isle of Man',
  },
  {
    countryCode: 'IN',
    countryName: 'India',
  },
  {
    countryCode: 'IO',
    countryName: 'British Indian Ocean Territory',
  },
  {
    countryCode: 'IQ',
    countryName: 'Iraq',
  },
  {
    countryCode: 'IR',
    countryName: 'Iran',
  },
  {
    countryCode: 'IS',
    countryName: 'Iceland',
  },
  {
    countryCode: 'IT',
    countryName: 'Italy',
  },
  {
    countryCode: 'JE',
    countryName: 'Jersey',
  },
  {
    countryCode: 'JM',
    countryName: 'Jamaica',
  },
  {
    countryCode: 'JO',
    countryName: 'Jordan',
  },
  {
    countryCode: 'JP',
    countryName: 'Japan',
  },
  {
    countryCode: 'KE',
    countryName: 'Kenya',
  },
  {
    countryCode: 'KG',
    countryName: 'Kyrgyzstan',
  },
  {
    countryCode: 'KH',
    countryName: 'Cambodia',
  },
  {
    countryCode: 'KI',
    countryName: 'Kiribati',
  },
  {
    countryCode: 'KM',
    countryName: 'Comoros',
  },
  {
    countryCode: 'KN',
    countryName: 'Saint Kitts and Nevis',
  },
  {
    countryCode: 'KP',
    countryName: 'North Korea',
  },
  {
    countryCode: 'KR',
    countryName: 'South Korea',
  },
  {
    countryCode: 'KW',
    countryName: 'Kuwait',
  },
  {
    countryCode: 'KY',
    countryName: 'Cayman Islands',
  },
  {
    countryCode: 'KZ',
    countryName: 'Kazakhstan',
  },
  {
    countryCode: 'LA',
    countryName: 'Laos',
  },
  {
    countryCode: 'LB',
    countryName: 'Lebanon',
  },
  {
    countryCode: 'LC',
    countryName: 'Saint Lucia',
  },
  {
    countryCode: 'LI',
    countryName: 'Liechtenstein',
  },
  {
    countryCode: 'LK',
    countryName: 'Sri Lanka',
  },
  {
    countryCode: 'LR',
    countryName: 'Liberia',
  },
  {
    countryCode: 'LS',
    countryName: 'Lesotho',
  },
  {
    countryCode: 'LT',
    countryName: 'Lithuania',
  },
  {
    countryCode: 'LU',
    countryName: 'Luxembourg',
  },
  {
    countryCode: 'LV',
    countryName: 'Latvia',
  },
  {
    countryCode: 'LY',
    countryName: 'Libya',
  },
  {
    countryCode: 'MA',
    countryName: 'Morocco',
  },
  {
    countryCode: 'MC',
    countryName: 'Monaco',
  },
  {
    countryCode: 'MD',
    countryName: 'Moldova',
  },
  {
    countryCode: 'ME',
    countryName: 'Montenegro',
  },
  {
    countryCode: 'MF',
    countryName: 'Saint Martin',
  },
  {
    countryCode: 'MG',
    countryName: 'Madagascar',
  },
  {
    countryCode: 'MH',
    countryName: 'Marshall Islands',
  },
  {
    countryCode: 'MK',
    countryName: 'Macedonia',
  },
  {
    countryCode: 'ML',
    countryName: 'Mali',
  },
  {
    countryCode: 'MM',
    countryName: 'Myanmar [Burma]',
  },
  {
    countryCode: 'MN',
    countryName: 'Mongolia',
  },
  {
    countryCode: 'MO',
    countryName: 'Macao',
  },
  {
    countryCode: 'MP',
    countryName: 'Northern Mariana Islands',
  },
  {
    countryCode: 'MQ',
    countryName: 'Martinique',
  },
  {
    countryCode: 'MR',
    countryName: 'Mauritania',
  },
  {
    countryCode: 'MS',
    countryName: 'Montserrat',
  },
  {
    countryCode: 'MT',
    countryName: 'Malta',
  },
  {
    countryCode: 'MU',
    countryName: 'Mauritius',
  },
  {
    countryCode: 'MV',
    countryName: 'Maldives',
  },
  {
    countryCode: 'MW',
    countryName: 'Malawi',
  },
  {
    countryCode: 'MX',
    countryName: 'Mexico',
  },
  {
    countryCode: 'MY',
    countryName: 'Malaysia',
  },
  {
    countryCode: 'MZ',
    countryName: 'Mozambique',
  },
  {
    countryCode: 'NA',
    countryName: 'Namibia',
  },
  {
    countryCode: 'NC',
    countryName: 'New Caledonia',
  },
  {
    countryCode: 'NE',
    countryName: 'Niger',
  },
  {
    countryCode: 'NF',
    countryName: 'Norfolk Island',
  },
  {
    countryCode: 'NG',
    countryName: 'Nigeria',
  },
  {
    countryCode: 'NI',
    countryName: 'Nicaragua',
  },
  {
    countryCode: 'NL',
    countryName: 'Netherlands',
  },
  {
    countryCode: 'NO',
    countryName: 'Norway',
  },
  {
    countryCode: 'NP',
    countryName: 'Nepal',
  },
  {
    countryCode: 'NR',
    countryName: 'Nauru',
  },
  {
    countryCode: 'NU',
    countryName: 'Niue',
  },
  {
    countryCode: 'NZ',
    countryName: 'New Zealand',
  },
  {
    countryCode: 'OM',
    countryName: 'Oman',
  },
  {
    countryCode: 'PA',
    countryName: 'Panama',
  },
  {
    countryCode: 'PE',
    countryName: 'Peru',
  },
  {
    countryCode: 'PF',
    countryName: 'French Polynesia',
  },
  {
    countryCode: 'PG',
    countryName: 'Papua New Guinea',
  },
  {
    countryCode: 'PH',
    countryName: 'Philippines',
  },
  {
    countryCode: 'PK',
    countryName: 'Pakistan',
  },
  {
    countryCode: 'PL',
    countryName: 'Poland',
  },
  {
    countryCode: 'PM',
    countryName: 'Saint Pierre and Miquelon',
  },
  {
    countryCode: 'PN',
    countryName: 'Pitcairn Islands',
  },
  {
    countryCode: 'PR',
    countryName: 'Puerto Rico',
  },
  {
    countryCode: 'PS',
    countryName: 'Palestine',
  },
  {
    countryCode: 'PT',
    countryName: 'Portugal',
  },
  {
    countryCode: 'PW',
    countryName: 'Palau',
  },
  {
    countryCode: 'PY',
    countryName: 'Paraguay',
  },
  {
    countryCode: 'QA',
    countryName: 'Qatar',
  },
  {
    countryCode: 'RE',
    countryName: 'Réunion',
  },
  {
    countryCode: 'RO',
    countryName: 'Romania',
  },
  {
    countryCode: 'RS',
    countryName: 'Serbia',
  },
  {
    countryCode: 'RU',
    countryName: 'Russia',
  },
  {
    countryCode: 'RW',
    countryName: 'Rwanda',
  },
  {
    countryCode: 'SA',
    countryName: 'Saudi Arabia',
  },
  {
    countryCode: 'SB',
    countryName: 'Solomon Islands',
  },
  {
    countryCode: 'SC',
    countryName: 'Seychelles',
  },
  {
    countryCode: 'SD',
    countryName: 'Sudan',
  },
  {
    countryCode: 'SE',
    countryName: 'Sweden',
  },
  {
    countryCode: 'SG',
    countryName: 'Singapore',
  },
  {
    countryCode: 'SH',
    countryName: 'Saint Helena',
  },
  {
    countryCode: 'SI',
    countryName: 'Slovenia',
  },
  {
    countryCode: 'SJ',
    countryName: 'Svalbard and Jan Mayen',
  },
  {
    countryCode: 'SK',
    countryName: 'Slovakia',
  },
  {
    countryCode: 'SL',
    countryName: 'Sierra Leone',
  },
  {
    countryCode: 'SM',
    countryName: 'San Marino',
  },
  {
    countryCode: 'SN',
    countryName: 'Senegal',
  },
  {
    countryCode: 'SO',
    countryName: 'Somalia',
  },
  {
    countryCode: 'SR',
    countryName: 'Suriname',
  },
  {
    countryCode: 'SS',
    countryName: 'South Sudan',
  },
  {
    countryCode: 'ST',
    countryName: 'São Tomé and Príncipe',
  },
  {
    countryCode: 'SV',
    countryName: 'El Salvador',
  },
  {
    countryCode: 'SX',
    countryName: 'Sint Maarten',
  },
  {
    countryCode: 'SY',
    countryName: 'Syria',
  },
  {
    countryCode: 'SZ',
    countryName: 'Swaziland',
  },
  {
    countryCode: 'TC',
    countryName: 'Turks and Caicos Islands',
  },
  {
    countryCode: 'TD',
    countryName: 'Chad',
  },
  {
    countryCode: 'TF',
    countryName: 'French Southern Territories',
  },
  {
    countryCode: 'TG',
    countryName: 'Togo',
  },
  {
    countryCode: 'TH',
    countryName: 'Thailand',
  },
  {
    countryCode: 'TJ',
    countryName: 'Tajikistan',
  },
  {
    countryCode: 'TK',
    countryName: 'Tokelau',
  },
  {
    countryCode: 'TL',
    countryName: 'East Timor',
  },
  {
    countryCode: 'TM',
    countryName: 'Turkmenistan',
  },
  {
    countryCode: 'TN',
    countryName: 'Tunisia',
  },
  {
    countryCode: 'TO',
    countryName: 'Tonga',
  },
  {
    countryCode: 'TR',
    countryName: 'Turkey',
  },
  {
    countryCode: 'TT',
    countryName: 'Trinidad and Tobago',
  },
  {
    countryCode: 'TV',
    countryName: 'Tuvalu',
  },
  {
    countryCode: 'TW',
    countryName: 'Taiwan',
  },
  {
    countryCode: 'TZ',
    countryName: 'Tanzania',
  },
  {
    countryCode: 'UA',
    countryName: 'Ukraine',
  },
  {
    countryCode: 'UG',
    countryName: 'Uganda',
  },
  {
    countryCode: 'UM',
    countryName: 'U.S. Minor Outlying Islands',
  },
  {
    countryCode: 'US',
    countryName: 'United States',
  },
  {
    countryCode: 'UY',
    countryName: 'Uruguay',
  },
  {
    countryCode: 'UZ',
    countryName: 'Uzbekistan',
  },
  {
    countryCode: 'VA',
    countryName: 'Vatican City',
  },
  {
    countryCode: 'VC',
    countryName: 'Saint Vincent and the Grenadines',
  },
  {
    countryCode: 'VE',
    countryName: 'Venezuela',
  },
  {
    countryCode: 'VG',
    countryName: 'British Virgin Islands',
  },
  {
    countryCode: 'VI',
    countryName: 'U.S. Virgin Islands',
  },
  {
    countryCode: 'VN',
    countryName: 'Vietnam',
  },
  {
    countryCode: 'VU',
    countryName: 'Vanuatu',
  },
  {
    countryCode: 'WF',
    countryName: 'Wallis and Futuna',
  },
  {
    countryCode: 'WS',
    countryName: 'Samoa',
  },
  {
    countryCode: 'XK',
    countryName: 'Kosovo',
  },
  {
    countryCode: 'YE',
    countryName: 'Yemen',
  },
  {
    countryCode: 'YT',
    countryName: 'Mayotte',
  },
  {
    countryCode: 'ZA',
    countryName: 'South Africa',
  },
  {
    countryCode: 'ZM',
    countryName: 'Zambia',
  },
  {
    countryCode: 'ZW',
    countryName: 'Zimbabwe',
  },
];

export const countriesNamePreSelection: string[] = [
  'United States',
  'Canada',
  'France',
  'Germany',
  'Mexico',
];

export const countriesName: string[] = [
  'Afghanistan',
  'Åland',
  'Albania',
  'Algeria',
  'American Samoa',
  'Andorra',
  'Angola',
  'Anguilla',
  'Antarctica',
  'Antigua and Barbuda',
  'Argentina',
  'Armenia',
  'Aruba',
  'Australia',
  'Austria',
  'Azerbaijan',
  'Bahamas',
  'Bahrain',
  'Bangladesh',
  'Barbados',
  'Belarus',
  'Belgium',
  'Belize',
  'Benin',
  'Bermuda',
  'Bhutan',
  'Bolivia',
  'Bonaire',
  'Bosnia and Herzegovina',
  'Botswana',
  'Bouvet Island',
  'Brazil',
  'British Indian Ocean Territory',
  'British Virgin Islands',
  'Brunei',
  'Bulgaria',
  'Burkina Faso',
  'Burundi',
  'Cambodia',
  'Cameroon',
  'Canada',
  'Cape Verde',
  'Cayman Islands',
  'Central African Republic',
  'Chad',
  'Chile',
  'China',
  'Christmas Island',
  'Cocos [Keeling] Islands',
  'Colombia',
  'Comoros',
  'Cook Islands',
  'Costa Rica',
  'Croatia',
  'Cuba',
  'Curacao',
  'Cyprus',
  'Czech Republic',
  'Democratic Republic of the Congo',
  'Denmark',
  'Djibouti',
  'Dominica',
  'Dominican Republic',
  'East Timor',
  'Ecuador',
  'Egypt',
  'El Salvador',
  'Equatorial Guinea',
  'Eritrea',
  'Estonia',
  'Ethiopia',
  'Falkland Islands',
  'Faroe Islands',
  'Fiji',
  'Finland',
  'France',
  'French Guiana',
  'French Polynesia',
  'French Southern Territories',
  'Gabon',
  'Gambia',
  'Georgia',
  'Germany',
  'Ghana',
  'Gibraltar',
  'Greece',
  'Greenland',
  'Grenada',
  'Guadeloupe',
  'Guam',
  'Guatemala',
  'Guernsey',
  'Guinea',
  'Guinea-Bissau',
  'Guyana',
  'Haiti',
  'Heard Island and McDonald Islands',
  'Honduras',
  'Hong Kong',
  'Hungary',
  'Iceland',
  'India',
  'Indonesia',
  'Iran',
  'Iraq',
  'Ireland',
  'Isle of Man',
  'Israel',
  'Italy',
  'Ivory Coast',
  'Jamaica',
  'Japan',
  'Jersey',
  'Jordan',
  'Kazakhstan',
  'Kenya',
  'Kiribati',
  'Kosovo',
  'Kuwait',
  'Kyrgyzstan',
  'Laos',
  'Latvia',
  'Lebanon',
  'Lesotho',
  'Liberia',
  'Libya',
  'Liechtenstein',
  'Lithuania',
  'Luxembourg',
  'Macao',
  'Macedonia',
  'Madagascar',
  'Malawi',
  'Malaysia',
  'Maldives',
  'Mali',
  'Malta',
  'Marshall Islands',
  'Martinique',
  'Mauritania',
  'Mauritius',
  'Mayotte',
  'Mexico',
  'Micronesia',
  'Moldova',
  'Monaco',
  'Mongolia',
  'Montenegro',
  'Montserrat',
  'Morocco',
  'Mozambique',
  'Myanmar [Burma]',
  'Namibia',
  'Nauru',
  'Nepal',
  'Netherlands',
  'New Caledonia',
  'New Zealand',
  'Nicaragua',
  'Niger',
  'Nigeria',
  'Niue',
  'Norfolk Island',
  'North Korea',
  'Northern Mariana Islands',
  'Norway',
  'Oman',
  'Pakistan',
  'Palau',
  'Palestine',
  'Panama',
  'Papua New Guinea',
  'Paraguay',
  'Peru',
  'Philippines',
  'Pitcairn Islands',
  'Poland',
  'Portugal',
  'Puerto Rico',
  'Qatar',
  'Republic of the Congo',
  'Romania',
  'Russia',
  'Rwanda',
  'Réunion',
  'Saint Barthélemy',
  'Saint Helena',
  'Saint Kitts and Nevis',
  'Saint Lucia',
  'Saint Martin',
  'Saint Pierre and Miquelon',
  'Saint Vincent and the Grenadines',
  'Samoa',
  'San Marino',
  'Saudi Arabia',
  'Senegal',
  'Serbia',
  'Seychelles',
  'Sierra Leone',
  'Singapore',
  'Sint Maarten',
  'Slovakia',
  'Slovenia',
  'Solomon Islands',
  'Somalia',
  'South Africa',
  'South Georgia and the South Sandwich Islands',
  'South Korea',
  'South Sudan',
  'Spain',
  'Sri Lanka',
  'Sudan',
  'Suriname',
  'Svalbard and Jan Mayen',
  'Swaziland',
  'Sweden',
  'Switzerland',
  'Syria',
  'São Tomé and Príncipe',
  'Taiwan',
  'Tajikistan',
  'Tanzania',
  'Thailand',
  'Togo',
  'Tokelau',
  'Tonga',
  'Trinidad and Tobago',
  'Tunisia',
  'Turkey',
  'Turkmenistan',
  'Turks and Caicos Islands',
  'Tuvalu',
  'U.S. Minor Outlying Islands',
  'U.S. Virgin Islands',
  'Uganda',
  'Ukraine',
  'United Arab Emirates',
  'United Kingdom',
  'United States',
  'Uruguay',
  'Uzbekistan',
  'Vanuatu',
  'Vatican City',
  'Venezuela',
  'Vietnam',
  'Wallis and Futuna',
  'Western Sahara',
  'Yemen',
  'Zambia',
  'Zimbabwe',
];

export const defaultUserImg =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZAAAAGQCAIAAAAP3aGbAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4QoLDyIi9fO93gAAIABJREFUeNrtnXeUXdV9739773NunVumF01RQ70gIbppBmPc4uQRh4Rk2X4vLniZ93ASx3Fc0oixY8e44foSlzhOCPazDQSbIhAgC1GEhAoajdpo2p1255a59bS93x8jISHTZjTlnHu/n4VlzDJamn3O/pzvb1eWyeUIAAC8AEcTAAAgLAAAgLAAABAWAABAWAAAAGEBACAsAACAsAAAAMICAEBYAAAAYQEAAIQFAICwAAAAwgIAAAgLAABhAQAAhAUAABAWAADCAgAACAsAACAsAACEBQAAEBYAAEBYAAAICwAAICwAAICwAAAQFgAAQFgAAAgLAAAgLAAAgLAAABAWAABAWAAAAGEBACAsAACAsAAAAMICAEBYAAAAYQEAAIQFAICwAAAAwgIAAAgLAABhAQAAhAUAABAWAADCAgAACAsAAF4NDU0Apos647/UqX/IGE2azqRh5Sxn0nBsKcO6CPtERBMhnxb1CaVO/w7s5H+mfgEAwgKzgVSkSClFikgwGswbPanikWzxcKbYky4dLxqjpk2mQ4ZNlnyd34sRBTTSBPlEmy6WRwKXNEXPb6jZ2FTTGvZLRYwRI8bhMPAaL1Eml0MrgDPTk1TKUYoRG8ob24fSz43lDqSKB7IlM1siRxI7MxrNKCa9lNCm/kYpCukbm6NvaopsaIhc0BRtq/EJzjhjghFnEBiAsMAZuUcS2VLZUllSDeWNJwfTjyXSTw5mS9kSMZpKPkRsbuu3qRSnFClFumhviLx1Ufzq9vgFLdG4X9MY0wXnZ1SgAMIC1eUpRVR2ZMFy+rLlbQPpRxPpp4azlCsT58TYKU8tVNJTU2GPSLU0Rm5c3nTTiuauqD8guF9wBnNBWKBKPMUYmY7KW85wwfjxodEfdA+XJgqkuUBSryEvqUiqztbYHyxv/L3lTW01/hpd+AVTCuaCsEAlwhkpRTnLSRnW88OT3z4w9OzxJBEjwcgr40RSkVSk1ObF9R9av+jSRbF6vx7RBWMEc0FYoGJUxZRSybLVN1m++9DI9w4NU7ZMmiDvTshJRbZDscAtq9tuWtmyKOKr9+s+waVS0BaEBbyKYEwqNVoyj6ZLX3+h/8GDI8Q8Falet1R0JBFdtqzxg2vbNrVE28P+gMYdCW1BWMBrqlKkhvJmT6rwrX0DD3ePEmOkVejGBkeSI1tbYn970eKLW2NdEb9PQFsQFvDEE2Wkc5bIm3vHc9/ZN/hIzxgRVayqzq4T5bL2+Kcu6LygNdYVCeic2RLWgrCAW/EJnjPtPRP5H+5P3L1viKSqClWdlbakOn9J/W0b2i9uiy2OBm2pELYgLOAuNM6IqDtdfKR34lPPHKe8QUJU71Y9RxLR21a1fPj8josaa+oCetmReEkgLLDwcEZ+wftz5Z2J7Jf3DOztSxFnhC15isiRFPZ9clPnO1c0bawPMyJUiBAWWEj8guct5zejk/d0D//ni8NkOlVXA742UpFSy9vin9rSeW1nXUvIV7IRtSAsMP9PjiikiUOZwi8Pj93xwkApXSTBCVuFXxFbioD2gY3t71vbtrmhxsSoFoQF5hPBmGC0dTh71+7+hw+PkSNJIFi9XtQi2tBe+4ktnTd01Yd1YWBUC8IC81MG5iznvqNjn36ub3R0kjhDsHpDKCLHiUWDt57f8UerW1bGQ0XbQdCCsMAcUqOLw5niDw8kvrt3MJszMGI1bRzJNHHNsobbtnS9tS2O8hDCAnMCZ6Rz/nAi87Xn+584Nu5YDsrAmUYtRVJ1tETvuGTp7yxt0DizMHsIYYFZRDDGGN13fPyvnjo+MIIy8JzfeyJly+ba0J9t6XzvmrY6v4aFWhAWmB00zmypfnZk7LM7jg1P5JkmkAdmy1mRsO/mtW1/dkHnkmgAKx4gLDALtjId9R+HRv7+qWPjmRLTOGw1mzhS6OKG85puv2zZurpQEc6CsMCM0Tkr2fJHLybu2Nk7kSvDVnOCVMTYVcsb77zyvHV1IeQsCAvMBB9nk5bznRcGv7qrL5PHhOBcohQxdvHi+ruuXrm+LoTxLAgLTNNWgqfK1pd2nfjXFwbzJQsTgvPhLGIbu2r/75tXbagLw1kQFpiGrcZK5md3HLvn4LBhOtjJPF/OIiK1vKP2x9et3lgbMrHWwX3gu+06dM7GS+Zndhz7yf4EbDW/n28iYkcH0jc/crA7W/Zx9A4IC7wmgrFJ0/nq7v5/3z8kpYStFsRZvQOZWx47NJAv62h/CAu86sNgZDjyRweHv/5c39TUFdpkYZzF2HO9E7ds6xkvWRqcBWGBV+gmjGxJPz86/tknDju2hK0WOmfRtiPjH99+ZNK0BZ4FhAXO6iBS0UMnkh995KBloxJ0i7N+9uLw5589UXIkHgiEBU6jiJ5JZP7kVwcsC6PsbnKWom881/edvQOWVHgqEBY4yYsThbffv8+xHFSCLnTW3zx59J6eUQen0EBYgBGNl+3L73tBlizYyrXO+sjD3btHJ2EsCKvaMRz5p1sPUqYMW7naWVJe99/7J8oWGgPCql4cpb63f+jJI+MYt3K9sxjljZsfOoiLwiCsKkURvTCW+8zjh2Errzjr2ePJr+/ph7IgrGokbTjX3rcXlaCnugv7h+1Hd49OoiUgrKorBm98YB8VTDSF53LWdffvTRk2WgLCqiK+untgT18K8cqTFMz3/OoACkMIqzq+0ETHM6Xbf3MUQ1feDVnPn5j4lwMJPEAIq/KRiv74kYNoB4/3G/aJ7UdGixaUBWFVMoKxfzs00j2UQVN4Hsv5+PYjqOkhrAquJGiibN32xGEMXVUG9x4ceWQwg/NnIKxKbWv2VzuOckwwVc4niG7c2l22JYwFYVUaOmfbh7P/dSCBuw0qCS1b+sKuEzoOU4awKutLTCVb/umjhwhz4ZWFrejOXX3d6QIO+YOwKge/4Hfu6R+fKKApKlJaf/HkEQxkQViV0sSMJsrWl18YtHGgUiUildrZl3p8KOODtCCsCiCoiTv3DlIJJ5NULJZU//TciZPHKgMIy7swRumy9d0DQwZuEq7gkCXV84OZ7cMIWRCWxwlr4s79QzY2OVf4d4nKjvzK8/0CwoKwPB2vsob93RcTZRvxqsJxHPn0QPq50UncvQpheZWQJr7fPWJny1jNUA1fp7xpf3l3v1+gT0FY3oxXedP50cHhnOVgNLYasB25vT+9ezyHzToQlvfwc35fb3IwlSesZqiab1S2ZH1lz0BYF2gMCMtrwtL4T7pHsgauGqwiLNt5ajA9UjA4HjqE5SEEY0fTpUPjOYXVDFVGoWT9d++EX0BYEJZ3CGj8nmPjGcPG6FW1VYUThv3LY+M+DL1DWF5qVsYe6R2fLOMy56pD2fLQeP5wuoShdwjLG+ic7RmbPJEqEi4qqMaQRamiee/xcaxvgLC8QVATdx8dHyshXlVpVZguW1v7JpCwICxPfF/JsOXTA+miYWEAq0qRqjdVfH40h1XvEJbr60HBnxubHJ4sYXV7NX+1xormr/tTqAohLNcLi7MdI9kU5geruyrMlq2nExmhoX9BWO5GE3xHIpvGAFaV48ixXHmsYGIFKYTl4tZkLFU0x7MlwnrRqg9Z6ZK1dwzDWBCWm+MVZ/sm8umyjXhV9cKiZNnaNQ5hQVguRuds11g+Wcb8IITFMiXr6dFJgXF3CMu9CUvw7SPZVNFEwgLkyNRkeRwboSEslzYlY6mimcYAFjgVspJFc38yj6oQwnJpPbgvmU8iXoGTwqKxkrUbwoKw3IlgrCdTTBs2mgJMGStVtp5KF3EzBYTlSmFx6isYkzgQGZxKWGQ6Ts5A4oawXNmUjB3MGUXLwYWa4CWKpp0uYfkohOXGLyqjvEEmEhY4HbJypp3Imzh/FMJyXbxKFo28iQEs8LJv2KTpJLCyAcJyG4LRcMHMIV6Bl5Mz7aGiISAsCMttCStRMHMW7sgBLysJM6YzkDdQEkJYbktYbChfnkRJCF5urLxpH8kbHCsbICy3lYSDRTOLkhC8PGGR6RgFEy0BYbmuJEwadhGbcsDZKMtyDEfiQwZhuYusLaVUWIQFzkpZtlKGozC2CWG5K/yXHYl7vcBvY0lp2FhODGG5DVuSlHgtwW8Ji0ooCSEslyUsRkhY4BU/ZI4s2xIlIYTlKhRZDoQFfnuswJIKg+4QlqveSbId5WDAHbxySaiQsCAsd5WDJVuaUsJY4BVKQqkMB+8GhOUmZZlSOqgHwasIq4ySEMJyWVXIsIsQvMagAYCw3IIi5eNMY4wIIQucjcaZXwi8GRCWi4zl17iGDa7gldA58wt8zCAsF/mKdM4gLPBqCSugcQVfQVgugjESGMYCr/A10zkLCA5fQViuei8VCU4IWeCVEpZfIGFBWO57MYkxjFSAs9A59wt0NAjLbb5CwgKvkbDwKYOw3FQSUp0umOCYDAJnjRX4BAv7BEpCCMtFOEp1BH0xXaApwFn5igd0nTP4CsJyl7Dawr6oLhCwwJnxinTRGPbjrYCw3IVU1Bb2R3yCEP3BGcR92uKQz8FbAWG5LWG1hPQISkLwsoRFUV20hSEsCMt9Cas17I/oGsI/OLMkjPhEW8iPgzwgLLcJS9UG9IBPYGM+OJOILlqRsCAsd+IL+0jjCFngpZIw4tNaavwSwoKwXBeypFoTC9X4dSzFAi91L19Aq/VrKAkhLNdhK7W+LtgQwDAWmIpXKhDQV9eFka4gLDdiSbW+rqYhoGNlA5iqBxsCvg0NNZaUaAwIy30JS6qVdeF4yIemAFMJqyGorasL2ygIISx3wojaa0Pch6oQECmq9+vr6msgLAjLrSFLqc0NNfUBDePusBX5RLg2qAvsIoSw3Iol1Yb6mjq/Dl/BWLV+7fIGxCsIy80JS8rNTZH6IMbd4SuqC+gb6iAsCMvFSEURn/DVhgibCqtdWKop6Lu0LYYpQgjL3VWho27urG0O+hCyqjlekU/raInEsGQUwnI5hiOv7ahtCmEYq6rj1aKQ73c76wwH8QrCcjeOUkvj4XhdmAS2QVcvzWHfDZ11JoQFYXmgKrTlexbX16MqrFo0HmusqQ3oqAchLA9gSnl9Z11dAFVhldaDzUH9/V31qAchLG8wtUenMR7ErV9VKSyqDfre3FFrOfheQVjeqQpvXNYQx0boKkTw5vpQezSIQ/sgLM9gOPL3ljbWh7ERuurqwaaQfuuatrLloDEgLM/gKLUkFlzXUSs0rCCtJhjrqg2/e2kj5gchLI9RsJxPb2hvCGGusHriFUX92k2rWwh73yEsz2FLdWFL7LzmCONo5GqhOeL/kxVNZcQrCMuLlGzn4xvbY34cj1UV+HV+9dLG5hCunICwvInpyLcvaVhcG8LdX9VQD9YEff9nXVvexnA7hOXd11ip969vC+Lur4rvSIJtWBRb1xBxsLwdwvIuZUf+0XnNbTGErAqPVwGf9qnzO4uWjcaAsDydsKg2oH9wU4eGvdCVi+Dsis7aq9vjFuIVhOV1SrZzy9rW9U0RGKtihRXUPnfpUmwehLAqo1wgv+CfvHgpE2jtCoQx+v1VLZubIjgNGcKqEAxHvmtJw1VddWjuyqMxGrzjwsV57MWBsCoJSeofL1smfdipU2n8xYVdbTUBpCsIq6KwpdrSHLlpdSt26lROMUi0rjn6oTVtRay9grAqj7Ijb79ocV08hKaoDBSjf3jTMh/mfyGsyny/FXVEAl+6YjmhfqiEIl99aHPXWzrqsJQBwqpYDEe+Z1njH29oJxxH6fGPz8qW6Kcv7JLYwQBhVXwd8beXLmmuD+FV9zCCf/WalfVBHQOSEFblF4ZtNf67rlmF0XevYjufunzZ5a0xLLyCsKrjhZfquo7a2y5dQphd8hxSbe6q/+j6RThDBsKqIhijj53fsbItjgF4Lz01IhLsq9esrMF6Ogir2qgL6N++bjX5NYZvtUdspSzn69evWV8fxhODsKoORbSpoebHb1+rFM6e8cLzMuy/vmrFHyxvwsOCsKq3MLyhs/7L169Wpo1u4Gos58ZN7R/esCiooctAWFWMztlNK5pvvWy5MnH2m1tx5Kr2+O2XLav1a6gFIaxqJ6KL2zZ3vHVNK2HHvwuRSkQDP3jr2kVhP2wFYQFSRE1B/YtXnndee5xwCJyranalSOe/eMeGVbUh2ArCAqedtTga+OH1a0PxEBY6uOi5KPUf79xweQtOi4WwwNl9g9bVhf7rHesoqGMRvCuwnW/esPa6jlqNwVcQFnilnPWm5uh/vmMd6QLOWmAs54tvWXPjima/4HgSEBZ41edxQ3vdD962ljjD7ugFtNVfX7ni5tUtQQ22grDAa4Yszuhdixu+9pbVxAnOWpBK8JaLl3x446KoT0PMdRsamsCFztI5e//qVp8mPvLIQTIlFsLPH4782KXL/mJLV9yvOdAVhAXeoLMY0XtXNOua+MDWbioYhHHf+Wh09ckrlt+2qbNGF7AVSkIwve5jKfUnyxt/+ra18VgIY/BzX4rT31214uMXdMFWEBaYIWVHvntx/U/etmZpYwTOmtMi/HNXr/jYxg6f4LAVhAVmTtGW13fU/ev1azYvipNSGIafdUSN70vXrf7Y+R2cE47lg7DAuVKwnDe1xb513arrljYwzhC1ZilYKSJa0VRzzw3r/mxdmy0Vthi4H5bJ5dAKniCg8eG8efszx3/04rBjOpg6PEdbcc6vW1J/+xXLtzRFcia2nUNYYLbROSNFd+wfvGtXfzZbOjmbCKZvK82vvX9t22cuXtIa9hVtiVaEsMDcPDBGUV375fHxf3rmxHOJjONIrHiYlqoYYw21oQ9u7vj0+nZihGtQISxwWi6c2JRPpqTC6NT/JiIiW6qZzUlFfOJIpvy5p4/ffXjUKlnE4aw3gFSaLq7pqvv4RYuv76ybNO0ZtD1npPPTI7+K1NRvok76kBRhLAzC8kRTEjHGOCNGJBhTRDnLyRpW0ZaGI22pLKkMqcpSOVKSVCTVirrwkljQnNEZWD7BlVR/v3fgpwcSveN5kgraeo1gRUS1kcAfrmn97JbFjSG9MKOzEgVjBdt5ejirptTFWYhzH2O6YFO/BjUR9WlRn9AYk0RSKaVIKsySQFhuilGCMZ0zw1FZw86YVtqwxwy7VLb7s6XD6UKiaKYNO286OdvJWjJvOWTZZDlkyd/dsOjTlyxd3xAu2zNxFiOKBvQnBlPf2j3wYF9qMm9MWRMP5axgRRq/tC3+vg2LPrCmtezImV2AqnE2aTr/sn/ob7b1kFLk00gXfk3U6jziExFNi/h4U8h3Xjy0JBasDflqfVpdQIv79bhfC2rckcpRCF8Q1sLlKcGZj/OC7fRNlo9Nlgay5RPZ0rFs8UimdChbolz55FZmxk4VhOz0v0yMGJEjt3TWffGqFZe3RkszcpYiCmpcKvrmi4lfHBx5aihNtkTUOq0qoq768PXLGm/b0L62IZw1Znhwvk/wsaL5rT2DX9x57GTznlUKTv29UifXygX1jnhwZTy0PBZcEgt2xoJdseCyaCDu1xypLIXQBWHNr6cMR/ZOlnqype7x/M6hzMODaSdXPjVwxU566o11qq6mmq9ds/LtnfUl21Ez/VNF/dqLE4Vv7B96+OhY73h+Gn+AyqwBiaSkkO/3l9T/4ZrW/7GsqWQ7plQza5Ggxg9nit/YPfC9XX3E+RuamVWK5NSvipSioH5RW/ya9vi6psh58dB58WBE1ywpbZgLwpo7VfkEV0r15soHUoWDE4XdiezWoUwpWyIiEnzmuUaqeG3on69e8cdLGy2lZrzYWucsqImfHxu/p3v4nmPjNDUYX4XaciRxdlFH3VUrmj65ri3q0wrncLtHjS52jeXuePr4fd0jJGa60FopchQ5koV9l7fFL2+LrW2sWVUXXhkP+TVuOhKlIoQ1m/gFl0rtGs9vHUwfSGS3DWcy6SKpc/PUWcVLjf9rVyz/n6tbGGPOOby/YV1kDPuLBxK7e5OPJjJUNEnwatGWI4mxdS3RK7vq3ru69eKWaM50zmW3TdQntg5m/nbHsZ0nJmbnQZ8ylz/iv6wtvrk1elV77RWtsZAuyg72BUFY54zOmWBsX6rwi2PjDx9PPj+YJkuSxmd/nEgqFtRvv2TJhze01+jCOIfrczhjEV28OFH4zxPJff3pBwdTVs6YNbe6VlVEGxfFr+ise8eS+mvb62ylzHNrw6DgP+1N/t1vjh4emZz9plOKbElES1uib13W+K4l9Ve2xjXODAdhC8KaEYIxn2A9mdIvjo1vPZ7c3j9BliRNzOHicqm4T3xsc+cHN7aviAVz53ZNoc5ZSBNHMqX7+iae7U/9uj+Vy5TmRLULiFJTqWpze/yqrvq3La6/alGtUupcur0iCgheduT3u0f+8ZnedLo4dy3GiJQjiWh1S+zKpfU3Lm28sjUmlTJhLQhrWq+RT/C0Yf+oe3hrb/LR/jSVrblV1Zm1oeDvXtH0wY3tN3TWFW15jnWCxllQ8P58+aH+9M7+1AN9E8lkgQQn4fHhLUeSIynsv3ZR7Zb22PUdtZe3xZUi85wTSkQXhzLF7+8b+treQXteFuUyImVL4rSxLb5lcf2ta9pWx4OGRIUIYb3hYLVtMPOtfYMPH0uW8wbp8zsGpBQpWtoc+cimzg+saglovOyc62Y3wZhf8LGSuW0wszuR2TGSfXY4S0WLNM44Vx4Sl1RT1d+S5shbu+pXN0cva46ubwjPiqoYUdSnPTyQumt3//2Hx+Z5Le5JbWn8TZ1171vXevOKFuwcgrBeB7/gOcv5yp6B+3tGDwxnTy5QWKCeGQj7PrSu7SPnt6+MhydN+9x/yykXFyznQKqwO5k/Np5/dDBzcDRLpkOCMzffZ3XKU0314Te1xja1RDc2RS5sijYEdFNKezayiM6Zztm3e0bveu7EkZFJooVZgssUKdtprQtdtqzx7y7oWhEPlm1IC8L6LThjIY0/OpC+c0//Y70TVskijS94L9U0fvWSho9u7nxXV13JlrNyGCZnpHGuMZoo2y+mC3tThZ7hyYcGU31jebLlybH5lxa7LqykpCIpibHmhpqrF8U3t0ZXxEMr4qEl0QBnzJRqtqqmqE+cmCx/b//QXfuH8tnywv/4UhGjyzrq3ru+7X+tbjWVgrUgrJcN9Ji2vGN3/wM9o92jky5avqQUEbXX19y6ufOWta1Bjc9sQfyrOVrnjBGNFM2eTPFIptQ7kd83UXgmmZ9MF0+umOdT/pqXn1Sqk4vFpSLBQrHgloaajQ015zXULIsFl8aCnTV+wZkt1SwuANA4C3B+b9/Ed/cMPN43YZqOiyYlbKelNnTB4vp/vmTpkkig7Eh0VQiL/IKfmCx9ZNvhnQMpo2TNfHHgXH5va0K+3z2v6aObOi5ujhYsZ3bPHReMaZwRUapsjRbN4ZI1VjQHMsUXxnI7x3PDyQIZ9unYNeUvdg5OV6fE9JKeGKOwb0ksuCIa6IwGWkK+RbHgokigJag3h3wNAZ0zZis16wuVanSRKBjf2jv044PDQ+kikXLdRIRUxNmFrbHPXLb0HUsa8pYDYVW1sEK6eCqR+fPHenYPZxdq2OINvrhC44vrwzevafvouraGoF6wnFkvEjhjnJFgjIhylpMsmiNlK1u20kUzUTCGC9ZwwRgqGEMFc7Bo0GR5arMenT5Ah50+RodeduTKS2mRdEF+jXza0pC+PBZcFgstiwXbooEavxbTRdynRXwipIkan9AYc5Ry1Jycs65xFhD8V/2pO3f1PT2QLpdd+aF6CUcubQh/7KLFt27omJXRTAjLk8T82o8PDX/uN8d7xnOufl/pVP9XKhzQNy2K37a5451d9VKpuZtFmjrMSzCaGi0q2U7JliVbFm2naMuc4ziWNGxZtJy85RQsp2g7OdPJW7JoWnlbSqViPhHz6bGAHvbxuE+L+vSoTyhOxLmPs4jGI7qo8WkRXYR0wejkMSxzfaTU1AmI/fnync/33XNodHiyTEp5YIWHVI0R/80b2r9y+fKcbVftiocqFdbUbuHPPt37/T0DiWzJS2splSLGGsP+dy1v/MRFi5fHgkV7PhZHM0ZTReBUXTh1+JejlKOULZWjyJHKlmqqcJvqTzpjGme64IKRzrnGmc6ZOvVTKDq5O3g+9/8GNV6y5PcODX9n39BwMl9y1YjVG3j0Qb9+ycqm+968ijirziXx1SgsRhTSxPu29dx/cDhXMj25flIqvy7qa0O3nd/+4TVtU2u1FrA96XQ5yM6qCOnlZ3IuFBpnGmNbB9Off/bEvuFsrmy5egTgNVK2xi/pqv1/N6yL+bUqnDqsRmFFdHHdgy9u7xm1PX33jCIiVePX17TF7rhs6RWtsalDTQm8HMFYQONHs6XPPX38V0eTqbJ5cpjfy5/cCxbF733XhnhArzZnVZ2wYj7tpq3dP9ufkHZFTLgoRZzVBn1vXlz/5xd0bmmKQFtnqsoveH+u/M97+n7WMzZZME3LqZCtlIwu6Kx95N3na5xX1Rae6hJWzK99eFvPv+0dLFfYPXRKaRqP6Nr57fGPb+q8tqNWkjKd6tXW1Jr+3mz5C7tO3Ht4rGjahuVU2hk7nF20tOHxd26wq+naiyoSViyg/+Vvjn5nV1/eqNCJYaW44GGNdzRHP7Wp88bljar69v3rnGmcHUoX73j2xK+Pjpctx7Sdij0OTLBLz2t+4u3rS061fJ2qRVhRn/al3X3/tLM3VTAr/PJRRcRZWHBWF/rC5o73rW7VGJvxfWLeSRukcU6kfnE0+e0DQy8MpMuOtB1V+RfNavza1S2P3LCuStZnVYWwAhp/qG/ifz/c3Z8tVdWRwX7BtZB+03nN713VcklrdGrBQYWJa+rKot7J8vcODH63e1TmjVncY+iJ71MooH10S9cXL1+WNSrfWZUvLMHYpGm/8xcv7ElkqvNeBsGZxpiIBW5d1XzzipZVdWFLKq9flscZE4yUUvcen/jK/qH9/amigvimAAALf0lEQVSpJWBV+HxJqa546BtvWXV9V33ZrvD9hhUuLEYU1sU1D+zffmiUqv48NM4Y5yzYVPPZ1S3vWdHcHPTZ87tuc1ZKP85YwZIP96d+fmzs18eTlmFL3D2j1JZFtb9894aYX6/s2r/ChVWjiy/s7v/SzuPZookbRs/0uOIs0ljz3s66t3TUX9waDevCzb1+6na1gcnyg/0T/340uXcg5eC8ld9qo2vWtD58w7qiXckD8JUsLJ/gz4xM3vLQiz1T9/SBV/k4kyYamyPv66h9c2f9pqZIUOOKFni0eqrLSaWOZko7hzNPJrIPJbKFTGnqoCjwis8xHvJ94rKlf7mps1C5hzpUrLAEYznLfs9/79/RmyTO8T6/AUMoUkQ+saI1dmNH7XWd9avrwz7O6PRxDGwuDrab2u185nkze8dzD/dPbE1k9w5PyrL1snMgwGvgyDVN0W9ev/ri1phZoYdnVaywoj7x+48e+vkLg+TgmzwThZBSpHFfJLAqFlwZCyyLhpZGA0tiwWXxYFATdMYuaCJi7PQWwpekdvYt7vTStsKTv70t1WjR7EkVjmWLhzOlg5nSwUypPFmaugjn5KlbYJrOunp543+8fX1EFxU5mFWZwgpo/P7e5Ce3HT6WLJDASz8byetMkYX0+miwKaDFdS2qi7DOIn49ookajdf49BqdR3yaztmkaectWbDsvO0UTGfSsnOWzJt2zpYZw0mUzHK2TM6pVZ0nPYckda4fG92n3XZh1+cvW1aRhaFWeT8SZyxvOt/fnziWzHvglCu3f9HOlMgpl1hyIpmfoDNOYFD0suMY1Jn/+kt/z17ht9UE2nhWnxezStbWY8nfWdJwYXPUqLjCsAL7c0Cw7x9MPDWYRkExpx2DGDt5qxBnJBgJfvov7dRfZ/5Dfsb/nyFJzV0I4S8MZ75+YEgqVXk9oNKE5ePsYKZ47+Gx7GQZM4OgWgtD9uyJ1M+PjQcqrsKoqJ+HEXHG7tyf2DGQRq0BqhfB+pP5u7tHRoumVlmf7YoSll/jv+6bePrYODkSFQeo8sLw0f7Uv/eMClZRdWHlCEswljWcu3tGD49MYqwdVDuMlfPGL3vGnk/mfRXUHSrnJ/EL/qsTyW19E7AVAETENPHsYOruo2OMKqfeqJC+LRhLGdZjfamxiQLG2gEgIsWIHPlsX+rZsVzFhKwK+TH8gj86kH7kRBJj7QCc8SUXzw6lH+yfUEpVxme8EoTFT8WrEcQrAF5WFhJZ8skTqX2pQmWErEr4GfyCPzmUeeD4OOIVAGej8d8MpB8fSMuKCFmeFxZnLFW2Hu1PjSTzDPEKgLNDFiPTfqg32Z0p6t4PWZ7/AfyCPzM2ee+xcRIcJ7oB8Ioha9uJ1FNDmQo4mNXbwmKMipbzTCI7Mp5jWM0AwKv1E8Pa3p8eyBteX/ju7U6uc34wXdjalyKGeAXAa4Qs8UBvcl8yr0NYC/nlIDqYzD83mMZiUQBes6Oz4mTpuUQmXbY9rSwP93PB2GDBeHIwTYaNnYMAvG7I+rej43vTBZ+XTwz38B/dJ1h3qvDTo+OkYzUDAK9Xjgg+Opo7MJYzHOnd77tXhcUZZQz7maFsOVvCYlEAXpepM/Uf60v15w3h2S7jVWFpnB/Oln56bAyjVwC88W7zwPHk0XSRMwhrfpFK9aaLhxNZCAuAN1wWMiqZO4YyqbLlUWd5srdzxsaK5vbBDFXo5WsAzBWC3983MZA3PHqZlCeFpTF2omDc04ezGQCYbo/nPYlMImegJJw/HKWGs+UsLqAHYNpVIZEtdwylU95ckOU9YXHGxkvmYwMpQjkIwIyqwntPTAwXTS8OY3lPWILRQNH8SW+SNAy3AzATYR1LZEbynqwKvdfnHaVGsqVyEmf1ATBTJD0+kEqXLc/1IY8JizOWLFkP9k3glQPgXOqUn/UmRz24uIF7rZ1puGz98DiuxgHgnKrC/kR2NGdKrx1y4rFub0k1nCmrCcwPAnCubO2fyBq2tzKWl4TFGOVM56lEhhhsBcA5dn32+FAma9rcU0edcE/9WVnOsneMZBGvADjn7sT3DGZyJhLWXCasjGE/M5gmjgEsAM6xOxGZ9pF00fDU/jYv9XzTkX2ZEpVxXB8As1MV7khkCpbjoZDlGWExRgVLPjWMehCAWasKn0hk85bDvBMBvCMsYnnbeTKRgbAAmB0EO5TIFizHQz3KQ8KinGnvTWQwgAXArGE7B5J5Dw1jeabzm1IeniiQ6WAAC4BZrAqfHEqXbM+ELG8IixEVbfnEEOIVALMrALZtKFu0pVfG3T0iLEYl23kcA1gAzLawTiSyOdNBSTjL5EznyBCEBcBso2j3aNZ0vLGr0BvCMh21dzyHE/sAmIuQ9fhQpuyRywo9ICxGVHbk44NpxCsA5kJYjw5lDEd6YjrLCwmLkeHIxwZRDwIwJ8IaHc1lyjZ5oSj0grAUZQ17cHQSwgJgjtiZyHjicCwPCMuSatdIlhReKgDmsCo0pQeGsdwuLEZkStSDAMytsLYNpi0HCWs2MB21FSuwAJjDXMAyycJEyXS/sbxREiYnCjhlFIA5rWUOTOQd5XZluV1YkmikYJDl4I0CYE5DVk+66P5hd7cLy5Fq/3geWwgBmGthdaeLSFjnnLCU6kkXcEIDAHNdEu5KFWwJYZ1jwlJ0MF3EABYAc52wBiaKRG7PBu4XlnomXUTCAmCuExaVrGzZcnnE4i5vQ6VoMoUpQgDmAeX+cXdXC0sRjRQNMjBFCMB8VIXdqYJy97i7q4UllTo4UcCSUQDmSVjpgsvPcHK5sKg7hSlCAOaJvamSRMKaubBIdacwRQjAPCWsAxN5DLqfU8LaiYQFwDwJi1TBcPlZyW6fJRxL5pGwAJi3oqYnVXCzsVwtrNGCQSamCAGYv4zw4kTezaNY7hWWUtSDJaMAzKuw2MFMUbn4tEwXC4tUd6pAMBYA85mwUkUkrJkJiw6mS/AVAPNprKfcPVHo6pKwP1eGsACYz4SlsmU3/wFdnbAGShZeIQDmFUfmLRvCmgkDJRNjWADMMxNFE8KaESULvgJgnsvCMRdXNu4Vli0VlVESAjDPvqLxontPxXKvsMZdnEsBqGDGSygJp89YCcICAMLyTMKysIsQgPkvCUfKmCWcJoporGjg5QFgIRIWBt1nUBKWURICsAAkioZrdxO6uCTEqlEAFqImPFE0MUs4bUaLWIQFwPz7ijIoCaeNomEkLAAWhJJFbq0J3Zuw+ovYlwPAQmDLsu3S23PcO0s4gn05ACwQwwWXztG7VFjsZC4FACwArp3ycqmwTKnIgLAAWJi8MF6EsKbDaMHAMncAFopkGcKaDnnTxksDwIJ1QLee4efWklApvDQALFgHlJglnA6GW2dVAagGyg7WYU2vvSAsABYuMThIWNNKpI7CIiwAFiwx2C69cd2tJSESFgAoCSEsAMDrwVASTlfwEBYASAxeSViYJQQAJaFnhCUhLAAWTlg4rWFamCgJAVhAYWHhaGWU0ABUAyWUhNMsCbE1B4AFglEJJeE0S2gHrw0AC0UeJeH0hOUgYQGwYGSQsKZXEmIMC4CFo4SENc2EJXEDBQALhcKgO0pCADwDNj9PT1hY6Q7AAoKENb1EijcGgAUEY1jTIqhxvDMALBjCrRcAZnI5PB0AgCdAkAEAQFgAAABhAQAgLAAAgLAAAADCAgBAWAAAAGEBAACEBQCAsAAAAMICAAAICwAAYQEAAIQFAAAQFgAAwgIAAAgLAAAgLAAAhAUAABAWAABAWAAACAsAACAsAACAsAAAEBYAAEBYAAAAYQEAICwAAICwAAAQFpoAAABhAQAAhAUAgLAAAADCAgAACAsAAGEBAACEBQAAEBYAAMICAAAICwAAICwAAIQFAAAQFgAAQFgAAAgLAAAgLAAAgLAAABAWAABAWAAA8Kr8f9rHsUyZya2VAAAAAElFTkSuQmCC';

export const defaultKeyImg =
  'data:image/png;base64,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';
