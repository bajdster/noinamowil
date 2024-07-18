import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const RecipeListItem = ({itemData}) => {

    console.log(itemData.item)

    //now need to style it
  return (
    <View style={styles.listItemContainer}>
      <View>
        <Image source={{uri:itemData.item.image_url}} style={{ width:60, height: 60 }}/>
      </View>
      {itemData && <Text>{itemData.item.title}</Text>}
    </View>
  )
}

export default RecipeListItem

const styles = StyleSheet.create({
  listItemContainer:{
    height:96,
    flexDirection:'row',
    borderWidth:1,
    alignItems:'center'
  }
})