import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { SearchResults } from './components/SearchResults/SearchResults';
import { ProductDetails } from './components/ProductDetails/ProductDetails';
import { Hero } from './components/Hero/Hero';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <Router>
      <Header onSearch={handleSearch} />
      <Routes>
        <Route path='/' element={<Hero />} />
        <Route path='/search/:searchQuery' element={<SearchResults />} />
        <Route path='/product/:productId' element={<ProductDetails />} />
      </Routes>
    </Router>
  );
}
