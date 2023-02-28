import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./App.css";

type ProductState = {
  id: number;
  name: string;
  price: number;
  img: string;
  description?: string;
};

type User = {
  userId: number;
  isLoggedIn: boolean;
  setLogin: (value: boolean) => void;
  setId: (value: number) => void;
};

export function ProductDescription({
  userId,
  isLoggedIn,
  setLogin,
  setId,
}: User) {
  const [state, setState] = useState<ProductState>({
    id: 0,
    name: "",
    price: 0,
    img: "",
    description: "",
  });

  const { id } = useParams<{ id: string }>(); //getting the id from the url passed when clicking on product
  const productID = parseInt(id); // make the id from the url to an integer

  // check to see if a user exists (signed in) or if the user is anonymous and then add the product
  async function addProduct() {
    isLoggedIn ? addProductToBasket(userId) : createAnonymousUser();
  }

  //function which creates an anonymous user, for users who don't want to register
  async function createAnonymousUser() {
    try {
      await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstName: "anonymous", email: "" }),
      })
        .then((data) => data.json())
        .then((res) => {
          //res = userId
          addProductToBasket(res);
          setLogin(true);
          setId(res);
        });
    } catch (error) {
      console.error(error); //the user won't be notified about the error
    }
  }

  // Function to add a product to the basket
  async function addProductToBasket(userId: number) {
    try {
      const response = await fetch(
        `http://localhost:5000/users/${userId}/cart/products/${productID}`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json;charset=UTF-8",
          },
          body: JSON.stringify({
            userId: userId,
            id: state.id,
            name: state.name,
            price: state.price,
            img: state.img,
          }),
        }
      );
      if (!response.ok) {
        throw new Error(`${response.status} - Unable to add product to basket`);
      }
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  //get's specific product
  async function getProduct() {
    try {
      await fetch(`http://localhost:5000/product/${id}`)
        .then((res) => res.json())
        .then((prod) => {
          setState({
            id: prod.id,
            name: prod.name,
            price: prod.price,
            img: prod.img,
            description: prod.description,
          });
        });
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div>
      <div className="row">
        <div className="column">
          <div className="card2">
            <img
              className="card-img-top"
              src={state.img}
              style={{ width: "95%" }}
              alt="product"
            />
          </div>
        </div>
        <div className="column">
          <h2 className="card-title">{state.name}</h2>
          <p className="card-text">{state.description}</p>
          <p className="card-price">Price: {state.price} kr</p>

          <button
            className="button"
            onClick={() => {
              addProduct();
            }}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDescription;
