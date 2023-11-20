import React, { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useParams, useNavigate } from "react-router-dom";
import { pcContext } from "./Context"; // Importa el contexto
import moment from "moment-timezone";

const EditPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { stock, updateStock } = useContext(pcContext); // Usa el contexto

    const ValorInicial = {
        nombre: "",
        profesor: "",
        horaRetirada: "",
        cantidad: 0,
        horaEntrega: "",
        codigo: "",
        tipoArticulo: [],
    };

    const [curso, setCurso] = useState({});
    const [formData, setFormData] = useState(ValorInicial);
    const [message, setMessage] = useState("");
    const [codigoAEliminar, setCodigoAEliminar] = useState("");
    const [codigoTextareaHeight, setCodigoTextareaHeight] = useState("auto");

    useEffect(() => {
        fetchCurso();
    }, []);

    const fetchCurso = async () => {
        try {
            const response = await axios.get(`/api/cursos/${id}`);
            setCurso(response.data);

            // Formatea la hora de entrega en la zona horaria de Argentina (Buenos Aires)
            const horaEntregaArgentina = moment(response.data.horaEntrega)
                .tz("America/Argentina/Buenos_Aires")
                .format("YYYY-MM-DD HH:mm:ss");

            // Antes de asignar a formData.tipoArticulo, asegúrate de que sea un array de strings
            const tipoArticulo = Array.isArray(response.data.tipoArticulo)
                ? response.data.tipoArticulo
                : [response.data.tipoArticulo];

            // Asigna tipoArticulo a formData.tipoArticulo
            setFormData({ ...response.data, horaEntrega: horaEntregaArgentina, tipoArticulo });
        } catch (error) {
            console.error("Error fetching curso:", error);
        }
    };

    const handleInputChange = (event) => {
        const { name, value, options } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: name === "tipoArticulo" ? Array.from(options).filter((option) => option.selected).map((option) => option.value) : value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const cantidadDiferencia = formData.cantidad - curso.cantidad;

        if (cantidadDiferencia > 0) {
            if (stock - cantidadDiferencia >= 0) {
                try {
                    await axios.put(`http://localhost:3001/api/cursos/${id}`, formData);
                    setMessage("Curso actualizado correctamente");

                    const newStock = stock - cantidadDiferencia;
                    updateStock(newStock);

                    navigate({ pathname: "/" });
                } catch (error) {
                    console.error("Error updating curso:", error);
                    setMessage("Hubo un error al actualizar el curso"); // Esto mostrará un mensaje de error en caso de falla
                }
            } else {
                Swal.fire("ERROR", "No hay suficiente stock para la nueva cantidad", "error");
            }
        } else {
            try {
                await axios.put(`http://localhost:3001/api/cursos/${id}`, formData);
                setMessage("Curso actualizado correctamente");
                fetchCurso();
            } catch (error) {
                console.error("Error updating curso:", error);
                setMessage("Hubo un error al actualizar el curso");
            }
        }
    };

    const alert = () => {
        Swal.fire({
            title: "Do you want to save the changes?",
            showCancelButton: true, // Mostrar el botón de cancelar
            confirmButtonText: "Save",
        }).then((result) => {
            if (result.isConfirmed) {
                guardarCambios(); // Llamar a la función para guardar los cambios aquí
            }
        });
    };

    const guardarCambios = async () => {
        // Tu código para guardar los cambios
        try {
            await axios.put(`http://localhost:3001/api/cursos/${id}`, formData);
            setMessage("Curso actualizado correctamente");
            fetchCurso();
        } catch (error) {
            console.error("Error updating curso:", error);
            setMessage("Hubo un error al actualizar el curso");
        }
        navigate({ pathname: "/" }); // Redirigir después de guardar los cambios
    };

    const handleCodigoKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            const updatedCodigo = `${formData.codigo.trim()}/`; // Agrega una barra "/" al valor actual

            setFormData((prevData) => ({
                ...prevData,
                cantidad: prevData.cantidad + 1, // Incrementar la cantidad
                codigo: updatedCodigo,
            }));

            // Actualizar el stock restando 1
            updateStock(stock - 1);
        } else if (e.key === "Backspace" && formData.codigo.endsWith(" ")) {
            e.preventDefault();
            const updatedCodigo = formData.codigo.slice(0, -1);
            setFormData((prevData) => ({
                ...prevData,
                cantidad: prevData.cantidad - 1, // Restar 1 a la cantidad
                codigo: updatedCodigo,
            }));
        }
    };


    const ajustarAlturaTextarea = () => {
        const textarea = document.getElementById("codigo-textarea");
        textarea.style.height = "auto";
        textarea.style.height = `${textarea.scrollHeight}px`;
    };

    useEffect(() => {
        ajustarAlturaTextarea();
    }, [formData.codigo]);


    const eliminarCodigo = () => {
        if (codigoAEliminar.trim() === "") {
            // Si el campo de eliminar código está vacío, muestra una alerta
            Swal.fire("ADVERTENCIA", "Ingrese códigos a eliminar separados por comas", "warning");
            return;
        }

        const codigosAEliminar = codigoAEliminar.split(",").map((codigo) => codigo.trim());

        if (codigosAEliminar.length === 0) {
            Swal.fire("ADVERTENCIA", "Ingrese códigos a eliminar separados por comas", "warning");
            return;
        }

        let codigoActualizado = formData.codigo;
        let cantidadEliminada = 0;

        codigosAEliminar.forEach((codigoEliminar) => {
            const codigoAEliminarRegex = new RegExp(`${codigoEliminar}\\/`, "g"); // Buscar códigos seguidos de una barra "/"

            // Verificar si el código a eliminar existe en la cadena actual
            if (codigoActualizado.match(codigoAEliminarRegex)) {
                codigoActualizado = codigoActualizado.replace(codigoAEliminarRegex, "");
                cantidadEliminada++;
            }
        });

        if (cantidadEliminada === 0) {
            Swal.fire("ADVERTENCIA", "Los códigos a eliminar no existen en la cadena", "warning");
            return;
        }

        setFormData((prevData) => ({
            ...prevData,
            cantidad: prevData.cantidad - cantidadEliminada, // Restar cantidadEliminada al contador
            codigo: codigoActualizado,
        }));

        setCodigoAEliminar(""); // Reiniciar el campo de código a eliminar

        // Actualizar el stock
        updateStock(stock + cantidadEliminada); // Incrementar el stock según la cantidad eliminada
    };

    const codigoDelRef = useRef(null);
    useEffect(() => {
        // Enfocar el campo de código al cargar el componente
        if (codigoDelRef.current) {
            codigoDelRef.current.focus();
        }
    }, []);

    return (
        <div className="Crear flexContainer">
            <div className="col-md-10 listas offset-md-3 align-center formCard">
                <div className="card card-body">
                    <form onSubmit={handleSubmit}>
                        <h2 className="text-center">Editar Curso</h2>

                        <div className="mb-3">
                            <label>Nombre:</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre del curso"
                                required
                                name="nombre"
                                value={formData.nombre || ""}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="mb-3">
                            <label>Curso:</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Ingresar nombre del profesor"
                                required
                                name="profesor"
                                value={formData.profesor}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="mb-3">
                            <label>Seleccionar tipo(s) de dispositivos:</label>
                            <select
                                className="form-control"
                                required
                                name="tipoArticulo"
                                multiple // Permitir selecciones múltiples
                                value={formData.tipoArticulo}
                                onChange={handleInputChange}
                            >
                                <option value="notebook">Notebook</option>
                                <option value="proyecto">Proyector</option>
                                <option value="parlante">Parlante</option>
                                {/* Agrega más opciones según tus necesidades */}
                            </select>
                        </div>

                        <div className="mb-3">
                            <label>Cantidad:</label>
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Ingresar cantidad de computadoras retiradas"
                                required
                                name="cantidad"
                                value={formData.cantidad}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="mb-3">
                            <label>Hora de Entrega:</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Ingrese la hora de entrega"
                                required
                                name="horaEntrega"
                                value={formData.horaEntrega}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="mb-3">
                            <label>Codigo de computadora:</label>
                            <textarea
                                id="codigo-textarea"
                                className="form-control"
                                placeholder="Ingresar codigo de computadora"
                                required
                                name="codigo"
                                value={formData.codigo}
                                onKeyDown={handleCodigoKeyDown}
                                onChange={(e) => {
                                    setFormData((prevData) => ({
                                        ...prevData,
                                        codigo: e.target.value,
                                    }));
                                    ajustarAlturaTextarea();
                                }}
                                style={{ height: codigoTextareaHeight }}
                            />
                        </div>

                        <div className="mb-3">
                            <label>Eliminar código:</label>
                            <input
                                type="text"
                                ref={codigoDelRef}
                                className="form-control"
                                placeholder="Ingrese el código a eliminar"
                                value={codigoAEliminar}
                                onChange={(e) => setCodigoAEliminar(e.target.value)}
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter') {
                                        setCodigoAEliminar((prevValue) => prevValue + ','); // Agrega una coma al valor actual
                                        e.preventDefault(); // Evita que se agregue una nueva línea (Enter) en el campo
                                    }
                                }}
                            />
                        </div>

                        <div className="mb-2">
                            <div
                                className="btn btn-danger btn-sm form-control"
                                onClick={eliminarCodigo}
                            >
                                Eliminar código
                            </div>
                        </div>

                        <div className="mb-2">
                            <div

                                className="btn btn-primary form-control"
                                onClick={alert}
                            >
                                Guardar cambios
                            </div>
                        </div>

                        <p>{message}</p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditPage;