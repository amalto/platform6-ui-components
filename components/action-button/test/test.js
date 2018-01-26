import test from 'ava';
import ActionButton from 'index';
import {
    shallow
} from 'enzyme';

test('Should have .action-icon-button class name', t => {
    const wrapper = shallow(<ActionButton />);

    t.true(wrapper.hasClass('action-icon-button'));
    t.pass();
});
