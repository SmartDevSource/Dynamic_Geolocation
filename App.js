import { StyleSheet, TouchableWithoutFeedback, Keyboard, View } from 'react-native'

import { FullWrapper } from './components/ui/FullWrapper'
import { Map } from './components/map/Map'

import { useAtom } from 'jotai'
import { showFullWrapperAtom } from './data/atoms'

export default function App() {
  const [showFullWrapper, setShowFullWrapper] = useAtom(showFullWrapperAtom)

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <FullWrapper show={showFullWrapper}/>
        <Map/>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

  },
  webview: {
    flex: 1,
    width: '100%',
  }
});
