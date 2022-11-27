import { useAuth } from '../../context/AuthContext.js'
import { useState, useEffect } from "react";

import styles from './Modal.module.css'

export default function Modal({ item, click }) {

    const { userDB, setUserData, postsIMG } = useAuth()
    const [topic, setTopic] = useState("Resumen de la Solicitud");

    console.log(userDB)
    function handlerSection(letter) {
        setTopic(letter)
    }

    return (
        <div className={styles.modal}>
            <table className="table-sm bg-light">


                <span onClick={() => click()}>X</span>
                <thead>
                    <tr>
                        <th> <h3>{topic != 'Resumen de la Solicitud' && <span onClick={() => handlerSection('Resumen de la Solicitud')}>{'<   '}</span>}{topic}</h3> </th>
                    </tr>
                </thead>


                {topic === "Resumen de la Solicitud" && <>
                    <thead>
                        <tr>
                            <th>Oficial asignado</th>
                            <th>Rafael Hernandez</th>
                        </tr>
                        <tr>
                            <th>Numero de solicitud</th>
                            <th>123456789</th>
                        </tr>
                    </thead>
                    <thead className={styles.banner}>
                        <tr  >
                            <th>Estado de la solicitud pendiente</th>
                            <button className={styles.buttonP}> Pendiente</button>
                        </tr>
                    </thead>

                    <thead>
                        <tr>
                            <th>Letra</th>
                            <th>$832.35</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Precio de vanta</td>
                            <td>{userDB.solicitudes[item]['Precio de ventas']}</td>
                        </tr>
                        <tr>
                            <td>Abono</td>
                            <td>{userDB.solicitudes[item]['Abono inicial sugerido']}</td>
                        </tr>
                        <tr>
                            <td>Financiamiento</td>
                            <td>Ninguno</td>
                        </tr>
                        <tr>
                            <td>Tasa</td>
                            <td>Ninguno</td>
                        </tr>
                        <tr>
                            <td>Gastos de Manejo</td>
                            <td>Ninguno</td>
                        </tr>
                        <tr>
                            <td>Plazo</td>
                            <td>{userDB.solicitudes[item]['Plazo anual']}</td>
                        </tr>
                        <tr>
                            <td>Seguro de vida</td>
                            <td>Ninguno</td>
                        </tr>
                        <tr>
                            <td>Seguro de incendio</td>
                            <td>Ninguno</td>
                        </tr>
                    </tbody>
                </>}


                {topic === "Datos Generales" && <>

                    <tbody>
                        <tr>
                            <td>Nombre Completo</td>
                            <td>{userDB.solicitudes[item]['Nombres']}</td>
                        </tr>
                        <tr>
                            <td>Sexo</td>
                            <td>{userDB.solicitudes[item]['sexo']}</td>
                        </tr>
                        <tr>
                            <td>Cedula</td>
                            <td>{userDB.solicitudes[item]['Cedula']}</td>
                        </tr>
                        <tr>
                            <td>Fecha de nacimiento</td>
                            <td>Ninguno</td>
                        </tr>
                        <tr>
                            <td>Estado migratorio</td>
                            <td>{userDB.solicitudes[item]['Estado Migratorio']}</td>
                        </tr>
                        <tr>
                            <td>Estado civil</td>
                            <td>{userDB.solicitudes[item]['Estado Civil']}</td>
                        </tr>
                        <tr>
                            <td>Ingreso</td>
                            <td>{userDB.solicitudes[item]['Salario']}</td>
                        </tr>
                        <tr>
                            <td>Tiempo de servicio</td>
                            <td>Ninguno</td>
                        </tr>
                        <tr>
                            <td>Tipo de propiedad</td>
                            <td>{userDB.solicitudes[item]['Tipo de propiedad']}</td>
                        </tr>
                        <tr>
                            <td>Proposito de compra</td>
                            <td>{userDB.solicitudes[item]['Proposito de compra']}</td>
                        </tr>
                        <tr>
                            <td>Ingreso mensual</td>
                            <td>{userDB.solicitudes[item]['Salario']}</td>
                        </tr>
                        <tr>
                            <td>Precio de venta</td>
                            <td>{userDB.solicitudes[item]['Precio de venta']}</td>
                        </tr>
                        <tr>
                            <td>Abono inicial sugerido</td>
                            <td>{userDB.solicitudes[item]['Abono inicial sugerido']}</td>
                        </tr>
                        <tr>
                            <td>Direccion Actual</td>
                            <td>{userDB.solicitudes[item]['Direccion Actual']}</td>
                        </tr>
                    </tbody>
                </>}





                {topic === "Referencias" && <>
                    <thead>
                        <tr>
                            <th>Referencia 1</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Nombre Completo</td>
                            <td>{userDB.solicitudes[item]['Nombre Completo REF1']}</td>
                        </tr>
                        <tr>
                            <td>Telefono</td>
                            <td>{userDB.solicitudes[item]['Numero de Celular REF1']}</td>
                        </tr>
                    </tbody>

                    <thead>
                        <tr>
                            <th>Referencia 2</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Nombre Completo</td>
                            <td>{userDB.solicitudes[item]['Nombre Completo REF2']}</td>
                        </tr>
                        <tr>
                            <td>Telefono</td>
                            <td>{userDB.solicitudes[item]['Numero de Celular REF2']}</td>
                        </tr>
                    </tbody>

                    <thead>
                        <tr>
                            <th>Referencia 3</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Nombre Completo</td>
                            <td>{userDB.solicitudes[item]['Nombre Completo REF3']}</td>
                        </tr>
                        <tr>
                            <td>Telefono</td>
                            <td>{userDB.solicitudes[item]['Numero de Celular REF2']}</td>
                        </tr>
                    </tbody>
                </>}



                {topic === "Documentos" && <>
                    <tbody>
                        {console.log(postsIMG[userDB.solicitudes[item].Cedula + "Identificacion 1"])}
                        <tr>
                            <td>Cedula</td>
                            <img src={postsIMG[userDB.solicitudes[item].Cedula + "Identificacion 1"]} alt="" />
                        </tr>
                        <tr>
                            <td>Otra Identificacion</td>
                            <td>{userDB.solicitudes[item]['Numero de Celular REF1']}</td>
                        </tr>
                        <tr>
                            <td>Carta de trabajo</td>
                            <td>{userDB.solicitudes[item]['Nombre Completo REF2']}</td>
                        </tr>
                        <tr>
                            <td>Ficha de seguro social</td>
                            <td>{userDB.solicitudes[item]['Numero de Celular REF2']}</td>
                        </tr>
                        <tr>
                            <td>Talonario 1</td>
                            <td>{userDB.solicitudes[item]['Nombre Completo REF3']}</td>
                        </tr>
                        <tr>
                            <td>Talonario 2</td>
                            <td>{userDB.solicitudes[item]['Numero de Celular REF2']}</td>
                        </tr>
                        <tr>
                            <td>Contrato o proforma</td>
                            <td>{userDB.solicitudes[item]['Numero de Celular REF2']}</td>
                        </tr>
                    </tbody>
                </>}
                <tbody>
                    <tr>
                        <td></td>
                        <td><a href="#" onClick={() => handlerSection('Datos Generales')}>Datos Generales {'>'}</a> </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td><a href="#" onClick={() => handlerSection('Referencias')}>Referencias {'>'}</a> </td>
                    </tr>

                    <tr>
                        <td></td>
                        <td><a href="#" onClick={() => handlerSection('Documentos')}>Documentos {'>'}</a> </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}



