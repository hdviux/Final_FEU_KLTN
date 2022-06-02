import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, ButtonGroup } from "react-bootstrap";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import cartAPI from "../../../../api/cartAPI";
import { useSelector } from "react-redux";
const ChangeCountCart = (props) => {
  const loggedInUser = useSelector((state) => state.user.current);
  const [disable, setDisable] = useState(true);
  const [count, setCount] = useState(Number(props.text));
  const [btnAdd, setBtnAdd] = useState(true);
  const [btnRemove, setBtnRemove] = useState(
    Number(props.text) > 1 ? true : false
  );

  const handleRemove = async () => {
    try {
      setCount(count - 1);
      setDisable(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAdd = async () => {
    try {
      setCount(count + 1);
      setDisable(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (Number(count) > 1) {
      setBtnRemove(true);
      if (Number(count) >= Number(props.data.originQuantity)) {
        setBtnAdd(false);
        setCount(props.data.originQuantity);
      }
      if (Number(count) < Number(props.data.originQuantity)) {
        setBtnAdd(true);
      }
    }
    if (Number(count) <= 1) {
      setCount(1);
      setBtnAdd(true);
      setBtnRemove(false);
    }
  }, [count]);

  useEffect(() => {
    const updateCart = async () => {
      try {
        await cartAPI.updatecart(
          { _id: props.data.key, quantity: count },
          loggedInUser.accessToken
        );
      } catch (error) {
        console.log(error);
      }
    };
    updateCart();
  }, [count]);
  return (
    <div>
      <ButtonGroup aria-label="Basic example">
        <Button
          variant="outline-secondary"
          onClick={handleRemove}
          disabled={!btnRemove}
        >
          <RemoveIcon />
        </Button>
        <input
          disabled={disable}
          value={count}
          onChange={(e) => setCount(e.target.value)}
          style={{ width: "50px", textAlign: "center" }}
        />
        <Button
          variant="outline-secondary"
          onClick={handleAdd}
          disabled={!btnAdd}
        >
          <AddIcon />
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default ChangeCountCart;
