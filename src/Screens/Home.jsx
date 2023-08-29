import React from 'react';
import Recomendados from '../components/Home/Recomendados/Recomendados';
import DescripcionProductosManejados from '../components/Home/DescripcionProductosManejados/DescripcionProductosManejados';
import Confian from '../components/Home/Confian/Confian';
import Contactanos from '../components/Home/Contactanos/Contactanos';

const Home = () => {
  return (
    <div> 
        <Recomendados/>
        <DescripcionProductosManejados/>
        <Confian/>
        <Contactanos/>
    </div>
  );
};

export default Home;
