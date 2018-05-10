import React from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import ItemListContainer from './ItemListContainer';

const Home = () => (
  <div className={"home"}>
    <button>{<Link to='/items'>Create a Wishlist!</Link>}</button>
  </div>
);

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/products' component={ItemListContainer}/>
      {/*<Route path='/wishlists/:id' component={WishList}/>*/}
    </Switch>
  </main>
);

export default Main