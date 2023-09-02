import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useParams, useNavigate } from "react-router-dom";
import { usePcContext } from "./Context";

const EditPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { updateStock, stock } = usePcContext();

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

    useEffect(() => {
        fetchCurso();
    }, []);

    const fetchCurso = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/api/cursos/${id}`);
            setCurso(response.data);
            setEditedCurso(response.data); // Inicializar los campos con el valor del curso
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
        event.preventDefault(); // Evita la recarga automática de la página

        // Calcula la diferencia entre la cantidad anterior y la nueva cantidad
        const cantidadDiferencia = editedCurso.cantidad - curso.cantidad;

        if (cantidadDiferencia > 0) {
            // Verifica si hay suficiente stock para la nueva cantidad
            if (stock - cantidadDiferencia >= 0) {
                try {
                    // Actualiza el curso si hay suficiente stock
                    await axios.put(`http://localhost:3001/api/cursos/${id}`, editedCurso);
                    setMessage("Curso actualizado correctamente");

                    // Ajusta el stock en consecuencia
                    const newStock = stock - cantidadDiferencia;
                    updateStock(newStock);

                    // Navega de regreso al home después de guardar los cambios
                    navigate({ pathname: "/" });
                } catch (error) {
                    console.error("Error updating curso:", error);
                    setMessage("Hubo un error al actualizar el curso");
                }
            } else {
                Swal.fire("ERROR", "No hay suficiente stock para la nueva cantidad", "error");
            }
        } else {
            // Si la cantidad no cambia, simplemente actualiza el curso sin verificar el stock
            try {
                await axios.put(`http://localhost:3001/api/cursos/${id}`, editedCurso);
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
                                value={editedCurso.nombre || ""} // Inicializar con el valor del curso
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
                            <label>Codigo de computadora:</label>

                            <textarea
                                className="form-control"
                                placeholder="Ingresar codigo de computadora"
                                required
                                name="codigo"
                                value={editedCurso.codigo}
                                onKeyDown={handleCodigoKeyDown}
                                onChange={handleInputChange}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary form-control" onClick={alert}>
                            Guardar cambios
                        </button>
                        <p>{message}</p>
                    </form>
                </div>
            </div>
        </div>
    );
};
export default EditPage;
