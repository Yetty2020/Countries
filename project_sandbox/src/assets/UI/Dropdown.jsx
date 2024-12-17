import { useState } from 'react';
import { IoIosArrowDown } from "react-icons/io";
import { useTheme } from '../Theme/ThemeContext'

export default function Dropdown({onRegionFilter}) {
  const {darkMode } = useTheme()
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState('Filter by Region');

  const regions = ['Africa', 'America', 'Asia', 'Europe', 'Oceania'];

  const handleRegionSelect = (region) => {
    setSelected(region);
    setIsOpen(false);
    onRegionFilter(region);
  };

  return (
    <div className={`w-3/4 p-3 flex flex-col gap-3 md:w-1/4 ${darkMode  ?   'bg-white text-DarkBlue-900' :'bg-DarkBlue-500 text-white'}`}>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className='flex items-center cursor-pointer justify-between '
      >
        <span>{selected}</span>
        <span className='lg-text'><IoIosArrowDown /></span>
      </div>
      
      {isOpen && (
        <div className={`cursor-pointer flex flex-col absolute   gap-2 z-9999  w-3/4 md:w-1/4 ${darkMode  ?   'bg-white text-DarkBlue-900' :'bg-DarkBlue-500 text-white'}`}>
          {regions.map((region) => (
            <div 
              key={region}
              onClick={() => handleRegionSelect(region)}
            >
              {region}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}