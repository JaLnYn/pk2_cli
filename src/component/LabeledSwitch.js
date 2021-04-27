import {View, Switch, StyleSheet, Text, TextInput} from 'react-native';
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
                <Switch
                    {...props}
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    ios_backgroundColor="#3e3e3e"
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 5,
        flexDirection: "row",
        width: '50%'
    },
    textbox: {
        padding: 5,
        justifyContent: 'center',
        alignContent: 'center',
        flex: 1
    },
    text: {

    },

    input: {
        backgroundColor: '#ccc',
        flex: 1,
        padding: 5,
        borderRadius:8,
    }
})