import React from 'react';
export default class Item extends React.Component {
  constructor (props){
    super(props);
    this.state = {
      checked: false,
      contributeAmount: '',
      remAmount: props.price
    };
    this.inputRef = React.createRef();

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);    
  }
  validate(){
    let contribAmount = this.state.contributeAmount=='' ? 0 : parseInt(this.state.contributeAmount)
    if(this.state.contributeAmount > this.state.remAmount){
      contribAmount = this.state.remAmount;
    }
    this.setState({
      contributeAmount: '',
      remAmount: this.state.remAmount - contribAmount
    });
    console.log(this.props.info + ": update remain amount as "+ (this.state.remAmount - contribAmount));
  }

  handleClick (e){
    this.setState({
      checked: !this.state.checked
    });
  }
  handleChange(event) {
    this.setState({
      contributeAmount: parseInt(event.target.value),
    });
  }
  render (){
    // let text = this.state.checked ? <strike>{this.props.message}</strike> : this.props.message;
    let text = this.props.info
    return (
        <div className="row">
          <div className="col-md-12">
            {/* <input type="checkbox" onClick={this.handleClick} />  */}
            {/* <div className="col-md-3">{text}</div>
            <div className="col-md-3">{this.state.remAmount}</div>
            <div className="col-md-3">
              <input type="text" ref={this.inputRef} name={this.props.info} value={this.state.contributeAmount} onChange={this.handleChange}/>
            </div> */}
            &nbsp;{text}&nbsp;{this.state.remAmount}
            &nbsp;<input type="text" ref={this.inputRef} name={this.props.info} value={this.state.contributeAmount} onChange={this.handleChange}/>
          </div>
        </div>
    );
  }
}