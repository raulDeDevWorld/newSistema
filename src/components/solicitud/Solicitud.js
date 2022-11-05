import "./style/Solicitud.css";
import React, {useState} from "react";
import Sidebar from "../sidebar/Sidebar";
import Navbar from "../navbar/Navbar";
import { writeUserData, removeData } from "../../firebase";
import "../../../src/pages/home/home.scss";
import { useAuth } from '../../context/AuthContext.js'


export function Cotizar() {
const { userDB } = useAuth()

const [solicitudData, setSolicitudData] = useState({})
const [card, setCard] = useState(false)



  const handlerEventChange = (e) => {
    setSolicitudData({...solicitudData, [e.target.name]: e.target.value})
  }
  const saveSolicitud = (e) => {
    e.preventDefault()
    writeUserData("/solicitudes/",  solicitudData.Nombres, solicitudData)
    setCard(true)
  }
  
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <div className="container w-100%">
            <div className="col-12 m-3 text-xl text-gray-900 font-semibold">
              <div className="col-12">
                <div className="col-md-16 col-12">
                  <h2 className="text-center mb-4">
                    Solicitud
                  </h2>
                  <hr />
                  <br />
                  <br />

                  <p className="text-center mb-4">
                    ingresa tus datos para completar tu solicitud.
                  </p>


                  <div className="card border-0">
                    <form className="m-2">
                      <div className="card card-body shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                        <div className="my-flex-solicitud p-5 form-group">
                        <div>
                           <label for="cars">Cantidad de solicitantes</label><br />
                          <div className="d-flex">
                            <div class="form-check form-check-inline">
                              <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" />
                              <label class="form-check-label" for="inlineRadio1">1</label>
                            </div>
                            <div class="form-check form-check-inline">
                              <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" />
                              <label class="form-check-label" for="inlineRadio2">2</label>
                            </div>
                          </div>
                        </div>
                        <div></div>
                         <br />
                          <label>SOLICITANTE Nº1</label><br />
                          <div></div>
                          <input
                            type="text"
                            name="Nombres"
                            className="border-secondary form-control text-center"
                            placeholder="Nombres"
                            onChange={handlerEventChange}
                          ></input>
                          <input
                            type="text"
                            name="Apellidos"
                            className="border-secondary form-control text-center"
                            placeholder="Apellidos"
                            onChange={handlerEventChange}
                          ></input><br />
                           <select onChange={handlerEventChange} className="border-secondary rounded-1 p-1 text-center" id="cars" name="sexo">
                            <option value="">Sexo</option>
                            <option value="Masculino">Masculino</option>
                            <option value="Femenino">Femenino</option>
                            <option value="Indefinido">Indefinido</option>
                          </select><br />
                          <input
                            type="text"
                            name="Cedula"
                            className="border-secondary form-control text-center"
                            placeholder="Cedula"
                            onChange={handlerEventChange}
                          ></input><br />
                          <input
                            type="text"
                            name="Fecha de nacimiento"
                            className="border-secondary form-control text-center"
                            placeholder="Fecha de nacimiento"
                            onChange={handlerEventChange}
                          ></input><br />

                          <select onChange={handlerEventChange} className="text-center border-secondary rounded-1 p-1" id="cars" name="EstadoMigratorio">
                            <option value="">Estado migratorio</option>
                            <option value="Panameño">Panameño</option>
                            <option value="Extranjero - Residente Permanente">Extranjero - Residente Permanente</option>
                            <option value="Extranjero - Residente Temporal">Extranjero - Residente Temporal</option>
                            <option value="Extranjero - No Residente">Extranjero - No Residente</option>
                          </select><br />

                          <select onChange={handlerEventChange} className="text-center border-secondary rounded-1 p-1" id="cars" name="Estado Civil">
                            <option value="">Estado civil</option>
                            <option value="Soltero">Soltero</option>
                            <option value="Casado">Casado</option>
                            <option value="Unión Libre">Unión Libre</option>
                          </select><br />
                          <select onChange={handlerEventChange} className="text-center border-secondary rounded-1 p-1" id="cars" name="Tipo de ingresos">
                            <option value="">Tipo de ingresos</option>
                            <option value="Asalariado">Asalariado</option>
                            <option value="Independiente">Independiente</option>
                       
                          </select><br />

                          <input
                            type="text"
                            name="Tiempo de servicios"
                            className="border-secondary form-control text-center"
                            placeholder="Tiempo de servicios"
                            onChange={handlerEventChange}
                          ></input><br />
                          <select  onChange={handlerEventChange} className="text-center rounded-1 p-1" id="cars" name="Tipo de propiedad">
                            <option value="">Tipo de propiedad</option>
                            <option value="Nueva Interés Regular (+180,000)">Nueva Interés Regular (+180,000)</option>
                            <option value="Vivienda Nueva Interés Preferencial (hasta 180,000)">Vivienda Nueva Interés Preferencial (hasta 180,000)</option>
                            <option value="Segundo Uso">Segundo Uso</option>
                          </select><br />
                          <select onChange={handlerEventChange} className="text-center rounded-1 p-1" id="cars" name="Proposito de compra">
                            <option value="">Proposito de compra</option>
                            <option value="Vivienda Principal">Vivienda Principal</option>
                            <option value="Veraneo/Vacacional">Veraneo/Vacacional</option>
                            <option value="Inversión">Inversión</option>
                            <option value="Traslado y Préstamo con Garantía Hipotecaria">Traslado y Préstamo con Garantía Hipotecaria</option>
                          </select><br />


                          <div class="d-flex justify-content-center align-items-center mb-3">
                          <span class="w-25 input-group-text m-0 p-2 d-flex justify-content-center" id="inputGroup-sizing-sm">$</span>
                            <input type="text"
                              name="Ingreso mensual"
                              className="w-100 border-secondary form-control  text-center p-2 m-0"
                              placeholder="Tasa de interes anual $" 
                              onChange={handlerEventChange}/>
                          </div>


                          <div class="d-flex justify-content-center align-items-center mb-3">
                          <span class="w-25 input-group-text m-0 p-2 d-flex justify-content-center" id="inputGroup-sizing-sm">$</span>
                            <input type="text"
                              name="Precio de ventas"
                              className="w-100 border-secondary form-control  text-center p-2 m-0"
                              placeholder="Precio de ventas"
                            onChange={handlerEventChange}/>
                          </div>


                          <div class="d-flex justify-content-center align-items-center mb-3">
                          <span class="w-25 input-group-text m-0 p-2 d-flex justify-content-center" id="inputGroup-sizing-sm">$</span>
                            <input type="text"
                              name="Abono inicial sugerido"
                              className="w-100 border-secondary form-control  text-center p-2 m-0"
                              placeholder="Abono inicial sujerido"
                            onChange={handlerEventChange}/>
                          </div>
                          <br />
                          
                        </div>
                        <br />
                        <div class="form-check">
                          <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                          <label class="form-check-label" for="flexCheckDefault">
                            Acepto que se verifique mis referencias de credito al cpmpletar esta solicitud.
                          </label>
                        </div><br />
                        <button onClick={saveSolicitud} className="btn-Cotizador col-6 btn btn-primary rounded-5 mb-5">Continuar</button>
                      </div>
                    </form>
                    {card == true &&
                          <div className={"container card card-body shadow"}>
                            <div className="row">
                              <div className="col-4 text-center">
                                <span>Nombres </span> <br /><span>{solicitudData.Nombres}</span>
                              </div>
                              <div className="col-4 text-center">
                                <span>Cedula </span> <br /><span>{solicitudData.Cedula}</span>
                              </div>
                              <div className="col-4 text-center">
                                <span>Sexo </span> <br /><span>{solicitudData.sexo} </span>
                              </div>
                              <div className="col-4 text-center">
                                <span>Ingreso Mensual</span> <br /><span>{solicitudData["Ingreso mensual"]} </span>
                              </div>
                              <div className="col-4 text-center">
                                <span>Precio de ventas </span> <br /><span>{solicitudData["Precio de ventas"]} </span>
                              </div>
                              <div className="col-4 text-center">
                                <span>Abono inicial sugerido </span> <br /><span>{solicitudData["Abono inicial sugerido"]} </span>
                              </div>
                            </div>
                          </div>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="charts"></div>
        <div className="listContainer">
          <div className="listTitle">Latest Transactions</div>
        </div>
      </div>
    </div>
  );
}

export default Cotizar;
