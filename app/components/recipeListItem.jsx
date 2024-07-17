import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const RecipeListItem = ({itemData}) => {

    console.log(itemData.item.title)

    //now need to style it
  return (
    <View>
      {itemData && <Text>{itemData.item.title}</Text>}
    </View>
  )
}

export default RecipeListItem

const styles = StyleSheet.create({})