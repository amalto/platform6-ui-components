import React from 'react';

import md5 from 'md5';

import * as sinon from 'sinon';
import test from 'ava';
import base64 from 'base-64';
import Adapter from 'enzyme-adapter-react-15';
import { shallow, configure } from 'enzyme';
import {
    getWordingsInUserLanguage,
    compileWordings,
    getGravatarUrl,
    isValidPassword,
    isValidEmail,
    isValidColorCode,
    isNotEmpty,
    isValidScopeKeyword,
    isValidKeyChar,
    isValidXMLTag,
    isValidHttpsUrl,
    escapeXml,
    utf8JSON_to_b64URI,
    URIb64_to_utf8JSON,
    arrayMin,
    arrayMax,
    formatFileSize,
    getQueryParams,
    addQueryParam,
    orderAsc,
    orderDesc,
    saveDataAsJSONFile,
    downloadDataFile,
    triggerDataDownload,
    hasRequiredResource,
    replaceTemplateViewName,
    replaceTemplateFlags,
    getStyleDef,
    getAcceptLanguageHeader,
    getI18nLabel,
    getJSTreeData,
    loadTooltips,
    unloadTooltips,
    groupByProperty,
    addValToArrayNoDup,
    removeValFromArrayNoDup,
    getNestedValue,
    filterCollection,
    base64Decode,
    deepCopy,
    handleDuplicateNameFromArray,
    handleDuplicateServiceItemName,
    dateByLocalToString
} from '../build/index.js';

configure({ adapter: new Adapter() });

const WORDINGS = {
    'hello': {
        'en-US': 'Hello World!',
        'fr-FR': 'Bonjour le monde !'
    }
};

// getWordingsInUserLanguage
test('getWordingsInUserLanguage should return right wordings', t => {
    const enWordings = getWordingsInUserLanguage('en-US');
    const frWordings = getWordingsInUserLanguage('fr-FR');

    t.is(enWordings.save, 'Save');
    t.is(frWordings.save, 'Sauvegarder');
});

// compileWordings
test('compileWordings should return right wording', t => {
    const enWordings = compileWordings(WORDINGS, 'en-US');
    const frWordings = compileWordings(WORDINGS, 'fr-FR');

    t.is(enWordings.hello, 'Hello World!');
    t.is(frWordings.hello, 'Bonjour le monde !');
});

// getGravatarUrl
test.skip('getGravatarUrl should return gravatar url with md5 encoded email', t => {
    const email = 'test@gmail.com';
    const md5EncodedEmail = md5(email);
    const gravatarUrl = getGravatarUrl(email);

    t.is(gravatarUrl, `https://secure.gravatar.com/avatar/${md5EncodedEmail}?s=200&d=mm`)
});

// isValidPassword
test('isValidPassword: password with at least 2 of lowercase/uppercase alphabetics characters and numbers. It can contain specials caracters and must have between 8 and 32 characters.', t => {
    const lowercase = 'abcdefghijklmnopqrstuvwxyz'
    const uppercase = lowercase.toLocaleUpperCase()
    const num = '0123456789'

    t.false(isValidPassword(lowercase));
    t.false(isValidPassword(uppercase));
    t.false(isValidPassword(num));
    t.false(isValidPassword(lowercase + uppercase));
    t.false(isValidPassword(lowercase + num));
    t.true(isValidPassword('pwdWith_special-characters@?9'));
});

// isValidEmail
test('isValidEmail: email format', t => {
    t.true(isValidEmail('valid-email@gmail.com'));
    t.false(isValidEmail('valid-email@gmail'));
});

// isValidColorCode
test('isValidColorCode: hexadecimal color string value', t => {
    t.true(isValidColorCode('#FFFFFF'));
    t.true(isValidColorCode('#abc'));
    t.false(isValidColorCode('#FFFFFZ'));
    t.false(isValidColorCode('#abcd'));
    t.false(isValidColorCode('#ab?'));
});

