import { createContext, useContext, useState } from 'react';

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchHistory, setSearchHistory] = useState([
    'Hamburguesa',
    'Pizza',
    'Ensalada',
  ]);

  const addSearchTerm = (term) => {
    if (!term.trim()) return;
    
    // Remover duplicados y agregar al inicio
    const filteredHistory = searchHistory.filter(
      item => item.toLowerCase() !== term.toLowerCase()
    );
    
    const newHistory = [term, ...filteredHistory].slice(0, 10); // Máximo 10 búsquedas
    setSearchHistory(newHistory);
  };

  const clearSearchHistory = () => {
    setSearchHistory([]);
  };

  const removeSearchTerm = (term) => {
    setSearchHistory(searchHistory.filter(item => item !== term));
  };

  return (
    <SearchContext.Provider value={{
      searchHistory,
      addSearchTerm,
      clearSearchHistory,
      removeSearchTerm,
    }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);