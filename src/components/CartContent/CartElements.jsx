import React, { useContext } from 'react';
import { DataContext } from '../Context/DataContext';
import CartItemCounter from './CartItemCounter';
import style from "../CartContent/cartContent.module.css"

const CartElements = () => {
    const { cart, setCart } = useContext(DataContext);

    const deleteProduct = (id) =>  {
        const foundId = cart.find((element) => element.id === id);
        const newCart = cart.filter((element) => {
            return element !== foundId;
        })

        setCart(newCart)
    }

    return cart.map((product) => (
        <div className={style.cartContent} key={product.id}>
            <img src={product.img} alt="product-card" />
            <h3>{product.objeto}</h3>
            <CartItemCounter product={product}/>
            <h4>{product.precio * product.quanty}$</h4>
            <h3 className={style.cartDeleteButton} onClick={() => deleteProduct(product.id)}>❌</h3>
        </div>
    ));
};

export default CartElements;
