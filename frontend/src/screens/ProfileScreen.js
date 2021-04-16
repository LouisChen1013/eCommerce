import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";
import { listMyOrders } from "../actions/orderActions";
import moment from "moment";

const ProfileScreen = ({ history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetailsReducer);
  const { error, loading, user } = userDetails;

  const userLogin = useSelector((state) => state.userLoginReducer);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector(
    (state) => state.userUpdateProfileReducer
  );
  const { success } = userUpdateProfile;

  const orderListMy = useSelector((state) => state.orderListMyReducer);
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      // check if a user info has been loaded or performed an update on his profile. It will ensure our user details are up-to-date
      if (!user || !user.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET }); // reset user profile then get new user details below
        dispatch(getUserDetails("profile"));
        dispatch(listMyOrders());
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, history, userInfo, user, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(
        updateUserProfile({
          id: user._id,
          name: name,
          email: email,
          password: password,
        })
      );
      setMessage("");
    }
  };

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        {message && <Message variant="danger">{message}</Message>}
        {loading && <Loader />}
        {error && <Message variant="danger">{error}</Message>}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              required
              type="name"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              required
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </Form.Group>

          <Form.Group controlId="confirmPassword">
            <Form.Label>Enter Password Again</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password Again"
              value={confirmPassword}
              onChange={(e) => {
                setconfirmPassword(e.target.value);
              }}
            />
          </Form.Group>

          <Button type="submit" variant="primary">
            Update
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2>My Orders</h2>
        {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Message variant="danger">{errorOrders}</Message>
        ) : (
          <Table striped responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Total</th>
                <th>Paid</th>
                <th>Delivered</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{moment(order.createAt).format("MMMM Do YYYY")}</td>
                  <td>${order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      moment(order.paidAt).format("MMMM Do YYYY")
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }}></i>
                    )}
                  </td>
                  <td>{order.isDelivered}</td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button className="btn-sm">Details</Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};

export default ProfileScreen;
