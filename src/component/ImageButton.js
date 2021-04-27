import {View, StyleSheet, Image,Text, TouchableOpacity} from 'react-native';
import * as React from 'react'
import default_styles from '../style/default_styles'
import { UserContext } from '../contexts/UserContext';
import global from '../Global.js'


export default function ImageButton(props){
    const user = React.useContext(UserContext);

    return (
        <TouchableOpacity style={[props.style, styles.pic_box]} onPress={props.onPress}>
			{
				props.pic == "" ? (
					<Image style={styles.pic_box} source={require('../../res/default_profile.jpg')}/>
				):(
					<Image style={styles.pic_box} 
						source={
							{ 
								uri: global.img_ad + '?img_loc=' + props.pic,
								headers: {
									"Authorization": 'Bearer ' + JSON.parse(user).token
								},
							}
						}
						onError={({ nativeEvent: {error} }) => console.log(error)}
					/>

				)
			}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    pic_box:{
        marginHorizontal: 1,
        marginVertical: 1,
        backgroundColor: 'rgb(10,10,10)',
        height: 100,
        width: 100
    }
})
