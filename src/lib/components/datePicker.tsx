import React, { Fragment, useState } from 'react'
import { Pressable, StyleSheet } from 'react-native'
import { Text } from '@Components/index'
import { Theme } from '@Theme/theme'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { colors } from '@Theme/colors'
import DatePicker from 'react-native-date-picker'

export interface DatePickerProps {
  title: string
  onConfirm: (val: Date) => void
}

export const DatePickerComponent = ({ title, onConfirm }: DatePickerProps) => {
  const [date, setDate] = useState(new Date())
  const [openDate, setOpen] = useState(false)

  const DatePickerButton = ({
    title,
    onPress,
    date = null,
  }: {
    title: string
    onPress: () => void
    date: string | null
  }) => {
    return (
      <Pressable onPress={onPress} style={s.picker}>
        <Text text_semibold>{title}</Text>
        <Ionicons name={'calendar'} size={Theme.sizes.icon3} color={colors.primary} />
        <Text text_semibold>{date || ''}</Text>
      </Pressable>
    )
  }

  return (
    <Fragment>
      <DatePickerButton title={title} onPress={() => setOpen(true)} date={date.toDateString()} />
      <DatePicker
        modal
        open={openDate}
        date={date}
        onConfirm={date => {
          setOpen(false)
          setDate(date)
          onConfirm(date)
        }}
        onCancel={() => {
          setOpen(false)
        }}
      />
    </Fragment>
  )
}

export default DatePickerComponent

const s = StyleSheet.create({
  picker: {
    paddingHorizontal: Theme.sizes.h1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    alignSelf: 'center',
  },
})
