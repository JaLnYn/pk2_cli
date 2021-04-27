import {View, StyleSheet, Text, Switch} from 'react-native';
import * as React from 'react'
import Heading from '../../component/Heading'
import Input from '../../component/Input'
import FilledButton from '../../component/FilledButton'
import LabeledInput from '../../component/LabeledInput'
import Error from '../../component/Error'
import { UserContext } from '../../contexts/UserContext';
import Loading from '../../component/Loading';
import LabeledSwitch from '../../component/LabeledSwitch';
import DatePicker from '../../component/DatePicker'
import axios from 'axios';

import global from '../../Global'

//<TextButton title={"Back"} style={styles.closeButton} onPress={() => {navigation.pop()}}/>

export default function PickAddressScreen({route, navigation}){

    const user = React.useContext(UserContext);
    const [sqr_area, setArea] = React.useState('');
    const [info, setInfo] = React.useState('');
    const [price, setPrice] = React.useState('100');
    const [amt_bedrooms, setAmtBedrooms] = React.useState('');
    const [utils, setUtils] = React.useState('false');
    const [parking, setParking] = React.useState('');
    const [furnished, setIsFurnished] = React.useState('false');
    const [amt_bathroom, setAmtBathroom] = React.useState('');
    const [date, setDate] = React.useState(new Date);
    const [loading, setLoading] = React.useState(false);
    const [err, setErr] = React.useState('');
    // console.log(route.params.email, route.params.password)
    
    async function onSubmit(){
        console.log(route.params?.country)
        console.log(route.params?.address)
        console.log(route.params?.city)
        console.log(route.params?.prov)
        console.log(route.params?.apt)
        console.log(route.params?.long)
        console.log(route.params?.lat)
        console.log(sqr_area)
        console.log(info)
        console.log(price)
        console.log(amt_bedrooms)
        console.log(amt_bathroom)
        console.log(utils)
        console.log(furnished)
        console.log(date)
        console.log(global.gql_ad)
        let resp = {}
        try {
            resp = await axios.post( global.gql_ad, {
                "query": `
                    mutation createProperty($apt_num: Int, $prop_address: String!, $prop_city: String!, $prop_province: String!, $prop_country: String!, $longitude: Float!, $latitude: Float!, $info: String!, $price: Int!, $bedrooms: Int!, $utils: Boolean!, $parking: Int!, $furnished: Boolean!, $bathroom: Int!, $sqr_area: Float!, $avail_on: String!) {
                        createProperty(apt_num: $apt_num, prop_address: $prop_address, prop_city: $prop_city, prop_province: $prop_province, prop_country: $prop_country, longitude: $longitude, latitude: $latitude, info: $info, price: $price, bedrooms: $bedrooms, utils: $utils, parking: $parking, furnished: $furnished, bathroom: $bathroom, sqr_area: $sqr_area, avail_on: $avail_on) {
                            prop_id
                        }
                    }
                `,
                "variables": {"apt_num": parseInt(route.params?.apt_num),"prop_address": route.params?.address, "prop_city": route.params?.city, "prop_province": route.params?.prov, "prop_country": route.params?.country, "longitude": parseFloat(route.params?.long), "latitude": parseFloat(route.params?.lat), "info": info, "price": parseInt(price), "bedrooms": parseInt(amt_bedrooms), "utils": (utils === 'true'), "parking": parseInt(parking),"furnished": (furnished === 'true'), "bathroom": parseInt(amt_bathroom), "sqr_area": parseFloat(sqr_area), "avail_on":date},
            },{
                headers: {
                    "Authorization": 'Bearer ' + JSON.parse(user).token
                }
            });   
            console.log(resp.data.data.createProperty)
            // Navigate
            navigation.navigate('PropEd', {
                prop_id: resp.data.data.createProperty.prop_id
            })
        } catch (err) {
            console.log(err)
            if (!err.response){
                console.log("Cannot find server, please try again later")
                setLoading(false)
                return;
            }
            console.log(err.response.data.errors[0].message)
        }

    }

    return (
        < View style={styles.title_container} >
            <Heading>Additional info</Heading>
            <Error error={err}/>
            <LabeledInput style={styles.input} placeholder={'Square area (M)'} value={sqr_area} text={"Square area"} onChangeText={setArea} keyboardType={'numeric'}/>
            <LabeledInput style={styles.input} placeholder={'Price'} value={price} text={"Price"} onChangeText={setPrice} keyboardType={'numeric'}/>
            <LabeledInput style={styles.input} placeholder={'Parking'} value={parking} text={"Parking"} onChangeText={setParking} keyboardType={'numeric'}/>
            <LabeledInput style={styles.input} placeholder={'Bedrooms'} value={amt_bedrooms} text={"bedrooms"} onChangeText={setAmtBedrooms} keyboardType={'numeric'}/>
            <LabeledInput style={styles.input} placeholder={'Bathrooms'} value={amt_bathroom} text={"bathroom"} onChangeText={setAmtBathroom} keyboardType={'numeric'}/>
            <View style={{flexDirection:"row"}}>
                <LabeledSwitch value={utils} text={"Utils"} onValueChange={setUtils}/>
                <LabeledSwitch value={furnished} text={"Furnished"} onValueChange={setIsFurnished}/>
            </View>
            <DatePicker title={'hi'} text={'Availible on'} onChange={setDate} date={date}/>
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
