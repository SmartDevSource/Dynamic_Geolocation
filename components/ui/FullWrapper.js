import React from "react"
import { StyleSheet, View } from "react-native"

export const FullWrapper = ({show}) => {
  return (
    <>
    {show && 
      <View style={styles.container}/>
    }
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    zIndex: 2,
    position: 'absolute',
    backgroundColor: 'rgba(71, 71, 71, 0.3)',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  }
})