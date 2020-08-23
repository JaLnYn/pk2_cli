import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import * as React from 'react'
import default_styles from '../style/default_styles'


export default function TextButton(props){
    return (
        <TouchableOpacity style={[props.style, styles.button]} onPress={props.onPress}>
            
            <Text style={styles.text}>
                {props.title.toUpperCase()}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius:8,
    },
    text: {
        color: 'purple',
        fontWeight: '500',
        fontSize: 12
    }
})