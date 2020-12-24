import {View, StyleSheet, Text, Image, useState} from 'react-native';
import { HeaderBackButton } from '@react-navigation/stack';
import ImagePicker from 'react-native-image-picker';

import * as React from 'react'
import FilledButton from '../component/FilledButton';

import Loading from '../component/Loading'

import global from '../Global'

import { UserContext } from '../contexts/UserContext';

import sleep from '../utils/sleep';

export default function ImageSelector({route, navigation}){

    const [pic, setPic] = React.useState(null); 
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

    const onbackpress = async () => {
                        if (source.current == null){
                            navigation.navigate(route.params?.from_screen)
                            return
                        }

                        let data = new FormData();
                        
                        data.append('sent_to', 0);
                        data.append('cmd', 'pp');
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
                            console.log(response)
                            response.text().then(function(text){
                                console.log(text)
                                setLoading(false)
                                navigation.navigate(route.params?.from_screen,{
                                    from_img_select_pic: text.split(" ")[0]
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
                    onPress={onbackpress}
                />
            ),
        });
    }, [navigation]);

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
                
                // You can also discd play the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };
                // console.log(response)
                console.log(nsource)
                // upload image here

                // let data = new FormData();
                
                // data.append('sent_to', 0);
                // data.append('cmd', 'pp');
                // data.append('file', source);
                // setLoading(true)
                // fetch(global.upl_ad,{
                //     method: 'post',
                //     headers: {
                //         "Authorization": 'Bearer ' + JSON.parse(user).token,
                //         'Content-Type': 'multipart/form-data',
                //     },
                //     body: data
                // }).then(response => {
                //     console.log(response)
                //     response.text().then(function(text){
                //         console.log(text)
                //         setLoading(false)
                //     })
                    
                // }).catch(err => {
                //     console.log(err)
                // })  
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
            <FilledButton onPress={on_press_select_image} title={"select image"}/>
            {/* <View>
                <ScrollView horizontal={true}>
                    {pics.map((item, index) => {
                        return (
                            <View style={{height: 50, width: 50, backgroundColor: 'orange', marginBottom: 10}} />
                        )
                    })}
                </ScrollView>
            </View> */}
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