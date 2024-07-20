import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'

const Drink = () => {

  const {title} = useLocalSearchParams()

  return (
    <View>
      <Text>drink, {title}</Text>
    </View>
  )
}

export default Drink

const styles = StyleSheet.create({})