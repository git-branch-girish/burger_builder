import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControl from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorhandler';
import * as actions from '../../store/actions/index';
import axios from '../../axios-order';

export class BurgerBuilder extends Component {
    state = {
        purschasing: false
    }

    componentDidMount () {
        //console.log(this.props);
        this.props.onInitIngredient();
    }

    purchaseHandler = () => {
        if(this.props.isAuthenticated){
            this.setState({ purschasing: true });
        } else {
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/auth');
        }
    }

    purchaseCancelledHandler = () => {
        this.setState({ purschasing: false });
    }

    purchaseContinueHandler = () => { 
       this.props.onInitPurchase();
       this.props.history.push('/checkout');
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el; 
            },0);
        return sum > 0 ;
    }

    render() {
        const disabledInfo = {
            ...this.props.ings
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let burger =this.props.error ? <p>Ingredient can't be loaded</p> : <Spinner />;
        let orderSummary = null;
        if(this.props.ings){
            burger =  (<Aux>
                <Burger ingredients = {this.props.ings} />
                <BuildControl 
                    ingredientAdded = {this.props.onIngredientAdded}
                    ingredientRemoved = {this.props.onIngredientRemoved}
                    disabled = {disabledInfo}
                    purchaseable = {this.updatePurchaseState(this.props.ings)}
                    ordered = {this.purchaseHandler}
                    isAuth={this.props.isAuthenticated}
                    price = {this.props.price}
                />
            </Aux>
            );
            orderSummary = <OrderSummary 
                            price = {this.props.price}
                            purchaseCancelled = {this.purchaseCancelledHandler}
                            purchaseContinue = {this.purchaseContinueHandler}
                            ingredients = {this.props.ings} />;

        }
     
        return(
            <Aux>
                <Modal show = {this.state.purschasing} 
                       modalClosed={this.purchaseCancelledHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )
    }
}


const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    };
}

const mapDispatchToProps = dispatch =>{
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredient: ()=>dispatch(actions.initIngredient()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    };
}




export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
