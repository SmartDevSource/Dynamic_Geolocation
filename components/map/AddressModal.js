import { useEffect, useState } from 'react'
import { StyleSheet, View, Text, TextInput } from 'react-native'
import { Button } from '../widgets/Button'
import axios from 'axios'

import { useAtom } from 'jotai'
import { showFullWrapperAtom } from '../../data/atoms'

const API_GOUV_URL = 'https://api-adresse.data.gouv.fr/search'

export const AddressModal = ({type, onCancel, onValid}) => {
    const [currentAddress, setCurrentAddress] = useState('')

    const [showFullWrapper, setShowFullWrapper] = useAtom(showFullWrapperAtom)

    useEffect(()=>{
        setShowFullWrapper(true)
    }, [])

    const getAddress = async text => {
      const query = `${API_GOUV_URL}/?q=${text}&limit=5`
      try {
        const response = await axios.get(query)
        if (response.data.features.length > 0){
          setCurrentAddress(response.data.features[0])
        }
      } catch (err) {
        Alert.alert('Erreur', err.message)
      }
    }

    const handleCancel = () => {
      setShowFullWrapper(false)
      onCancel()
    }

    return (
      <View style={styles.container}>
        <View style={styles.form_container}>
            <Text style={styles.text_header}>
              {type === 'start' ? 'Adresse de départ' : 'Destination'}
            </Text>
            {currentAddress?.properties?.label && 
              <Text style={styles.text_address}>
                {currentAddress.properties.label}
              </Text>
            }
            <TextInput 
              style={styles.text_input}
              onChangeText={(text) => getAddress(text)}
            />
            <Button
                onPress={() => onValid(currentAddress)}
                text="Valider" 
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
    color: 'rgb(80, 80, 80)'  
  },
  text_input: {
    borderBottomWidth: 2,
    borderBottomColor: 'rgb(190,200,210)',
    backgroundColor: 'rgb(232,240,254)',
    width: 250,
    height: 40,
    margin: 5,
    padding: 5,
    borderRadius: 3,
    textAlign: 'center'
  },
  text_address: {
    maxWidth: 250,
    textAlign: 'center',
  },
  picto: {
    width: 60,
    height: 60,
    margin: 5
  },
})
