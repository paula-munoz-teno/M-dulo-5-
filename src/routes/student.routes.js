const {Router} = require ("express")
const router = Router();
const studentsCtrl = require("../controller/student.controller")

router.get("/students", studentsCtrl.getStudent);

router.post("/students", studentsCtrl.postStudent);
        
router.put("/students", studentsCtrl.putStudent);
        
router.delete("/students", studentsCtrl.deleteStudent); 

router.get("/media", studentsCtrl.getMedia); // Obtener la nota media de un alumno (por query)
router.get("/media/:id", studentsCtrl.getMedia); // Obtener la nota media de un alumno (por parámetro de ruta)

router.get("/apuntadas", studentsCtrl.getApuntadasAll); // Obtener todos los alumnos y sus asignaturas
router.get("/apuntadas/:id", studentsCtrl.getApuntadas); // Obtener las asignaturas a las que está apuntado un alumno (por parámetro de ruta)

router.get("/impartidas", studentsCtrl.getImpartidasAll); // Obtener todos los profesores y sus asignaturas
router.get("/impartidas/:id", studentsCtrl.getImpartidas); // Obtener las asignaturas que imparte un profesor (por parámetro de ruta)

module.exports = router;




