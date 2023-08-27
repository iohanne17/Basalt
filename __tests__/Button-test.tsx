import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {Button} from '../src/lib/components/Button/MainButton';

describe('MyButtonComponent', () => {
  it('should trigger onPress event when the button is pressed', () => {
    const onPressMock = jest.fn();
    const {getByText} = render(
      <Button onPress={onPressMock} type="text" title="Press Me" />,
    );

    const button = getByText('Press Me');
    fireEvent.press(button);

    expect(onPressMock).toHaveBeenCalledTimes(1);
  });
});
