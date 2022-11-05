import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert } from "./alert"
import { login, signup, logout, loginWithGoogle, resetPassword } from "../firebase"
import { useAuth } from '../context/AuthContext.js'
import { removeDataItem } from "../firebase";


export function SolicitudesData() {
    const { userDB, setUserData } = useAuth()

    const remove = (item) => {
        removeDataItem("/solicitudes/", item, setUserData)
    }
    return (
        <table className="table h-100">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Nombre de la propiedad</th>
                    <th>Precio de venta</th>
                    <th>Monto de prestamo</th>
                    <th>Tasa de interes anual</th>
                    <th>Plazo en meses</th>
                    <th>Borrar</th>
                </tr>
            </thead>
            
            {userDB && Object.keys(userDB.solicitudes).map((item, index) => {
                console.log(userDB.solicitudes[item])
                return <tbody>
                    <tr>
                        <th scope="row">{index}</th>
                        <td>{item}</td>
                        <td>{userDB.solicitudes[item].Nombres}</td>
                        <td>{userDB.solicitudes[item].Cedula}</td>
                        <td>{userDB.solicitudes[item].sexo}</td>
                        <td>{userDB.solicitudes[item]["Proposito de compra"]}</td>
                        <td>{userDB.solicitudes[item]["Precio de ventas"]}$</td>
                        <td><button type="button" class="btn btn-danger"  onClick={()=>remove(item)}>Eliminar</button></td>
                    </tr>
                </tbody>
            })
            }
        </table>
    );
}
export default SolicitudesData;

