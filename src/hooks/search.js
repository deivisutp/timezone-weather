import React, { createContext, useContext, useState, useCallback } from 'react';
import api from '../services/api';
import feedCountries from '../assets/feeds/feeds.json';

const SearchContext = createContext();

const SearchProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(true);

    const searchAction = useCallback(async (term) => {
        try {
            if (term) {
                setLoading(true);
              
                const res = feedCountries.filter( country => {
                    return country.photo.country_name.indexOf(term) > -1
                });
                
                if (res.length > 0) {
                    setCountries(res);
                }
           /*     const res = await api.get('/users/search/any', {
                    params: {
                        term,
                    }
                });

                if (res.status === 200) setUsers(res.data); */
            }
        } catch (error) {
            throw Error(error);
        } finally {
            setLoading(false);
        }
    }, []);

    return (
        <SearchContext.Provider value={{ users, countries, loading, searchAction, setUsers, setCountries, setLoading }}>
            {children}
        </SearchContext.Provider>
    )
}

function useSearch() {
    const context = useContext(SearchContext);

    if (!context) throw new Error('useSearch must be used within an SearchProvider');

    return context;
}

export { SearchProvider, useSearch };