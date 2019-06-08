import React from 'react';
import PlacesAutocomplete, { geocodeByAddress } from 'react-places-autocomplete';
 
class LocationSearchInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = { address: '' }
  }
  componentDidMount() {
    this.setState({address:this.props.value})
  }
 
  handleChange = address => {
    this.setState({ address })
  };
 
  handleSelect = address => {
    geocodeByAddress(address)
      .then(results => {
        this.setState({address:results[0].formatted_address})
        this.props.onPlaceSelected(results[0])
        if (this.props.className.includes('on-map')) {
          setTimeout(() => {this.setState({ address: '' })},200)
        }
      })
      .catch(error => console.error('Error', error))
  };
 
  render() {


    return (
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}>
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: this.props.placeholder,
                className: this.props.className,
              })}
            />
            <div className={'autocomplete-dropdown-container '+this.props.className}>
              {loading && <div className='autocomplete-loading'>Loading...</div>}
              
              {suggestions.map(suggestion => {
                return (
                  <div className={'suggestions-container '+this.props.className}
                    {...getSuggestionItemProps(suggestion)}>
                    <span>{suggestion.description}</span>
                  </div>)
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    )
  }
}
export default LocationSearchInput
  










