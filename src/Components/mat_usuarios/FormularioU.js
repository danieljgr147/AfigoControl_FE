import { IoChevronBackCircleSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { Nav } from "reactstrap";
import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

export function FormularioU() {
    const navigate = useNavigate()

    const [usuario, setUsuario] = useState([{
        nombre: "",
        direccion: "",
        usuario_admin: 0,
        nombre_de_usuario: "",
        contrasenia: "",
        sucursal: ""
    }]);

    const enviarDatos = async () => {
        try {
            const params = {
                nombre: usuario.nombre,
                direccion: usuario.direccion,
                usuario_admin: parseInt(usuario.usuario_admin),
                nombre_de_usuario: usuario.nombre_de_usuario,
                contrasenia: usuario.contrasenia,
                sucursal: usuario.sucursal
            }
            const response = await fetch("https://AfigoControl.somee.com/API/api/user/create", {
                method: 'POST',
                body: JSON.stringify(params),
                headers: {
                    'Content-Type': "application/json; charset=utf-8",
                    "Authorization": sessionStorage.getItem('Token')
                }
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                toast.success('Usuario creado con éxito', {
                    position: 'top-right',
                    autoClose: 3000, // Duración en milisegundos
                    hideProgressBar: false,
                });
            } else {
                // Manejar errores de la API
                console.error("Error al enviar los datos a la API");
            }
        } catch (error) {
            console.error("Error en la solicitud POST:", error);
        }
    };

    return (
        <>
            <Nav />
            <ToastContainer />
            <section class="flex flex-col w-full justify-center items-center">
                <div class="self-start ml-20 mt-10">
                    <button onClick={() => navigate('/Usuarios')}><IoChevronBackCircleSharp class="w-10 h-10 fill-navy" /></button>
                </div>
                <div class="pt-8 ">
                    <h1 class="text-4xl font-bold text-royal">Formulario de usuarios</h1>
                </div>
                <div class="flex flex-col w-1/2 justify-center items-center pt-20">

                    <div class="flex flex-col m-4 w-full justify-center items-center">
                        <label class="font-semibold">Nombre</label>
                        <input class="border border-navy w-1/2"
                            value={usuario.nombre}
                            onChange={(e) => setUsuario({ ...usuario, nombre: e.target.value })}></input>
                    </div>

                    <div class="flex flex-col m-4 w-full justify-center items-center">
                        <label class="font-semibold">Direccion</label>
                        <input class="border border-navy w-1/2"
                            value={usuario.direccion}
                            onChange={(e) => setUsuario({ ...usuario, direccion: e.target.value })}></input>
                    </div>

                    <div class="flex flex-col m-4 w-full justify-center items-center">
                        <label class="font-semibold">Administrador</label>
                        <select class="border border-navy w-1/2"
                            value={usuario.usuario_admin}
                            onChange={(e) => setUsuario({ ...usuario, usuario_admin: e.target.value })}>
                            <option value="2" class="border border-navy w-1/2">  </option>
                            <option value="0" class="border border-navy w-1/2">No</option>
                            <option value="1" class="border border-navy w-1/2">Si</option>
                        </select>

                    </div>

                    <div class="flex flex-col m-4 w-full justify-center items-center">
                        <label class="font-semibold">Nombre de usuario</label>
                        <input class="border border-navy w-1/2"
                            value={usuario.nombre_de_usuario}
                            onChange={(e) => setUsuario({ ...usuario, nombre_de_usuario: e.target.value })}></input>
                    </div>

                    <div class="flex flex-col m-4 w-full justify-center items-center">
                        <label class="font-semibold">Contraseña</label>
                        <input class="border border-navy w-1/2"
                            value={usuario.contrasenia}
                            onChange={(e) => setUsuario({ ...usuario, contrasenia: e.target.value })}></input>
                    </div>

                    <div class="flex flex-col m-4 w-full justify-center items-center">
                        <label class="font-semibold">Sucursal</label>
                        <select class="border border-navy w-1/2"
                            value={usuario.sucursal}
                            onChange={(e) => setUsuario({ ...usuario, sucursal: e.target.value })}>
                            <option value="" class="border border-navy w-1/2">  </option>
                            <option value="Palmares">Palmares</option>
                            <option value="Sarchí">Sarchí</option>
                            <option value="Nicoya">Nicoya</option>
                            <option value="Cóbano">Cóbano</option>
                        </select>

                    </div>

                    <button onClick={enviarDatos} class="bg-navy text-white font-semibold p-3 pl-4 pr-4 mb-8 rounded-xl">Enviar</button>

                </div>
            </section>
        </>
    )
}