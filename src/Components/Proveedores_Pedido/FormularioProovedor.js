import { IoChevronBackCircleSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { Nav } from "reactstrap";
import { useState, useEffect } from 'react';
import { FormularioDProveedor } from '../Detalle/FormularioDProveedor';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

export function FormularioProveedor() {
    const navigate = useNavigate()
    const ID = sessionStorage.getItem('id_usuario')
    const [pedidoId, setPedidoId] = useState(null);
    const [showDiv, setShowDiv] = useState(false);
    const [showDiv1, setShowDiv1] = useState(true);

    const toggleDiv = () => {
        setShowDiv(!showDiv);
    };

    const toggleDiv1 = () => {
        setShowDiv1(!showDiv1);
    };

    const [pedido, setPedido] = useState([{
        estado: "",
        id_usuario: ID,
        nombre_cliente: "",
        factura_electronica: 0,
        detalle_factura: "",
        metodo_envio: "",
        direccion_envio: "",
        urgencia: "",
        tipo_pedido: "",
        sucursal: "",
        codigo: "",

    }]);

    const enviarDatosPedido = async () => {
        try {

            const params = {
                estado: "Pendiente",
                id_usuario: parseInt(ID),
                nombre_cliente: "Proveedor",
                factura_electronica: 0,
                detalle_factura: pedido.detalle_factura,
                metodo_envio: "",
                direccion_envio: "",
                urgencia: "",
                tipo_pedido: "Proveedor",
                sucursal: pedido.sucursal,
                codigo: "NA"
            };
            const response = await fetch("https://AfigoControl.somee.com/API/api/pedido/create", {
                method: 'POST',
                body: JSON.stringify(params),
                headers: {
                    'Content-Type': "application/json; charset=utf-8",
                    "Authorization": sessionStorage.getItem('Token')
                }
            });

            if (response.ok) {
                const data = await response.json();
                // Hacer algo con la respuesta de la API si es necesario
                const idPedido = data.pedido.id_pedido;
                // Almacena el valor en el estado
                setPedidoId(idPedido);
                console.log("ID ID ID:", pedidoId)
                toggleDiv();
                toggleDiv1()
                toast.success('Pedido a proveedor creado con éxito', {
                    position: 'top-right',
                    autoClose: 3000, // Duración en milisegundos
                    hideProgressBar: false,
                });
            } else {
                // Manejar errores de la API
                console.error("Error al enviar los datos del pedido a la API");
            }
        } catch (error) {
            console.error("Error en la solicitud POST:", error);
        }
    };


    return (
        <><Nav />
            <section class="flex flex-col w-full justify-center items-center">
                <ToastContainer />
                <div class="self-start ml-20 mt-10">
                    <button onClick={() => navigate('/Proveedores')}><IoChevronBackCircleSharp class="w-10 h-10 fill-navy" /></button>
                </div>
                <div class="flex flex-col w-[90%] justify-center items-center shadow-lg rounded-2xl">
                    <div class="pt-8 pb-8 bg-royal w-full rounded-t-2xl text-center">
                        <h1 class="text-4xl font-bold text-white">Formulario de pedidos a proveedores</h1>
                    </div>
                    <div class="flex flex-col w-1/2 justify-center items-center pt-4 w-full">


                        <div class="flex flex-col m-4 w-[90%] justify-center items-center">
                            <label class="font-semibold">Sucursal</label>
                            <select class="border border-navy w-[100%] p-1" value={pedido.sucursal}
                                onChange={(e) => setPedido({ ...pedido, sucursal: e.target.value })}>
                                <option value=""></option>
                                <option value="Palmares">Palmares</option>
                                <option value="Sarchí">Sarchí</option>
                                <option value="Nicoya">Nicoya</option>
                                <option value="Cóbano">Cóbano</option>
                            </select>
                        </div>

                        {showDiv1 && <button onClick={enviarDatosPedido} class="bg-navy text-white font-semibold p-3 pl-4 pr-4 mb-4 rounded-xl">Enviar</button>}


                    </div>
                    {showDiv && <FormularioDProveedor idPedido={pedidoId}></FormularioDProveedor>}

                    <div class="flex flex-col items-center justify-center mt-2 mb-4">
                        <button class="bg-navy text-white font-semibold p-3 pl-4 pr-4 mb-4 rounded-xl" onClick={() => navigate('/Proveedores')}>Listo</button>
                    </div>
                </div>

            </section>



        </>
    )
}