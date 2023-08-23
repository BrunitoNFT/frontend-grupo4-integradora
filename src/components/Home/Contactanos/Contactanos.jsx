import styles from '../Contactanos/contactanos.module.css'



function Contactanos() {
    return(
        <>
            <div className={styles.contenedorPadre}>
                <section className={styles.textoContacto}>
                    <span>¿Tenés Dudas?</span>
                    <span>Comunicate con nosotros</span>
                </section>

                <button className={styles.contactoButton}>
                    Contacto
                </button>
            </div>
        </>
    )
}

export default Contactanos;