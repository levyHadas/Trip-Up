import React, { Component } from 'react'
import BudgetRange from '../budgetRange/BudgetRange'
import TripTypes from '../tripTypes/TripTypes'


class FilterBy extends Component {
    
    state = {budget:null, country:'', type:''}

    setFilter = (ev) => {
        // var value
        // if (typeof(ev.target.value) === 'number') {
        //     value = +ev.target.value
        // }
        // else value = ev.target.value
        const value = ev.target.value
        this.setState({ [ev.target.name]: value })
        this.props.filterTrips({...this.state, [ev.target.name]: value })
    } 
    setBudget = (budget) => {
        this.setState({budget})
        this.props.filterTrips({...this.state, budget})
    }
    setType = (ev) => {
        const type = ev.target.value
        this.setState({type})
        this.props.filterTrips({...this.state, type})
    }
 
    render() {
        return (
            <section className="filterBy">
                <input type="text" 
                    name="country" 
                    value={this.state.country}
                    placeholder="country"
                    onChange={this.setFilter}/>
                <TripTypes className="filter type" 
                    currType={this.state.type}
                    onTypeSelected={this.setType}/>
                <BudgetRange onSetBudget={this.setBudget} 
                    budget={this.state.budget || {min:0, max:5000}}/>
            </section>
        )
    }
        
   
}

export default FilterBy