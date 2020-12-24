import {KeyboardAvoidingView, View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import * as React from 'react'
import axios from 'axios'
import Input from '../component/Input'
import default_styles from '../style/default_styles'
import Heading from '../component/Heading'
import FilledButton from '../component/FilledButton'
import TextButton from '../component/TextButton'
import Error from '../component/Error'
import { AuthContext } from '../contexts/AuthContext';
import { UserContext } from '../contexts/UserContext';
import Loading from '../component/Loading'
import global from '../Global'
import sleep from '../utils/sleep';

//<TextButton title={"Back"} style={styles.closeButton} onPress={() => {navigation.pop()}}/>

const type_name = {
    "T": "Tenent",
    "L": "Landlord"
}



export default function ProfileScreen({route, navigation}){

    const { setMyUser,logout} = React.useContext(AuthContext);
    const user = React.useContext(UserContext);
    const [loading, setLoading] = React.useState(false);
    const [err, setErr] = React.useState('');
    const [name, setName] = React.useState('')
    const [bio, setBio] = React.useState(''); 
    const [old_bio, setOldBio] = React.useState(''); 
    const [user_type, setUserType] = React.useState(''); 
    const [old_user_type, setOldUserType] = React.useState('');
    const [pic, setPic] = React.useState(''); 
    const [changes, setChanges] = React.useState(false)

    async function save_me(){
        console.log("saving...")
        setLoading(true)
        await sleep(1000)
        //send update request
        try {
            let resp = await axios.post( global.gql_ad, 
                {
                    "query": `mutation updateUser($bio: String, $user_type: String){
                        updateUser(bio: $bio, user_type: $user_type){
                            user_type
                            bio
                        }
                    }`,

                    "variables": {"user_type": user_type, "bio": bio}
                },
                {
                    headers: {
                        "Authorization": "Bearer " + got_user.token
                    }
                }

            );
            setOldBio(bio)
            setOldUserType(user_type)
            got_user.user_type = resp.data.data.updateUser.user_type
            let stringify_user = JSON.stringify(got_user)
        
            await setMyUser(stringify_user)
            setErr("")
        } catch (err) {
            setBio(old_bio)
            setUserType(old_user_type)
            if (!err.response){
                setErr("Cannot find server")
                setChanges(false)
                setLoading(false)
                return;
            }
            console.log(err.response.data.errors[0].message)
            
        }
        
        setChanges(false)
        setLoading(false)
    }
    async function cancel_me(){
        setBio(old_bio)
        setUserType(old_user_type)
        setChanges(false)
    }

    function on_tap_pic(){
        navigation.navigate('ImgScreen', {
            from_screen: "MainScreen",
            current_pic: global.img_ad + '?img_loc=' + pic,
        })
    }

    React.useEffect(() => {

        const unsubscribe = navigation.addListener('blur', () => {
            if (changes){
                // BUG HERE. when canceling it makes things undefined
                cancel_me()
            }
        });

        return unsubscribe;
    }, [navigation]);

    React.useEffect(() => {
        if (route.params?.from_img_select_pic){
        
            setPic(route.params?.from_img_select_pic)
        }
    }, [route.params?.from_img_select_pic]);

    // React.useEffect(() => { console.log("old bio" + old_bio) }, [old_bio])
    // React.useEffect(() => { console.log("bio" + bio) }, [bio])
    React.useEffect(() => {
        
        let run_this = async () => {
            setLoading(true)
            await sleep(1000)
            let resp = {}
            try {
                resp = await axios.post( global.gql_ad,{
                    "query": `
                        query getUser($id: ID!){
                            getUser(id: $id){
                                f_name
                                l_name
                                profile_pic
                                user_type
                                bio
                                img_loc
                            }
                        }
                    `,
                    "variables": {"id": JSON.parse(user).userId}
                },{
                    headers: {
                        "Authorization": 'Bearer ' + JSON.parse(user).token
                    }
                });   
                setName(`${resp.data.data.getUser.f_name} ${resp.data.data.getUser.l_name}`)
                setBio(resp.data.data.getUser.bio)
                setOldBio(resp.data.data.getUser.bio)
                setUserType(resp.data.data.getUser.user_type)
                setOldUserType(resp.data.data.getUser.user_type)
                setPic(resp.data.data.getUser.img_loc)
                
                console.log(resp.data.data.getUser)
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
        run_this()
        // get images here and pass as props to next screen

    },[])

    let got_user = JSON.parse(user)

    return (
        <View style={styles.main_container}>
            <View style={styles.save_cancel_container}>
                {
                    changes == true?  (
                        <TextButton style={styles.topLeftButton} title={"cancel"} onPress={()=>{cancel_me()}}/>
                    ) : (<View/>)
                }
                <View style={{flex: 2}}/>
                {
                    changes == true?  (
                        <TextButton style={styles.topRightButton} title={"save"} onPress={()=>{save_me()}}/>
                    ) : (<View/>)
                }
                
            </View>

            <View style={styles.title_container}>
                
                <TouchableOpacity style={styles.pic_box} onPress={()=>{on_tap_pic()}}>
                    
                    {
                        
                        pic == null ? (
                            <Image style={styles.pic_box} source={require('../../res/default_profile.jpg')}/>
                        ):(
                            <Image style={styles.pic_box} 
                                source={
                                    { 
                                        uri: global.img_ad + '?img_loc=' + pic,
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
                <Error error={err}/>

                <Text style={styles.text}>Hello {name}</Text>

                
    
                <FilledButton title={
                    "You are a " + type_name[user_type]
                }
                style={styles.loginButton}

                onPress={async () => {
                    setChanges(true)
                    if (user_type == 'T'){
                        setUserType('L')
                    } else {
                        setUserType('T')
                    }
                }
                
                }/>           

                <Input 
                    multiline={true}
                    numberOfLines={5}
                    style={styles.textBox}
                    onChangeText={(text) => {
                        if(text.length < 20){
                            setBio(text)
                            if(!changes){
                                setChanges(true)
                            }
                        }
                        
                    }}
                    value={bio}
                />

                <FilledButton title={
                    "Logout"
                }

                style={styles.loginButton} 
                onPress={async () => {
                    try {
                        await logout()
                    }catch(err){
                        
                        console.log(err.message)
                        setErr(err.message);
                    }
                }
                
                }/> 

            </View>

            <Loading loading={loading}/>
        </View>
    )
}

const styles = StyleSheet.create({
    title_container: {
        flex: 1,
        paddingTop:120,
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: 20,
        width: '100%',

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
    text: {
        fontSize: 18,
        fontWeight: 20,
        color: 'purple',
        fontWeight: '500',
    },
    textBox:{
        height: 120,
        alignItems: 'flex-start',
        borderRadius: 30,
    },
    save_cancel_container: {
        height: 55,
        width: '100%',
        flexDirection: "row"
    },
    main_container: {
        alignItems: 'center',
        justifyContent: 'flex-end',
        flex: 1,

    },
    pic_box:{
        backgroundColor: 'rgb(10,10,10)',
        height: 128,
        width: 128
    }
})