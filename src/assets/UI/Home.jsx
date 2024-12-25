import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

import Dropdown from './Dropdown'
import Search from './Search'
import { useTheme } from '../Theme/ThemeContext'

export default function Home() {
    const {darkMode } = useTheme()
    const navigate = useNavigate()
    const [countries, setCountries] = useState([])
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedRegion, setSelectedRegion] = useState('');
   
    //to keep my page from reloading when i click on the country
    
useEffect(() => {
  const savedPosition = sessionStorage.getItem('scrollPosition');
  if (savedPosition) {
    window.scrollTo(0, parseInt(savedPosition));
    sessionStorage.removeItem('scrollPosition');
  }
}, []);

//to display country by region
const handleRegionFilter = async (region) =>{
    try{
        if (region){
            const response = await fetch(`https://restcountries.com/v3.1/region/${region}`);
            const data = await response.json();
            setCountries(data);
        } else {
            const response = await fetch(`https://restcountries.com/v3.1/all`);
            const data = await response.json();
            setCountries(data);
        } 
    } catch (error){
        console.log(`Error fetching countries: ${error}`);
    }
}



//to display country by search
const handleSearch = async(query) =>{
    setSearchQuery(query);
    try{
        if (!query.trim()) {
            const response = await fetch('https://restcountries.com/v3.1/all');
            const data = await response.json();
            setCountries(data);
            return;
        }

        const response = await fetch(`https://restcountries.com/v3.1/name/${query}`);
        const data = await response.json();

        if (response.status === 404) {
            setCountries([]);
            return;
        }

        setCountries(data);
    } catch(error){
        console.log(`Error fetching countries: ${error}`);
        setCountries([]);
    }
};


// useEffect(()=>{
//     const fetchCountries = async()=>{
//         try{
//             const url = searchQuery ? `https://restcountries.com/v3.1/name/${searchQuery}` : `https://restcountries.com/v3.1/all`;

//             const response = await fetch(url);
//             const data = await response.json();
//             setCountries(data);
//         } catch(error){
//             console.log(`Error fetching data: ${error}`);
//         }
//     }

//     const delayDebounce = setTimeout(() => {
//         fetchCountries();
//     }, 500);

//     return () => clearTimeout(delayDebounce);
// }, [searchQuery])

