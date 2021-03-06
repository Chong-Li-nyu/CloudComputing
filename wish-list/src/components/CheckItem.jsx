import React from 'react';

export default class CheckItem extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      checked: false,
    };
  }

  handleClick(e) {
    if (!this.state.checked) {
      this.props.addChosenIdToList(this.props.id);
      console.log('checked: ', this.props.id);
    } else {
      this.props.deleteChosenIdFromList(this.props.id);
      console.log('unchecked: ', this.props.id);
    }
    this.setState({
      checked: !this.state.checked
    });
  }

  render (){
    let text = this.props.name;
    let price = this.props.price;
    let item = (
      <label><input type="checkbox" onClick={this.handleClick.bind(this)} />&nbsp;{text}, ${price}</label>
    );
    return (
        <div className="checkItemBox">
          {item}
        </div>
    );
  }
}