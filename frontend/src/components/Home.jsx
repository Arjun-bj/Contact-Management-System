// import React from 'react'
import MainContentArea from "./MainContentArea"
import SideBar from "./SideBar"
import {useSelector} from 'react-redux'

const Home = () => {
  const contacts = useSelector(state => state.contacts)
  console.log(contacts);
  return (
    <div className='mainContainer'>
        <SideBar/>
        <MainContentArea/>
    </div>
  )
}

export default Home