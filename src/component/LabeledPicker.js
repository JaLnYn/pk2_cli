import {View, StyleSheet, Text, TextInput} from 'react-native';
import * as React from 'react'
import {Picker as Select} from '@react-native-community/picker';

export default function Input(props){
    return (
        <View style={styles.container}>
            <View style={styles.textbox}>
                <Text>
                    {props.text}
                </Text>
            </View>
            <View style={styles.input}>
                <Select
                    {...props}
                    style={[props.style]}>
                        {props.children}
                </Select>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 5,
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
        padding: 5,
        borderRadius:8,
    }
})