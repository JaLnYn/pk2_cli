
import React, { useState, useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage'
import global from '../Global'
import sleep from '../utils/sleep';
import axios from 'axios';

export default function useAuth() {

    const [user, setUser] = React.useState(null);
    const auth = React.useMemo(
        () => ({
        login:async (email, password) => {
            await sleep(1000) //REMOVE ON PRODUCTION TODO
            let resp = {}
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
            // setToken(resp.data.data.login.token)
            // setUserType(resp.data.data.login.user_type)
            // setUserId(resp.data.data.login.userId)
            setUser(JSON.stringify({
                token: resp.data.data.login.token,
                user_type: resp.data.data.login.data,
                userId: resp.data.data.login.userId,
                tokenExpiration: resp.data.data.login.tokenExpiration
            }))
            try{

                // await AsyncStorage.setItem('my_password', resp.data.data.signup.email)
                // await AsyncStorage.setItem('my_email', email)
            }catch(err){
                console.log(err)
            }
            
        },
        logout: () => {
            setUser(null);
        },
        check_account: async (email, password) => {
            await sleep(1000) //TODO remove this in production
            let resp = await axios.post( global.gql_ad, {
            "query": `query checkAccount($email: String!, $password: String!) {
                checkAccount(email: $email, password: $password)
            }`,
            "variables": {"email": email, "password": password}
            });
            return resp.data.data.checkAccount
        },
        signup: async ( email, password, f_name, l_name,gender, user_type, date_of_birth) => {
            await sleep(1000); //TODO remove this in production
            let resp = await axios.post( global.gql_ad, {
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

            // await AsyncStorage.setItem('my_email', resp.data.data.signup.email)
            // await AsyncStorage.setItem('my_password', resp.data.data.signup.email)
            return resp.data.data
        }
        }), 
    [],)
    return({auth, user})
}