'use client'
import { useEffect } from "react"
import { SessionProvider } from "next-auth/react"
import 'dotenv/config';
const SessionWrapper = ({children}) => {
  const getIP = async () => {
    try {
      
      // const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/visitor`);
      const response = await fetch(`/api/visitor`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      // console.log(data.ip);
      return data;  // Return the data object, which may contain the IP or other details
  
    } catch (error) {
      console.error("Error fetching IP:", error);
      return null;  // Optionally return null or handle the error accordingly
    }
  };
useEffect(() => {
      getIP();
}, [])
  return (
    
    <SessionProvider>
    {children}
    </SessionProvider>
  )
}

export default SessionWrapper
