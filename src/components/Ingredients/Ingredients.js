import React, { useState, useEffect, useCallback } from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList';
import axios from 'axios';
import ErrorMordal from '../UI/ErrorModal';

function Ingredients() {
  const [userIngredients, setUserIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, seterror] = useState();

  /*useEffect(() => {
    fetch('https://react-hooks-608a2.firebaseio.com/ingredients.json')
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
        setUserIngredients(loadedIngredients);
      })
  }, [])*/

  const addIngredients = (text) => {
    setIsLoading(true);
    fetch('https://react-hooks-608a2.firebaseio.com/ingredients.json', {
      method: 'POST',
      body: JSON.stringify(text),
      headers: { 'Cotent-Type': 'appliction/json' }
    }).then(response => {
      setIsLoading(false);
      return response.json();
    })
      .then(responseData => {
        setUserIngredients(prevIngredients => [
          ...prevIngredients,
          { id: responseData.name, ...text }])
      })


  }
  const removeItem = ingredientId => {
    setIsLoading(true);
    fetch(`https://react-hooks-608a2.firebaseio.com/ingredients/${ingredientId}.json`, {
      method: 'DELETE'

    })
      .then(response => {
        setIsLoading(false);
        setUserIngredients(prevIngredients => prevIngredients.filter(ingredient => ingredient.id !== ingredientId));
      })
      .catch(error => {
        //  seterror(error.message);
        seterror('Something went wrong');
      })
  }

  const filterIngrientsHandler = useCallback(
    filteringrients => {
      setUserIngredients(filteringrients);
    }, []
  )
  const clearError = () => {
    seterror(null);
    setIsLoading(false);
  }
  return (
    <div className="App">
      {error && <ErrorMordal onClose={clearError}>{error}</ErrorMordal>}
      <IngredientForm loading={isLoading} onAddIngredients={addIngredients} />

      <section>
        <Search onLoaadingIngrients={filterIngrientsHandler} />

        < IngredientList ingredients={userIngredients} onRemoveItem={removeItem} />
      </section>
    </div>
  );
}

export default Ingredients;
