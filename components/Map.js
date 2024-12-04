import { useEffect, useRef, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { WebView } from 'react-native-webview'
import MapView, { Marker, Polyline } from 'react-native-maps'
import * as Location from 'expo-location'
import axios from 'axios'

const ORS_API_KEY = '5b3ce3597851110001cf6248be96be8bcda642c6b7f692b007da1c42'
const ORL_URL = 'https://api.openrouteservice.org/geocode/search'

export const Map = () => {
    const [startLocation, setStartLocation] = useState(null)
    const [destination, setDestination] = useState('') // 15 avenue d'Arromanches, 94100 Saint-Maur des Fossés, France
    const [destinationCoords, setDestinationCoords] = useState(null)
    const [currentLocation, setCurrentLocation] = useState(null)

    useEffect(()=>{
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync()
            if (status !== 'granted'){
                alert("Vous devez autoriser la localisation pour utiliser la carte.")
                return
            }
            
            const step_interval = setInterval(async () => {
                const location = await Location.getCurrentPositionAsync({})
                setStartLocation(location.coords)
                setCurrentLocation(location.coords)
            }, 1000)

            return () => clearInterval(step_interval)
        })()
    }, [])

    useEffect(()=>{
        if (destination)
            getDestination()
    }, [destination])

    const getDestination = () => {
        axios.get(ORL_URL, {
            headers: {
                'Authorization': `Bearer ${ORS_API_KEY}`
            },
            params: {
                text: destination,
                boundary_country: 'FR'
            }
        })
        .then(response => {
            if (response?.data?.features?.length > 0){
                const coords = response.data.features[0].geometry.coordinates
                console.log("coords :", coords)
                setDestinationCoords({
                    latitude: coords[1],
                    longitude: coords[0]
                })
            }
        })
        .catch(err => {
            console.log("erreur :" ,err)
        })
    }

    return (
        <View style={styles.container}>
        {currentLocation && 
        <MapView
            style={styles.map}
            initialRegion={{
                latitude: currentLocation.latitude,
                longitude: currentLocation.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}
            showsUserLocation={true}
        >
            <Marker coordinate={currentLocation} title="Ma position"/>
            {destinationCoords &&
            <>
                <Marker coordinate={destinationCoords} title="Ma destination"/>
                <Polyline
                    coordinates={[
                        currentLocation,
                        destinationCoords
                    ]}
                    strokeColor='red'
                    strokeWidth={3}
                />
            </>    
            }
        </MapView>
        }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  map: {
    flex: 1,
    width: '100%',
  }
});
