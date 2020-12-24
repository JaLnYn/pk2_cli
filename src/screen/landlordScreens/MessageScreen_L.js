import {View, StyleSheet, Text} from 'react-native';
import * as React from 'react'

export default function MessageScreen({navigation}){
    return (
        <View style={styles.title_container}>
            <Text>MSG_L</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    title_container: {
        flex: 1,
        paddingTop:120,
        alignItems: 'center',
        padding: 20
    },
    title: {
        marginBottom:16
    },
    input: {
        marginVertical: 5,
    },
    loginButton: {
        marginVertical: 30,
    },
})