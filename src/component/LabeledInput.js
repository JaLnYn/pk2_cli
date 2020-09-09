import {View, StyleSheet, Text, TextInput} from 'react-native';
import * as React from 'react'

export default function Input(props){
    return (
        <View style={styles.container}>
            <View style={styles.textbox}>
                <Text style={styles.text}>
                    {props.text}
                </Text>
            </View>

            <TextInput {...props} style={[props.style, styles.input]}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        width: '100%'
    },
    textbox: {
        padding: 5,
        justifyContent: 'center',
        alignContent: 'center',
        flex: 2
    },
    text: {

    },

    input: {
        backgroundColor: '#ccc',
        flex: 6,
        padding: 10,
        borderRadius:8,
    }
})