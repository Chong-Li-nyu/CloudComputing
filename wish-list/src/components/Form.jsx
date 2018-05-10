import React from 'react';
import {Button, Grid, Row, Col} from 'react-bootstrap';

class Form extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      totalContribAmount: 0
    };
    this.submitInput = this.submitInput.bind(this);
  }
  submitInput(event){
    let newTotalContribAmount = 0;
    this.childrenClone.forEach((el) => {
      var r = el.ref; //use the ref to access the child's methods
      newTotalContribAmount += this.refs[r].validate(this.props.deleteItem);
    });
    this.setState({totalContribAmount: newTotalContribAmount})
    event.preventDefault();
  }
  
  render() {
    this.childrenClone = React.Children.map(this.props.children,
     (child) => React.cloneElement(child, {
       ref: Math.random().toString(36).slice(-5) //add a random string as a ref
     })
    );
    let msg = this.state.totalContribAmount === 0 ? null : <h4>Thanks, you have committed ${this.state.totalContribAmount} for gifts</h4>
    return (
    <div>
      <form className="form-horizontal"  onSubmit={this.submitInput}>

       {this.childrenClone}

          <div className="buttonBox">
          <Button type="submit" bsStyle='success'>Buy</Button>
          </div>
        
      </form>
      <br/>
      <br/>
      {msg}
    </div>
    );
  }
}

export default Form;