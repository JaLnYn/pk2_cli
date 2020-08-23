import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import * as React from 'react'
import default_styles from '../style/default_styles'

export default function IconButton(props){
    return (
        <TouchableOpacity style={[props.style, styles.button]} onPress={props.onPress}>
            <Icon name="add"/>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius:8,
    },
})