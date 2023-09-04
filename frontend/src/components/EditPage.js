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
    };

    const [curso, setCurso] = useState({});
    const [editedCurso, setEditedCurso] = useState({});
    const [message, setMessage] = useState("");
    const [usuario, setUsuario] = useState(ValorInicial);
    const [codigoAEliminar, setCodigoAEliminar] = useState("");
    const [codigoTextareaHeight, setCodigoTextareaHeight] = useState("auto");

    useEffect(() => {
        fetchCurso();
    }, []);

    const fetchCurso = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/api/cursos/${id}`);
            setCurso(response.data);

            // Formatea la hora de entrega en la zona horaria de Argentina (Buenos Aires)
            const horaEntregaArgentina = moment(response.data.horaEntrega)
                .tz("America/Argentina/Buenos_Aires")
                .format("YYYY-MM-DD HH:mm:ss");

            // Modifica el objeto editedCurso para incluir la hora de entrega formateada
            setEditedCurso({ ...response.data, horaEntrega: horaEntregaArgentina });
        } catch (error) {
            console.error("Error fetching curso:", error);
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setEditedCurso((prevCurso) => ({
            ...prevCurso,
            [name]: value,
        }));
    };
    const handleSubmit = async (event) => {
        event.preventDefault();

        const cantidadDiferencia = editedCurso.cantidad - curso.cantidad;

        if (cantidadDiferencia > 0) {
            if (stock - cantidadDiferencia >= 0) {
                try {
                    await axios.put(`http://localhost:3001/api/cursos/${id}`, editedCurso);
                    setMessage("Curso actualizado correctamente");

                    const newStock = stock - cantidadDiferencia;
                    updateStock(newStock); // Actualiza el stock utilizando el contexto

                    navigate({ pathname: "/" });
                } catch (error) {
                    console.error("Error updating curso:", error);
                    setMessage("Hubo un error al actualizar el curso");
                }
            } else {
                Swal.fire("ERROR", "No hay suficiente stock para la nueva cantidad", "error");
            }
        } else {
            try {
                await axios.put(`http://localhost:3001/api/cursos/${id}`, editedCurso);
                setMessage("Curso actualizado correctamente");
                fetchCurso(); // Recargar los datos del curso después de la actualización
            } catch (error) {
                console.error("Error updating curso:", error);
                setMessage("Hubo un error al actualizar el curso");
            }
        }
    };


    const alert = () => {
        Swal.fire({
            title: "Do you want to save the changes?",
            confirmButtonText: "Save",
        }).then((result) => {
            if (result.isConfirmed) {
                navigate({ pathname: "/" });
            }
        });
    };

    const handleCodigoKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            const updatedCodigo = editedCurso.codigo.trim() + "/";
            setEditedCurso((prevCurso) => ({
                ...prevCurso,
                cantidad: prevCurso.cantidad + 1,
                codigo: updatedCodigo,
            }));
        } else if (e.key === "Backspace" && editedCurso.codigo.endsWith("/")) {
            e.preventDefault();
            const updatedCodigo = editedCurso.codigo.slice(0, -1);
            setEditedCurso((prevCurso) => ({
                ...prevCurso,
                cantidad: prevCurso.cantidad - 1,
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
    }, [editedCurso.codigo]);

    const eliminarCodigo = () => {
        if (codigoAEliminar.trim() === "") {
            // Si el campo de eliminar código está vacío, muestra una alerta
            Swal.fire("ADVERTENCIA", "Ingrese un código a eliminar", "warning");
            return;
        }

        const codigoAEliminarRegex = new RegExp(`${codigoAEliminar}/`, "g");

        // Verificar si el código a eliminar existe en la cadena actual
        if (!editedCurso.codigo.match(codigoAEliminarRegex)) {
            Swal.fire("ADVERTENCIA", "El código a eliminar no existe en la cadena", "warning");
            return;
        }

        const codigoActualizado = editedCurso.codigo.replace(codigoAEliminarRegex, "");
        setEditedCurso((prevCurso) => ({
            ...prevCurso,
            cantidad: prevCurso.cantidad - 1, // Restar 1 al contador al eliminar un código
            codigo: codigoActualizado,
        }));
        setCodigoAEliminar(""); // Reiniciar el campo de código a eliminar

        // Actualizar el stock
        const codigoEliminado = editedCurso.codigo.match(new RegExp(codigoAEliminar, "g"));
        if (codigoEliminado) {
            const cantidadEliminada = codigoEliminado.length;
            updateStock(stock + cantidadEliminada); // Incrementar o decrementar el stock según la cantidad eliminada
        }
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
                                value={editedCurso.nombre || ""}
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
                                value={editedCurso.profesor}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="mb-3">
                            <label>Cantidad:</label>
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Ingresar cantidad de computadoras retiradas"
                                required
                                name="cantidad"
                                value={editedCurso.cantidad}
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
                                value={editedCurso.horaEntrega}
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
                                value={editedCurso.codigo}
                                onKeyDown={handleCodigoKeyDown}
                                onChange={(e) => {
                                    setEditedCurso((prevCurso) => ({
                                        ...prevCurso,
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
                                ref={codigoDelRef} // Asignar la referencia al campo
                                className="form-control"
                                placeholder="Ingrese el código a eliminar"
                                value={codigoAEliminar}
                                onChange={(e) => setCodigoAEliminar(e.target.value)}
                            />
                        </div>

                        <div className="mb-2">
                            <button type="button" className="btn btn-danger btn-sm form-control" onClick={eliminarCodigo}>
                                Eliminar código
                            </button>
                        </div>

                        <div className="mb-2">
                            <button type="submit" className="btn btn-primary form-control" onClick={alert}>
                                Guardar cambios
                            </button>
                        </div>

                        <p>{message}</p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditPage;