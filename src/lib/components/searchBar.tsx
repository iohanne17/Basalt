import { Theme } from '@Theme/theme'
import { useDebounce } from '@Utils/userUtils'
import React, { FC, useEffect, useState } from 'react'
import { View, TextInput, StyleSheet, TextInputProps, TouchableOpacity } from 'react-native'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

interface SearchBarProps extends TextInputProps {
  onSearch: (query: string) => void
  debounceTime?: number
  onCancel?: () => void
}

export const SearchBar: FC<SearchBarProps> = ({ onSearch, debounceTime = 800, onCancel, ...textInputProps }) => {
  const [query, setQuery] = useState<string | undefined>(undefined)
  const searchInput = useDebounce(query, 1000)

  useEffect(() => {
    if (searchInput && searchInput.length > 0) {
      onSearch(searchInput)
    }
  }, [searchInput])

  const onPressCancel = () => {
    handleTextChange?.('')
    onCancel?.()
  }

  const handleTextChange = (text: string) => {
    setQuery(text)
    if (text === '') {
      onCancel?.()
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search stock by name or ticker symbol..."
        value={query}
        style={styles.input}
        onChangeText={val => {
          setQuery(val)
          handleTextChange(val)
        }}
        {...textInputProps}
      />
      {query && query?.length > 0 && (
        <TouchableOpacity onPress={onPressCancel}>
          <MaterialIcon name="cancel" color={Theme.colors.light.primary} size={Theme.sizes.icon3} />
        </TouchableOpacity>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: Theme.colors.light.searchBar,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    height: 40,
    letterSpacing: 1.5,
    fontWeight: '500',
    fontFamily: 'SchibstedGrotesk-Bold',
    flex: 1,
  },
})

export default SearchBar
