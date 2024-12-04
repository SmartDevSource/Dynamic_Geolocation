import React, { useEffect, useState } from "react"
import { StyleSheet, Text, View } from "react-native"

import { useAtom } from "jotai"
import { alertAtom } from '../../data/atoms.js'

import { playSound } from '../audio/AudioManager.js'

export const Alert = ({data}) => {
    const [alertData, setAlertData] = useAtom(alertAtom)
    const [currentTimeout, setCurrentTimeout] = useState(null)

    const style_container = {
        backgroundColor: data.type === 'error' ? '#ff6666' : '#60db7d'
    }

    useEffect(()=>{
        if (currentTimeout) clearTimeout(currentTimeout)
        const delay = alertData.permanent ? 99999 : 4000
        if (alertData.sound){
            playSound('info')
        }
        setCurrentTimeout(
            setTimeout(()=>{
                setAlertData({message: '', type: '', permanent: false, sound: false})
            }, delay)
        )
    }, [data])

    return (
    <View style={[styles.container, style_container]}>
        <Text style={styles.text}>{data.message}</Text>
    </View>
    )
    
}
const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: '50%',
        transform: [{translateX: '-50%'}],
        zIndex: 999,
        borderWidth: 3,
        borderColor: 'rgb(70, 70, 70)',
        borderRadius: 10,
        padding: 15,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 150
    },
    text: {
        fontFamily: 'FredokaOne',
        textAlign: 'center',
        color: 'white',
        fontSize: 18
    }
  })