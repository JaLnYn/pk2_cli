import {View, StyleSheet, Text, Image, useState} from 'react-native';
import { HeaderBackButton } from '@react-navigation/stack';
import ImagePicker from 'react-native-image-picker';

import axios from 'axios'
import * as React from 'react'
import FilledButton from '../component/FilledButton';

import Loading from '../component/Loading'

import global from '../Global'

import { UserContext } from '../contexts/UserContext';

import sleep from '../utils/sleep';

import Input from '../component/Input'
export default function ImageSelector({route, navigation}){

    const [pic, setPic] = React.useState(null); 
    const [info, setInfo] = React.useState(null); 
    const [infoChanged, setInfoChanged] = React.useState(false); 
    const source = React.useRef(null); 
    const user = React.useContext(UserContext);
    const [loading, setLoading] = React.useState(false);

    const options = {
        title: 'Select Avatar',
        customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
        storageOptions: {
            skipBackup: true,
            path: 'images',
        },
    };

    React.useEffect(() => {
        if (route.params?.current_pic){
            //console.log("image picker " + route.params?.current_pic)
            setPic(route.params?.current_pic)
        }
    }, [route.params?.current_pic]);

    React.useEffect(() => {
		console.log(route.params)
        if (route.params?.ptext){
            //console.log("image picker " + route.params?.current_pic)
            setInfo(route.params?.ptext)
        }
    }, [route.params?.ptext]);

	async function my_asyncfunction() {
		if (infoChanged == true){
			try {
				let resp = await axios.post( global.gql_ad, {
					"query": `
						mutation setPropertyPicInfo($prop_id: ID!, $order_num: Int!, $info: String!) {
							setPropertyPicInfo(prop_id: $prop_id, order_num: $order_num, info: $info)
						}
					`,
					"variables": {"prop_id": route.params?.args.prop_id, "info": info, "order_num": route.params?.args.order_num},
				},{
					headers: {
						"Authorization": 'Bearer ' + JSON.parse(user).token
					}
				});   
				console.log(resp.data.data.setPropertyPicInfo)
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
	}


    async function onbackpress(){
        if (route.params?.cmd == 'test'){
            console.log("return without upload")
            console.log(route.params?.args)
            return
        }
		let j = info
        if (source.current == null){
			my_asyncfunction()
			console.log(j)
            navigation.navigate(route.params?.from_screen, {args:route.params?.args, ntext: j,})
			
            return
        }
        let data = new FormData();
        
        data.append('sent_to', 0);
        data.append('cmd', route.params?.cmd);
        data.append('args', JSON.stringify(route.params?.args));
        data.append('file', source.current);
        setLoading(true)
        await sleep(1000)

        fetch(global.upl_ad,{
            method: 'post',
            headers: {
                "Authorization": 'Bearer ' + JSON.parse(user).token,
                'Content-Type': 'multipart/form-data',
            },
            body: data
        }).then(response => {
            //console.log(response)
			let parsed = null
            response.text().then(function(text){
                setLoading(false)
				my_asyncfunction()
                navigation.navigate(route.params?.from_screen,{
                    from_img_select_pic: text.split(" ")[0],
					args: route.params?.args,
					ntext: info,
                })
            })
            
        }).catch(err => {
            console.log(err)
        })  

    }

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: (props) => (
                <HeaderBackButton
                    {...props}
                    onPress={() => {onbackpress()}}
                />
            ),
        });
    }, [navigation, info]);

    const on_press_select_image = () => {
        console.log("wow")
        ImagePicker.showImagePicker(options, (response) => {
            //console.log('Response = ', response);
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const nsource = { uri: response.uri , name: response.fileName, type: response.type};
                
                console.log(nsource) 
               //set image
                source.current = nsource
                setPic(nsource.uri)

                
            }
        })
    }

    return (
        <View style={styles.title_container}>
            <Text>Image selection</Text>
            {
                pic == null ? (
                    <Image style={styles.pic_box} source={require('../../res/default_profile.jpg')}/>
                ):(
                    <Image style={styles.pic_box} 
                        source={
                            { 
                                uri: pic,
                                headers: {
                                    "Authorization": 'Bearer ' + JSON.parse(user).token
                                },
                            }
                        }
                        onError={({ nativeEvent: {error} }) => console.log(error)}
                    />
                )
            }
			{
				route.params.showInfoBox != null && route.params.showInfoBox == true ? (
					<Input 
						multiline={true}
						numberOfLines={5}
						style={styles.textBox}
						onChangeText={(text) => {
							if(text.length < 1028){
								setInfo(text)	
								setInfoChanged(true)
							}
						}}
						value={info}
					/>

				) :(
					<View/>
				)
			}
            <FilledButton onPress={on_press_select_image} title={"select image"}/>
            <Loading loading={loading}/>
        </View>
    )
}

const styles = StyleSheet.create({
    pic_box:{
        backgroundColor: 'rgb(10,10,10)',
        height: 128,
        width: 128
    },
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
