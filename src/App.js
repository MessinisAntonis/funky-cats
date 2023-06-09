import { useState, useEffect } from 'react';
import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component';
import './App.css';

const App = () => {
  const [searchField, setSearchField] = useState('');
  const [cats, setCats] = useState([]);
  const [filteredCats, setFilterCats] = useState(cats);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((users) => setCats(users));
  }, []);

  useEffect(() => {
    const newFilteredCats = cats.filter((cat) => {
      return cat.name.toLocaleLowerCase().includes(searchField);
    });

    setFilterCats(newFilteredCats);
  }, [cats, searchField]);

  const onSearchChange = (event) => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setSearchField(searchFieldString);
  };

  return (
    <div className='App'>
      <h1 className='app-title'>Funky Cats</h1>

      <SearchBox
        className='cats-search-box'
        onChangeHandler={onSearchChange}
        placeholder='search cats'
      />
      <CardList cats={filteredCats} />
    </div>
  );
};

export default App;