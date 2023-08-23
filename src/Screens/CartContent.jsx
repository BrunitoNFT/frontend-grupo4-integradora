import React, {useContext} from 'react';
import { DataContext } from '../components/Context/DataContext';
import CartElements from '../components/CartContent/CartElements';
import CartTotal from '../components/CartContent/CartTotal';
import style from ".././components/CartContent/cartContent.module.css"

const CartContent = () => {
  const { cart } = useContext(DataContext);

  return (
    <>
    {cart.length > 0 ? (<>
        <CartElements />
        <CartTotal />
  
      </>
    ) : (
      <h2 className={style.cartMessage}> TU CARRITO ESTA VACIO... </h2>
  
    )
    }
    </>
  )

};



export default CartContent;


