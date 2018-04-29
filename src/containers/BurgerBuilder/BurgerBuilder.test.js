import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { BurgerBuilder } from './BurgerBuilder';
import BuidControls from '../../components/Burger/BuildControls/BuildControls';

configure({adapter: new Adapter()});

describe('<BurgerBuilder>', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<BurgerBuilder onInitIngredient={() => {} }/>);
    });
    
    it('should render <BuildControls /> when receiving ingredient', ()=>{
        wrapper.setProps({ings: {salad: 0}});
        expect(wrapper.find(BuidControls)).toHaveLength(1);
    })
})