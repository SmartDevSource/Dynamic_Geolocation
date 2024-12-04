import React, { useEffect, useRef, useState } from "react"
import { StyleSheet, Text, View, Platform, Pressable } from "react-native"

export const SelectList = ({list, preSelected={}, direction='column', fontSize=18, margin=5, onSelect}) => {
    const [currentSelection, setCurrentSelection] = useState(preSelected.value)
    const outlineSelected = '#df63ff'

    useEffect(()=>{
      onSelect(currentSelection)
    }, [currentSelection])
  
    const handleSelection = element => {
        setCurrentSelection(element)
    }

    const container_style = {
      display: 'flex',
      flexDirection: direction,
    }

    const element_style = {
      fontSize: fontSize,
      margin: margin
    }

  return (
    <>
    {list && 
    <View style={[styles.container, container_style]}>
        {list.map((element, index) => {
            return (
            <Pressable
                key={`select_list_index_${index}`}
                onPress={() => handleSelection(element.value)}
            >
                <Text style={[
                    styles.outlined_button,
                    element_style,
                    currentSelection === element.value ? {borderColor: outlineSelected}: {}
                    ]
                }>
                  {element.title}
                </Text>
            </Pressable>
            )
        })}
    </View>
    }
    </>
  )
}

const styles = StyleSheet.create({
  outlined_button: {
    fontFamily: 'FredokaOne',
    borderWidth: 3,
    color: 'rgb(70, 70, 70)',
    borderColor: 'rgb(70, 70, 70)',
    borderRadius: 5,
    padding: 5,
    textAlign: 'center'
  }
})