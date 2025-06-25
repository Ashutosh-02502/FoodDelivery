import React, { useEffect, useState } from "react";
import "./PlaceOrder.css";
import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const PlaceOrder = () => {
  const navigate = useNavigate();
  const { getTotalCartAmount, token, food_list, cartItems, url } =
    useContext(StoreContext);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
  });
  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data=>({ ...data, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();
    console.log("PLACE ORDER CLICKED");
    let orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() +2,
    }


try {
  let response = await axios.post(url + "/api/order/place", orderData, {
    headers: { token },
  });

  console.log("Full server response:", response.data);

  if (response.data.success) {
    const { session_url } = response.data;
    window.location.replace(session_url);
  } else {
    alert("Server responded but order failed: " + response.data.message || "Unknown error");
  }
} catch (err) {
  console.error("API call failed:", err.message);
  alert("Network or server error occurred");
}


  };


useEffect(() => {
  if (!token || getTotalCartAmount() === 0) {
    navigate("/cart");
  }
}, [token, getTotalCartAmount, navigate]);


  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input required
            name="firstName"
            onChange={onChangeHandler}
            value={data.firstName}
            type="text"
            placeholder="First Name"
          />
          <input required
            name="lastName"
            onChange={onChangeHandler}
            value={data.lastName}
            type="text"
            placeholder="Last Name"
          />
        </div>
        <div>
        <input required
          name="email"
          type="email"
          onChange={onChangeHandler}
          value={data.email}
          placeholder="Email Address"
        />
        <input required
          name="street"
          type="text"
          onChange={onChangeHandler}
          value={data.street}
          placeholder="Street"
        />
        </div>
        <div className="multi-fields">
          <input required
            name="city"
            value={data.city}
            type="text"
            onChange={onChangeHandler}
            placeholder="City"
          />
          <input required
            name="state"
            type="text"
            placeholder="State"
            value={data.state}
            onChange={onChangeHandler}
          />
        </div>
        <div className="multi-fields">
          <input required
            name="zip"
            value={data.zip}
            type="text"
            onChange={onChangeHandler}
            placeholder="ZIP Code"
          />
          <input required
            name="country"
            value={data.country}
            type="text"
            onChange={onChangeHandler}
            placeholder="Country"
          />
        </div>
        <input required
          type="text"
          name="phone"
          onChange={onChangeHandler}
          value={data.phone}
          placeholder="Phone"
        />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total:</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>₹{getTotalCartAmount() === 0 ? 0 : 50}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>
                ₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 50}
              </b>
            </div>
          </div>
          <button type="submit">PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
