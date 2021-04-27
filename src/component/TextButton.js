import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import * as React from 'react'
import default_styles from '../style/default_styles'


export default function TextButton(props){
    return (
        <TouchableOpacity style={[props.style, styles.button]} onPress={props.onPress} hitSlop={{top: 20, bottom: 20, left: 50, right: 50}}>
            <Text style={styles.text} >
                {props.title.toUpperCase()}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'rgb(250, 250, 250)',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius:8,
        padding: 0
    },
    text: {
        color: 'purple',
        fontWeight: '500',
        fontSize: 12
    }
})