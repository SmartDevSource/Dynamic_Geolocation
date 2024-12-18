import { StyleSheet, View } from 'react-native'
import { Map } from './components/map/Map'
import { FullWrapperProvider } from './components/contexts/FullWrapper'

export default function App() {

  return (
    <FullWrapperProvider>
        <View style={styles.container}>
          <Map/>
        </View>
    </FullWrapperProvider>
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
