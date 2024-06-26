
import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';


export function EditarV({ buttonLabel, item, updateState, pedidoId }) {
    const ID = pedidoId;
  
    const IDusuario = sessionStorage.getItem('id_usuario')
    const [editedItem, setEditedItem] = useState(item);

    const onChange = (e) => {
        setEditedItem({
            ...editedItem,
            [e.target.name]: e.target.value
        });
    };

    const submitFormEdit = async (e) => {
        e.preventDefault();
        console.log(ID);
        try {
            const params = {
                id_pedido: ID,
                estado: e.target.estado.value,
                nombre_cliente: e.target.nombre_cliente.value,
                factura_electronica: parseInt(e.target.factura_electronica.value),
                detalle_factura: e.target.detalle_factura.value,
                metodo_envio: e.target.metodo_envio.value,
                direccion_envio: e.target.direccion_envio.value,
                urgencia: e.target.urgencia.value,
                tipo_pedido: "Pedido",
                codigo:"NA",
            };
            console.log(params);

            const response = await fetch("https://AfigoControl.somee.com/API/api/pedido/update", {
                method: 'PUT',
                body: JSON.stringify(params),
                headers: {
                    'Content-Type': "application/json; charset=utf-8",
                    "Authorization": sessionStorage.getItem('Token')
                }
            });

            if (response.ok) {
                const data = await response.json();
                // Hacer algo con la respuesta de la API si es necesario
                console.log(data);
                toast.success('Pedido actualizado con éxito', {
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

    useEffect(() => {
        if (editedItem) {
            const {id_pedido, estado, id_usuario, nombre_cliente, factura_electronica, detalle_factura, metodo_envio, direccion_envio, urgencia, tipo_pedido } = editedItem;
            setEditedItem({ id_pedido, estado, id_usuario, nombre_cliente, factura_electronica, detalle_factura, metodo_envio, direccion_envio, urgencia, tipo_pedido });
        }
    }, [editedItem]);

    return (
        <section class="absolute top-40 left-1 w-full h-full flex flex-col items-center">
            <ToastContainer />
            <div class="min-w-[35%] bg-white p-1  flex flex-col shadow-[4px_10px_60px_800px_rgba(0,0,0,0.3)] rounded-xl" >
                <form onSubmit={submitFormEdit} class="grid">
                    <input class="border border-navy w-1/2 text-[1.05rem] p-1 rounded-md"
                        type="text"
                        name="id_usuario"
                        id="id_usuario"
                        onChange={onChange}
                        value={editedItem.id_usuario === null ? "" : editedItem.id_usuario}
                        style={{ display: 'none' }}
                    />
                    <input class="border border-navy w-1/2 text-[1.05rem] p-1 rounded-md"
                        type="text"
                        name="tipo_pedido"
                        id="tipo_pedido"
                        onChange={onChange}
                        value={editedItem.tipo_pedido === null ? "" : editedItem.tipo_pedido}
                        style={{ display: 'none' }}
                    />
                    <div class="flex flex-col m-4 w-full justify-center items-center justify-self-center">
                        <label class="font-semibold">Nombre del cliente</label>
                        <input class="border border-navy w-1/2"
                            name="nombre_cliente"
                            id="nombre_cliente"
                            value={editedItem.nombre_cliente === null ? "" : editedItem.nombre_cliente}
                            onChange={onChange}></input>
                    </div>

                    <div class="flex flex-col m-4 w-full justify-center items-center justify-self-center">
                        <label class="font-semibold">Tipo de factura</label>
                        <select class="border border-navy w-1/2"
                            name="factura_electronica"
                            id="factura_electronica"
                            value={editedItem.factura_electronica === null ? "" : editedItem.factura_electronica}
                            onChange={onChange}>
                            <option value={2}></option>
                            <option value={0}>Factura electronica</option>
                            <option value={1}>Factura fisica</option>
                        </select>
                    </div>

                    <div class="flex flex-col m-4 w-full justify-center items-center justify-self-center">
                        <label class="font-semibold">Informacion para factura</label>
                        <input class="border border-navy w-1/2"
                            name="detalle_factura"
                            id="detalle_factura"
                            value={editedItem.detalle_factura === null ? "" : editedItem.detalle_factura}
                            onChange={onChange}></input>
                    </div>

                    <div class="flex flex-col m-4 w-full justify-center items-center justify-self-center">
                        <label class="font-semibold">Metodo de envio</label>
                        <select class="border border-navy w-1/2"
                            name="metodo_envio"
                            id="metodo_envio"
                            value={editedItem.metodo_envio === null ? "" : editedItem.metodo_envio}
                            onChange={onChange}>
                            <option value=""></option>
                            <option value="Express">Express</option>
                            <option value="Encomienda">Encomienda</option>
                        </select>
                    </div>


                    <div class="flex flex-col m-4 w-full justify-center items-center justify-self-center">
                        <label class="font-semibold">Direccion</label>
                        <input class="border border-navy w-1/2"
                            name="direccion_envio"
                            id="direccion_envio"
                            value={editedItem.direccion_envio === null ? "" : editedItem.direccion_envio}
                            onChange={onChange}></input>
                    </div>

                    <div class="flex flex-col m-4 w-full justify-center items-center justify-self-center">
                        <label class="font-semibold">Estado</label>
                        <select class="border border-navy w-1/2"
                            name="estado"
                            id="estado"
                            value={editedItem.estado === null ? "" : editedItem.estado}
                            onChange={onChange}>
                            <option value=""></option>
                            <option value="Pendiente">Pendiente</option>
                            <option value="Listo">Listo</option>
                            <option value="Sin inventario">Sin inventario</option>
                        </select>
                    </div>

                    <div class="flex flex-col m-4 w-full justify-center items-center justify-self-center">
                        <label class="font-semibold">Urgencia</label>
                        <select class="border border-navy w-1/2"
                            name="urgencia"
                            id="urgencia"
                            value={editedItem.urgencia === null ? "" : editedItem.urgencia}
                            onChange={onChange}>
                            <option value=""></option>
                            <option value="Leve">Leve</option>
                            <option value="Moderado">Moderado</option> 
                            <option value="Urgente">Urgente</option>
                        </select>
                    </div>
                    <div class="flex flex-col m-4 w-full justify-center items-center justify-self-center">
                        <button type='submit' class="bg-navy text-white font-semibold p-3 pl-4 pr-4 mb-4 rounded-xl min-w-1/5">Enviar</button>
                    </div>
                </form>

            </div>
        </section>

    );
}

/* id_pedido: ID,
                estado: "listo",
                id_usuario: 1,
                nombre_cliente: e.target.nombre_cliente.value,
                factura_electronica: parseInt(e.target.factura_electronica.value),
                detalle_factura: e.target.detalle_factura.value,
                metodo_envio: e.target.metodo_envio.value,
                direccion_envio: e.target.direccion_envio.value,
                urgencia: e.target.urgencia.value,
                tipo_pedido: "Pedido"*/