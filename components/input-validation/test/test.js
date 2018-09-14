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
    t.is(checked(false, 'fr-FR'), frWordings.fieldRequired);

    t.is(required('inputvalidation.required', 'en-US'), undefined);
    t.is(required('inputvalidation.required', 'fr-FR'), undefined);
    t.is(required('', 'en-US'), enWordings.fieldRequired);
    t.is(required(undefined, 'fr-FR'), frWordings.fieldRequired);

    t.is(email('valid@email.com', 'en-US'), undefined);
    t.is(email('invalid@email-com', 'fr-FR'), frWordings.invalidEmail);
    t.is(email('invalid@email-com', 'en-US'), enWordings.invalidEmail);

    t.is(number('123456789', 'en-US'), undefined);
    t.is(number('123456789a', 'fr-FR'), frWordings.invalidNumber);
    t.is(number('123456789a', 'en-US'), enWordings.invalidNumber);

    t.is(https('https://www.valid-https.com', 'en-US'), undefined);
    t.is(https('http://www.valid-https.com', 'fr-FR'), frWordings.invalidUrl);
    t.is(https('www.valid-https.com', 'en-US'), enWordings.invalidUrl);
});