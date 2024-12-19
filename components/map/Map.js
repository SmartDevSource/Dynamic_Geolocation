import { useEffect, useState } from 'react'
import { StyleSheet, View, Text, Alert } from 'react-native'
import MapView, { Marker, Polyline } from 'react-native-maps'
import * as Location from 'expo-location'
import axios from 'axios'
import { images } from '../../images'

import { AddressModal } from './AddressModal'
import { PathFinderModal } from './PathFinderModal'
import { useFullWrapper } from '../contexts/FullWrapper'
import { PictoTouchable } from '../widgets/PictoTouchable'

const ORS_API_KEY = '5b3ce3597851110001cf6248be96be8bcda642c6b7f692b007da1c42'
const ORL_URL = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${ORS_API_KEY}`

export const Map = () => {
    const [start, setStart] = useState('')
    const [destination, setDestination] = useState('')
    const [myCoords, setMyCoords] = useState(null)
    const [routeCoordinates, setRouteCoordinates] = useState([])
    const [travelInfos, setTravelInfos] = useState(null)

    const [addressModal, setAddressModal] = useState('')
    const [showPathFinderModal, setShowPathFinderModal] = useState(false)

    const { showFullWrapper, setShowFullWrapper } = useFullWrapper()

    useEffect(()=>{
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync()
            if (status !== 'granted'){
                Alert.alert("Attention", "Vous devez autoriser la localisation pour utiliser la carte.")
                return
            }
            const step_interval = setInterval(async () => {
                const location = await Location.getCurrentPositionAsync({})
                setMyCoords(location.coords)
            }, 1000)
            return () => clearInterval(step_interval)
        })()
    }, [])

    const handleValidAddress = address => {
        setShowFullWrapper(false)
        switch(addressModal){
            case 'start':
                setStart(address)
            break
            case 'dest':
                setDestination(address)
            break
        }
        setAddressModal('')
    }
    const handleCancelAddressModal = () => {
        setAddressModal('')
    }

    const handleShowPathFinder = () => {
        if (!start){
            Alert.alert('Adresse vide', 'Vous devez renseigner une adresse de départ.')
            return
        }
        if (!destination){
            Alert.alert('Adresse vide', 'Vous devez renseigner une adresse de destination.')
            return
        }
        setShowPathFinderModal(true)
    }

    const calculatePath = async () => {
        setShowPathFinderModal(false)
        if (start?.geometry?.coordinates?.length > 1 && 
            destination?.geometry?.coordinates?.length > 1)
        {
            const start_coords = start.geometry.coordinates
            const destination_coords = destination.geometry.coordinates
            const query = `${ORL_URL}&start=${start_coords[0]},${start_coords[1]}&end=${destination_coords[0]},${destination_coords[1]}`

            await axios.get(query)
            .then(response => {
                if (response?.data?.features?.length > 0){
                    const distance = (response.data.features[0].properties.summary.distance / 1000).toFixed(3)
                    const duration = response.data.features[0].properties.summary.duration / 60
                    const coordinates = response.data.features[0].geometry.coordinates.map(coord => ({
                        latitude: coord[1],
                        longitude: coord[0]
                    }))
                    setTravelInfos({distance, duration})
                    setRouteCoordinates(coordinates)
                }
            })
            .catch(err => {
                console.log("erreur :" ,err)
            })
        }
    }

    const getPreciseTime = () => {
        if (travelInfos?.duration){
            let tmp_duration = travelInfos?.duration
            const time = {hh: 0, mm: 0}
            while (parseInt(tmp_duration / 60) > 0){
                tmp_duration -= 60
                time.hh++
            }
            time.mm = parseInt(tmp_duration)
            return `${time.hh > 0 ? time.hh + 'h ' : ''}${time.mm > 0 ? time.mm + 'min' : ''}`
        }
    }

    return (
        <View style={styles.container}>
            {addressModal &&
                <AddressModal
                    type={addressModal}
                    onValid={(address) => handleValidAddress(address)}
                    onCancel={() => handleCancelAddressModal()}
                />
            }
            {showPathFinderModal && 
                <PathFinderModal
                    start={start}
                    destination={destination}
                    onValid={() => calculatePath()}
                    onCancel={() => setShowPathFinderModal(false)}
                />
            }
            {travelInfos &&
                <View style={styles.infos_container}>
                    <Text style={styles.text_info}>
                        Distance : {travelInfos.distance} KM
                    </Text>
                    <Text style={styles.text_info}>
                        Temps estimé du trajet : {getPreciseTime()}
                    </Text>
                </View>
            }
            {myCoords &&
            <MapView
                style={styles.map}
                region={{
                    latitude: myCoords.latitude,
                    longitude: myCoords.longitude,
                    latitudeDelta: 0.10,
                    longitudeDelta: 0.10,
                }}
                showsUserLocation={true}
            >
                {start?.geometry?.coordinates &&
                <>
                    <Marker coordinate={{
                        latitude: start?.geometry?.coordinates[1],
                        longitude: start?.geometry?.coordinates[0]}}
                        title="Mon point de départ"
                    />
                </>    
                }
                <Marker coordinate={myCoords} title="Ma position actuelle"/>
                {destination?.geometry?.coordinates &&
                <>
                    <Marker coordinate={{
                        latitude: destination?.geometry?.coordinates[1],
                        longitude: destination?.geometry?.coordinates[0]}}
                        title="Ma destination"
                    />
                </>    
                }
                {routeCoordinates.length > 0 &&
                    <Polyline
                        coordinates={routeCoordinates}
                        strokeColor='red'
                        strokeWidth={4}
                    />
                }
            </MapView>
            }
            <View style={styles.pictos_touchable_container}>
                <PictoTouchable
                    source={images.ui.start}
                    onPressIn={() => setAddressModal('start')}
                />
                <PictoTouchable
                    source={images.ui.burgermenu}
                    onPressIn={() => handleShowPathFinder()}
                />
                <PictoTouchable
                    source={images.ui.dest}
                    onPressIn={() => setAddressModal('dest')}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  pictos_touchable_container: {
    position: 'absolute',
    width: '100%',
    bottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infos_container: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    zIndex: 1,
    top: 40,
    backgroundColor: 'rgba(255, 255, 255, .8)',
    flexDirection: 'column'
  },
  text_info: {
    fontSize: 16,
  },
  map: {
    flex: 1,
    width: '100%',
  }
})