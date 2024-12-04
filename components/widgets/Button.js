import React from "react"
import { StyleSheet, Text, TouchableOpacity } from "react-native"

import { useFonts } from "expo-font"

export const Button = ({button_style={}, text_style={}, text, bgcolor, onPress, disabled=false}) => {
  // const [fonts] = useFonts({'FredokaOne': require('../../assets/fonts/FredokaOne.ttf')})

  const pressable_style = {backgroundColor: '', opacity: disabled ? .3 : 1}
  const disabled_style = { color: disabled ? 'black' : 'white'}

  switch(bgcolor){
    case 'blue': pressable_style.backgroundColor = '#61d4fa'; break
    case 'yellow': pressable_style.backgroundColor = '#E0D100'; break
    case 'green': pressable_style.backgroundColor = '#60db7d'; break
    case 'purple': pressable_style.backgroundColor = '#df63ff'; break
    case 'red': pressable_style.backgroundColor = '#ff6666'; break
    case 'orange': pressable_style.backgroundColor = '#f7a000'; break
    default: pressable_style.backgroundColor = '#61d4fa'; break
  }

  return (
    <TouchableOpacity
        style={[styles.button, pressable_style, button_style]}
        onPressIn={() => onPress()}
    >
      <Text style={[disabled_style, text_style, styles.text]}>
        {text}
      </Text>
    </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 40,
    fontSize: 18,
    padding: 5,
    margin: 3,
    borderRadius: 5,
  },
  text: {
    color: 'white',
    width: '100%',
    textAlign: 'center'
  }
})