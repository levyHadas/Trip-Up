import React from 'react';
import PlacesAutocomplete, { geocodeByAddress } from 'react-places-autocomplete';
 
class LocationSearchInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = { address: '' }
  }
 
  handleChange = address => {
    this.setState({ address })
  };
 
  handleSelect = address => {
    geocodeByAddress(address)
      .then(results => {
        this.setState({address:results[0].formatted_address})
        this.props.onAddToItinerary(results[0])
        setTimeout(() => {this.setState({ address: '' })},200)
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
                placeholder: 'Search Places ...',
                className: 'location-search-input',
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              
              {suggestions.map(suggestion => {
                return (
                  <div className="suggestions-container"
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
  










