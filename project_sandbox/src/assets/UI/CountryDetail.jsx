import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'

import {FaArrowLeftLong} from 'react-icons/fa6'

export default function CountryDetail() {
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

  if (!country) return <div>Loading...</div>

  const handleBackClick = () => {
    const savedPosition = sessionStorage.getItem('scrollPosition');
    navigate(-1);
    if (savedPosition) {
      window.scrollTo(0, parseInt(savedPosition));
    }
  };
  

  return (
    <div className="p-8">
    <div className="flex items-center gap-1 cursor-pointer" onClick={handleBackClick}>
    <FaArrowLeftLong />
      <h3 >Back</h3>
    </div>

    <div className={`md:flex`}>
        <img 
          src={country.flags.png} 
          alt={country.name.common} 
          className="w-[350px] h-[150px] rounded-lg"
        />
        
        <div className="mb:flex  mb:gap-4">
        <div>
        <h1 className="text-3xl font-bold">{country.name.common}</h1>
        
        <p><span className="font-bold">Native Name:</span> {country.name.official}</p>
              <p><span className="font-bold">Population:</span> {country.population}</p>
              <p><span className="font-bold">Region:</span> {country.region}</p>
              {/* <p>Sub-region{country.}</p> */}
              <p><span className="font-bold">Capital:</span> {country.capital}</p>
              <p><span className="font-bold">Languages:</span> {Object.values(country.languages).join(', ')}</p>
        </div>
        
          
     <div>
     <p><span className="font-bold">Top Level Domain:</span> {country.tld}</p>
          <p><span className="font-bold">Currencies:</span> {Object.values(country.currencies).map(curr => curr.name).join(', ')}</p>

     </div>
          
        {/* <p><span className="font-bold">Border Countries:</span> {country.borders.join(', ')}</p> */}
        </div>
      </div>
    
      <div className="mt-8">
        <h2 className="font-bold mb-4">Border Countries:</h2>
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