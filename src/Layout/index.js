import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";

import { Switch, Route } from "react-router-dom";
import Home from "../Components/Home";
import CreateDeck from "../Components/CreateDeck";
import Deck from "../Components/Deck"
import AddCard from "../Components/AddCard";
import EditDeck from "../Components/EditDeck";
import EditCard from "../Components/EditCard";
import Study from "../Components/Study";

function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}

      <Switch>

      <Route exact path="/">
        <Home />
      </Route>
        

      <Route path="/decks/new">
        <CreateDeck />
      </Route>


      <Route exact path="/decks/:deckId">
        <Deck />
      </Route>
      
      <Route path="/decks/:deckId/cards/new">
        <AddCard />
      </Route>

      <Route path="/decks/:deckId/edit">
        <EditDeck />
      </Route>

      <Route path="/decks/:deckId/cards/:cardId/edit">
        <EditCard />
      </Route>

      <Route exact path="/decks/:deckId/study">
        <Study />
      </Route>     
      
      <NotFound />

      </Switch>

        
      </div>
    </>
  );
}

export default Layout;
