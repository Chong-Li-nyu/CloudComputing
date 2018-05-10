import React from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import ItemListContainer from './ItemListContainer';
import CheckList from './CheckList';

const Home = () => (
  <div className={"home"}>
    <button>{<Link to='/items'>Create a Wishlist!</Link>}</button>
  </div>
);

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/products' component={CheckListContainer}/>
      {/*<Route path='/wishlists/:id' component={WishList}/>*/}
    </Switch>
  </main>
);

export default Main