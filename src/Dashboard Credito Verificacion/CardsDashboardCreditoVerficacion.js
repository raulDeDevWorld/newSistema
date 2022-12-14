import React from "react";
import Card from "./CardDashboardCreditoVerficacion";
import image1 from "../assets/pendientes.png";
import image2 from '../assets/Credito Verificacion VERIFICADAS.png'



const cards = [
  {
    id: 1,
    title: "Pendientes",
    image: image1,
    link: "/PendientesCV",
    text: "Revisa las solicitudes que aún están pendientes",
    buttontext: "Pendientes"
  },
  {
    id: 2,
    title: "Verificadas",
    image: image2,
    link: "/Verificadas",
    text: "Descripcion pendiente",
    buttontext: "Cartas"
  },

];

function Cards() {
  return (
    <div className="container d-flex justify-content-center align-items-center h-100 ">
      <div className="row">
        {cards.map(({ title, image, url, id, text, link, buttontext }) => (
          <div className="col-6" key={id}>
            <Card imageSource={image} title={title} url={url} text={text} buttontext={buttontext}
            link={link}/>
          </div>
          
        ))}
        
      </div>

    </div>
  );
}

export default Cards;