// isNotEmpty
test('isNotEmpty: string empty state', t => {
    t.true(isNotEmpty('I am not empty'));
    t.false(isNotEmpty(''));
    t.false(isNotEmpty());
});

// isValidScopeKeyword
test('isValidScopeKeyword: scope keyword format', t => {
    t.true(isValidScopeKeyword('permission-_~@$£|€¥§&'));
    t.false(isValidScopeKeyword('permission.'));
});

// isValidKeyChar
test('isValidKeyChar: key character validation', t => {
    t.true(isValidKeyChar('abcdefghijklmnopqrstuvwxyz-ABCDEFGHIJKLMNOPQRSTUVWXYZ_0123456789'));
    t.false(isValidKeyChar('abcdefghijklmnopqrstuvwxyz-ABCDEFGHIJKLMNOPQRSTUVWXYZ_0123456789.'));
});

// isValidXMLTag
test('isValidXMLTag: XML tag validation', t => {
    t.true(isValidXMLTag(':valid-XML.Tag'));
    t.false(isValidXMLTag(':invalid-XML.Tag&'));
});

// isValidHttpsUrl
test('isValidHttpsUrl: https url validation', t => {
    t.true(isValidHttpsUrl('https://www.localhost:6060.com/whatever/after'));
    t.false(isValidHttpsUrl('https://www.localhost:6060/wrong/cause/incomplete/domain/name'));
});

// escapeXml
test('escapeXml: test escaping of string', t => {
    t.deepEqual(escapeXml('[<&\'">]'), '[&lt&amp&apos&quot&gt]');
    t.notDeepEqual(escapeXml('[<>]', '[&lt&amp&apos&quot&gt]'));
});

// utf8JSON_to_b64URI and URIb64_to_utf8JSON
test('utf8JSON_to_b64URI and URIb64_to_utf8JSON: encoding and decoding JSON object', t => {
    const json = { 'test': 'test\n' };
    const encoded = utf8JSON_to_b64URI(json);
    const decoded = URIb64_to_utf8JSON(encoded)

    t.deepEqual(json.test, decoded.test);
});

// arrayMin
test('arrayMin: should return minimal value whi is 5', t => {
    t.true(arrayMin([10, 6, 116, 5, 47, 11, 34]) === 5);
});

// arrayMax
test('arrayMax: should return maximal value which is 116', t => {
    t.true(arrayMax([10, 6, 116, 5, 47, 11, 34]) === 116);
});

// formatFileSize
test('formatFileSize: return size format depending of size in bytes', t => {
    t.true(formatFileSize(10) === '10.0 B');
    t.true(formatFileSize(1000) === '1.0 KB');
    t.true(formatFileSize(1000000) === '1.0 MB');
    t.true(formatFileSize(1000000000) === '1.0 GB');
    t.true(formatFileSize(1000000000000) === '1.0 TB');
});

// getQueryParams
test('getQueryParams: should return query param as a map object of key and value', t => {
    const result = getQueryParams('?test=value&other=something');

    t.deepEqual(result, { "test": "value", "other": "something" });
});

// addQueryParam
test('addQueryParam: generating DOM link with validate url format', t => {
    class MockClass extends React.Component {
        constructor(props) {
            super(props);
            this.state = {};
        }

        render() {
            const link = addQueryParam(this.props.url, this.props.paramKey, this.props.paramValue);

            return <a href={link.href} search={link.search} />
        }
    }

    const wrapper1 = shallow(
        <MockClass url='https://www.test.com' paramKey='key1' paramValue='value1' />
    );
    const wrapper2 = shallow(
        <MockClass url='https://www.test.com?key1=value1' paramKey='key2' paramValue='value2' />
    );

    t.is(wrapper1.prop('href'), 'https://www.test.com/?key1=value1');
    t.not(wrapper1.prop('href'), 'https://www.test.com/&key1=value1');

    t.is(wrapper2.prop('href'), 'https://www.test.com/?key1=value1&key2=value2');
    t.not(wrapper2.prop('href'), 'https://www.test.com/&key2=value2');
});

