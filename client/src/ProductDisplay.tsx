import { useEffect, useState } from "react";
import { CardDeck } from "react-bootstrap";
import "./App.css";
import Product from "./Product";

interface PDProps {
  category: string;
}

type ProductState = {
  products: [
    {
      id: number;
      name: string;
      price: number;
      img: string;
      description: string;
    }
  ];
};

function ProductDisplay(props: PDProps) {
  const [state, setState] = useState<ProductState>({
    products: [
      {
        id: 0,
        name: "",
        price: 0,
        img: "",
        description: "",
      },
    ],
  });

  // show products by category
  async function showCategory() {
    try {
      await fetch(`http://localhost:5000/products/${props.category}`)
        .then((res) => res.json())
        .then((prods) => {
          setState({
            products: prods,
          });
        });
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    showCategory();
  }, []);

  const products = state.products.map((product) => (
    <Product key={product.id} product={product} />
  ));

  return (
    <div>
      <div className="container">
        <CardDeck>{products}</CardDeck>
      </div>
    </div>
  );
}

export default ProductDisplay;
