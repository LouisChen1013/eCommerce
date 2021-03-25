import { Card } from "react-bootstrap";
import Rating from "./Rating";
import { Link } from "react-router-dom";

const Product = ({ product }) => {
  return (
    <Card className="my-3 p-3 rounded">
      {/* we use Link instead of <a> tag to load a component. <a> tag will load a new page(e.g., page refresh) */}
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} style={{ width: "" }} />
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as="div">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as="div">
          <div className="my-3">
            {/* {product.rating} from {product.numReviews} reviews */}
            <Rating
              rating={product.rating}
              review={`${product.numReviews} reviews`}
              color={"#f8e825"}
            />
          </div>
        </Card.Text>

        <Card.Text as="h3">${product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
