const { pool } = require("../database");

const responseObject = (success, data = null, message = '') => {
    return {
        success,
        data,
        message
    };
};

// Obtener un alumno por ID o todos los alumnos
const getStudent = async (request, response) => {
    try {
        let sql;
        const params = [];

        // Verificar si se proporciona student_id como parámetro de consulta
        if (!request.query.student_id && !request.params.student_id) {
            sql = "SELECT * FROM students"; // Obtener todos los estudiantes
        } else {
            sql = "SELECT * FROM students WHERE student_id = ?"; // Obtener un estudiante por ID
            params.push(request.query.student_id || request.params.student_id);
        }

        let [result] = await pool.query(sql, params);
        console.log(result);

        response.send(responseObject(true, result));
    } catch (err) {
        console.log(err);
        response.send(responseObject(false, null, 'Error retrieving student data.'));
    }
};

// Añadir un nuevo alumno
const postStudent = async (request, response) => {
    try {
        console.log(request.body);
        let sql = "INSERT INTO students (first_name, last_name) VALUES (?, ?)";
        console.log(sql);

        let [result] = await pool.query(sql, [request.body.first_name, request.body.last_name]);
        console.log(result);

        if (result.insertId) {
            response.send(responseObject(true, String(result.insertId)));
        } else {
            response.send(responseObject(false, null, 'Failed to insert student.'));
        }
    } catch (error) {
        console.log(error);
        response.send(responseObject(false, null, 'Error inserting student.'));
    }
};

// Modificar un alumno
const putStudent = async (request, response) => {
    try {
        console.log(request.body);
        let params = [
            request.body.first_name,
            request.body.last_name,
            request.body.student_id // Mantener student_id como se especifica
        ];

        let sql = "UPDATE students SET first_name = COALESCE(?, first_name), last_name = COALESCE(?, last_name) WHERE student_id = ?";
        console.log(sql);

        let [result] = await pool.query(sql, params);
        response.send(responseObject(true, result));
    } catch (error) {
        console.log(error);
        response.send(responseObject(false, null, 'Error updating student.'));
    }
};

// Eliminar un alumno
const deleteStudent = async (request, response) => {
    try {
        console.log(request.body);
        let sql = "DELETE FROM students WHERE student_id = ?";
        console.log(sql);

        let [result] = await pool.query(sql, [request.body.student_id]); // Mantener student_id como se especifica
        response.send(responseObject(true, result));
    } catch (error) {
        console.log(error);
        response.send(responseObject(false, null, 'Error deleting student.'));
    }
};



//RETO2 

// Obtener la nota media de un alumno
const getMedia = async (request, response) => {
    try {
        const studentId = request.query.id || request.params.id; // Obtener el ID del alumno
        const sql = "SELECT AVG(mark) as media FROM marks WHERE student_id = ?"; // Consulta para calcular la media
        const [result] = await pool.query(sql, [studentId]); // Ejecutar la consulta
        response.send(responseObject(true, result)); // Enviar la respuesta
    } catch (err) {
        console.log(err);
        response.send(responseObject(false, null, 'Error al recuperar la nota media.')); // Advertencia en español
    }
};

// Obtener las asignaturas a las que está apuntado un alumno
const getApuntadas = async (request, response) => {
    try {
        const studentId = request.query.id || request.params.id; // Obtener el ID del alumno
        const sql = `
            SELECT s.title 
            FROM subjects s 
            JOIN marks m ON s.subject_id = m.subject_id 
            WHERE m.student_id = ?`; // Consulta para obtener las asignaturas
        const [result] = await pool.query(sql, [studentId]); // Ejecutar la consulta
        response.send(responseObject(true, result)); // Enviar la respuesta
    } catch (err) {
        console.log(err);
        response.send(responseObject(false, null, 'Error al recuperar las asignaturas.')); // Advertencia en español
    }
};

// Obtener todos los alumnos y sus asignaturas
const getApuntadasAll = async (request, response) => {
    try {
        const sql = `
            SELECT st.first_name, st.last_name, s.title AS subject 
            FROM students st 
            JOIN marks m ON st.id = m.student_id 
            JOIN subjects s ON m.subject_id = s.subject_id`; // Consulta para obtener todos los alumnos y sus asignaturas
        const [result] = await pool.query(sql); // Ejecutar la consulta
        response.send(responseObject(true, result)); // Enviar la respuesta
    } catch (err) {
        console.log(err);
        response.send(responseObject(false, null, 'Error al recuperar todos los alumnos y sus asignaturas.')); // Advertencia en español
    }
};

// Obtener las asignaturas que imparte un profesor
const getImpartidas = async (request, response) => {
    try {
        const teacherId = request.query.id || request.params.id; // Obtener el ID del profesor
        const sql = `
            SELECT s.title 
            FROM subjects s 
            JOIN subject_teacher st ON s.subject_id = st.subject_id 
            WHERE st.teacher_id = ?`; // Consulta para obtener las asignaturas que imparte el profesor
        const [result] = await pool.query(sql, [teacherId]); // Ejecutar la consulta
        response.send(responseObject(true, result)); // Enviar la respuesta
    } catch (err) {
        console.log(err);
        response.send(responseObject(false, null, 'Error al recuperar las asignaturas impartidas por el profesor.')); // Advertencia en español
    }
};

// Obtener todos los profesores y sus asignaturas
const getImpartidasAll = async (request, response) => {
    try {
        const sql = `
            SELECT t.first_name, t.last_name, s.title AS subject 
            FROM teachers t 
            JOIN subject_teacher st ON t.id = st.teacher_id 
            JOIN subjects s ON st.subject_id = s.subject_id`; // Consulta para obtener todos los profesores y sus asignaturas
        const [result] = await pool.query(sql); // Ejecutar la consulta
        response.send(responseObject(true, result)); // Enviar la respuesta
    } catch (err) {
        console.log(err); // Asegúrate de registrar el error
        response.send(responseObject(false, null, 'Error al recuperar todos los profesores y sus asignaturas.')); // Mensaje de error
    }
};

module.exports = { getStudent, postStudent, putStudent, deleteStudent,getMedia, getApuntadas, getApuntadasAll, getImpartidas, getImpartidasAll };