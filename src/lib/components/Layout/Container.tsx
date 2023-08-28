import React, { Fragment, useLayoutEffect } from 'react'
import { Platform, Pressable, SafeAreaView, StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import { colors } from '../../theme/colors'
import { useNavigation } from '@react-navigation/native'
import { Theme } from '../../theme'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Text } from '../Text/Text'

interface Props {
  innerStyle?: StyleProp<ViewStyle>
  headerTitle?: string
  goBack?: () => void
  children: React.ReactNode
  headerShown: boolean
  showLeftIcon?: boolean
  alignHeaderTitle?: any
  safeAreaStyle?: StyleProp<ViewStyle>
  headerRight?: () => React.JSX.Element
  showRightIcon?: boolean
}

export const HeaderLayout: React.FC<Props> = ({
  innerStyle,
  children,
  headerTitle,
  headerShown = false,
  showLeftIcon = true,
  alignHeaderTitle = 'flex-start',
  safeAreaStyle,
  headerRight = null,
  showRightIcon = true,
}) => {
  const navigation = useNavigation()

  const handleBack = () => {
    if (navigation?.canGoBack()) {
      navigation?.goBack()
    }
  }

  const headerStyle = {
    alignSelf: alignHeaderTitle,
  }

  const headerLeft = () => {
    return (
      <Pressable onPress={handleBack} style={{ paddingHorizontal: Theme.sizes.h1 }}>
        <Ionicons name={'arrow-back'} size={Theme.sizes.icon3} color={colors.primary} />
      </Pressable>
    )
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShadowVisible: false,
      headerBackVisible: false,
      headerShown: headerShown,
      headerStyle: {
        backgroundColor: colors.inverseWhite100,
      },
      headerTitle: () => (
        <View style={s.headerTitle}>
          <Text title style={headerStyle}>
            {headerTitle}
          </Text>
        </View>
      ),
      headerLeft: showLeftIcon ? headerLeft : null,
      headerRight: showRightIcon ? headerRight : null,
    })
  }, [navigation, showLeftIcon, showRightIcon])

  return (
    <SafeAreaView style={[s.safeArea, safeAreaStyle]}>
      <View style={innerStyle}>{children}</View>
    </SafeAreaView>
  )
}

const s = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.inverseWhite100,
    paddingTop: Platform.select({
      ios: undefined,
      default: 0,
    }),
  },
  headerTitle: {
    flexDirection: 'row',
    flex: 1,
    paddingHorizontal: Theme.paddings.h16,
  },
})
