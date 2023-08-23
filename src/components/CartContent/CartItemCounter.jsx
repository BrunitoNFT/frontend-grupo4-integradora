import React, { useContext } from 'react';
import { DataContext } from '../Context/DataContext';

const CartItemCounter = ({ product }) => {

  const { cart, setCart, buyProducts} = useContext(DataContext);

  const decrease = () => {
    const productRepeat = cart.find((item) => item.id === product.id);

    productRepeat.quanty !== 1 &&  setCart(cart.map((item)=>(item.id === product.id ? {...product, quanty:productRepeat.quanty - 1} : item)));
  }

  return (
    <>
        <p className='counter-button' onClick={decrease}>-</p>
        <p>{product.quanty}</p>
        <p className='counter-button' onClick={(e) => buyProducts(e, product)}>+</p>

    </>
  )
}

export default CartItemCounter;
