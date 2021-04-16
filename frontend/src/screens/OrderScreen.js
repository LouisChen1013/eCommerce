import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getOrderDetails, payOrder } from "../actions/orderActions";
import moment from "moment";
import { PayPalButton } from "react-paypal-button-v2";
import { ORDER_PAY_RESET } from "../constants/orderConstants";

const OrderScreen = ({ match }) => {
  const orderId = match.params.id;
  const dispatch = useDispatch();
  const orderDetails = useSelector((state) => state.orderDetailsReducer);
  const { order, error, loading } = orderDetails;

  const orderPay = useSelector((state) => state.orderPayReducer);
  // since we already have loading declared before, we named as loadingPay here
  const { loading: loadingPay, success: successPay } = orderPay;

  const [sdkReady, setSdkReady] = useState(false);

  if (!loading && !error) {
    order.itemsPrice = order.orderItems
      .reduce((acc, orderItem) => acc + orderItem.price * orderItem.qty, 0)
      .toFixed(2);
  }

  const addPaypalScript = () => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src =
      "https://www.paypal.com/sdk/js?client-id=AYegyE2SssjoD0bpt2WrsMAGhhOafwuIwWum9qL4DCZFMjQH3ICCe_RuREoO3lp1-W4KGZ1ReYY4hETo";
    script.async = true;
    script.onload = () => {
      setSdkReady(true);
    };
    document.body.appendChild(script);
  };

  useEffect(() => {
    if (!order || successPay || order._id !== Number(orderId)) {
      dispatch({
        type: ORDER_PAY_RESET,
      });
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPaypalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, order, orderId, successPay]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(orderId, paymentResult));
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <div>
      <h1>Order: {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong> {order.user.name}
              </p>
              <p>
                <strong>Email: </strong>
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Shipping: </strong>
                {order.shippingAddress.address}, {order.shippingAddress.city},{" "}
                {order.shippingAddress.state},{"  "}
                {order.shippingAddress.postCode},{"  "}
                {order.shippingAddress.country}
              </p>

              {order.isDelivered ? (
                <Message variant="success">
                  Your order has been delivered on{" "}
                  {moment(order.paidAt).format("MMMM Do YYYY")}
                </Message>
              ) : (
                <Message variant="warning">Not Delivered</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>

              {order.isPaid ? (
                <Message variant="success">
                  Your order has been paid on{" "}
                  {moment(order.paidAt).format("MMMM Do YYYY")}
                </Message>
              ) : (
                <Message variant="warning">Not Paid</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message variant="info">Order is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((orderItem, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={2}>
                          <Image
                            src={orderItem.image}
                            alt={orderItem.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col className="my-auto">
                          <Link to={`/product/${orderItem.product}`}>
                            {orderItem.name}
                          </Link>
                        </Col>
                        <Col md={4} className="my-auto">
                          {orderItem.qty} X ${orderItem.price} = $
                          {(orderItem.qty * orderItem.price).toFixed(2)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items:</Col>
                  <Col>${order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping:</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax:</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total:</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}

                  {!sdkReady ? (
                    <Loader />
                  ) : (
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={successPaymentHandler}
                    />
                  )}
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default OrderScreen;
