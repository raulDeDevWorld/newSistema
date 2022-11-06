import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert } from "./alert"
import { login, signup, logout, loginWithGoogle, resetPassword } from "../firebase"
import { useAuth } from '../context/AuthContext.js'
import { removeDataItem } from "../firebase";


export function UserData() {
    const { userDB, setUserData } = useAuth()

    const remove = (item) => {
        removeDataItem("cotizaciones", item, setUserData)
    }
    return (
        <table className="table h-100">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Nombre de la propiedad</th>
                    <th>Plazo en meses</th>
                    <th>Abono inicial</th>
                    <th>Tasa de interes mensual</th>
                    <th>Meses de financiamiento</th>
                    <th>Borrar</th>
                </tr>
            </thead>
            
            {userDB && Object.keys(userDB.cotizaciones).map((item, index) => {
                console.log(userDB.cotizaciones[item])
                return <tbody>
                    <tr>
                        <th scope="row">{index}</th>
                        <td>{item}</td>
                        <td>{userDB.cotizaciones[item].plazoEnMeses}</td>
                        <td>{userDB.cotizaciones[item].abonoInicial}</td>
                        <td>{userDB.cotizaciones[item].tasaDeinteresMensual}</td>
                        <td>{userDB.cotizaciones[item].plazoEnMeses}</td>
                        <td><button type="button" class="btn btn-danger"  onClick={()=>remove(item)}>Eliminar</button></td>
                    </tr>
                </tbody>
            })
            }
        </table>
    );
}
export default UserData;