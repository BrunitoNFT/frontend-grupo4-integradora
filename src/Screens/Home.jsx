import React from 'react';
import Products from '../components/Home/Products/Products';
import DescripcionProductosManejados from '../components/Home/DescripcionProductosManejados/DescripcionProductosManejados';
import Confian from '../components/Home/Confian/Confian';
import Contactanos from '../components/Home/Contactanos/Contactanos';

const Home = () => {
  return (
    <div> 
        <Products/>
        <DescripcionProductosManejados/>
        <Confian/>
        <Contactanos/>
    </div>
  );
};

export default Home;
