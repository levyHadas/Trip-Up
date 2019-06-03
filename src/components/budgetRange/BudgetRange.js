import React, { Component } from 'react'
import InputRange from 'react-input-range'
import './BudgetRange.scss'
 
class BudgetRange extends Component {
    state = { min: 0,max: 1000}
    componentDidMount() {
        this.setState({min:this.props.budget.min, max:this.props.budget.max})
    }
    render() {
        return (
            <div className="range-slider">
                <InputRange className="range-slider"
                draggableTrack
                minValue= {0}
                maxValue={10000}
                onChange={value => this.setState({...value})}
                onChangeComplete={this.props.onSetBudget}
                step={100}
                value={this.state}/>
            </div>)
        }
}

export default BudgetRange
 
