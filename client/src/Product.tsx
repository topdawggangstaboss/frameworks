import { Card, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import "./App.css";

function Product(props: {
  product: {
    id: number;
    name: string;
    price: number;
    img: string;
    description: string;
  };
}) {
  const history = useHistory();

  function handleClick(id: number) {
    history.push(`/product/${id}`);
  }
  return (
    <Col md={3}>
      <div onClick={() => handleClick(props.product.id)}>
        <Card className="card border-0">
          <Card.Img
            variant="top"
            alt="prod"
            className="card-img-top"
            src={props.product.img}
          />
          <Card.Body style={{ padding: "5px 0 0 0" }}>
            <Card.Title className="card-title">{props.product.name}</Card.Title>
            <Card.Text className="card-price2">
              {props.product.price + " kr"}
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </Col>
  );
}

export default Product;
