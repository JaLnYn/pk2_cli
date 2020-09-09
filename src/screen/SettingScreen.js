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
import { UserContext } from '../contexts/UserContext';
import Loading from '../component/Loading'

//<TextButton title={"Back"} style={styles.closeButton} onPress={() => {navigation.pop()}}/>

export default function SettingScreen({navigation}){

    const { logout} = React.useContext(AuthContext);
    const user = React.useContext(UserContext);
    const [loading, setLoading] = React.useState(false);
    const [err, setErr] = React.useState('');
    return (
        <View style={styles.title_container}>
            <Heading style={styles.title}>Setting</Heading>
            <Error error={err}/>
            <Text>Hello {user != null ? JSON.parse(user).userId : "null"}</Text>
            <FilledButton title={
                "Logout"
            }

            style={styles.loginButton} 
            onPress={async () => {
                try {
                    await logout()
                }catch(err){
                    
                    console.log(err.response.data.errors[0].message)
                    setErr(err.response.data.errors[0].message);
                }
            }
            
            }> </FilledButton>

            <Loading loading={loading}/>
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