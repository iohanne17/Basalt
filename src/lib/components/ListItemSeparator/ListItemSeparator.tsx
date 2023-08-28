import React from 'react'
import { StyleSheet, View, ViewStyle } from 'react-native'

import { colors } from '../../theme/colors'
import { Theme } from '../../theme/theme'

interface Props {
  style?: ViewStyle
}

export const ListItemSeparator = ({ style }: Props) => <View style={[s.separator, style]} />

const s = StyleSheet.create({
  separator: {
    height: 1,
    maxHeight: 1,
    flex: 1,
    backgroundColor: colors.inverseBlack20,
    marginHorizontal: Theme.paddings.h16,
  },
})