// orderAsc
test('orderAsc: should order by asc key-value', t => {
    const object = { c: 'c', b: 'b', a: 'a' };

    t.deepEqual(Object.keys(orderAsc(object)), Object.keys({ a: 'a', b: 'b', c: 'c' }));
    t.notDeepEqual(Object.keys(orderAsc(object)), Object.keys(object));
});

// orderDesc
test('orderDesc: should order by desc key-value', t => {
    const object = { a: 'a', b: 'b', c: 'c' };

    t.deepEqual(Object.keys(orderDesc(object)), Object.keys({ c: 'c', b: 'b', a: 'a' }));
    t.notDeepEqual(Object.keys(orderDesc(object)), Object.keys(object));
});

// saveDataAsJSONFile
test.skip('saveDataAsJSONFile: can\'t be test as it doesn\'t return anything', t => { });

// downloadDataFile
test.skip('downloadDataFile: can\'t be test as it doesn\'t return anything', t => { });

// triggerDataDownload
test.skip('triggerDataDownload: can\'t be test as it doesn\'t return anything', t => { });

// hasRequiredResource
test('hasRequiredResource: check resource access', t => {
    const endpoints = {
        'app': {
            'home': { id: 'home' },
            'reports': { id: 'reports' }
        },
        'other-app': {
            'dashboard': { id: 'dashboard' },
            'counters': { id: 'counters' }
        }
    };

    t.true(hasRequiredResource(endpoints, 'app', 'home'));
    t.true(hasRequiredResource(endpoints, 'app', 'reports'));
    t.true(hasRequiredResource(endpoints, 'other-app', 'dashboard'));
    t.true(hasRequiredResource(endpoints, 'other-app', 'counters'));
    t.false(hasRequiredResource(endpoints, 'app', 'dashboard'));
    t.false(hasRequiredResource(endpoints, 'other-app', 'home'));
});

// replaceTemplateViewName
test('replaceTemplateViewName: replace tag inside a html template', t => {
    const template = '<!DOCTYPE <html><head></head><body>{{VIEWNAME}}</body></html>';
    const proccessedTemplate = replaceTemplateViewName(template, 'Hello world!');


    t.is(proccessedTemplate, '<!DOCTYPE <html><head></head><body>Hello world!</body></html>');
    t.not(proccessedTemplate, template);
});

// replaceTemplateFlags
test('replaceTemplateFlags', t => {
    const template = '{{FLAGS=dwarning,cimportant}}';
    const proccessedTemplate = replaceTemplateFlags(template, 'en-US');

    t.is(proccessedTemplate, '<span class="fa-fw right-spaced text-xlarge danger-color fas fa-exclamation-triangle" title="Warning"></span><span class="fa-fw right-spaced text-xlarge warning-color fas fa-star" title="Important"></span><span class="fa-fw right-spaced text-xlarge font-color-lighter fas fa-archive" title="Archived"></span>');
    t.not(proccessedTemplate, template);
    t.not(proccessedTemplate, '<span class="fa-fw right-spaced text-xlarge danger-color fas fa-exclamation-triangle" title="Warning"></span>');
});

// getStyleDef
test('getStyleDef: generate style object from string', t => {
    const styleConf = 'icon:fas fa-info,btn:btn btn-trans btn-info,color:info-color';
    const styleObject = getStyleDef(styleConf);

    t.deepEqual(styleObject, {
        icon: 'fas fa-info',
        btn: 'btn btn-trans btn-info',
        color: 'info-color'
    });
    t.notDeepEqual(styleObject, {
        icon: 'fas fa-danger',
        btn: 'btn btn-trans btn-trash',
        color: 'danger-color'
    });
});

// getAcceptLanguageHeader
test('getAcceptLanguageHeader: generate accepted language header from locale', t => {
    const acceptedLanguageHeaderEN = getAcceptLanguageHeader('en-US');
    const acceptedLanguageHeaderFR = getAcceptLanguageHeader('fr-FR');

    t.is(acceptedLanguageHeaderEN, 'en,fr;q=0.8');
    t.is(acceptedLanguageHeaderFR, 'fr,en;q=0.8');
});

