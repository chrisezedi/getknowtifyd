'use client';

import Splash from "@/components/splash/splash"
import { useEffect, useState } from "react"

export default function Home() {
  const [showSplash,setShowSplash] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowSplash(false)
    }, 500);

  },[])

  return (
    <>
      { showSplash ? <Splash/> : <p>Homepage</p> }
    </>
  )
}
