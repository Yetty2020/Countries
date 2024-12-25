import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'

import {FaArrowLeftLong} from 'react-icons/fa6'
import { useTheme } from '../Theme/ThemeContext'

export default function CountryDetail() {
  const {darkMode } = useTheme()
  const { name } = useParams()
  const navigate = useNavigate()
  const [country, setCountry] = useState(null)
  const [borders, setBorders] = useState([])

  useEffect(() => {
    const fetchCountryData = async () => {
      try {
        const res = await axios.get(`https://restcountries.com/v3.1/name/${name}`)
        setCountry(res.data[0])
        
        // Fetch border countries if they exist
        if (res.data[0].borders) {
          const borderPromises = res.data[0].borders.map(border => 
            axios.get(`https://restcountries.com/v3.1/alpha/${border}`)
          )
          const borderResponses = await Promise.all(borderPromises)
          const borderCountries = borderResponses.map(res => res.data[0].name.common)
          setBorders(borderCountries)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchCountryData()
  }, [name])

  if (!country) return <div className={`${darkMode ? 'bg-LightGray-100 text-DarkBlue-900' :'bg-DarkBlue-700 text-white'} font-bold text-lgmd:text-3xl p-8 h-screen`}>Loading...</div>

  const handleBackClick = () => {
    const savedPosition = sessionStorage.getItem('scrollPosition');
    navigate(-1);
    if (savedPosition) {
      window.scrollTo(0, parseInt(savedPosition));
    }
  };
  

  return (
    <div className={`min-h-full h-full flex flex-col gap-4 px-6 md:px-10 md:h-screen pb-6 md:h-full ${darkMode ? 'bg-LightGray-100 text-DarkBlue-900' :'bg-DarkBlue-700 text-white'}`}>
    <div className={`flex items-center gap-4 border-solid border-1 px-4 py-2 shadow-lg cursor-pointer hover:shadow-lg w-2/6 md:w-36 md:py-3 md:px-3  mt-10 mb-10  hover:animate-zoomOut transition-all${darkMode ?   'bg-LightGray-100 ' :'bg-DarkBlue-500 '}`}  onClick={handleBackClick}>
    <FaArrowLeftLong className='md:text-xl md:font-bold'/>
      <h3 className='md:text-lg md:font-bold' >Back</h3>
    </div>

    <div className={`flex flex-col gap-6 md:items-start lg:flex lg:flex-row lg:justify-around lg:items-center`}>
        <img 
          src={country.flags.png} 
          alt={country.name.common} 
          className="w-[350px] h-[150px] rounded-lg md:w-[400px] md-h-[300px] lg:w-[450px] lg:h-[300px] "
        />


          
        
        <div className="flex flex-col gap-6 lg:flex-row  mb:justify-between ">
        <div className='flex flex-col gap-2 md:gap-5 lg:gap-4 '>
        <h1 className="text-3xl font-bold">{country.name.common}</h1>
        
        <p><span className="font-bold">Native Name:</span> {country.name.official}</p>
              <p><span className="font-bold">Population:</span> {country.population}</p>
              <p><span className="font-bold">Region:</span> {country.region}</p>
              
              {/* <p>Sub-region{country.}</p> */}
              <p><span className="font-bold">Capital:</span> {country.capital}</p>
              <p><span className="font-bold">Languages:</span> {Object.values(country.languages).join(', ')}</p>

              <div className="mt-6 hidden lg:flex lg:flex-col lg:mt-10   ">
        <h2 className="font-bold mb-4    ">Border Countries:</h2>
        <div className="flex gap-4 flex-wrap">
          {borders.length > 0 ? (
            borders.map(border => (
              <div 
                key={border}
                onClick={() => navigate(`/country/${border}`)}
                className="px-4 py-2 shadow-md cursor-pointer hover:shadow-lg"
              >
                {border}
              </div>
            ))
          ) : (
            <p>No border countries</p>
          )}
        </div>
        
      </div>
        </div>
        
          
     <div className='flex flex-col gap-2'>
     <p><span className="font-bold">Top Level Domain:</span> {country.tld}</p>
          <p><span className="font-bold">Currencies:</span> {Object.values(country.currencies).map(curr => curr.name).join(', ')}</p>

     </div>
          

        
      </div>
      </div>
        <div className="mt-4 lg:hidden ">
        <h2 className="font-bold mb-6">Border Countries:</h2>
        <div className="flex gap-4 flex-wrap">
          {borders.length > 0 ? (
            borders.map(border => (
              <div 
                key={border}
                onClick={() => navigate(`/country/${border}`)}
                className="px-4 py-2 shadow-md cursor-pointer hover:shadow-lg"
              >
                {border}
              </div>
            ))
          ) : (
            <p>No border countries</p>
          )}
        </div>
        
      </div>

      </div>
    
      
    
  )
}