// getI18nLabel
test('getI18nLabel: get wanted translation', t => {
    const wordings = {
        'hello': {
            'en-US': 'Hello World!',
            'en-EN': 'Hello le monde!',
            'fr-FR': 'Bonjour le monde !',
            'es-ES': 'Hola mundo!'
        }
    }
    t.is(getI18nLabel('en-US', wordings.hello), 'Hello World!');
    t.not(getI18nLabel('en-EN', wordings.hello), 'Hello World!');
    t.is(getI18nLabel('en-EN', wordings.hello, true), 'Hello World!');
    t.is(getI18nLabel('en-EN', wordings.hello, true, true), 'Hello World!');
    t.is(getI18nLabel('en-EN', wordings.hello), 'Hello le monde!');
    t.is(getI18nLabel('fr-FR', wordings.hello), 'Bonjour le monde !');
    t.is(getI18nLabel('es-ES', wordings.hello), 'Hola mundo!');
    t.is(getI18nLabel('pt-PT', wordings.hello), 'Hello World!');
});

// getJSTreeData
test('getJSTreeData: generate JSTree data from orgModel object', t => {
    const org = {
        id: '0',
        parentId: '#',
        elementName: 'org',
        description: 'Root org name',
        children: [
            {
                id: '1',
                parentId: '0',
                elementName: 'child',
                description: 'Child from 0',
            }
        ]
    }
    t.deepEqual(
        getJSTreeData(org, ['0']),
        {
            id: '0',
            text: '',
            data: {
                description: 'Root org name',
                propertiesMap: undefined,
                parentId: org.parentId,
                childNames: ['child']
            },
            children: [{
                id: '1',
                text: 'child',
                data: {
                    description: 'Child from 0',
                    propertiesMap: undefined,
                    parentId: '0',
                    childNames: []
                },
                children: null,
                icon: 'fas fa-fw fa-th-large font-color-lighter',
                state: {
                    opened: false,
                    disabled: false
                },
            }],
            icon: 'fas fa-fw fa-terminal black-color',
            state: {
                opened: true,
                disabled: false
            }
        }
    );
});

// loadTooltips
test.skip('loadTooltips: can\'t be test as it doesn\'t return anything', t => { });

// unloadTooltips
test.skip('unloadTooltips: can\'t be test as it doesn\'t return anything', t => { });

// groupByProperty
test('groupByProperty: should store content of array into object array at property name', t => {
    const list = [
        {
            id: 1,
            test: 'one'
        },
        {
            id: 2,
            test: 'two'
        },
        {
            id: 3,
            test: 'three'
        }
    ];

    t.deepEqual(groupByProperty(list, 'test'), {
        one: [{
            id: 1,
            test: 'one'
        }],
        two: [{
            id: 2,
            test: 'two'
        }],
        three: [{
            id: 3,
            test: 'three'
        }]
    });
});

// addValToArrayNoDup
test('addValToArrayNoDup: should add element to array only if there a no duplicate', t => {
    const data = ['1', '2', '3'];

    t.deepEqual(addValToArrayNoDup(data, '4'), ['1', '2', '3', '4']);
    t.deepEqual(addValToArrayNoDup(data, '3'), ['1', '2', '3']);
    t.notDeepEqual(addValToArrayNoDup(data, '3'), ['1', '2', '3', '4']);
});

// removeValFromArrayNoDup
test('removeValFromArrayNoDup: should remove element from array', t => {
    const data = ['1', '2', '3'];

    t.deepEqual(removeValFromArrayNoDup(data, '3'), ['1', '2']);
    t.deepEqual(removeValFromArrayNoDup(data, '4'), ['1', '2', '3']);
    t.notDeepEqual(removeValFromArrayNoDup(data, '4'), ['1', '2']);
});

