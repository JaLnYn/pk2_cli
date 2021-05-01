import { View, StyleSheet, Image,Text, SafeAreaView, ScrollView , TouchableOpacity} from 'react-native';
import * as React from 'react'

import global from '../../Global.js'
import Loading from '../../component/Loading.js'
import { UserContext } from '../../contexts/UserContext';
import ImageButton from '../../component/ImageButton'
import PropertyBox from '../../component/PropertyBox.js'
import sleep from '../../utils/sleep';

import axios from 'axios'




export default function Management({navigation}){

    const user = React.useContext(UserContext);
    const [loading, setLoading] = React.useState(false);
	const [myProps, setMyProps] = React.useState([])
    const [deletion, setDeletion] = React.useState(false);
	function mapMyProps(myProps){
		
		if (myProps != null){
			return myProps.map((cur_property, index) => {
				return (
					<PropertyBox key={index} property={cur_property} onPress={() => {
						// navigate to it's edit page
						if (deletion == true){
							console.log("deleting")
						}else{
							navigation.navigate('PropEd', {
								from_screen: "Management",
								prop_id: cur_property.prop_id
							})

						}
						//console.log(index)
					}} deleting={deletion}/>
				)
			})
		}else{

			return (<View/>)
		}

	}


	let run_this = async () => {
				setLoading(true)
				await sleep(1000)
				//console.log("here")
				let resp = {}
				// get my properties 
				
				try {
					resp = await axios.post( global.gql_ad,{
						"query": `
							query getMyProperty($start_index: Int!, $end_index: Int!){
								getMyProperty(start_index: $start_index, end_index: $end_index){
									prop_id
									prop_address
									longitude
									latitude
									rooms{
										room_id
										sqr_area
									}
									Images{
										img_id
										img_loc
									}
								}
							}
						`,
						"variables": {"start_index": 0, "end_index": 5}
					},{
						headers: {
							"Authorization": 'Bearer ' + JSON.parse(user).token
						}
					});   
					console.log("running")
					console.log(resp.data.data.getMyProperty)
					setMyProps(resp.data.data.getMyProperty)
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

	React.useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			run_this()
		});

		// Return the function to unsubscribe from the event so it gets removed on unmount
		return unsubscribe;
	}, [navigation]);

	React.useEffect(() => {
        
        
        run_this()
        // get images here and pass as props to next screen
    },[])
	
	React.useEffect(() => {
		console.log(myProps)
	},[myProps])

    function on_tap_add(){
		
        navigation.navigate('PickAdd', {
            from_screen: "Manage",
            current_pic: global.img_ad + '?img_loc=',
            cmd: 'pp',
            args: 'none'
        })
    }
    	
	function on_tap_garbage(){
		setDeletion(!deletion)
		//console.log(deletion)
    }
 

    return (
        <View style={styles.main_container}>
            <SafeAreaView style={{flexGrow: 1, backgroundColor: 'grey', marginLeft: 0, paddingRight: 0}}>
                <ScrollView style={styles.scrollView}>
                    <View style={styles.title_container}>
                        <Text style={styles.text}>Management</Text>
                    </View>
                    <View style={{paddingHorizontal: 30}}>
                        <Text> hello </Text>
                    </View>
					{mapMyProps(myProps)}				
                    
                </ScrollView>
            </SafeAreaView>
			{
			// <TouchableOpacity activeOpacity={0.5} onPress={() => {on_tap_garbage()}} style={styles.TouchableOpacityStyle2}  >
			// 	<Image source={{uri : 'https://cdn3.iconfinder.com/data/icons/office-269/32/Office_Expanded_32pxl_Trash-512.png'}} 
            //     style={styles.FloatingButtonStyle} />
            // </TouchableOpacity>           
			}
            <TouchableOpacity activeOpacity={0.5} onPress={() => {on_tap_add()}} style={styles.TouchableOpacityStyle}  >

                <Image source={{uri : 'https://reactnativecode.com/wp-content/uploads/2017/11/Floating_Button.png'}} 
                style={styles.FloatingButtonStyle} />
            </TouchableOpacity>           
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
        backgroundColor: 'pink'
    },
    scrollView: {
        flexGrow: 1,
        backgroundColor: 'purple'
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
    text: {
        fontSize: 18,
        fontWeight: 20,
        color: 'purple',
        fontWeight: '500',
    },
    main_container: {
    },
    pic_box:{
        marginHorizontal: 1,
        marginVertical: 1,
        backgroundColor: 'rgb(10,10,10)',
        height: 100,
        width: 100
    },
    TouchableOpacityStyle:{
        position: 'absolute',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        bottom: 30,
    },
	TouchableOpacityStyle2:{
        position: 'absolute',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        bottom: 90,
    },
   FloatingButtonStyle: {

     resizeMode: 'contain',
     width: 50,
     height: 50,
   },

})
