
import React, { createContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import axiosLib from "@/utils/axios";
import { getCookie } from "cookies-next";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [userState, setUserState] = useState(null);
  const [loading, setLoading] = useState(false)  
  const [id, setId] = useState(null)  
  const [crud, setCrud] = useState(null)  
  const [authLoading, setAuthLoading] = useState(true)  
  const router = useRouter()

  const checkAuth = ()=>{
    const token = getCookie('token')
    const user = getCookie('user')

    setAuthLoading(false)
    // if(user && token){
    //   setUserState(JSON.parse(user))
    //   setAuthLoading(false)
    // } else {
    //     router.push('/login')  
    // }
  }
  // const checkAuth = async ()=>{
  //   const response = await axiosLib(getCookie('token')).get('check-auth')
  //   .catch((e) => {
  //     router.push('/login')
  //   });

  //   if(response.data.status == 200){
  //     setUserState(response.data.user)
  //     setAuthLoading(false)
  //   }
  // }
  useEffect(() => {
    checkAuth()
  }, [])

  if(!authLoading){
    return (
      <AuthContext.Provider value={{ userState, loading, setLoading, id, setId, crud, setCrud}}>
        {children}
      </AuthContext.Provider>
    );
  }
};

export default AuthContextProvider
