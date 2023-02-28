import "./App.css";
import { VscTrash } from "react-icons/vsc";

type ProductProps = {
  product: {
    id: number;
    name: string;
    price: number;
    img: string;
    quantity: number;
  },
  update: (value: number) => void 
}

function CartProduct(props: ProductProps) {

return (
  <div className="product">
    <img src={props.product.img} alt="product" className="product-image"/>
    <span className="product-name">{props.product.name}</span>
    <span className="price">{props.product.price} kr</span>
    <span className="quantity">{props.product.quantity}</span>
    <VscTrash className="remove" onClick={() => props.update(props.product.id)} /> 
  </div>  
  )
}
export default CartProduct;

