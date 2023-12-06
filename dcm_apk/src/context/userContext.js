import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useEffect, useState } from "react";
import { API_URL } from "../components/utils/constantes";


export const UserContext = createContext();

export const UserProvider = ({ children }) => {

    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);
    const [mounted, setMounted] = useState(true);
    const [token, setToken] = useState(null);

    useEffect(() => {
        checkUser()
    }, [])
    //Check if user exist
    const checkUser = async () => {
        setLoading(true)
        try {
            const token = await AsyncStorage.getItem("token")
            if (token) {
               const url = `${API_URL}/user/id`
               const responses = await fetch(url, {
                  headers: {
                     'authorization': `Bearer ${token}`
                  }
               })
               if(responses.ok){
                  const data = await responses.json()
                  setUser(data);
               }
            }
        } catch (error) {
            console.error(error);
        }
        setLoading(false)
    }

   const login = async (data) => {
      try {
         const url = `${API_URL}/login`
         const body = {
            email: data.email,
            password: data.password
         }
         const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
         })

         if (response.ok) {
            const data = await response.json();
            await AsyncStorage.setItem("token", data.acces_token);
            setUser(data);
         } else {
            console.log("not work");
         }
      } catch (error) {
         console.log(error);
      }
   }

    const logout = async () => {
        setLoading(true);
        try {
            await AsyncStorage.removeItem("token")
            setUser(null);
            setToken(null);
        } catch (error) {
            console.log("Erreur lors de la déconnexion :", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <UserContext.Provider value={{
            loading,
            user,
            mounted,
            login,
            logout
        }}>
            {children}
        </UserContext.Provider>
    )
}