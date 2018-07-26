import React from 'react';
import { reduxForm } from 'redux-form';

import * as sinon from 'sinon';
import test from 'ava';
import Adapter from 'enzyme-adapter-react-15';
import { shallow, configure } from 'enzyme';

import {
    checked,
    required,
    email,
    number,
    https
} from '../build/index.js';

import {
    compileWordings
} from '@amalto/helpers';

import { MULTILANGUAGE_WORDINGS } from '@amalto/wordings';

configure({ adapter: new Adapter() });

test('InputValidation: testing validation methods', t => {
    const enWordings = compileWordings(MULTILANGUAGE_WORDINGS, 'en-US');
    const frWordings = compileWordings(MULTILANGUAGE_WORDINGS, 'fr-FR');

    t.is(checked(true, 'en-US'), undefined);
    t.is(checked(true, 'fr-FR'), undefined);
    t.is(checked(false, 'fr-FR'), frWordings.inputvalidation.required);

    t.is(required('inputvalidation.required', 'en-US'), undefined);
    t.is(required('inputvalidation.required', 'fr-FR'), undefined);
    t.is(required('', 'en-US'), enWordings.inputvalidation.required);
    t.is(required(undefined, 'fr-FR'), frWordings.inputvalidation.required);

    t.is(email('valid@email.com', 'en-US'), undefined);
    t.is(email('invalid@email-com', 'fr-FR'), frWordings.inputvalidation.invalid.email);
    t.is(email('invalid@email-com', 'en-US'), enWordings.inputvalidation.invalid.email);

    t.is(number('123456789', 'en-US'), undefined);
    t.is(number('123456789a', 'fr-FR'), frWordings.inputvalidation.invalid.number);
    t.is(number('123456789a', 'en-US'), enWordings.inputvalidation.invalid.number);

    t.is(https('https://www.valid-https.com', 'en-US'), undefined);
    t.is(https('http://www.valid-https.com', 'fr-FR'), frWordings.inputvalidation.invalid.https.url);
    t.is(https('www.valid-https.com', 'en-US'), enWordings.inputvalidation.invalid.https.url);
});