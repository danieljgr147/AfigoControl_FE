import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { All } from '../../API/usuarios'
import { Nav } from "../Nav"
import { Sidebar } from "../Sidebar"
import ModalForm from './Modal'
import Tabla from "./Tabla"

export function Usuarios() {
    const navigate = useNavigate()

    const [usuario, setUsuario] = useState([{
        user_id: 0,
        nombre: "",
        direccion: "",
        usuario_admin: 0,
        nombre_de_usuario: "",
        contrasenia: ""
    }]);

    useEffect(() => {
        refrescarInformacion()
    }, []);

    const refrescarInformacion = () => {
        All()
            .then(async res => await res)
            .then(
                (result) => {
                    console.log(result)
                    setUsuario(result);
                },
                (error) => {
                    console.log(error);
                }
            )
    };


    return (
        <><Nav /><section class="flex flex-row w-full h-full">

                <Sidebar class="w-3/12 h-auto" />

            <section class="alex flex-col w-9/12 ml-14">
                <div class="m-5 p-5 "> 
                    <button class="bg-grotto p-5 rounded-full font-bold border-none shadow-md text-royal drop-shadow-2xl" onClick={() => navigate('/NuevoUsuario')}>Nuevo Usuario</button>
                </div>
                    <Tabla
                        usuario={usuario}  
                        updateState={refrescarInformacion}
                        id="tabla" />
            </section>
        </section></> 


    )
}

/*cambios pasados  <ModalForm class="bg-grotto p-5 rounded-full font-bold border-none shadow-md text-royal drop-shadow-2xl" buttonLabel="Nuevo Usuario" addItemToState={refrescarInformacion} />*/