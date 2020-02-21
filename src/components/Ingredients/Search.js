import React, { useState, useEffect } from 'react';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(props => {
  const [enteredFilter, setEnterFilter] = useState('');

  const { onLoaadingIngrients } = props;

  useEffect(() => {
    //  const query = enteredFilter.length === 0 ? '' : `?orderby="title"&equalTo="${enteredFilter}"`;
    const query = enteredFilter.length === 0 ? '' : `?orderBy="title"&equalTo="${enteredFilter}"`;
    fetch('https://react-hooks-608a2.firebaseio.com/ingredients.json' + query)
      .then(response => response.json())
      .then(responseData => {
        const loadedIngredients = [];
        for (const key in responseData) {
          loadedIngredients.push({
            id: key,
            title: responseData[key].title,
            amount: responseData[key].amount
          })
        }
        onLoaadingIngrients(loadedIngredients);
      })
  }, [enteredFilter, onLoaadingIngrients])

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input type="text" value={enteredFilter} onChange={e => setEnterFilter(e.target.value)} />
        </div>
      </Card>
    </section>
  );
});

export default Search;
