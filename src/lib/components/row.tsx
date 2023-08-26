import * as React from 'react';
import {Theme} from '../theme';
import {Text} from './Text/Text';
import {View, StyleSheet} from 'react-native';

interface RowProps {
  title: string;
  value: string | number;
}

export const Row = ({title, value}: RowProps) => {
  return (
    <View style={s.row}>
      <Text text style={s.rowTitle}>
        {title}
      </Text>
      <Text text_semibold style={s.rowValue}>
        {value}
      </Text>
    </View>
  );
};

const s = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Theme.sizes.v2,
  },
  rowTitle: {
    textTransform: 'capitalize',
  },
  rowValue: {
    textTransform: 'uppercase',
    color: Theme.colors.dark.inverseWhite100,
  },
});

export default Row;
