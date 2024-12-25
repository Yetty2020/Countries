import { useNavigate } from "react-router-dom";
import { IoIosMoon } from "react-icons/io";
import { CiLight } from "react-icons/ci";

import { useTheme } from "../Theme/ThemeContext";


export default function Navbar() {

  // to toggle light and dark mode
  const {darkMode, toggleTheme} = useTheme();

  const navigate = useNavigate();

  const handleHomeClick = () => {
    const savedPosition = sessionStorage.getItem('scrollPosition');
    navigate('/');
    if (savedPosition) {
      window.scrollTo(0, parseInt(savedPosition));
    }
  };

  return (
    <div className={`flex justify-between px-6 py-4 bg-DarkBlue-500 text-white pb-5 ${darkMode ?   'bg-LightGray-100 ' :'bg-DarkBlue-500 '}`}>
      <h3 onClick={handleHomeClick} className={`cursor-pointer hover:animate-zoomOut transition-all font-bold ${darkMode ? 'text-DarkBlue-900' : 'text-white'}`}>Where in the World?</h3>
      <div className="flex items-center cursor-pointer hover:animate-zoomOut transition-all" onClick={toggleTheme}>{darkMode ? <span className={`text-DarkBlue-700 text-2xl`}><IoIosMoon/></span>  : <span className="text-2xl"><CiLight /></span>} 
        
      </div>
    </div>
  )
}

