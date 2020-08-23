import {View, StyleSheet, Text} from 'react-native';
import * as React from 'react'
import default_styles from '../style/default_styles'
import Heading from '../component/Heading'
import Input from '../component/Input'
import FilledButton from '../component/FilledButton'
import TextButton from '../component/TextButton'
import Error from '../component/Error'
import { NavigationContainer } from '@react-navigation/native';
import { AuthContext } from '../contexts/AuthContext';

//<TextButton title={"Back"} style={styles.closeButton} onPress={() => {navigation.pop()}}/>

export default function SignUpScreen({navigation}){
    const { signup } = React.useContext(AuthContext);
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    return (
        <View style={styles.title_container}>
            <Heading style={styles.title}>Sign Up</Heading>
            <Error error={''}/>
            <Input style={styles.input} placeholder={'Email'} keyboardType={'email-address'}
            value={email}
            onChangeText={setEmail}/>
            <Input style={styles.input} placeholder={'Password'} secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <FilledButton title={
                "Sign Up"
            } style={styles.loginButton} onPress={() => {
                signup(email, password)
            }}> </FilledButton>
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
    closeButton: {
        position: 'absolute',
        top: 40,
        left: 20,
    }
})