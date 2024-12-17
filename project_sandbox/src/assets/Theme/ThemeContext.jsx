
import {createContext, useState, useContext} from 'react'
import PropTypes from 'prop-types';

const ThemeContext = createContext();

export function ThemeProvider({children}) {
    const [darkMode, setDarkMode] = useState(false);

    const toggleTheme = () => {
        setDarkMode(!darkMode);
    };

    return (
        <ThemeContext.Provider value={{darkMode, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
  return useContext(ThemeContext);
}



// ... existing context code ...

ThemeProvider.propTypes = {
    children: PropTypes.node.isRequired
};
