import {View, StyleSheet, Text} from 'react-native';
import * as React from 'react'
import default_styles from '../style/default_styles'
import Heading from '../component/Heading'
import Input from '../component/Input'
import FilledButton from '../component/FilledButton'
import TextButton from '../component/TextButton'
import Error from '../component/Error'
import { AuthContext } from '../contexts/AuthContext';

export default function LoginScreen({navigation}){

    const { login } = React.useContext(AuthContext);
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    return (
        <View style={styles.title_container}>
            <Heading style={styles.title}>Login</Heading>
            <Error error={''}/>
            <Input style={styles.input} placeholder={'Email'} keyboardType={'email-address'}
                value={email}
                onChangeText={setEmail}
            />
            <Input style={styles.input} placeholder={'Password'} secureTextEntry
                value={password}
                onChangeText={setPassword}
            />

            <FilledButton 
                title={"Login"} 
                style={styles.loginButton} 
                onPress={() => {
                    login(email, password)
                }}
            /> 
            <TextButton title={"Don't have an account? Sign Up"} onPress={() => {
                navigation.navigate('SignUp')
            }}/>

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