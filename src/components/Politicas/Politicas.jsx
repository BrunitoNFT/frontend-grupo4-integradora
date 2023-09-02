import React from "react";
import styles from '../Politicas/politicas.module.css';
import { BsFillArrowLeftCircleFill } from "react-icons/bs";

function Politicas() {
    return(
    <div className={styles.containerPoliticas}>
        <h2 className={styles.h2Politicas}>POLITICAS DROP THE BASS!!</h2>
        <section className={styles.columnasPoliticas}>
            <article className={styles.politicas}>
                <h5 className={styles.tituloPoliticas}>Politica#1</h5>
                <p className={styles.textoPoliticas}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos et facere magnam deleniti eaque sunt, earum nesciunt eligendi perferendis fuga? Asperiores voluptatem quod tempora tempore iusto eum non consequuntur rem!</p>
            </article>
            <article className={styles.politicas}>
                <h5 className={styles.tituloPoliticas}>Politica#2</h5>
                <p className={styles.textoPoliticas}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem praesentium corporis temporibus eos animi fugit sunt a rem porro numquam accusantium cum, rerum alias. Illo doloremque harum facere ducimus nisi.</p>
            </article>
            <article className={styles.politicas}>
                <h5 className={styles.tituloPoliticas}>Politica#3</h5>
                <p className={styles.textoPoliticas}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor sint aliquid laborum dignissimos culpa, molestias, ratione ducimus porro alias animi omnis. Repellat distinctio culpa, consequatur accusamus quae dolore facilis debitis.</p>
            </article>
        </section>
        <Link to="/"><BsFillArrowLeftCircleFill color='#214F55' size={40}/></Link>

    </div>

    );
}

export default Politicas;