// getNestedValue
test('getNestedValue: should get nested value from object', t => {
    const data = {
        node: {
            nested: 1
        },
        child: {
            value: 2
        }
    };

    t.deepEqual(getNestedValue(data, 'node.nested'), 1);
    t.deepEqual(getNestedValue(data, 'child.value'), 2);
    t.deepEqual(getNestedValue(data, 'i.do.not.exist'), undefined);
    t.notDeepEqual(getNestedValue(data, 'node.nested'), 2);
});

// filterCollection
test('filterCollection: should filter collection by properties and search value', t => {
    const data = [
        { one: 'sheep', two: 'chicken', three: 'cow' },
        { one: 'wolf', two: 'deer', three: 'snake' },
        { one: 'lion', two: 'zebra', three: 'giraf' }
    ];
    const filterOne = filterCollection(data, ['one'], '');

    t.is(filterOne[0].one, 'sheep');
    t.is(filterOne[1].one, 'wolf');
    t.is(filterOne[2].one, 'lion');

    const filterOneInvalidProperty = filterCollection(data, ['one', 'toto'], '');

    t.is(filterOneInvalidProperty[0].one, 'sheep');
    t.is(filterOneInvalidProperty[1].one, 'wolf');
    t.is(filterOneInvalidProperty[2].one, 'lion');

    /**
     * Should return the original data without any changes.
     * Only searchString can interact with the collection returned.
     */
    const filterInvalidProperty = filterCollection(data, ['toto'], '');

    t.is(filterOneInvalidProperty[0].one, 'sheep');
    t.is(filterOneInvalidProperty[1].one, 'wolf');
    t.is(filterOneInvalidProperty[2].one, 'lion');

    const filterSearchValue = filterCollection(data, ['one', 'two', 'three'], 's');

    t.is(filterSearchValue.length, 2);
    t.is(filterSearchValue[0].one, 'sheep');
    t.is(filterSearchValue[1].three, 'snake');

    const filterUnfindable = filterCollection(data, ['one', 'two', 'three'], 'you can\'t find me');

    t.is(filterUnfindable.length, 0);
});

// base64Decode
test.skip('base64Decode: This won\'t be tested because it use base64.decode directly', t => { });

// deepCopy
test('deepCopy: Should copy and extend object', t => {
    const obj1 = {first: 'one', second: 'two'};
    const obj2 = {third: 'three', fourth: 'four'};
    const obj3 = {first: 'one', second: 'two', third: 'three', fourth: 'four'};

    t.deepEqual(deepCopy(obj1, obj2), obj3);
});

// handleDuplicateNameFromArray
test('handleDuplicateNameFromArray: Should handle duplicate name', t => {
    const name = 'test';
    const container1 = ['test'];
    const container2 =['test', 'test_1'];
    const container3 =['test_1'];

    t.is(handleDuplicateNameFromArray(name, container1), 'test_1');
    t.is(handleDuplicateNameFromArray(name, container2), 'test_2');
    t.is(handleDuplicateNameFromArray(name, container3), 'test');
})

// handleDuplicateServiceItemName
test('handleDuplicateServiceItemName: Should handle duplicate name of ServiceItemFacade', t => {
    const item = { appKey: 'appKey1', name: 'test' };
    const item2 = { appKey: 'appKey1', name: 'test2' };
    const items1 = [
        { appKey: 'appKey1', name: 'test'},
        { appKey: 'appKey1', name: 'test2'},
        { appKey: 'appKey1', name: 'test3'},
    ];
    const items2 = [
        { appKey: '', name: 'test'},
        { appKey: 'appKey1', name: 'test2'},
        { appKey: 'appKey1', name: 'test2_1'},
    ];

    t.is(handleDuplicateServiceItemName(item, items1), 'test_1');
    t.is(handleDuplicateServiceItemName(item, items2), 'test');
    t.is(handleDuplicateServiceItemName(item2, items2), 'test2_2');
})

// dateByLocalToString
test('dateByLocalToString: Should convert timestamp to date string', t => {
    const timestamp = 1520936526658;
    const dateString = '3/13/2018, 11:22 AM';

    t.is( dateByLocalToString( 'en-US', timestamp ), dateString );
})