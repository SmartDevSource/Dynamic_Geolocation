import React from "react"
import { StyleSheet, Text, TouchableOpacity } from "react-native"

export const Button = ({text, bgcolor, onPress, disabled=false}) => {
  const color_style = {backgroundColor: '', opacity: disabled ? .3 : 1}
  const disabled_style = { color: disabled ? 'black' : 'white'}

  switch(bgcolor){
    case 'blue': color_style.backgroundColor = '#61d4fa'; break
    case 'yellow': color_style.backgroundColor = '#E0D100'; break
    case 'green': color_style.backgroundColor = '#60db7d'; break
    case 'purple': color_style.backgroundColor = '#df63ff'; break
    case 'red': color_style.backgroundColor = '#ff6666'; break
    case 'orange': color_style.backgroundColor = '#f7a000'; break
    default: color_style.backgroundColor = '#61d4fa'; break
  }

  return (
    <TouchableOpacity
        style={[styles.button, color_style]}
        onPressIn={() => !disabled && onPress()}
    >
      <Text style={styles.text}>
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