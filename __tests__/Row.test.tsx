import React from 'react';
import {Row} from '../src/lib/components/row';
import {render} from '@testing-library/react-native';

const props = {
  title: 'Network error',
  value: 'Try again later',
};

test('Renders row snapshot as expected', () => {
  const {toJSON} = render(<Row {...props} />);
  expect(toJSON()).toMatchSnapshot();
});
