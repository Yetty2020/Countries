import {Routes, Route} from 'react-router-dom'
import { ThemeProvider } from './assets/Theme/ThemeContext'
import Navbar from "./assets/UI/Navbar"
import Home from "./assets/UI/Home"
import CountryDetail from "./assets/UI/CountryDetail"


export default function App() {
  return (
    <>
    <ThemeProvider>
    <Navbar/>
    
    
    
    <Routes>
    <Route path="/" element={<Home/>}/>
      <Route path="/country/:name" element={<CountryDetail/>}/>
    </Routes>
    </ThemeProvider>
    </>

    
    

    
  )
}
