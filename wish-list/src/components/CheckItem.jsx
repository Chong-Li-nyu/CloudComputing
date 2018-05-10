import React from 'react';
import {Grid, Row, Col} from 'react-bootstrap';

export default class CheckItem extends React.Component {
  constructor (props){
    super(props);
    this.state = {
      checked: false,
    };
    this.handleClick = this.handleClick.bind(this);    
  }

  validate(addChosenIdToList){
    if(this.state.checked){
      addChosenIdToList(this.props.id);
    }
  }

  handleClick (e){
    this.setState({
      checked: !this.state.checked
    });
  }

  render (){
    // let text = this.state.checked ? <strike>{this.props.message}</strike> : this.props.message;
    let text = this.props.info;
    let item = (
      <label><input type="checkbox" onClick={this.handleClick} />&nbsp;{text}</label>
    );
    return (
        <div className="checkItemBox">
          {item}
        </div>
    );
  }
}