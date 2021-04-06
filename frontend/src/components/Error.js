import { Alert } from "react-bootstrap";

const Error = ({ variant, error }) => {
  return <Alert variant={variant}>{error}</Alert>;
};

export default Error;
