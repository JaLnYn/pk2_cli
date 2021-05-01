import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import * as React from 'react'
import default_styles from '../style/default_styles'

import global from '../Global.js'
import { UserContext } from '../contexts/UserContext';

export default function PropertyBox(props){

    const user = React.useContext(UserContext);
	function deletion(delete_var){
		if (delete_var){
			return (<Image source={{uri : 'https://cdn3.iconfinder.com/data/icons/office-269/32/Office_Expanded_32pxl_Trash-512.png'}} 
                style={styles.FloatingButtonStyle} />)
		}
		return (<View/>)
	}


    return (
		<View>
			<TouchableOpacity style={[props.style, styles.button]} onPress={props.onPress}>
				<View style={{flexDirection:'row'}}>
					{
						//<Image style={styles.pic_box} source={require('../../res/default_profile.jpg')}/>
						props?.property.Images[0]?.img_loc == null ? (
                            <Image style={styles.pic_box} source={require('../../res/default_profile.jpg')}/>
                        ):(
                            <Image style={styles.pic_box} 
                                source={
                                    { 
                                        uri: global.img_ad + '?img_loc=' + props?.property.Images[0]?.img_loc,
                                        headers: {
                                            "Authorization": 'Bearer ' + JSON.parse(user).token
                                        },
                                    }
                                }
                                onError={({ nativeEvent: {error} }) => console.log(error)}
                            />

                        )
					}
					<Text style={styles.text} >
						{props.property.prop_address.toUpperCase()}
					</Text>
					{ //deletion(props.deleting)
						//console.log(props.property.Images[0]?.img_loc)
					}
				</View>
			</TouchableOpacity>
		</View>
	)
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'rgb(250, 250, 250)',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius:8,
        padding: 0
    },
    text: {
        color: 'purple',
        fontWeight: '500',
        fontSize: 12,
		flex: 2
    },
	pic_box:{
        backgroundColor: 'rgb(10,10,10)',
        height: 128,
        width: 128
    },
	FloatingButtonStyle: {
     resizeMode: 'contain',
     width: 50,
     height: 50,
   },

})
