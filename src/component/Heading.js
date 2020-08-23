import {View, StyleSheet, Text} from 'react-native';
import * as React from 'react'

export default function Heading(props){
    return (
        <Text {...props} style={[props.style, styles.text]}>{props.children}</Text>
    )
}

const styles = StyleSheet.create({

    text:{
        fontWeight: 'bold',
        fontSize: 24,
    }

})