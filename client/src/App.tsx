import "./App.css";
import { Home } from "./Home";
import ProductDisplay from "./ProductDisplay";
import Header from "./Header";
import Cart from "./Cart";
import { LogIn } from "./LogIn";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ProductDescription from "./ProductDescription";
import { useState } from "react";

function App() {
  const [userName, setUserName] = useState("anonymous");
  const [userId, setId] = useState(0);
  const [isLoggedIn, setLogin] = useState(false);

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Switch>
          <Route
            path="/products/all"
            component={() => <ProductDisplay category="all" />} //we could have used useParams instead of passing the category
          />
          <Route
            path="/products/adults"
            component={() => <ProductDisplay category="adult" />}
          />
          <Route
            path="/products/adultsaccessories"
            component={() => <ProductDisplay category="adultaccessories" />}
          />
          <Route
            path="/products/adultsclothes"
            component={() => <ProductDisplay category="adultclothes" />}
          />
          <Route
            path="/products/children"
            component={() => <ProductDisplay category="children" />}
          />
          <Route
            path="/products/childrenaccessories"
            component={() => <ProductDisplay category="childrenaccessories" />}
          />
          <Route
            path="/products/childrenclothes"
            component={() => <ProductDisplay category="childrenclothes" />}
          />
          <Route
            path="/product/:id"
            component={() => (
              <ProductDescription
                userId={userId}
                isLoggedIn={isLoggedIn}
                setLogin={setLogin}
                setId={setId}
              />
            )}
          />
          <Route
            path="/login"
            component={() => (
              <LogIn
                setUserName={setUserName}
                setId={setId}
                setLogin={setLogin}
              />
            )}
          />
          <Route
            path="/cart"
            component={() => (
              <Cart name={userName} id={userId} isLoggedIn={isLoggedIn} />
            )}
          />
          <Route path="/" component={() => <Home name={userName} />} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
