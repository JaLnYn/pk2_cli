import {View, StyleSheet, Text, TextInput} from 'react-native';
import * as React from 'react'

export default function Input(props){
    return (
        <TextInput {...props} style={[props.style, styles.input]}/>
    )
}

const styles = StyleSheet.create({
    input: {
        backgroundColor: '#ccc',
        width: '100%',
        padding: 20,
        borderRadius:8,
    }
})