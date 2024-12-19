import React from "react"
import { StyleSheet, TouchableOpacity, Image } from "react-native"

export const PictoTouchable = ({source, onPressIn}) => {

  return (
        <TouchableOpacity
            style={styles.touchable}
            onPressIn={() => onPressIn()}
        >
            <Image
                style={styles.picto}
                source={source}
            />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    touchable: {
        margin: 5,
        padding: 5,
        backgroundColor: 'rgba(255, 255, 255, .8)',
        borderWidth: 1,
        borderColor: 'rgb(180, 180, 180)',
        borderRadius: 5
      },
    picto: {
        width: 60,
        height: 60,
    },
})