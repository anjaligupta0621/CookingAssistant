import React from 'react';
import './SearchBar.css';

function SearchBar(props) {

    const [searchInput, setSearchInput] = React.useState('');
    const [searchData, setSearchData] = React.useState([]);

    const searchChangeHandler = (event) => {
        event.preventDefault();
        setSearchInput(event.target.value);
    }

    if (searchInput.length > 0) {
        searchData.filter((item) => {
        return item.title.match(searchInput);
    });
    }


    return (
        <div className='search-bar'>
            <input
                type="search"
                placeholder="Search here"
                onChange={searchChangeHandler}
                value={searchInput} />
        </div>
    );
}

export default SearchBar;