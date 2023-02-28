import { useEffect, useState } from "react";
import CartProduct from "./CartProduct";
import Product from "./Product";

type Product = {
  id: number;
  name: string;
  price: number;
  img: string;
  quantity: number;
};

type Cart = {
  product: [] | [Product];
};

type UserProps = {
  id: number;
  name: string;
};

export const Cart = ({ name, id }: UserProps) => {
  const [cartState, setCartState] = useState<Cart>({
    product: [
      /* {
      id: 0, 
      name: "",
      price: 0,
      img: "",
      quantity: 0
    } */
    ],
  });

  const [update, setUpdate] = useState({ isChanged: false });

  async function getContent() {
    try {
      await fetch(`http://localhost:5000/users/${id}/cart`)
        .then((res) => res.json())
        .then((content) => {
          setCartState({
            product: content,
          });
        });
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getContent();
  }, [update]);

  //remove product from cart or change quantity
  async function removeProduct(productId: number) {
    try {
      const response = await fetch(
        `http://localhost:5000/users/${id}/cart/products/${productId}`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json;charset=UTF-8",
          },
        }
      );
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  //function to pass to child component, to handle remove/change quantity
  async function handleChange(productId: number) {
    await removeProduct(productId);
    setUpdate({ isChanged: true });
  }

  //map over products from cart
  const content = cartState.product.map(
    (product: {
      id: number;
      name: string;
      price: number;
      img: string;
      quantity: number;
    }) => (
      <CartProduct key={product.id} product={product} update={handleChange} />
    )
  );

  return (
    <div>
      {cartState.product.length === 0 ? (
        <div className="cart-message">
          <h5>Your shopping cart is waiting to be filled</h5>
          <img src="/images/cart.jpg" alt="cart" className="cart-img" />
        </div>
      ) : (
        <div className="products-container">
          {name !== "anonymous" ? (
            <h5 className="welcome-message">
              Hi {name}, here is your shopping cart
            </h5>
          ) : (
            <h4 className="welcome-message">SHOPPING CART</h4>
          )}
          <div className="product-header">
            <h5 className="product-title">Product</h5>
            <h5 className="price">Price</h5>
            <h5 className="quantity" style={{ textAlign: "center" }}>
              Quantity
            </h5>
            <h5 className="remove"> </h5>
          </div>
          <div className="products">{content}</div>
        </div>
      )}
    </div>
  );
};

export default Cart;
