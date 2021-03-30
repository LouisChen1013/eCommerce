import { useState, useEffect } from "react";
// import products from "../products";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import axios from "axios";

const HomeScreen = () => {
  const [products, setProducts] = useState([]);

  // useEffect triggers by default when a component loads or a state value is updated (every render)
  // with empty array argument will trigger the callback only after the first render.
  useEffect(() => {
    async function fetchProducts() {
      // since we only want to get the data attribute in the object, we use the destructuring assignment
      // we also added the proxy to our package.json, we only needed the "/api/products" part
      const { data } = await axios.get("/api/products");
      // console.log(data);
      setProducts(data);
    }

    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Latest Products</h1>
      <Row>
        {products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default HomeScreen;
