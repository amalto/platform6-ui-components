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

    t.is(checked('existing string', 'en-US'), enWordings['inputvalidation.required']);
    t.is(checked('existing string', 'fr-FR'), frWordings['inputvalidation.required']);
    t.is(checked('', 'en-US'), enWordings['inputvalidation.invalid']);
    t.is(checked(undefined, 'fr-FR'), undefined);
});