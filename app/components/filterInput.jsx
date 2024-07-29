import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'

const FilterInput = ({onFilter, clearFilter}) => {

    const [filterText, setFilterText] = useState("")

    function onChangeText(text)
    {
        setFilterText(text)
        onFilter(text)
    }

    function clearInputHandler()
    {
      setFilterText('')
      clearFilter()
    }


  return (
    <View style={styles.inputContainer}>
      {filterText && 
      (
        <TouchableOpacity style={{width:25, height:25, position:'absolute', zIndex:100, top: 12, right:10}} onPress={clearInputHandler}>
          <Image source={require("../../assets/icons/delete.png")} style={{width:"100%", height:'100%'}}/>
        </TouchableOpacity>
      )}
      <TextInput style={styles.input} placeholder='Wpisz nazwę, kategorię lub składnik' onChangeText={onChangeText} value={filterText}/>
    </View>
  )
}

export default FilterInput

const styles = StyleSheet.create({
    inputContainer:{
      flexDirection:'row',
      position:'relative'
    },
    input:{
        backgroundColor:'white',
        height:50,
        fontSize:18,
        padding:10,
        marginBottom:10,
        width:'100%'
    }
})