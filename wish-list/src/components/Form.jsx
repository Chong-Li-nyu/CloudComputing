import React from 'react';

class Form extends React.Component{
  submitInput(event){
    this.childrenClone.forEach((el) => {
      var r = el.ref //use the ref to access the child's methods
      this.refs[r].validate()
    })
    event.preventDefault();
  }
  
  render() {
    this.childrenClone = React.Children.map(this.props.children,
     (child) => React.cloneElement(child, {
       ref: Math.random().toString(36).slice(-5) //add a random string as a ref
     })
    )
    
    return <div>
      <form className="form-horizontal"  onSubmit={this.submitInput.bind(this)}>
       {this.childrenClone}
       <button type="submit">Submit</button>
       </form>
    </div>
  }
}

export default Form;