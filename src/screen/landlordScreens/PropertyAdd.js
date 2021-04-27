import { View, StyleSheet, Image,Text, SafeAreaView, ScrollView } from 'react-native';
import { HeaderBackButton } from '@react-navigation/stack';
import * as React from 'react'

import { UserContext } from '../../contexts/UserContext';
import ImageButton from '../../component/ImageButton'

import TextButton from '../../component/TextButton'


export default function PropertyAdd({navigation}){


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
    const [changes, setChanges] = React.useState(false)
    const onbackpress = () => {
        navigation.navigate('Management', {
            from_screen: "Manage",
            current_pic: global.img_ad + '?img_loc=',
            cmd: 'pp',
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