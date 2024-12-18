import { useEffect } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Button } from '../widgets/Button'

import { useAtom } from 'jotai'
import { showFullWrapperAtom } from '../../data/atoms'

export const PathFinderModal = ({start, destination, onCancel, onValid}) => {
    const [showFullWrapper, setShowFullWrapper] = useAtom(showFullWrapperAtom)

    useEffect(()=>{
        setShowFullWrapper(true)
    }, [])
    
    const handleValid = () => {
      setShowFullWrapper(false)
      onValid()
    }

    const handleCancel = () => {
      setShowFullWrapper(false)
      onCancel()
    }

    return (
      <View style={styles.container}>
        <View style={styles.form_container}>
            <Text style={styles.text_header}>
              Calculer l'itinéraire
            </Text>
            <Text style={styles.title}>
              Départ
            </Text>
            <Text style={[styles.text_address, {marginBottom: 15}]}>
              {start?.properties?.label}
            </Text>
            <Text style={styles.title}>
              Destination
            </Text>
            <Text style={[styles.text_address, {marginBottom: 15}]}>
              {destination?.properties?.label}
            </Text>
            <Button
                onPress={() => handleValid()}
                text="Calculer"
                bgcolor="green"
            />
            <Button
                onPress={() => handleCancel()}
                text="Fermer" 
                bgcolor="red"
            />
        </View>
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 2,
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  form_container: {
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: 'white',
    padding: 5
  },
  text_header: {
    fontSize: 20,
    textAlign: 'center',
    color: 'rgb(80, 80, 80)',
    marginBottom: 5
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'rgb(100, 100, 100)',
    fontSize: 18,
    marginTop: 5,
    backgroundColor: 'rgb(232,240,254)',
    borderRadius: 5
  },
  text_address: {
    maxWidth: 250,
    textAlign: 'center',
    marginTop: 5,
  },
  picto: {
    width: 60,
    height: 60,
    margin: 5
  },
})
