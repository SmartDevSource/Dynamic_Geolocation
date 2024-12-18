import { createContext, useContext, useState } from "react"
import { StyleSheet, View } from "react-native"

const FullWrapperContext = createContext()

export const FullWrapperProvider = ({children}) => {
  const [showFullWrapper, setShowFullWrapper]= useState(false)

  return (
    <FullWrapperContext.Provider value={{showFullWrapper, setShowFullWrapper}}>
      {showFullWrapper && <FullWrapper/>}
      {children}
    </FullWrapperContext.Provider>
  )
}

const FullWrapper = () => {
  return (
      <View style={styles.container}/>
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

export const useFullWrapper = () => useContext(FullWrapperContext)