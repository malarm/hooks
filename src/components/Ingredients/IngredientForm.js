import React, { useState } from 'react';

import Card from '../UI/Card';
import './IngredientForm.css';
import LoadingIndicator from '../UI/LoadingIndicator';

const IngredientForm = React.memo(props => {
  const [inputtitle, setInputTitle] = useState('');
  const [inputamount, setInputAmount] = useState('');

  const submitHandler = event => {

    event.preventDefault();
    if (!inputtitle) return;
    props.onAddIngredients({ title: inputtitle, amount: inputamount });
    setInputTitle('');
    setInputAmount('');

  };

  return (
    <section className="ingredient-form">
      <Card>
        <form onSubmit={submitHandler}>
          <div className="form-control">
            <label htmlFor="title">Name</label>
            <input type="text" id="title" value={inputtitle} onChange={e => setInputTitle(e.target.value)} />
          </div>
          <div className="form-control">
            <label htmlFor="amount">Amount</label>
            <input type="number" id="amount" value={inputamount} onChange={e => setInputAmount(e.target.value)} />
          </div>
          <div className="ingredient-form__actions">
            <button type="submit">Add Ingredient</button>
            {props.loading && <LoadingIndicator />}
          </div>
        </form>
      </Card>
    </section>
  );
});

export default IngredientForm;
