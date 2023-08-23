import React, { useContext } from 'react';
import { DataContext } from '../Context/DataContext';

const CartTotal = () => {
  const { cart } = useContext(DataContext);

  const total = cart.reduce((acc, el) => acc + el.precio, 0);
  return (
    <div className='cartTotal'>
      <h3>Total a Pagar: {total} </h3>
    </div>
  );
};

export default CartTotal;
