import { StyleSheet, Text, View, TextInput } from 'react-native'
import React, {useState} from 'react'

const FilterInput = ({onFilter}) => {

    const [filterText, setFilterText] = useState("")

    function onChangeText(text)
    {
        setFilterText(text)
        onFilter(text)
    }


  return (
    <View>
      <TextInput style={styles.input} placeholder='Wpisz nazwę, kategorię lub składnik' onChangeText={onChangeText} value={filterText}/>
    </View>
  )
}

export default FilterInput

const styles = StyleSheet.create({
    input:{
        backgroundColor:'white',
        height:50,
        fontSize:18,
        padding:10,
        marginBottom:10
    }
})