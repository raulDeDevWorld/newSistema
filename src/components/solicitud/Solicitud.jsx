import "./style/Solicitud.css";
import React, { useState } from "react";
import Sidebar from "../sidebar/Sidebar";
import Navbar from "../navbar/Navbar";
import { writeUserData, removeData } from "../../firebase";
import { uploadIMG } from "../../storageFB";
import Success from "../Success";
import Error from "../Error";

import "../../../src/pages/home/home.scss";
import { useAuth } from '../../context/AuthContext.js'
import { StoreMallDirectoryTwoTone } from "@mui/icons-material";


export function Cotizar() {
  const { userDB, setUserSuccess, success, postsIMG, setUserPostsIMG } = useAuth()

  const [solicitudData, setSolicitudData] = useState({})
  const [solicitudData2, setSolicitudData2] = useState({})
  const [preAprobacion, setPreAprobacion] = useState(false)
  const [datosComplementarios, setDatosComplementarios] = useState(false)
  const [cargarDocumentos, setCargarDocumentos] = useState(false)
  const [check, setCheck] = useState(false)
  const [photos, setPhotos] = useState({})
  const [checkNewSolicitud, setCheckNewSolicitud] = useState(false)


  function handlerUploadFile(e) {
    const fileName = e.target.name 
    const file = e.target.files[0]
    file !== undefined && setPhotos({ ...photos, [fileName]: file })
    uploadIMG(file, `${solicitudData.Cedula}${fileName}`, setUserSuccess, postsIMG, setUserPostsIMG)
  }
  console.log(photos)
  const handlerEventChange = (e) => {
    setSolicitudData({ ...solicitudData, [e.target.name]: e.target.value })
  }
  const handlerEventChange2 = (e) => {
    setSolicitudData2({ ...solicitudData2, [e.target.name]: e.target.value })
  }
  const handlerEventChangeCheck = (e) => {
    setCheck(!check)
  }
  const handleCheckSolicitud = (e) => {
    const data = e.target.value
    setCheckNewSolicitud(data)
  }
  
  console.log(checkNewSolicitud)

  const saveSolicitud = (e, letter) => {
    e.preventDefault()
    const soli = Object.keys(solicitudData)
    console.log(soli)
    writeUserData("/solicitudes/", solicitudData.Nombres, solicitudData)
    if (letter === "solicitud") { soli.length == 14 && check === true ? setPreAprobacion(true) : setUserSuccess("Complete") }
    if (letter == "preAprobacion") { setDatosComplementarios(true) }
    if (letter == "datosComplementarios") { solicitudData["Direccion Actual"] && solicitudData[check === true && "Numero de Celular REF1"] && solicitudData["Numero de Celular REF2"] && solicitudData["Numero de Celular REF3"] && solicitudData["Nombre Completo REF1"] && solicitudData["Nombre Completo REF2"] && solicitudData["Nombre Completo REF3"] ? setCargarDocumentos(true) : setUserSuccess("Complete") }
    if (letter == "SaveAll") { soli.length > 14 && solicitudData["Numero de Celular REF1"] && solicitudData["Numero de Celular REF2"] && solicitudData["Numero de Celular REF3"] && solicitudData["Nombre Completo REF1"] && solicitudData["Nombre Completo REF2"] && solicitudData["Nombre Completo REF3"] && check === true && Object.keys(photos).length > 6 ? setUserSuccess("Save") : setUserSuccess("Complete") }

  }
  const handlerEventeChange = e => {
    setSolicitudData({ ...solicitudData, [e.target.name]: e.target.value })
  }
  return (
    <div className="home">
      {success == "Complete" && <Error>Complete el Formulario correctamente</Error>}

      <Sidebar />
      {success == "Cargando" && <Success> Cargando</Success>}
      {success == "Save" && <Success> Guardado Exitosamente</Success>}

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








                    <form className="m-1">













                      <div className="card card-body shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                        <br />
                        <div className="text-center">
                          <label for="cars">Cantidad de solicitantes</label><br />
                          <form className="d-flex justify-content-center" >
                            <div class="form-check form-check-inline">
                              <input class="form-check-input" type="radio" onChange={handleCheckSolicitud} name="inlineRadioOptions" id="inlineRadio1" value="false" />
                              <label class="form-check-label" for="inlineRadio1">1</label>
                            </div>
                            <div class="form-check form-check-inline">
                              <input class="form-check-input" type="radio" onChange={handleCheckSolicitud} name="inlineRadioOptions" id="inlineRadio2" value="true" />
                              <label class="form-check-label" for="inlineRadio2">2</label>
                            </div>
                          </form>
                        </div>





                        <div className="my-flex-solicitud p-5 form-group">

                          <br />
                          <label>SOLICITANTE Nº1</label><br />
                          <div></div>

                          <div className="d-flex flex-column mb-3">
                            <input
                              type="text"
                              name="Nombres"
                              className="border-secondary form-control text-center"
                              placeholder="Nombres"
                              onChange={handlerEventChange}
                            ></input>
                            <p className={solicitudData.Nombres ? "text-success w-100 text-center" : "text-danger w-100 text-center"}>{solicitudData.Nombres && solicitudData.Nombres.length ? "Correcto" : "*Debe rellenar el formulario"}</p>
                          </div>

                          <div className="d-flex flex-column mb-3">
                            <input
                              type="text"
                              name="Apellidos"
                              className="border-secondary form-control text-center"
                              placeholder="Apellidos"
                              onChange={handlerEventChange}
                            ></input>
                            <p className={solicitudData.Apellidos ? "text-success w-100 text-center" : "text-danger w-100 text-center"}>{solicitudData.Apellidos && solicitudData.Apellidos.length ? "Correcto" : "*Debe rellenar el formulario"}</p>
                          </div>

                          <div className="d-flex flex-wrap mb-3">
                            <select onChange={handlerEventChange} className="border-secondary rounded-1 p-2 text-center w-100" id="cars" name="sexo">
                              <option value="">Sexo</option>
                              <option value="Masculino">Masculino</option>
                              <option value="Femenino">Femenino</option>
                              <option value="Indefinido">Indefinido</option>
                            </select>
                            <p className={solicitudData.sexo ? "text-success w-100 text-center" : "text-danger w-100 text-center"}>{solicitudData.sexo ? "Correcto" : "*Debe seleccionar una opcion"}</p>
                          </div>

                          <div className="d-flex flex-wrap mb-3">
                            <input
                              type="text"
                              name="Cedula"
                              className="d-block border-secondary form-control text-center w-100"
                              placeholder="Cedula"
                              onChange={handlerEventChange}
                            ></input>
                            <p className={solicitudData.Cedula ? "text-success w-100 text-center" : "text-danger w-100 text-center"}>{solicitudData.Cedula && solicitudData.Cedula.length ? "Correcto" : "*Debe rellenar el formulario"}</p>
                          </div>

                          <div className="d-flex flex-wrap mb-3">
                            <input
                              type="text"
                              name="Fecha de nacimiento"
                              className="d-block border-secondary form-control text-center w-100"
                              placeholder="Fecha de nacimiento"
                              onChange={handlerEventChange}
                            ></input><br />
                            <p className={solicitudData["Fecha de nacimiento"] ? "text-success w-100 text-center" : "text-danger w-100 text-center"}>{solicitudData["Fecha de nacimiento"] && solicitudData["Fecha de nacimiento"].length ? "Correcto" : "*Debe rellenar el formulario"}</p>
                          </div>

                          <div className="d-flex flex-wrap mb-3">
                            <select onChange={handlerEventChange} className="text-center border-secondary rounded-1 p-2 w-100" id="cars" name="Estado Migratorio">
                              <option value="">Estado migratorio</option>
                              <option value="Panameño">Panameño</option>
                              <option value="Extranjero - Residente Permanente">Extranjero - Residente Permanente</option>
                              <option value="Extranjero - Residente Temporal">Extranjero - Residente Temporal</option>
                              <option value="Extranjero - No Residente">Extranjero - No Residente</option>
                            </select><br />
                            <p className={solicitudData["Estado Migratorio"] ? "text-success w-100 text-center" : "text-danger w-100 text-center"}>{solicitudData["Estado Migratorio"] ? "Correcto" : "*Debe seleccionar una opcion"}</p>
                          </div>

                          <div className="d-flex flex-wrap mb-3">

                            <select onChange={handlerEventChange} className="text-center border-secondary rounded-1 p-2 w-100" id="cars" name="Estado Civil">
                              <option value="">Estado civil</option>
                              <option value="Soltero">Soltero</option>
                              <option value="Casado">Casado</option>
                              <option value="Unión Libre">Unión Libre</option>
                            </select><br />
                            <p className={solicitudData["Estado Civil"] ? "text-success w-100 text-center" : "text-danger w-100 text-center"}>{solicitudData["Estado Civil"] ? "Correcto" : "*Debe seleccionar una opcion"}</p>
                          </div>

                          <div className="d-flex flex-wrap mb-3">

                            <select onChange={handlerEventChange} className="text-center border-secondary rounded-1 p-2 w-100" id="cars" name="Tipo de ingresos">
                              <option value="">Tipo de ingresos</option>
                              <option value="Asalariado">Asalariado</option>
                              <option value="Independiente">Independiente</option>
                            </select>
                            <p className={solicitudData["Tipo de ingresos"] ? "text-success w-100 text-center" : "text-danger w-100 text-center"}>{solicitudData["Tipo de ingresos"] ? "Correcto" : "*Debe seleccionar una opcion"}</p>
                          </div>


                          <div className="d-flex flex-column mb-2">
                            <input
                              type="text"
                              name="Tiempo de servicios"
                              className="border-secondary form-control text-center"
                              placeholder="Tiempo de servicios"
                              onChange={handlerEventChange}
                            ></input>
                            <p className={solicitudData["Tiempo de servicios"] ? "text-success w-100 text-center" : "text-danger w-100 text-center"}>{solicitudData["Tiempo de servicios"] && solicitudData["Tiempo de servicios"].length ? "Correcto" : "*Debe rellenar el formulario"}</p>
                          </div>

                          <div className="d-flex flex-wrap mb-3">
                            <select onChange={handlerEventChange} className="text-center rounded-1 p-2 w-100" id="cars" name="Tipo de propiedad">
                              <option value="">Tipo de propiedad</option>
                              <option value="Nueva Interés Regular (+180,000)">Nueva Interés Regular (+180,000)</option>
                              <option value="Vivienda Nueva Interés Preferencial (hasta 180,000)">Vivienda Nueva Interés Preferencial (hasta 180,000)</option>
                              <option value="Segundo Uso">Segundo Uso</option>
                            </select><br />
                            <p className={solicitudData["Tipo de propiedad"] ? "text-success w-100 text-center" : "text-danger w-100 text-center"}>{solicitudData["Tipo de propiedad"] ? "Correcto" : "*Debe seleccionar una opcion"}</p>
                          </div>

                          <div className="d-flex flex-wrap mb-3">
                            <select onChange={handlerEventChange} className="text-center rounded-1 p-2 w-100" id="cars" name="Proposito de compra">
                              <option value="">Proposito de compra</option>
                              <option value="Vivienda Principal">Vivienda Principal</option>
                              <option value="Veraneo/Vacacional">Veraneo/Vacacional</option>
                              <option value="Inversión">Inversión</option>
                              <option value="Traslado y Préstamo con Garantía Hipotecaria">Traslado y Préstamo con Garantía Hipotecaria</option>
                            </select>
                            <p className={solicitudData["Proposito de compra"] ? "text-success w-100 text-center" : "text-danger w-100 text-center"}>{solicitudData["Proposito de compra"] ? "Correcto" : "*Debe seleccionar una opcion"}</p>
                          </div>

                          <div className="d-flex flex-wrap mb-3">
                            <div class="d-flex justify-content-center align-items-center mb-0 w-100">
                              <span class="w-25 input-group-text m-0 p-2 d-flex justify-content-center" id="inputGroup-sizing-sm">$</span>
                              <input type="number"
                                name="Tasa de interes anual"
                                className="w-100 border-secondary form-control  text-center p-2 m-0"
                                placeholder="Tasa de interes anual"
                                onChange={handlerEventChange} />
                            </div><br />
                            <p className={solicitudData["Tasa de interes anual"] ? "text-success w-100 text-center" : "text-danger w-100 text-center"}>{solicitudData["Tasa de interes anual"] && solicitudData["Tasa de interes anual"].length ? "Correcto" : "*Debe rellenar el formulario"}</p>
                          </div>

                          <div className="d-flex flex-wrap mb-3">
                            <div class="d-flex justify-content-center align-items-center mb-0 w-100">
                              <span class="w-25 input-group-text m-0 p-2 d-flex justify-content-center" id="inputGroup-sizing-sm">$</span>
                              <input type="number"
                                name="Precio de ventas"
                                className="w-100 border-secondary form-control  text-center p-2 m-0"
                                placeholder="Precio de ventas"
                                onChange={handlerEventChange} />
                            </div>
                            <p className={solicitudData["Precio de ventas"] ? "text-success w-100 text-center" : "text-danger w-100 text-center"}>{solicitudData["Precio de ventas"] && solicitudData["Precio de ventas"].length ? "Correcto" : "*Debe rellenar el formulario"}</p>
                          </div>

                          <div className="d-flex flex-wrap mb-3">
                            <div class="d-flex justify-content-center align-items-center mb-0 w-100">
                              <span class="w-25 input-group-text m-0 p-2 d-flex justify-content-center" id="inputGroup-sizing-sm">$</span>
                              <input type="number"
                                name="Abono inicial sugerido"
                                className="w-100 border-secondary form-control  text-center p-2 m-0"
                                placeholder="Abono inicial sujerido"
                                onChange={handlerEventChange} />
                            </div>
                            <p className={solicitudData["Abono inicial sugerido"] ? "text-success w-100 text-center" : "text-danger w-100 text-center"}>{solicitudData["Abono inicial sugerido"] && solicitudData["Abono inicial sugerido"].length ? "Correcto" : "*Debe rellenar el formulario"}</p>
                          </div>

                          <br />
                        </div>
                        {


                          checkNewSolicitud == 'true' && <div className="my-flex-solicitud p-5 form-group">

                            <br />
                            <label>SOLICITANTE Nº2</label><br />
                            <div></div>

                            <div className="d-flex flex-column mb-3">
                              <input
                                type="text"
                                name="Nombres"
                                className="border-secondary form-control text-center"
                                placeholder="Nombres"
                                onChange={handlerEventChange2}
                              ></input>
                              <p className={solicitudData.Nombres ? "text-success w-100 text-center" : "text-danger w-100 text-center"}>{solicitudData.Nombres && solicitudData.Nombres.length ? "Correcto" : "*Debe rellenar el formulario"}</p>
                            </div>

                            <div className="d-flex flex-column mb-3">
                              <input
                                type="text"
                                name="Apellidos"
                                className="border-secondary form-control text-center"
                                placeholder="Apellidos"
                                onChange={handlerEventChange2}
                              ></input>
                              <p className={solicitudData.Apellidos ? "text-success w-100 text-center" : "text-danger w-100 text-center"}>{solicitudData.Apellidos && solicitudData.Apellidos.length ? "Correcto" : "*Debe rellenar el formulario"}</p>
                            </div>

                            <div className="d-flex flex-wrap mb-3">
                              <select onChange={handlerEventChange2} className="border-secondary rounded-1 p-2 text-center w-100" id="cars" name="sexo">
                                <option value="">Sexo</option>
                                <option value="Masculino">Masculino</option>
                                <option value="Femenino">Femenino</option>
                                <option value="Indefinido">Indefinido</option>
                              </select>
                              <p className={solicitudData.sexo ? "text-success w-100 text-center" : "text-danger w-100 text-center"}>{solicitudData.sexo ? "Correcto" : "*Debe seleccionar una opcion"}</p>
                            </div>

                            <div className="d-flex flex-wrap mb-3">
                              <input
                                type="text"
                                name="Cedula"
                                className="d-block border-secondary form-control text-center w-100"
                                placeholder="Cedula"
                                onChange={handlerEventChange2}
                              ></input>
                              <p className={solicitudData.Cedula ? "text-success w-100 text-center" : "text-danger w-100 text-center"}>{solicitudData.Cedula && solicitudData.Cedula.length ? "Correcto" : "*Debe rellenar el formulario"}</p>
                            </div>

                            <div className="d-flex flex-wrap mb-3">
                              <input
                                type="text"
                                name="Fecha de nacimiento"
                                className="d-block border-secondary form-control text-center w-100"
                                placeholder="Fecha de nacimiento"
                                onChange={handlerEventChange2}
                              ></input><br />
                              <p className={solicitudData["Fecha de nacimiento"] ? "text-success w-100 text-center" : "text-danger w-100 text-center"}>{solicitudData["Fecha de nacimiento"] && solicitudData["Fecha de nacimiento"].length ? "Correcto" : "*Debe rellenar el formulario"}</p>
                            </div>

                            <div className="d-flex flex-wrap mb-3">
                              <select onChange={handlerEventChange2} className="text-center border-secondary rounded-1 p-2 w-100" id="cars" name="Estado Migratorio">
                                <option value="">Estado migratorio</option>
                                <option value="Panameño">Panameño</option>
                                <option value="Extranjero - Residente Permanente">Extranjero - Residente Permanente</option>
                                <option value="Extranjero - Residente Temporal">Extranjero - Residente Temporal</option>
                                <option value="Extranjero - No Residente">Extranjero - No Residente</option>
                              </select><br />
                              <p className={solicitudData["Estado Migratorio"] ? "text-success w-100 text-center" : "text-danger w-100 text-center"}>{solicitudData["Estado Migratorio"] ? "Correcto" : "*Debe seleccionar una opcion"}</p>
                            </div>

                            <div className="d-flex flex-wrap mb-3">

                              <select onChange={handlerEventChange2} className="text-center border-secondary rounded-1 p-2 w-100" id="cars" name="Estado Civil">
                                <option value="">Estado civil</option>
                                <option value="Soltero">Soltero</option>
                                <option value="Casado">Casado</option>
                                <option value="Unión Libre">Unión Libre</option>
                              </select><br />
                              <p className={solicitudData["Estado Civil"] ? "text-success w-100 text-center" : "text-danger w-100 text-center"}>{solicitudData["Estado Civil"] ? "Correcto" : "*Debe seleccionar una opcion"}</p>
                            </div>

                            <div className="d-flex flex-wrap mb-3">

                              <select onChange={handlerEventChange2} className="text-center border-secondary rounded-1 p-2 w-100" id="cars" name="Tipo de ingresos">
                                <option value="">Tipo de ingresos</option>
                                <option value="Asalariado">Asalariado</option>
                                <option value="Independiente">Independiente</option>
                              </select>
                              <p className={solicitudData["Tipo de ingresos"] ? "text-success w-100 text-center" : "text-danger w-100 text-center"}>{solicitudData["Tipo de ingresos"] ? "Correcto" : "*Debe seleccionar una opcion"}</p>
                            </div>


                            <div className="d-flex flex-column mb-2">
                              <input
                                type="text"
                                name="Tiempo de servicios"
                                className="border-secondary form-control text-center"
                                placeholder="Tiempo de servicios"
                                onChange={handlerEventChange2}
                              ></input>
                              <p className={solicitudData["Tiempo de servicios"] ? "text-success w-100 text-center" : "text-danger w-100 text-center"}>{solicitudData["Tiempo de servicios"] && solicitudData["Tiempo de servicios"].length ? "Correcto" : "*Debe rellenar el formulario"}</p>
                            </div>

                            <div className="d-flex flex-wrap mb-3">
                              <select onChange={handlerEventChange2} className="text-center rounded-1 p-2 w-100" id="cars" name="Tipo de propiedad">
                                <option value="">Tipo de propiedad</option>
                                <option value="Nueva Interés Regular (+180,000)">Nueva Interés Regular (+180,000)</option>
                                <option value="Vivienda Nueva Interés Preferencial (hasta 180,000)">Vivienda Nueva Interés Preferencial (hasta 180,000)</option>
                                <option value="Segundo Uso">Segundo Uso</option>
                              </select><br />
                              <p className={solicitudData["Tipo de propiedad"] ? "text-success w-100 text-center" : "text-danger w-100 text-center"}>{solicitudData["Tipo de propiedad"] ? "Correcto" : "*Debe seleccionar una opcion"}</p>
                            </div>

                            <div className="d-flex flex-wrap mb-3">
                              <select onChange={handlerEventChange2} className="text-center rounded-1 p-2 w-100" id="cars" name="Proposito de compra">
                                <option value="">Proposito de compra</option>
                                <option value="Vivienda Principal">Vivienda Principal</option>
                                <option value="Veraneo/Vacacional">Veraneo/Vacacional</option>
                                <option value="Inversión">Inversión</option>
                                <option value="Traslado y Préstamo con Garantía Hipotecaria">Traslado y Préstamo con Garantía Hipotecaria</option>
                              </select>
                              <p className={solicitudData["Proposito de compra"] ? "text-success w-100 text-center" : "text-danger w-100 text-center"}>{solicitudData["Proposito de compra"] ? "Correcto" : "*Debe seleccionar una opcion"}</p>
                            </div>

                            <div className="d-flex flex-wrap mb-3">
                              <div class="d-flex justify-content-center align-items-center mb-0 w-100">
                                <span class="w-25 input-group-text m-0 p-2 d-flex justify-content-center" id="inputGroup-sizing-sm">$</span>
                                <input type="number"
                                  name="Tasa de interes anual"
                                  className="w-100 border-secondary form-control  text-center p-2 m-0"
                                  placeholder="Tasa de interes anual"
                                  onChange={handlerEventChange2} />
                              </div><br />
                              <p className={solicitudData["Tasa de interes anual"] ? "text-success w-100 text-center" : "text-danger w-100 text-center"}>{solicitudData["Tasa de interes anual"] && solicitudData["Tasa de interes anual"].length ? "Correcto" : "*Debe rellenar el formulario"}</p>
                            </div>

                            <div className="d-flex flex-wrap mb-3">
                              <div class="d-flex justify-content-center align-items-center mb-0 w-100">
                                <span class="w-25 input-group-text m-0 p-2 d-flex justify-content-center" id="inputGroup-sizing-sm">$</span>
                                <input type="number"
                                  name="Precio de ventas"
                                  className="w-100 border-secondary form-control  text-center p-2 m-0"
                                  placeholder="Precio de ventas"
                                  onChange={handlerEventChange2} />
                              </div>
                              <p className={solicitudData["Precio de ventas"] ? "text-success w-100 text-center" : "text-danger w-100 text-center"}>{solicitudData["Precio de ventas"] && solicitudData["Precio de ventas"].length ? "Correcto" : "*Debe rellenar el formulario"}</p>
                            </div>

                            <div className="d-flex flex-wrap mb-3">
                              <div class="d-flex justify-content-center align-items-center mb-0 w-100">
                                <span class="w-25 input-group-text m-0 p-2 d-flex justify-content-center" id="inputGroup-sizing-sm">$</span>
                                <input type="number"
                                  name="Abono inicial sugerido"
                                  className="w-100 border-secondary form-control  text-center p-2 m-0"
                                  placeholder="Abono inicial sujerido"
                                  onChange={handlerEventChange2} />
                              </div>
                              <p className={solicitudData["Abono inicial sugerido"] ? "text-success w-100 text-center" : "text-danger w-100 text-center"}>{solicitudData["Abono inicial sugerido"] && solicitudData["Abono inicial sugerido"].length ? "Correcto" : "*Debe rellenar el formulario"}</p>
                            </div>

                            <br />
                          </div>



                        }
                        <br />
                        <div class="form-check">
                          <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" name="check" onChange={handlerEventChangeCheck} />
                          <label class="form-check-label" for="flexCheckDefault">
                            Acepto que se verifique mis referencias de credito al cpmpletar esta solicitud.
                          </label>
                        </div><br />
                        <button onClick={(e) => saveSolicitud(e, "solicitud")} className="btn-Cotizador col-6 btn btn-primary rounded-5 mb-5">Continuar</button>
































                      </div>
                    </form>

                    {preAprobacion == "no sirve" &&
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

                    {preAprobacion == true && <div className={"container card card-body shadow p-5"}>
                      <h3>Pre-Aprobacion</h3>
                      <p>Genial, estas pre-aprobado finaliza tu solicitud </p>

                      <p>Letra</p>
                      <p>Plazo</p>
                      <p>Taza</p>
                      <form action="" className="w-100 h3 btn-Cotizador text-light p-3 round-3">
                        <p className="text-center">¿Ya eligio propiedad?</p>
                        <div className="text-center">
                          <button className="w-25 btn btn-outline-info m-2" onClick={(e) => saveSolicitud(e, "preAprobacion")} >Si</button>
                          <button className="w-25 btn btn-outline-info m-2" onClick={(e) => saveSolicitud(e, "preAprobacion")}>No</button>
                        </div>

                      </form>
                    </div>}



                    {datosComplementarios == true && <div className={"container card card-body shadow p-5"}>

                      <form action="">
                        <h3>Datos complementarios</h3>
                        <div className="">
                          <input
                            onChange={handlerEventChange}
                            type="text"
                            name="Direccion Actual"
                            className=" w-100 border-secondary form-control mb-0 text-center"
                            placeholder="Direccion Actual"
                          ></input>
                          <p className={solicitudData["Direccion Actual"] ? "text-success m-0 w-100 text-center" : "text-danger w-100 text-center"}>{solicitudData["Direccion Actual"] ? "Correcto" : "**Debe rellenar el formulario"}</p>
                        </div>

                        <div className="">
                          <label htmlFor="">REFERENCIA PERSONAL #1</label>
                          <div className="d-flex w-100 p-0">



                            <div className="d-flex flex-wrap mb-0 p-0 w-100">
                              <input
                                onChange={handlerEventChange}
                                type="text"
                                name="Nombre Completo REF1"
                                className=" w-100 border-secondary form-control mb-0 mr-1 text-center"
                                placeholder="Nombre completo"
                              ></input>
                              <p className={solicitudData["Nombre Completo REF1"] ? "text-success m-0 w-100 text-center" : "text-danger w-100 text-center"}>{solicitudData["Nombre Completo REF1"] ? "Correcto" : "*Debe seleccionar una opcion"}</p>
                            </div>



                            <div className="text-light">_</div>



                            <div className="d-flex flex-wrap mb-0 p-0 w-100">

                              <div class="w-100 d-flex justify-content-center align-items-center mb-0 ml-1">
                                <span class="w-25 input-group-text m-0 p-2 d-flex justify-content-center" id="inputGroup-sizing-sm">+507</span>
                                <input
                                  onChange={handlerEventChange}
                                  type="number"
                                  name="Numero de Celular REF1"
                                  className="w-100 border-secondary form-control  text-center p-2 m-0"
                                  placeholder="Numero de Celuluar" />
                              </div>
                              <p className={solicitudData["Numero de Celular REF1"] ? "text-success w-100 text-center m-0" : "text-danger w-100 text-center m-0"}>{solicitudData["Numero de Celular REF1"] && solicitudData["Numero de Celular REF1"].length ? "Correcto" : "*Debe rellenar el formulario"}</p>
                            </div>



                          </div>
                        </div>
                        <div className="">
                          <label htmlFor="">REFERENCIA PERSONAL #2</label>
                          <div className="d-flex">

                            <div className="d-flex flex-wrap mb-0 p-0 w-100">

                              <input
                                onChange={handlerEventChange}
                                type="text"
                                name="Nombre Completo REF2"
                                className=" w-100 border-secondary form-control mb-0 mr-1 text-center"
                                placeholder="Nombre Completo"
                              ></input>
                              <p className={solicitudData["Nombre Completo REF2"] ? "text-success m-0 w-100 text-center" : "text-danger w-100 text-center"}>{solicitudData["Nombre Completo REF2"] ? "Correcto" : "*Debe seleccionar una opcion"}</p>
                            </div>
                            <div className="text-light">_</div>
                            <div className="text-light">_</div>

                            <div className="d-flex flex-wrap mb-0 p-0 w-100">

                              <div class="w-100 d-flex justify-content-center align-items-center mb-0 ml-1">
                                <span class="w-25 input-group-text m-0 p-2 d-flex justify-content-center" id="inputGroup-sizing-sm">+507</span>
                                <input type="number"
                                  name="Numero de Celular REF2"
                                  className="w-100 border-secondary form-control  text-center p-2 m-0"
                                  placeholder="Numero de Celular"
                                  onChange={handlerEventeChange} />
                              </div>
                              <p className={solicitudData["Numero de Celular REF2"] ? "text-success w-100 text-center m-0" : "text-danger w-100 text-center m-0"}>{solicitudData["Numero de Celular REF2"] && solicitudData["Numero de Celular REF2"].length ? "Correcto" : "*Debe rellenar el formulario"}</p>
                            </div>

                          </div>
                        </div>
                        <div className="">
                          <label htmlFor="">REFERENCIA PERSONAL #3</label>
                          <div className="d-flex">

                            <div className="d-flex flex-wrap mb-0 p-0 w-100">
                              <input
                                onChange={handlerEventChange}
                                type="text"
                                name="Nombre Completo REF3"
                                className=" w-100 border-secondary form-control mb-0 mr-1 text-center"
                                placeholder="Nombre Completo"
                              ></input>
                              <p className={solicitudData["Nombre Completo REF3"] ? "text-success w-100 text-center m-0" : "text-danger w-100 text-center m-0"}>{solicitudData["Nombre Completo REF3"] && solicitudData["Nombre Completo REF3"].length ? "Correcto" : "*Debe rellenar el formulario"}</p>
                            </div>

                            <div className="text-light">_</div>

                            <div className="d-flex flex-wrap mb-0 p-0 w-100">
                              <div class="w-100 d-flex justify-content-center align-items-center mb-0 ml-1">
                                <span class="w-25 input-group-text m-0 p-2 d-flex justify-content-center" id="inputGroup-sizing-sm">+507</span>
                                <input
                                  onChange={handlerEventChange}
                                  type="number"
                                  name="Numero de Celular REF3"
                                  className="w-100 border-secondary form-control  text-center p-2 m-0"
                                  placeholder="Numero de Celular"
                                />
                              </div>
                              <p className={solicitudData["Numero de Celular REF3"] ? "text-success w-100 text-center m-0" : "text-danger w-100 text-center m-0"}>{solicitudData["Numero de Celular REF3"] && solicitudData["Numero de Celular REF3"].length ? "Correcto" : "*Debe rellenar el formulario"}</p>
                            </div>




                          </div>
                        </div>
                        <div className="w-100 text-center">
                          <button className="btn-Cotizador col-6 btn btn-primary rounded-5 mb-5" onClick={(e) => saveSolicitud(e, "datosComplementarios")}> Guardar </button>
                        </div>

                      </form>



                    </div>}


                    {cargarDocumentos == true && <div className={"container card card-body shadow p-5"}>
                      <form action="" className=" w-100 d-flex flex-wrap">
                        <h3 className=" w-100">Cargar Documentos</h3>

                        <div className="w-50 text-center">
                          <label htmlFor="IdentificacionUno" className="w-75 btn btn-Cotizador btn-lg mb-3 text-light" >Subir identificacion 1 </label>
                          <input type="file" id="IdentificacionUno" name="Identificacion 1" style={{ display: "none" }} onChange={handlerUploadFile} accept="images" />
                          <img src={postsIMG[`${solicitudData.Cedula}Identificacion 1`]} style={{ width: "50%", height: "400px", objectFit: "cover", marginBottom: "15px" }} alt="" />
                        </div>
                        <div className="w-50 text-center">
                          <label htmlFor="Identificacion2" className="w-75 btn btn-Cotizador btn-lg mb-3 text-light" >Subir identificacion 2 </label>
                          <input type="file" id="Identificacion2" name="Identificacion 2" style={{ display: "none" }} onChange={handlerUploadFile} accept="images" />
                          <img src={postsIMG[`${solicitudData.Cedula}Identificacion 2`]} style={{ width: "50%", height: "400px", objectFit: "cover", marginBottom: "15px" }} alt="" />
                        </div>
                        <div className="w-50 text-center">
                          <label htmlFor="CartaDeTrabajo" className="w-75 btn btn-Cotizador btn-lg mb-3 text-light" >Subir carta de trabajo </label>
                          <input type="file" id="CartaDeTrabajo" name="Carta de trabajo" style={{ display: "none" }} onChange={handlerUploadFile} accept="images" />
                          <img src={postsIMG[`${solicitudData.Cedula}Carta de trabajo`]} style={{ width: "50%", height: "400px", objectFit: "cover", marginBottom: "15px" }} alt="" />
                        </div>
                        <div className="w-50 text-center">
                          <label htmlFor="FichaCSS" className="w-75 btn btn-Cotizador btn-lg mb-3 text-light" >Subir ficha de C.S.S </label>
                          <input type="file" id="FichaCSS" name="FichaCSS" style={{ display: "none" }} onChange={handlerUploadFile} accept="images" />
                          <img src={postsIMG[`${solicitudData.Cedula}FichaCSS`]} style={{ width: "50%", height: "400px", objectFit: "cover", marginBottom: "15px" }} alt="" />
                        </div>
                        <div className="w-50 text-center">
                          <label htmlFor="Talonario1" className="w-75 btn btn-Cotizador btn-lg mb-3 text-light" >Talonario 1 </label>
                          <input type="file" id="Talonario1" name="Talonario 1" style={{ display: "none" }} onChange={handlerUploadFile} accept="images" />
                          <img src={postsIMG[`${solicitudData.Cedula}Talonario 1`]} style={{ width: "50%", height: "400px", objectFit: "cover", marginBottom: "15px" }} alt="" />
                        </div>
                        <div className="w-50 text-center">
                          <label htmlFor="Talonario2" className="w-75 btn btn-Cotizador btn-lg mb-3 text-light">Talonario 2 </label>
                          <input type="file" id="Talonario2" name="Talonario 2" style={{ display: "none" }} onChange={handlerUploadFile} accept="images" />
                          <img src={postsIMG[`${solicitudData.Cedula}Talonario 2`]} style={{ width: "50%", height: "400px", objectFit: "cover", marginBottom: "15px" }} alt="" />
                        </div>
                        <div className="w-50 text-center">
                          <label htmlFor="Contrato" className="w-75 btn btn-Cotizador btn-lg mb-3 text-light" >Subir contrato o proforma </label>
                          <input type="file" id="Contrato" name="Contrato" style={{ display: "none" }} onChange={handlerUploadFile} accept="images" />
                          <img src={postsIMG[`${solicitudData.Cedula}Contrato`]} style={{ width: "50%", height: "400px", objectFit: "cover", marginBottom: "15px" }} alt="" />
                        </div>
                        <div className="w-100 text-center">
                          <button className="btn-Cotizador col-6 btn btn-primary rounded-5 mb-5" onClick={(e) => saveSolicitud(e, "SaveAll")}>Enviar solicitud</button>
                        </div>
                      </form>
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
      </div >
    </div >
  );
}

export default Cotizar;
