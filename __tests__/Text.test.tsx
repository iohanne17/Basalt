import React from 'react';
import {render} from '@testing-library/react-native';
import {Text} from '../src/lib/components';

enum TextColor {
  main = 'colorMain',
  primary = 'primary',
  error = 'error',
  black = 'black',
  white = 'white',
  fade = 'fade',
}

describe('Text component', () => {
  it('renders children', () => {
    const {getByText} = render(<Text>Hello, world!</Text>);
    const textElement = getByText('Hello, world!');
    expect(textElement).toBeTruthy();
  });

  it('matches snapshot', () => {
    const {toJSON} = render(
      <Text color={TextColor.primary}>Hello, snapshot!</Text>,
    );
    expect(toJSON()).toMatchSnapshot();
  });
});
