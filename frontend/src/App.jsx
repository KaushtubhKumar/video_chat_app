import React from 'react'
import Avatar from './Avatar'
import { Navigate, Route, Routes } from 'react-router'
import Homepage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import NotificationsPage from './pages/NotificationsPage'
import ChatPage from './pages/ChatPage'
import OnboardingPage from './pages/OnboardingPage'
import CallPage from './pages/CallPage'
import  { Toaster } from 'react-hot-toast'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { axiosInstance } from './lib/axios'
import Loader from './components/Loader'
import { getAuthUser } from './lib/api'
import useAuthUser from './hooks/useAuthUser'
import SignUppage from './pages/SignUpPage'
import Layout from './components/Layout'
import { useThemeStore } from './store/useThemeStore'

function App() {

  const {theme}=useThemeStore()

const {isLoading,authUser}=useAuthUser()
// console.log(authUser);
const isAuthenticated=Boolean(authUser?.user);

const isOnboarded= authUser?.user.isOnboarded

if(isLoading) return <Loader/>
  return (
  <>
  <div className='h-screen'data-theme={theme}>
<Routes>
<Route path='/' element={isAuthenticated && isOnboarded ? (
  <Layout showsidebar={true}>
    <Homepage />
  </Layout>
) : (
  <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
)} /> 
<Route path='/signup' element={!isAuthenticated?<SignUppage/>:<Navigate to={
  isOnboarded?"/":"/onboarding"
}/>}/>
<Route path='/login' 
element=
{!isAuthenticated?<LoginPage/>:<Navigate to={
  isOnboarded?"/":"/onboarding"
}/>}/>
<Route path='/notifications' element={isAuthenticated && isOnboarded?(
   <Layout showsidebar={true}>
    <NotificationsPage/>
   </Layout>
):(
<Navigate to ={!isAuthenticated? "/login":"/onboarding"}/>
)
}/>

<Route path='/onboarding' element={isAuthenticated?(
 !isOnboarded?(
    <OnboardingPage/>
 ):(
    <Navigate to="/"/>
 )
):(
<Navigate to="/login"/>
)}

/>

<Route path='/chat/:id' element={isAuthenticated && isOnboarded ?(
  <Layout showsidebar={false}>
    <ChatPage />
  </Layout>
):(
   <Navigate to={!isAuthenticated? "/login":"/onboarding"}/>
)}
/>

<Route path='/call/:id' element={isAuthenticated && isOnboarded ?(
    <CallPage />
):(
   <Navigate to={!isAuthenticated? "/login":"/onboarding"}/>
)}
/>


</Routes>
<Toaster/>

</div>
    </> 

  )
}

export default App