import {View, StyleSheet, Text} from 'react-native';
import * as React from 'react'
import Heading from '../../component/Heading'
import Input from '../../component/Input'
import FilledButton from '../../component/FilledButton'
import LabeledInput from '../../component/LabeledInput'
import TextButton from '../../component/TextButton'
import Error from '../../component/Error'
import { NavigationContainer } from '@react-navigation/native';
import { AuthContext } from '../../contexts/AuthContext';
import Loading from '../../component/Loading';
import LabeledPicker from '../../component/LabeledPicker';
import DatePicker from '../../component/DatePicker'
import { add } from 'react-native-reanimated';

//<TextButton title={"Back"} style={styles.closeButton} onPress={() => {navigation.pop()}}/>



export default function PickAddressScreen({route, navigation}){
    const [address, setAdd] = React.useState('');
    const [city, setCity] = React.useState('');
    const [prov, setProv] = React.useState('');
    const [apt, setApt] = React.useState('');
    const [country, setCountry] = React.useState('');
    const [long, setLong] = React.useState('');
    const [lat, setLat] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [err, setErr] = React.useState('');
    // console.log(route.params.email, route.params.password)

    async function onSubmit(){
        console.log(country)
        console.log(address)
        console.log(city)
        console.log(prov)
        console.log(apt)
        console.log(long)
        console.log(lat)
        navigation.navigate('PropInfo', {
            country: country,
            address: address,
            city: city,
            prov: prov,
            apt: apt,
            long: long,
            lat: lat,
        })
    }

    return (
        < View style={styles.title_container} >
            <Heading>Address</Heading>
            <Error error={err}/>
            <LabeledInput style={styles.input} placeholder={'Country'} value={country} text={"Country"} onChangeText={setCountry}/>
            <LabeledInput style={styles.input} placeholder={'Address'}
            value={address}
            text={"Street Address"}
            onChangeText={setAdd}/>
            <LabeledInput style={styles.input} placeholder={'Apt Num'} value={apt} text={"Apt Num"} onChangeText={setApt}/>
            <LabeledInput style={styles.input} placeholder={'City'} value={city} text={"City"} onChangeText={setCity}/>
            <LabeledInput style={styles.input} placeholder={'Province'} value={prov} text={"Province"} onChangeText={setProv}/>
            <LabeledInput style={styles.input} placeholder={'Longitude'} value={long} text={"Longitude"} onChangeText={setLong} keyboardType={'numeric'}/>
            <LabeledInput style={styles.input} placeholder={'Latitude'} value={lat} text={"Latitude"} onChangeText={setLat} keyboardType={'numeric'}/>
            <FilledButton title={ "Next" } style={styles.loginButton} onPress={onSubmit}/> 
            <Loading loading={loading}/>
        </ View>
    )
}

const styles = StyleSheet.create({
    keyboardAvoid:{
        alignItems: 'center',
        
    },
    title_container: {
        flex: 1,
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