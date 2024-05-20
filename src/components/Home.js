import React,{useState}from 'react'
import "./style.css"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Cardsdata from './CardData';
import { addToCart } from '../redux/features/cartSlice';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';

const Home = () => {
    const [cardData, setCardData] = useState(Cardsdata);
    const dispatch = useDispatch();

    const add = (e) => {
      // console.log("added:",e);
      dispatch(addToCart(e))
      toast.success("Item added in your cart")
    }
  return (
    <>
      <section className="item-section mt-4 container">
        <h2 className="px-4" style={{ fontWeight: 400}}>Restaurants</h2>
        <div className="row mt-2 d-flex justify-content-around align-items-center">
          {cardData.map((item, index) => {
          return (
            <>
              <Card key={item.id} style={{ width: "22rem", border:"none" }} className="hove mb-4">
                <Card.Img src={item.imgdata} variant="top" className="cd" />

                <div className="card_body">
                    <div className="upper_data d-flex justify-content-between align-items-center">
                        <h4 className="mt-4">{item.dish}</h4>
                        <span>{item.rating} ★</span>
                    </div>

                    <div className="lower_data f-flex justify-content-between">
                        <h5>{item.address}</h5>
                        <span>{item.price}</span>
                    </div>

                    <div className="extra"></div>

                    <div className="last_data d-flex justify-content-between align-items-center">
                        <img src={item.arrimg} className="limg" alt="" />
                        <Button style={{width:"150px", background:"#ff3054db", border:"none"}} className="mt-2 mb-2" variant="outline-light" onClick={() => add(item)}>Add To Cart</Button>
                        <img src={item.delimg} className="laimg" alt="" />
                    </div>
                </div>
            </Card>
            
            </>
          )})}
            
        </div>
      </section>
    </>
  )
}

export default Home
