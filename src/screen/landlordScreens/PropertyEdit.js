import { View, StyleSheet, Image,Text, SafeAreaView, ScrollView } from 'react-native';
import { HeaderBackButton } from '@react-navigation/stack';
import * as React from 'react'

import Input from '../../component/Input'
import LabeledInput from '../../component/LabeledInput'
import LabeledSwitch from '../../component/LabeledSwitch';

import { UserContext } from '../../contexts/UserContext';
import ImageButton from '../../component/ImageButton'

import DatePicker from '../../component/DatePicker'
import FilledButton from '../../component/FilledButton'
import axios from 'axios'
import global from '../../Global'
import sleep from '../../utils/sleep';
import TextButton from '../../component/TextButton'
import Loading from '../../component/Loading'



export default function PropertyEdit({route, navigation}){


    const user = React.useContext(UserContext);
    const [pic1, setPic1] = React.useState(''); 
    const [pic2, setPic2] = React.useState(''); 
    const [pic3, setPic3] = React.useState(''); 
    const [pic4, setPic4] = React.useState(''); 
    const [pic5, setPic5] = React.useState(''); 
    const [pic6, setPic6] = React.useState(''); 
    const [pic7, setPic7] = React.useState(''); 
    const [pic8, setPic8] = React.useState(''); 
    const [pic9, setPic9] = React.useState(''); 
    const [text1, setText1] = React.useState(''); 
    const [text2, setText2] = React.useState(''); 
    const [text3, setText3] = React.useState(''); 
    const [text4, setText4] = React.useState(''); 
    const [text5, setText5] = React.useState(''); 
    const [text6, setText6] = React.useState(''); 
    const [text7, setText7] = React.useState(''); 
    const [text8, setText8] = React.useState(''); 
    const [text9, setText9] = React.useState('');
	const [loading, setLoading] = React.useState(false)
	const [info, setInfo] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [amt_bedrooms, setAmtBedrooms] = React.useState('');
    const [utils, setUtils] = React.useState('');
    const [parking, setParking] = React.useState('');
    const [furnished, setIsFurnished] = React.useState('');
    const [amt_bathroom, setAmtBathroom] = React.useState('');
    const [date, setDate] = React.useState(new Date);
	
	async function onCancel(){
		setLoading(true)
		await sleep(1000)
		let resp = {}
		try {
			resp = await axios.post( global.gql_ad,{
				"query": `
					query getOneProperty($id: ID!){
						getOneProperty(id: $id){
							prop_id
							prop_address
							longitude
							info
							latitude
							bedrooms
							bathroom
							price
							parking
							utils
							furnished
							avail_on
							Images{
								img_id
								img_loc
								order_num
								info
							}
							landlord{
								id
								email
								password
								f_name
								l_name
							}
							rooms{
								sqr_area
								room_id
								Images{
									img_id
									img_loc
								}
							}
						}
					}
				`,
				"variables": {"id": route.params?.prop_id}
			},{
				headers: {
					"Authorization": 'Bearer ' + JSON.parse(user).token
				}
			});   
			
			console.log(resp.data.data.getOneProperty)
			setPicture(resp.data.data.getOneProperty.Images)	
			setInfo(resp.data.data.getOneProperty.info)
			setIsFurnished(resp.data.data.getOneProperty.furnished)
			setParking(resp.data.data.getOneProperty.parking.toString())
			setPrice(resp.data.data.getOneProperty.price.toString())
			setAmtBedrooms(resp.data.data.getOneProperty.bedrooms.toString())
			setAmtBathroom(resp.data.data.getOneProperty.bathroom.toString())
			setUtils(resp.data.data.getOneProperty.utils)
			
			resp.data.data.getOneProperty.avail_on = resp.data.data.getOneProperty.avail_on
			var d = new Date(0)
			d.setMilliseconds(resp.data.data.getOneProperty.avail_on)
			setDate(d)
			console.log(d)
		} catch (err) {
			if (!err.response){
				console.log("Cannot find server, please try again later")
				setLoading(false)
				return;
			}
			console.log(err.response.data.errors[0].message)
		}
						
		setLoading(false)

	}
	async function onSubmit(){
        //console.log(route.params?.country)
        //console.log(route.params?.address)
        //console.log(route.params?.city)
        //console.log(route.params?.prov)
        //console.log(route.params?.apt)
        //console.log(route.params?.long)
        //console.log(route.params?.lat)
        //console.log(info)
        //console.log(price)
        //console.log(amt_bedrooms)
        //console.log(amt_bathroom)
        //console.log(date)
        //console.log(global.gql_ad)
        let resp = {}
		
		setLoading(true)
		await sleep(1000)

        try {
            resp = await axios.post( global.gql_ad, {
                "query": `
                    mutation updateProperty($prop_id: ID!, $info: String!, $price: Int!, $bedrooms: Int!, $utils: Boolean!, $parking: Int!, $furnished: Boolean!, $bathroom: Int!, $avail_on: String!) {
                        updateProperty(prop_id: $prop_id, info: $info, price: $price, bedrooms: $bedrooms, utils: $utils, parking: $parking, furnished: $furnished, bathroom: $bathroom, avail_on: $avail_on) {
							prop_id
							prop_address
							longitude
							info
							latitude
							bedrooms
							bathroom
							price
							parking
							utils
							furnished
							avail_on
							Images{
								img_id
								img_loc
								order_num
								info
							}
							landlord{
								id
								email
								password
								f_name
								l_name
							}
							rooms{
								sqr_area
								room_id
								Images{
									img_id
									img_loc
								}
							}
                        }
                    }
                `,
                "variables": {"prop_id": route.params?.prop_id, "info": info, "price": parseInt(price), "bedrooms": parseInt(amt_bedrooms), "utils": utils, "parking": parseInt(parking),"furnished": furnished, "bathroom": parseInt(amt_bathroom), "avail_on":date},
            },{
                headers: {
                    "Authorization": 'Bearer ' + JSON.parse(user).token
                }
            });   
            console.log(resp.data.data.updateProperty)
			setPicture(resp.data.data.updateProperty.Images)	
			setInfo(resp.data.data.updateProperty.info)
			setIsFurnished(resp.data.data.updateProperty.furnished)
			setParking(resp.data.data.updateProperty.parking.toString())
			setPrice(resp.data.data.updateProperty.price.toString())
			setAmtBedrooms(resp.data.data.updateProperty.bedrooms.toString())
			setAmtBathroom(resp.data.data.updateProperty.bathroom.toString())
			setUtils(resp.data.data.updateProperty.utils)
			
			resp.data.data.updateProperty.avail_on = resp.data.data.updateProperty.avail_on
			var d = new Date(0)
			d.setMilliseconds(resp.data.data.updateProperty.avail_on)
			setDate(d)
            setLoading(false)

        } catch (err) {
            console.log(err)
            if (!err.response){
                console.log("Cannot find server, please try again later")
                setLoading(false)
                return;
            }
            console.log(err.response.data.errors[0].message)
        }
        setLoading(false)

    }
	async function onDelete(){
        let resp = {}
		
		setLoading(true)
		await sleep(1000)

        try {
            resp = await axios.post( global.gql_ad, {
                "query": `
                    mutation deleteProperty($prop_id: ID!) {
                        deleteProperty(prop_id: $prop_id)
                    }
                `,
                "variables": {"prop_id": route.params?.prop_id},
            },{
                headers: {
                    "Authorization": 'Bearer ' + JSON.parse(user).token
                }
            });   
            //console.log(resp.data.data.deleteProperty)

        } catch (err) {
            console.log(err)
            if (!err.response){
                console.log("Cannot find server, please try again later")
                setLoading(false)
                return;
            }
            console.log(err.response.data.errors[0].message)
        }
        setLoading(false)
		navigation.navigate("Management", {
            from_screen: "Manage",
            current_pic: global.img_ad + '?img_loc=',
            cmd: 'just_del',
            args: 'none'
        })

    }

	function setPicture(Images){
		if (Images == null){
			return 
		}
		for (i = 0; i < Images.length; i++){
			the_order_num = Images[i].order_num
			if (the_order_num == 1){
				setPic1(Images[i].img_loc)
				setText1(Images[i].info)
			} else if (the_order_num == 2){
				setPic2(Images[i].img_loc)
				setText2(Images[i].info)
			} else if (the_order_num == 3){
				setPic3(Images[i].img_loc)
				setText3(Images[i].info)
			} else if (the_order_num == 4){
				setPic4(Images[i].img_loc)
				setText4(Images[i].info)
			} else if (the_order_num == 5){
				setPic5(Images[i].img_loc)
				setText5(Images[i].info)
			} else if (the_order_num == 6){
				setPic6(Images[i].img_loc)
				setText6(Images[i].info)
			} else if (the_order_num == 7){
				setPic7(Images[i].img_loc)
				setText7(Images[i].info)
			} else if (the_order_num == 8){
				setPic8(Images[i].img_loc)
				setText8(Images[i].info)
			} else if (the_order_num == 1){
				setPic9(Images[i].img_loc)
				setText9(Images[i].info)
			}

		}

	}
	React.useEffect(() => {   
        let run_this = async () => {
            setLoading(true)
            await sleep(1000)
            let resp = {}
            try {
				console.log(route.params?.prop_id)
                resp = await axios.post( global.gql_ad,{
                    "query": `
                        query getOneProperty($id: ID!){
                            getOneProperty(id: $id){
								prop_id
								prop_address
								longitude
								info
								latitude
								bedrooms
								bathroom
								price
								parking
								utils
								furnished
								avail_on
								Images{
									img_id
									img_loc
									order_num
									info
								}
								landlord{
									id
									email
									password
									f_name
									l_name
								}
								rooms{
									sqr_area
									room_id
									Images{
										img_id
										img_loc
									}
								}
                            }
                        }
                    `,
                    "variables": {"id": route.params?.prop_id}
                },{
                    headers: {
                        "Authorization": 'Bearer ' + JSON.parse(user).token
                    }
                });   
                
                console.log(resp.data.data.getOneProperty)
                console.log(resp.data.data.getOneProperty.avail_on)
				setPicture(resp.data.data.getOneProperty.Images)	
				setInfo(resp.data.data.getOneProperty.info)
				setIsFurnished(resp.data.data.getOneProperty.furnished)
				setParking(resp.data.data.getOneProperty.parking.toString())
				setPrice(resp.data.data.getOneProperty.price.toString())
				setAmtBedrooms(resp.data.data.getOneProperty.bedrooms.toString())
				setAmtBathroom(resp.data.data.getOneProperty.bathroom.toString())
				setUtils(resp.data.data.getOneProperty.utils)
				resp.data.data.getOneProperty.avail_on = resp.data.data.getOneProperty.avail_on
				var d = new Date(0)
				d.setMilliseconds(resp.data.data.getOneProperty.avail_on)
				setDate(d)
            } catch (err) {
                if (!err.response){
					console.log('317')
                    console.log("Cannot find server, please try again later")
                    setLoading(false)
                    return;
                }
                console.log(err.response.data.errors[0].message)
            }
                            
            setLoading(false)
            
        }
        run_this()
        // get images here and pass as props to next screen
    },[])


	React.useEffect(() => {
		if (route.params?.ntext != null){
			if (route.params?.args.order_num == 1){
				setText1(route.params?.ntext)
			}else if (route.params?.args.order_num == 2){
				setText2(route.params?.ntext)
			}else if (route.params?.args.order_num == 3){
				setText3(route.params?.ntext)
			}else if (route.params?.args.order_num == 4){
				setText4(route.params?.ntext)
			}else if (route.params?.args.order_num == 5){
				setText5(route.params?.ntext)
			}else if (route.params?.args.order_num == 6){
				setText6(route.params?.ntext)
			}else if (route.params?.args.order_num == 7){
				setText7(route.params?.ntext)
			}else if (route.params?.args.order_num == 8){
				setText8(route.params?.ntext)
			}else if (route.params?.args.order_num == 9){
				setText9(route.params?.ntext)
			}
		}
		if (route.params?.from_img_select_pic != null){
			if (route.params?.args.order_num == 1){
				setPic1(route.params?.from_img_select_pic)
			}else if (route.params?.args.order_num == 2){
				setPic2(route.params?.from_img_select_pic)
				setText2(route.params?.ntext)
			}else if (route.params?.args.order_num == 3){
				setPic3(route.params?.from_img_select_pic)
				setText3(route.params?.ntext)
			}else if (route.params?.args.order_num == 4){
				setPic4(route.params?.from_img_select_pic)
				setText4(route.params?.ntext)
			}else if (route.params?.args.order_num == 5){
				setPic5(route.params?.from_img_select_pic)
				setText5(route.params?.ntext)
			}else if (route.params?.args.order_num == 6){
				setPic6(route.params?.from_img_select_pic)
				setText6(route.params?.ntext)
			}else if (route.params?.args.order_num == 7){
				setPic7(route.params?.from_img_select_pic)
				setText7(route.params?.ntext)
			}else if (route.params?.args.order_num == 8){
				setPic8(route.params?.from_img_select_pic)
				setText8(route.params?.ntext)
			}else if (route.params?.args.order_num == 9){
				setPic9(route.params?.from_img_select_pic)
				setText9(route.params?.ntext)
			}
		}
        
    }, [route.params]);

    function on_tap_pic(number, pic, prev_text){
        navigation.navigate('ManageImageSelect', {
            from_screen: "PropEd",
            current_pic: global.img_ad + '?img_loc=' + pic,
            cmd: 'prop',
			showInfoBox: true,
			ptext: prev_text,
            args: {"order_num": number, "prop_id": route.params?.prop_id}
        })
    }

    const onbackpress = () => {
        console.log("wow")
        navigation.navigate("Management", {
            from_screen: "Manage",
            current_pic: global.img_ad + '?img_loc=',
            cmd: 'test',
            args: 'none'
        })
    }

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: (props) => (
                <HeaderBackButton
                    {...props}
                    onPress={onbackpress}
                />
            ),
        });
    }, [navigation]);

    return (
        <View style={styles.main_container}>
        
            <SafeAreaView style={{flexGrow: 1, backgroundColor: 'grey', marginLeft: 0, paddingRight: 0, justifyContent: 'center'}}>
                <View style={styles.title_container}>
                    <Text style={styles.text}>Edit</Text>
                </View>
                <ScrollView contentContainerStyle={styles.scrollView}>
                    <View style={{paddingHorizontal: 30}}>
                        <View style={{margineLeft: 0, paddingRight: 0, flex:1, flexDirection: 'row',backgroundColor: "grey"}}>
                            <ImageButton style={styles.pic_box} onPress={() => {on_tap_pic(1, pic1, text1)}} pic = {pic1}/> 
                            <ImageButton style={styles.pic_box} onPress={() => {on_tap_pic(2, pic2, text2)}} pic = {pic2}/> 
                            <ImageButton style={styles.pic_box} onPress={() => {on_tap_pic(3, pic3, text3)}} pic = {pic3}/> 
                        </View>
                        <View style={{margineLeft: 0, paddingRight: 0, flex:1, flexDirection: 'row',backgroundColor: "grey"}}>
                            <ImageButton style={styles.pic_box} onPress={() => {on_tap_pic(4, pic4, text4)}} pic = {pic4}/> 
                            <ImageButton style={styles.pic_box} onPress={() => {on_tap_pic(5, pic5, text5)}} pic = {pic5}/> 
                            <ImageButton style={styles.pic_box} onPress={() => {on_tap_pic(6, pic6, text6)}} pic = {pic6}/> 
                        </View>
                        <View style={{margineLeft: 0, paddingRight: 0, flex:1, flexDirection: 'row',backgroundColor: "grey"}}>
                            <ImageButton style={styles.pic_box} onPress={() => {on_tap_pic(7, pic7, text7)}} pic = {pic7}/> 
                            <ImageButton style={styles.pic_box} onPress={() => {on_tap_pic(8, pic8, text8)}} pic = {pic8}/> 
                            <ImageButton style={styles.pic_box} onPress={() => {on_tap_pic(9, pic9, text9)}} pic = {pic9}/> 
                        </View>
						<Text style={{...styles.text, alignItems: 'center', textAlign: 'center'}}>
							Info
						</Text>
						<Input 
							multiline={true}
							numberOfLines={5}
							style={styles.textBox}
							onChangeText={(text) => {
								if(text.length < 1028){
									setInfo(text)	
								}
								
							}}
							value={info}
						/>
						<LabeledInput style={styles.input} placeholder={'Price'} value={price} text={"Price"} onChangeText={setPrice} keyboardType={'numeric'}/>
						<LabeledInput style={styles.input} placeholder={'Parking'} value={parking} text={"Parking"} onChangeText={setParking} keyboardType={'numeric'}/>
						<LabeledInput style={styles.input} placeholder={'Bedrooms'} value={amt_bedrooms} text={"bedrooms"} onChangeText={setAmtBedrooms} keyboardType={'numeric'}/>
						<LabeledInput style={styles.input} placeholder={'Bathrooms'} value={amt_bathroom} text={"bathroom"} onChangeText={setAmtBathroom} keyboardType={'numeric'}/>
						<View style={{flexDirection:"row"}}>
							<LabeledSwitch value={utils} text={"Utils"} onValueChange={setUtils}/>
							<LabeledSwitch value={furnished} text={"Furnished"} onValueChange={setIsFurnished}/>
						</View>
						<DatePicker title={'hi'} text={'Availible on'} onChange={setDate} date={date}/>
						<FilledButton title={ "save" } style={styles.loginButton} onPress={onSubmit}/>
						<FilledButton title={ "cancel" } style={styles.loginButton} onPress={onCancel}/>
						<FilledButton title={ "delete" } style={styles.deleteButton} onPress={onDelete}/>

                    </View>
											
                </ScrollView>
            </SafeAreaView>
			<Loading loading={loading}/>
        </View>
    )
}

const styles = StyleSheet.create({
    title_container: {
        flex: 1,
        paddingTop:20,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: 'white'
    },
    scrollView: {
        marginTop: 20,
        flexGrow: 1,
		justifyContent: 'center'
    },
    title: {
        marginBottom:16
    },
    input: {
        marginVertical: 5,
    },
    loginButton: {
		marginBottom: 50,
    },
	deleteButton: {
		marginBottom: 50,
		color: 'red',
    },
    text: {
        fontSize: 18,
        fontWeight: 20,
        color: 'purple',
        fontWeight: '500',
    },
    main_container: {
		justifyContent: 'center'
    },
	textBox:{
        height: 120,
        borderRadius: 30,
    },
    pic_box:{
        marginHorizontal: 1,
        marginVertical: 1,
        backgroundColor: 'rgb(10,10,10)',
        height: 100,
        width: 100
    },
    topRightButton: {
        flex: 1,
        padding: 5,
        justifyContent: "center",
        alignContent: "center"
    },
    topLeftButton: {
        flex: 1,
        padding: 5,
        justifyContent: "center",
        alignContent: "center"
    },
save_cancel_container: {
        height: 55,
        width: '100%',
        flexDirection: "row"
    },
})
