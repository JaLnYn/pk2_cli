import {KeyboardAvoidingView, View, StyleSheet, Text} from 'react-native';
import * as React from 'react'
import default_styles from '../style/default_styles'
import Heading from '../component/Heading'
import Input from '../component/Input'
import FilledButton from '../component/FilledButton'
import TextButton from '../component/TextButton'
import Error from '../component/Error'
import { NavigationContainer } from '@react-navigation/native';
import { AuthContext } from '../contexts/AuthContext';
import Loading from '../component/Loading'

//<TextButton title={"Back"} style={styles.closeButton} onPress={() => {navigation.pop()}}/>

export default function SignUpScreen({navigation}){
    const { check_account } = React.useContext(AuthContext);
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [err, setErr] = React.useState('');
    return (
        <View style={styles.title_container}>
            <Heading style={styles.title}>Sign Up</Heading>
            <Error error={err}/>
            <Input style={styles.input} placeholder={'Email'} keyboardType={'email-address'}
            value={email}
            onChangeText={setEmail}/>
            <Input style={styles.input} placeholder={'Password'} secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <Input style={styles.input} placeholder={'Confirm Password'} secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
            />
            <FilledButton title={
                "Sign Up"
            } 
            style={styles.loginButton} 
            onPress={async () => {
                try {
                    setLoading(true);
                    let resp = await check_account(email, password)
                    
                    setLoading(false)
                    if (resp == true){
                        // change screen here
                        if (confirmPassword != password){
                            setErr("Your password does not match your confirmed password")
                        }else {
                            navigation.navigate('SignUpDetail', {email: email, password: password})
                        }
                    }else {
                        console.log(fail)
                    }
                }catch(err){
                    
                    console.log(err.message)
                    setErr(err.message);
                    setLoading(false)
                }
                setLoading(false)
            }
            
            }> </FilledButton>

            <Loading loading={loading}/>
            <View style={{flex: 1}}/>
        </View>
    )
}

const styles = StyleSheet.create({
    title_container: {
        flex: 1,
        paddingTop:120,
        alignItems: 'center',
        justifyContent: 'flex-end',
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