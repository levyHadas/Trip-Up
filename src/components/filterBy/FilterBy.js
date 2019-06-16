import React, { Component } from 'react'
import BudgetRange from '../budgetRange/BudgetRange'
import TripTypes from '../tripTypes/TripTypes'
import CountryDatalist from '../countryDatalist/CountryDatalist'
import './filterBy.scss'


class FilterBy extends Component {
    
    state = {budget:null, country:'', type:'', status:'', startDate:'', endDate:''}

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
        var type = ev.target.value
        this.setState({type})
        if (type.toLowerCase() === 'type') type = ''
        this.props.filterTrips({...this.state, type})
    }
 
    render() {
        return (
            <section className="filter-container">
                <h4>Filter:</h4>
                <div className="main-filters-container flex align-center space-between">
                    <input list="country-filter" type="list" 
                        name="country" 
                        value={this.state.country}
                        placeholder="country"
                        onChange={this.setFilter}/>
                    <CountryDatalist id="country-filter"></CountryDatalist>
                    <div className="dates-container">
                                        
                    <span>Between </span>
                    <input type="date" name="startDate" 
                        onChange={this.setFilter} 
                        value={this.state.startDate}/> 
                    <span> and </span>
                    <input type="date" name="endDate" 
                        onChange={this.setFilter}
                        value={this.state.endDate}/>
                    </div>
                </div>
                <div className="more-filters-container flex align-center space-between">       
                    <TripTypes className="filter-type" 
                        currType={this.state.type}
                        onTypeSelected={this.setType}/>
                    <BudgetRange onSetBudget={this.setBudget} 
                        budget={this.state.budget || {min:0, max:5000}}/>
                    <span className="trip-status flex align-center space-between">
                        <label htmlFor="status-open">Open</label>
                            <input type="radio" name="status" id="status-open"
                                value="open" onChange={this.setFilter}/>
                        <label htmlFor="status-closed">Close</label>
                            <input type="radio" name="status" id="status-closed"
                                value="close" onChange={this.setFilter}/>
                        <label htmlFor="status-all">All</label>
                            <input type="radio" name="status" id="status-all"
                                value="" onChange={this.setFilter}/>
                    </span>
                </div>

            
            </section>
        )
    }
        
   
}

export default FilterBy