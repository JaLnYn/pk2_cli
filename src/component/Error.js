import {View, StyleSheet, Text,} from 'react-native';
import * as React from 'react'
import default_styles from '../style/default_styles'


export default function TextButton(props){
    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                {props.error}
            </Text>
        </View>    
    )
}

const styles = StyleSheet.create({
    container:{
        paddingVertical: 8
    },
    text: {
        color: 'red',
        fontWeight: 'bold'
    }
})