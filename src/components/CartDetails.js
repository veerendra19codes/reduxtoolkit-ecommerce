import React, { useEffect, useState } from 'react'
import "./cartstyle.css"
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, decrementQnty, emptyCart, removeFromCart } from '../redux/features/cartSlice';
import toast from 'react-hot-toast';

const CartDetails = () => {
  // const arr = [0,1];
  const {carts} = useSelector((state) => state.allCart);
  // console.log("state in cartsdetailspage:",carts);
  const [totalPrice,setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);

  const dispatch = useDispatch();

  //increment quantity of single item
  const handleIncrement = (e) => {
    dispatch(addToCart(e));
  }

  //decrement quantity of single item
  const handleDecrement = (e) => {
    dispatch(decrementQnty(e));
  }

  //remove item from cart
  const handleDeleteItem = (e) => {
    dispatch(removeFromCart(e));
    toast.success("Item removed from your cart")
  }

  //empty entire cart
  const handleEmptyCart = () => {
    dispatch(emptyCart());
    toast.success("Cart is cleared")
  }

  const calTotalPrice = () => {
    let totalprice = 0;
    carts.map((item, index) => {
      totalprice += (item.qnty*item.price);
    })
    setTotalPrice(totalprice);
  }

  const calTotalQuantity = () => {
    let totalqty = 0;
    carts.map((item, index) => {
      totalqty += item.qnty;
    })
    setTotalQuantity(totalqty);
  }

  useEffect(() => {
    calTotalPrice();
  },[calTotalPrice])

  useEffect(() => {
    calTotalQuantity();
  },[calTotalPrice])

  return (
    <div className="row justify-content-center m-0">
      <div className="col-md-8 mt-5 mb-5 cardsdetails">
        <div className="card">
          <div className="card-header bg-dark p-3">
            <div className="card-header-flex">
              <h5 className="text-white m-0">Cart Calculations {carts.length >= 0 ? `(${carts.length})`: ""}</h5>
              {carts.length > 0 ? <button className="btn btn-danger mt-0 btn-sm" onClick={() => handleEmptyCart()}><i className="fa fa-trash-alt mr-2"></i><span>Empty Cart</span></button> : ""}
            </div>
          </div>

          <div className="card-body p-0">
            {
              carts.length === 0 ? <table className="table cart-table mb-0">
                <tbody>
                  <tr>
                    <td colSpan={6}>
                      <div className="cart-empty">
                        <i className="fa fa-shopping-cart"></i>
                        <p>Your cart is Empty</p>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table> : 
              <table className="table cart-table mb-0 table-responsive-sm">
                <thead>
                  <tr>
                    <th>Action</th>
                    <th>Product</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Qty</th>
                    <th className="text-right"><span id="amount" className="amount">Total Amount</span></th>
                  </tr>
                </thead>
                <tbody>
                  {
                    carts?.map((data,index) => {
                      return (
                        <>
                        <tr key={data.id}>
                          <td>
                            <button className="prdct-delete" onClick={() => handleDeleteItem(data)}><i className="fa fa-trash-alt mr-2"></i></button>
                          </td>
                          <td><div  className="product-img"><img src={data.imgdata} alt="" /></div></td>
                          <td><div className="product-name"><p>{data.dish}</p></div></td>
                          <td>{data.price}</td>
                          <td>
                            <div className="prdct-qty-container">
                              <button className="prdct-qty-btn" type="button" onClick={() => handleDecrement(data)}>
                                <i className="fa fa-minus" ></i>
                              </button>
                              <input type="text" className="qty-input-box" value={data.qnty} disabled />
                              <button className="prdct-qty-btn" type="button" onClick={() => handleIncrement(data)}>
                                <i className="fa fa-plus" ></i>
                              </button>
                            </div>
                          </td>
                          <td className="text-right">{data.qnty*data.price}</td>
                        </tr>
                        </>
                      )
                    })
                  }
                </tbody>
                <tfoot>
                  <tr>
                    <th>&nbsp;</th>
                    <th colSpan={3}>&nbsp;</th>
                    <th>Items In Cart : <span className="text-danger">{totalQuantity}</span></th>
                    <th className="text-right">Total Price : <span className="text-danger">{totalPrice}</span></th>
                  </tr>
                </tfoot>
              </table>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartDetails
