import React from 'react'
import {View, Text, StyleSheet} from 'react-native'

export default function Loading({loading}){
    if(!loading){
        return <View/>
    }
    
    return(
        <View style={styles.overlay}>
            <View style={styles.container}>
                <Text>
                    Loading...
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    overlay:{
        ...StyleSheet.absoluteFill,
        backgroundColor: 'rgba(0,0,0,0.8)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    container: {
        backgroundColor:'white',
        flexDirection: 'row',
        padding:20,
        borderRadius: 8
    }
})