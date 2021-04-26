import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const SearchBox = () => {
  const [keyword, setKeyword] = useState("");

  let history = useHistory(); //since this is just a component(not a actual page), we need to use useHistory to get our history props instead of destructing props of our component.
  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/?search=${keyword}&page=1`); //when creating a new search, we start at the first page
    } else {
      history.push(history.location.pathname);
    }
  };
  return (
    <div>
      <Form onSubmit={submitHandler} inline>
        <Form.Control
          type="text"
          name="q"
          placeholder="Search Products..."
          onChange={(e) => setKeyword(e.target.value)}
          className="mr-sm-2 ml-sm-5"
        ></Form.Control>
        <Button type="submit" variant="outline-success" className="p-2">
          Search
        </Button>
      </Form>
    </div>
  );
};

export default SearchBox;
