import React from "react";
import styles from '../Politicas/politicas.module.css';
import { Link } from "react-router-dom";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";

function Politicas() {
    return(
    <div className={styles.containerPoliticas}>
        <h2 className={styles.h2Politicas}>POLITICAS DROP THE BASS!!</h2>
        <section className={styles.columnasPoliticas}>
            <article className={styles.politicas}>
                <h5 className={styles.tituloPoliticas}>Politica#1</h5>
                <p className={styles.textoPoliticas}>Condiciones de entrega, horarios: Nuestra empresa ofrece entregas programadas de instrumentos musicales en horarios convenientes para nuestros clientes. Garantizamos la puntualidad y la integridad de los productos durante la entrega, asegurando que estén listos para su uso inmediato.</p>
            </article>
            <article className={styles.politicas}>
                <h5 className={styles.tituloPoliticas}>Politica#2</h5>
                <p className={styles.textoPoliticas}>Condiciones de devolución: Facilitamos el proceso de devolución de los instrumentos al finalizar el período de alquiler. Los clientes deben asegurarse de que los instrumentos estén en las mismas condiciones en las que fueron entregados para evitar cargos adicionales.</p>
            </article>
            <article className={styles.politicas}>
                <h5 className={styles.tituloPoliticas}>Politica#3</h5>
                <p className={styles.textoPoliticas}>Condiciones de uso: Los clientes son responsables de utilizar los instrumentos de manera apropiada y cuidadosa. Cualquier daño causado por un mal uso estará sujeto a cargos adicionales.</p>
            </article>
        </section>
        <section className={styles.columnasPoliticas}>
            <article className={styles.politicas}>
                <h5 className={styles.tituloPoliticas}>Politica#4</h5>
                <p className={styles.textoPoliticas}>Condiciones por producto dañado: En caso de daño accidental a un instrumento durante el período de alquiler, nuestros clientes deben notificarnos de inmediato. Se aplicarán tarifas de reparación o reemplazo según la magnitud del daño.</p>
            </article>
            <article className={styles.politicas}>
                <h5 className={styles.tituloPoliticas}>Politica#5</h5>
                <p className={styles.textoPoliticas}>Condición de producto perdido/robado (seguro): Ofrecemos opciones de seguro para proteger a nuestros clientes en caso de pérdida o robo de los instrumentos. Los detalles sobre las tarifas y coberturas se proporcionan al momento de la reserva.</p>
            </article>
            <article className={styles.politicas}>
                <h5 className={styles.tituloPoliticas}>Politica#6</h5>
                <p className={styles.textoPoliticas}>Condición de privacidad de datos: Respetamos la privacidad de nuestros clientes y sus datos personales. La información recopilada durante el proceso de reserva se utiliza únicamente con fines relacionados con el alquiler de instrumentos y se mantiene segura y confidencial.</p>
            </article>
        </section>
        <Link className={styles.aVolver} to="/"><BsFillArrowLeftCircleFill color='#214F55' size={40}/></Link>

    </div>

    );
}

export default Politicas;