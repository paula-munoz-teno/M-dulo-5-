// Función para insertar un nuevo estudiante
async function postStudent() {
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;

    const student = {
        first_name: firstName,
        last_name: lastName
    };

    const url = "http://localhost:3001/students";

    if (validateStudent(student)) {
        const param = {
            headers: {"Content-type": "application/json; charset=UTF-8"},
            body: JSON.stringify(student),
            method: "POST"
        };

        try {
            let response = await fetch(url, param);
            let result = await response.json();

            if (result.success) {
                showToast("Estudiante creado con id: " + result.data, "bg-success");
            } else {
                showToast("ERROR: " + result.message, "bg-danger");
            }
        } catch (error) {
            showToast("ERROR: Fallo en la comunicación con el API REST", "bg-danger");
            console.log(error);
        }
    }
}

// Función para obtener un estudiante por ID
async function getStudent() {
    let id = document.getElementById("studentId").value;

    if (id !== "") {
        let url = "http://localhost:3001/students?student_id=" + id;

        const param = {
            headers: {"Content-type": "application/json; charset=UTF-8"},
            method: "GET"
        };

        try {
            let response = await fetch(url, param);
            let result = await response.json();

            if (result.success && result.data.length > 0) {
                document.getElementById("mostrarNombre").value = result.data[0].first_name;
                document.getElementById("mostrarApellido").value = result.data[0].last_name;
            } else {
                showToast("ERROR: el estudiante con id: " + id + " no existe", "bg-danger");
            }
        } catch (error) {
            showToast("ERROR: Fallo en la comunicación con el API REST", "bg-danger");
            console.log(error);
        }
    } else {
        showToast("AVISO: Campo id no informado", "bg-warning");
    }
}

// Función para validar los datos del estudiante
function validateStudent(student) {
    if (!student.first_name) {
        showToast("AVISO: Campo nombre no informado", "bg-warning");
        return false;
    }
    if (!student.last_name) {
        showToast("AVISO: Campo apellido no informado", "bg-warning");
        return false;
    }
    return true;
}

// Función para mostrar mensajes de toast
function showToast(message, color) {
    document.getElementById("toastText").innerText = message;
    let toastElement = document.getElementById('toast');

    toastElement.className = "toast position-fixed top-0 end-0 p-3 align-items-center text-white border-0 " + color;

    let toast = new bootstrap.Toast(toastElement);
    toast.show();
}