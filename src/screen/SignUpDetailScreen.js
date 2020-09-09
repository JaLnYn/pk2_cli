import {View, StyleSheet, Text} from 'react-native';
import * as React from 'react'
import default_styles from '../style/default_styles'
import Heading from '../component/Heading'
import Input from '../component/Input'
import FilledButton from '../component/FilledButton'
import LabeledInput from '../component/LabeledInput'
import TextButton from '../component/TextButton'
import Error from '../component/Error'
import { NavigationContainer } from '@react-navigation/native';
import { AuthContext } from '../contexts/AuthContext';
import Loading from '../component/Loading';
import LabeledPicker from '../component/LabeledPicker';
import DatePicker from '../component/DatePicker'

import {Picker as Select} from '@react-native-community/picker';

//<TextButton title={"Back"} style={styles.closeButton} onPress={() => {navigation.pop()}}/>



export default function SignUpDetailScreen({route, navigation}){
    const { signup } = React.useContext(AuthContext);
    const [fname, setFName] = React.useState('');
    const [lname, setLName] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [err, setErr] = React.useState('');
    const [date, setDate ] = React.useState(new Date);
    const [gender, setGender] = React.useState('M');
    const [userType, setUserType] = React.useState('T');
    // console.log(route.params.email, route.params.password)
    return (
        <View style={styles.title_container}>
            <Heading>Sign Up</Heading>
            <Error error={err}/>
            <LabeledInput style={styles.input} placeholder={'First Name'}
            value={fname}
            text={"first name"}
            onChangeText={setFName}/>
            <LabeledInput style={styles.input} placeholder={'Last Name'}
            value={lname}
            text={"last name"}
            onChangeText={setLName}/>
            <DatePicker title={'hi'} text={'Date of Birth'} onChange={setDate} date={date}/>
            <LabeledPicker style={styles.input}
                text={"gender"}
                selectedValue={gender}
                onValueChange={(itemValue, itemIndex) =>
                    setGender(itemValue)
                }>
                <Select.Item label="Male" value="M" />
                <Select.Item label="Female" value="F" />
                <Select.Item label="Other" value="O" />

            </LabeledPicker>
            <LabeledPicker style={styles.input}
                text={"User Type"}
                
                selectedValue={userType}
                onValueChange={(itemValue, itemIndex) =>
                    setUserType(itemValue)
                }>
                <Select.Item label="Tenent" value="T" />
                <Select.Item label="Landlord" value="L" />

            </LabeledPicker>
            

            <FilledButton title={
                "Sign Up"
            } 

            style={styles.loginButton} 
            onPress={async () => {
                console.log(userType, gender);
                
                try {
                    setLoading(true);
                    let resp = await signup(route.params.email, route.params.password, fname, lname,gender, userType, date)
                    console.log(resp)
                    if (resp.signup != null){

                        setLoading(false)
                        navigation.navigate("Login")
                        return
                    }else {
                        setErr("something went wrong. Please try again")
                    }
  
                    
                    // if (resp == true){
                    //     // change screen here
                    //     if (confirmPassword != password){
                    //         setErr("Your password does not match your confirmed password")
                    //     }else {
                    //         navigation.navigate('SignUpDetail', {email: email, password: password})
                    //     }
                    // }else {
                    //     console.log(fail)
                    // }
                }catch(err){
                    
                    console.log(err.response.data.errors[0].message)
                    setErr(err.response.data.errors[0].message);
                }
                setLoading(false)

                
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