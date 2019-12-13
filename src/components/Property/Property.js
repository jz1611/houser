import React from 'react';

import './Property.css';

class Property extends React.Component {
  render() {
    return (
      <div className="property-card">
        <img className="property-img" src={this.props.property.img_url} alt="property" />
        <div>
          <h1>{this.props.property.name}</h1>
          <p>{this.props.property.description}</p>
        </div>
        <div>
    <h1>Loan:&nbsp;${this.props.property.loan}</h1>
    <h1>Monthly Morgage:&nbsp;${this.props.property.mortgage}</h1>
    <h1>Rent:&nbsp;${this.props.property.rent}</h1>
    <h1>Address:&nbsp;{this.props.property.address}</h1>
    <h1>City:&nbsp;{this.props.property.city}</h1>
    <h1>State:&nbsp;{this.props.property.state}</h1>
    <h1>Zip:&nbsp;{this.props.property.zip}</h1>
        </div>
      </div>
    );
  }
}

export default Property;