import { View, StyleSheet, Image,Text, SafeAreaView, ScrollView , TouchableOpacity} from 'react-native';
import * as React from 'react'
import LabeledInput from '../../component/LabeledInput'
import FilledButton from '../../component/FilledButton'
import SwipeCards from "react-native-swipe-cards-deck";

function Card({ data }) {
  return (
    <View style={[styles.card, { backgroundColor: data.backgroundColor }]}>
      <Text>{data.text}</Text>
    </View>
  );
}

function StatusCard({ text }) {
  return (
    <View>
      <Text style={styles.cardsText}>{text}</Text>
    </View>
  );
}

export default function SwipeScreen({navigation}){

	const [cards, setCards] = React.useState();

	// replace with real remote data fetching
	React.useEffect(() => {
		setTimeout(() => {
			setCards([
				{ text: "Tomato", backgroundColor: "red" },
				{ text: "Aubergine", backgroundColor: "purple" },
				{ text: "Courgette", backgroundColor: "green" },
				{ text: "Blueberry", backgroundColor: "blue" },
				{ text: "Umm...", backgroundColor: "cyan" },
				{ text: "orange", backgroundColor: "orange" },
			]);
		}, 3000);
	}, []);

	function handleYup(card) {
		console.log(`Yup for ${card.text}`);
		return true; // return false if you wish to cancel the action
	}
	function handleNope(card) {
		console.log(`Nope for ${card.text}`);
		return true;
	}
	function handleMaybe(card) {
		console.log(`Maybe for ${card.text}`);
		return true;
	}

	const [lon, setLon] = React.useState(''); 
    const [lat, setLat] = React.useState(''); 
    const [rad, setRad] = React.useState(''); 

	const [old_lon, old_setLon] = React.useState(''); 
    const [old_lat, old_setLat] = React.useState(''); 
    const [old_rad, old_setRad] = React.useState(''); 

    const [show_filter, setsf] = React.useState(false); 
	
	function on_tap_garbage(){
		//console.log("show-filters")
		setsf(true)
	}

	async function save_filter_opt(){
		old_setLat(lat)
		old_setLon(lon)
		old_setRad(rad)
		setsf(false)
	}
	
	async function cancel(){
		setLon(old_lon)
		setLat(old_lat)
		setRad(old_rad)
		setsf(false)
	}

	function what_to_print(){
		
		if (show_filter){
			return(
        		<View style={styles.filter_view}>
            		<LabeledInput style={styles.input} placeholder={'Longitude'} value={lon} text={"longitude"} onChangeText={setLon} keyboardType={'numeric'}/>
            		<LabeledInput style={styles.input} placeholder={'Latitude'} value={lat} text={"latitude"} onChangeText={setLat} keyboardType={'numeric'}/>
            		<LabeledInput style={styles.input} placeholder={'Latitude'} value={rad} text={"latitude"} onChangeText={setRad} keyboardType={'numeric'}/>
            		<FilledButton title={ "Save" } style={styles.loginButton} onPress={save_filter_opt}/> 
            		<FilledButton title={ "Cancel" } style={styles.loginButton} onPress={cancel}/> 
				</View>
			)

		}else{
			return(
        		<View style={styles.swipe_view}>
            		<FilledButton title={ "Filter" } style={styles.loginButton} onPress={on_tap_garbage}/> 
				{
				//	<TouchableOpacity activeOpacity={0.5} onPress={() => {on_tap_garbage()}} style={styles.TouchableOpacityStyle}  >
				//		<Image source={{uri : 'https://cdn3.iconfinder.com/data/icons/office-269/32/Office_Expanded_32pxl_Trash-512.png'}} 
				//		style={styles.FloatingButtonStyle} />
				//	</TouchableOpacity>
				}

					{cards ? (
						<SwipeCards
							cards={cards}
							renderCard={(cardData) => <Card data={cardData} />}
							keyExtractor={(cardData) => String(cardData.text)}
							renderNoMoreCards={() => <StatusCard text="No more cards..." />}
							handleYup={handleYup}
							handleNope={handleNope}
							handleMaybe={handleMaybe}
							hasMaybeAction={true}
							// If you want a stack of cards instead of one-per-one view, activate stack mode
							// stack={true}
							// stackDepth={3}
						/>
					) : (
						<StatusCard text="Loading..." />
					)}
				</View>
			)
		}

	}

	return what_to_print()
}

const styles = StyleSheet.create({
    swipe_view: {
        flex: 1,
        paddingTop:0,
        alignItems: 'center',
        padding: 20
    },
	filter_view: {
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
	TouchableOpacityStyle:{
        position: 'absolute',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        top: 0,
    },
   FloatingButtonStyle: {

     resizeMode: 'contain',
     width: 50,
     height: 50,
   },
	input: {
        marginVertical: 5,
    },
	loginButton: {
        marginVertical: 30,
    },
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
	card: {
		justifyContent: "center",
		alignItems: "center",
		width: 300,
		height: 500,
	},
	cardsText: {
		fontSize: 22,
	},
})