//to display all the countries
    useEffect(() => {
        const fetchCountries = async() => {
            try {
                const res = await axios.get('https://restcountries.com/v3.1/all')
                setCountries(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchCountries()
    }, []) // Empty dependency array

  return (
    <section className={`${darkMode ?   'bg-LightGray-100' :'bg-DarkBlue-700'}`} >
    <div className='flex flex-col gap-5 px-4 md:flex-row md:justify-between pt-8'>
    <Search onSearch={handleSearch} className={`w-full md:w-3/4 `}/>
    <Dropdown onRegionFilter={handleRegionFilter} className={`w-full`}/>
    </div>

    {/* <div className={`search-container flex justify-between items-center  gap-10 px-5 ${darkMode ?   'bg-LightGray-100' :'bg-DarkBlue-700'}`}>
        <Search onSearch={handleSearch}/>
        <Dropdown onRegionFilter={handleRegionFilter} className={`dropdown ${darkMode ?   'bg-white' :'bg-DarkBlue-500'}`}
        />
    </div> */}


 


<div className={`w-full flex flex-wrap justify-center min-h-screen items-center md:items-start lg:items-start gap-14 py-10  ${darkMode ? 'bg-LightGray-100' :'bg-DarkBlue-700'}`}>
    {countries.length === 0 ? (
        <div className={`text-center text-xl ${darkMode ? 'text-DarkBlue-900' : 'text-white'}`}>
            <p>No countries found for "{searchQuery}"</p>
            <p className="text-sm mt-2">Try searching with a different term</p>
        </div>
    ) : (
        countries.map((country) => (
            <div key={country.name.common} className={`w-3/4 flex flex-col rounded-md shadow-lg cursor-pointer md:w-2/5 lg:w-1/5 hover:animate-zoomOut transition-all ${darkMode ? 'bg-white' :'bg-DarkBlue-500'}`} onClick={() => navigate(`/country/${country.name.common}`)}>
                <img src={country.flags.png} alt={country.name.common} className='rounded-t-md w-[350px] h-[150px]' />
                <div className='flex flex-col items-start justify-between px-5 my-10 gap-2'>
                    <h3 className={`font-bold text-lg text-white mb-3 ${darkMode ? 'text-DarkBlue-900':' text-white'}`}>{country.name.official}</h3>
                    <p className={`text-base font-medium ${darkMode ? 'text-DarkBlue-900':' text-white'}`}>Common Name: <span className={`font-light ${darkMode ? 'text-DarkBlue-700' :'text-LightGray-100'}`}>{country.name.common}</span></p>
                    <p className={`text-base font-medium ${darkMode ? 'text-DarkBlue-900':' text-white'}`}>Population: <span className={`font-light ${darkMode ? 'text-DarkBlue-700' :'text-LightGray-100'}`}>{country.population}</span></p>
                    <p className={`text-base font-medium ${darkMode ? 'text-DarkBlue-900':' text-white'}`}>Region: <span className={`font-light ${darkMode ? 'text-DarkBlue-700' :'text-LightGray-100'}`}>{country.region}</span></p>
                    <p className={`text-base font-medium ${darkMode ? 'text-DarkBlue-900':' text-white'}`}>Capital: <span className={`font-light ${darkMode ? 'text-DarkBlue-700' :'text-LightGray-100'}`}>{country.capital}</span></p>
                </div>
            </div>
        ))
    )}
</div>



    
    
    {/* <div className={`w-full flex flex-wrap justify-center min-h-screen items-center md:items-start lg:items-start gap-14  py-10 ${darkMode ?   'bg-LightGray-100' :'bg-DarkBlue-700'}`}>
    
    {countries.map((countries)=>(
        <div key={countries.name.common} className={` w-3/4  flex flex-col  rounded-md shadow-lg cursor-pointer md:w-2/5  lg:w-1/5 ${darkMode ?   'bg-white' :'bg-DarkBlue-500'} `} onClick={()=> navigate(`/country/${countries.name.common}`)}>
            <img src={countries.flags.png} alt={countries.name.common} className=' rounded-t-md w-[350px] h-[150px]' />

            <div className='flex flex-col items-start justify-between px-5 my-10 gap-2'>
            <h3 className={`font-bold text-lg text-white mb-3 ${darkMode ? 'text-DarkBlue-900':' text-white'}`}>{countries.name.official}</h3>
            <p className={`text-base font-medium ${darkMode ? 'text-DarkBlue-900':' text-white'  }`}>Common Name: <span className={`font-light ${darkMode ?   'text-DarkBlue-700' :'text-LightGray-100 '}`} >{countries.name.common}</span></p>
            <p className={`text-base font-medium ${darkMode ? 'text-DarkBlue-900':' text-white'  }`}>Population: <span className={`font-light ${darkMode ?   'text-DarkBlue-700' :'text-LightGray-100 '}`}>{countries.population}</span> </p>
            <p className={`text-base font-medium ${darkMode ? 'text-DarkBlue-900':' text-white'  }`}>Region: <span className={`font-light ${darkMode ?   'text-DarkBlue-700' :'text-LightGray-100 '}`}>{countries.region}</span></p>
            <p className={`text-base font-medium ${darkMode ? 'text-DarkBlue-900':' text-white'  }`}>Capital: <span className={`font-light ${darkMode ?   'text-DarkBlue-700' :'text-LightGray-100 '}`}>{countries.capital}</span></p>

            </div>
            
        </div>
    )
    )}
       
    </div> */}
    </section>
  )
}
