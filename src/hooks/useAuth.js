
import React, { useState, useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage'
import global from '../Global'
import sleep from '../utils/sleep';
import axios from 'axios';
import * as Keychain from 'react-native-keychain';


const user_key = 'user'



export default function useAuth() {

    const [user, setUser] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const auth = React.useMemo(
        () => ({
        login:async (email, password) => {
            await sleep(1000) //REMOVE ON PRODUCTION TODO
            let resp = {}
            try {
                resp =await axios.post( global.gql_ad,{
                    "query": `
                        query login($email: String!, $password: String!){
                            login(email: $email, password: $password){
                                token
                                tokenExpiration
                                userId
                                user_type
                            }
                        }
                    `,
                    "variables": {"email": email, "password": password}
                });   
            } catch (err) {
                if (!err.response){
                    throw new Error("Cannot find server, please try again later")
                    
                }
                throw err.response.data.errors[0].message
            }
            
            // setToken(resp.data.data.login.token)
            // setUserType(resp.data.data.login.user_type)
            // setUserId(resp.data.data.login.userId)
            let user_stringify = JSON.stringify({
                token: resp.data.data.login.token,
                user_type: resp.data.data.login.user_type,
                userId: resp.data.data.login.userId,
                tokenExpiration: resp.data.data.login.tokenExpiration
            })
            setUser(user_stringify)

            try{
                await AsyncStorage.setItem(user_key, user_stringify);
                await Keychain.setGenericPassword(email, password);
            }catch(err){
                throw err
            }
            
        },
        logout: async () => {
            setUser(null);
            try{
                await AsyncStorage.removeItem(user_key);
            }catch(err){
                console.log(err)
            }
            await Keychain.resetGenericPassword();
        },
        check_account: async (email, password) => {
            await sleep(1000) //TODO remove this in production
            let resp = {}
            try {
                resp = await axios.post( global.gql_ad, {
                    "query": `query checkAccount($email: String!, $password: String!) {
                        checkAccount(email: $email, password: $password)
                    }`,
                    "variables": {"email": email, "password": password}
                });
            } catch (err) {
                if (!error.response){
                    throw new Error("Cannot find server, please try again later")
                }
                throw err.response.data.errors[0].message
            }
                
            return resp.data.data.checkAccount
        },
        signup: async ( email, password, f_name, l_name,gender, user_type, date_of_birth) => {
            await sleep(1000); //TODO remove this in production

            let resp = {}
            try {
                resp = await axios.post( global.gql_ad, {
                    "query": `mutation signup($email: String!, $password: String!, $f_name: String!, $l_name: String!, $gender: String!, $user_type: String!, $date_of_birth: String!) {
                        signup(email: $email, password: $password, f_name: $f_name, l_name: $l_name, gender: $gender, user_type: $user_type, date_of_birth: $date_of_birth){
                        id
                        email
                        password
                        f_name
                        l_name
                        gender
                        user_type
                        date_of_birth
                        registration_date
                        }
                    }`,
                    "variables": {"email": email, "password": password, "f_name": f_name, "l_name": l_name, "gender": gender, "user_type": user_type, "date_of_birth": date_of_birth}
                });
            } catch (error) {
                if (!error.response){
                    throw new Error("Cannot find server, please try again later")
                }
                throw error.response.data.errors[0].message               
            }
            // await AsyncStorage.setItem('my_email', resp.data.data.signup.email)
            // await AsyncStorage.setItem('my_password', resp.data.data.signup.email)
            return resp.data.data
        },
        check_auth_re_login: async() => {
            // this function check if auth exists, if not we check if previous credentials exists
            let got_user = null
            try {
                got_user = await AsyncStorage.getItem(user_key)
            } catch (err) {
                console.log(err)
            }
            if (got_user != null){
                // check if authenticated works
                // if not then we gotta re-signin
                await sleep(1000) //TODO remove this in production
                let resp = {}
                try {
                    resp = await axios.post( global.gql_ad, 
                        {
                            "query": `query checkAuth{
                                checkAuth
                            }`
                        },{
                            headers: {
                                "Authorization": "Bearer " + JSON.parse(got_user).token
                            }
                        }
                    );
                    
                   
                } catch (error) {
                    if (!error.response){
                        throw new Error("Cannot find server, please try again later")
                    }
                    console.log(error.response.data.errors[0].message)
                }
                if (resp.data.data.checkAuth == true) {
                        // works set user
                    setUser(got_user)
                    return got_user
                }else {
                    // the saved user no longer works and we need to re-login
                    // check for saved sign in.
                    let credentials = await Keychain.getGenericPassword();
                    try {
                        // Retrieve the credentials
                        credentials = await Keychain.getGenericPassword();
                    } catch (error) {
                        console.log("Keychain couldn't be accessed!", error);
                    }
                    if (credentials) {
                       
                        try{
                            let resp = {}
                            try {
                                resp =await axios.post( global.gql_ad,{
                                    "query": `
                                        query login($email: String!, $password: String!){
                                            login(email: $email, password: $password){
                                                token
                                                tokenExpiration
                                                userId
                                                user_type
                                            }
                                        }
                                    `,
                                    "variables": {"email": credentials.username, "password": credentials.password}
                                });   
                            } catch (err) {
                                if (!error.response){
                                    throw new Error("Cannot find server, please try again later")
                                }
                                console.log(error.response.data.errors[0].message)
                            }
                            
                            // setToken(resp.data.data.login.token)
                            // setUserType(resp.data.data.login.user_type)
                            // setUserId(resp.data.data.login.userId)
                            let user_stringify = JSON.stringify({
                                token: resp.data.data.login.token,
                                user_type: resp.data.data.login.user_type,
                                userId: resp.data.data.login.userId,
                                tokenExpiration: resp.data.data.login.tokenExpiration
                            })
                            setUser(user_stringify)

                            try{
                                await AsyncStorage.setItem(user_key, user_stringify);
                            }catch(err){
                                console.log(err)
                            }
                            return (user_stringify)
                        }catch(err){
                            console.log(err.response.data.errors[0].message)
                        }
                    } else {
                        console.log('No credentials stored');
                        return null;
                    }
                }


               
            }else{

            }
        },
        setMyUser: async (user) => {
            setUser(user)

            try{
                await AsyncStorage.setItem(user_key, user);
            }catch(err){
                console.log(err)
            }

        }
        }), 
        
    [],)


    React.useEffect(() => {
        const run_async = async () => {
            setLoading(true)
            console.log("running re_login")
            await auth.check_auth_re_login();
            setLoading(false)
        }

        run_async()
    },[])
    return {auth, user, loading, }
}