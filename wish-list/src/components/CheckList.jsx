import React from 'react';
import {Jumbotron, Button, Grid, Row, Col} from 'react-bootstrap';
import CheckItem from './CheckItem.jsx';

export default class CheckList extends React.Component{
  constructor(props){
    super(props);
    this.submitInput = this.submitInput.bind(this);
    this.chosenIds = [];
  }

  submitInput(event){
    this.childrenClone.forEach((el) => {
      var r = el.ref; //use the ref to access the child's methods
      this.refs[r].validate(this.chosenIds);
    });
    console.log(this.chosenIds);
    this.chosenIds = [];
    event.preventDefault();
  }

  render() {
    this.childrenClone = React.Children.map(this.props.children,
     (child) => React.cloneElement(child, {
       ref: Math.random().toString(36).slice(-5) //add a random string as a ref
     })
    );
    return (
    <Jumbotron>
      <Grid>
      <form onSubmit={this.submitInput}>
       {this.childrenClone}
          <div className="buttonBox">
            <Button type="submit" bsStyle='success'>Submit</Button>
          </div>
      </form>
      </Grid>
    </Jumbotron>
    );
  }
}

export default CheckList;