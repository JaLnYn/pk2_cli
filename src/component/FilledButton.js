import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import * as React from 'react'
import default_styles from '../style/default_styles'


export default function FilledButton(props){
    return (
        <TouchableOpacity style={[ styles.button, props.style,]} onPress={props.onPress}>
            
            <Text style={styles.text}>
                {props.title.toUpperCase()}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'purple',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius:8,
        padding: 20
    },
    text: {
        color: 'white',
        fontWeight: '500',
        fontSize: 16
    }
})