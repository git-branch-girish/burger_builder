import React from 'react';

import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {

    let transformedIntgredient = Object.keys(props.ingredients).map(igKey => {
        return [...Array(props.ingredients[igKey])].map((_, i) => {
            return <BurgerIngredient key={igKey + i} type={igKey} />
        });
    }).reduce((arr, el) => {
        return arr.concat(el);
    }, []);

    if (transformedIntgredient.length === 0) {
        transformedIntgredient = <p>Please start adding ingredients team</p>
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type='bread-top' />
            {transformedIntgredient}
            <BurgerIngredient type='bread-bottom' />
        </div>
    );
}

export default burger;