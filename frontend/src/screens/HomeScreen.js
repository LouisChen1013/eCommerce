import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import { listProducts } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";

// import axios from "axios
// import products from "../products";

const HomeScreen = ({ history }) => {
  /*
  // we have switched local state(useState) to global state(redux)
  const [products, setProducts] = useState([]);

  // useEffect triggers by default when a component loads or a state value is updated (every render)
  // with empty array argument will trigger the callback only after the first render.
  useEffect(() => {
    async function fetchProducts() {
      // since we only want to get the 'data' attribute in the object, we use the destructuring assignment
      // we also added the proxy to our package.json, we only needed the "/api/products" part
      const { data } = await axios.get("/api/products");
      // console.log(data);
      setProducts(data);
    }
    fetchProducts();
  }, []);
  */

  const dispatch = useDispatch();

  // const productList = useSelector((state) => console.log(state)); // Get our product list from our store
  const productList = useSelector((state) => state.productListReducer);
  const { error, loading, products, page, pages } = productList;

  // console.log(history);
  let keyword = history.location.search;
  // console.log(keyword); // To get our url parameter(..../?search=xxx) after clicking search.

  useEffect(() => {
    dispatch(listProducts(keyword));
  }, [dispatch, keyword]);

  return (
    <div>
      {!keyword && <ProductCarousel />}
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : products.length === 0 ? (
        <Message variant="info">No matches found</Message>
      ) : (
        <div>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate page={page} pages={pages} keyword={keyword} />
        </div>
      )}
    </div>
  );
};

export default HomeScreen;
