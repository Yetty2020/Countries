import { useState} from 'react'
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useTheme } from '../Theme/ThemeContext'


export default function Search({onSearch}) {
  const {darkMode } = useTheme()

    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (e) =>{
        const query = e.target.value;
        setSearchQuery(query);
        onSearch(query);
    }
   

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

  return (
    <div className={`flex items-center px-6 py-3 gap-10 ${darkMode ?   'bg-white' :'bg-DarkBlue-500'}`}>
    <FaMagnifyingGlass className={`${darkMode ? 'text-DarkBlue-900' : 'text-white'}`} />
        <input type='text' placeholder='Search for a country...' value={searchQuery}  onChange={handleSearch} className={ `w-full md:w-3/4 ${darkMode ?   'bg-white text-DarkBlue-900' :'bg-DarkBlue-500 text-white'}`}/> 
    </div>
  )
}
