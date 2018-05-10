import React from 'react';
import {Button, Grid, Row, Col} from 'react-bootstrap';

class Form extends React.Component{
  constructor(props){
    super(props)
    this.submitInput = this.submitInput.bind(this);
  }
  submitInput(event){
    this.childrenClone.forEach((el) => {
      var r = el.ref //use the ref to access the child's methods
      this.refs[r].validate(this.props.deleteItem);
    })
    event.preventDefault();
  }
  
  render() {
    this.childrenClone = React.Children.map(this.props.children,
     (child) => React.cloneElement(child, {
       ref: Math.random().toString(36).slice(-5) //add a random string as a ref
     })
    )
    
    return (
    <div>
      <form className="form-horizontal"  onSubmit={this.submitInput}>

       {this.childrenClone}

          <div className="buttonBox">
          <Button type="submit" bsStyle='success'>Buy</Button>
          </div>


       </form>
    </div>
    );
  }
}

export default Form;