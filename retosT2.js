const mysql = require("mysql2/promise")

async function main()
{
  let connection;
  try
  {
    connection = await mysql.createConnection(
    {
          host         : "localhost",
          user         : "PaulaMT",
          password     : "Platanobalun234?",
          database     : "dia1"
    });
    console.log("Conexion correcta")

    
    
   //R1
    
    // let params = ["1"]     
    // let sql = "SELECT AVG(dia1.marks.mark) AS avg_marks FROM dia1.marks WHERE subject_id = ? GROUP BY subject_id;"
    // let [result] = await connection.query(sql, params) 
    //         console.log("Query realizada")
    //         console.log(result)
     

      
    // let sql = "SELECT COUNT(*) FROM dia1.students;"
    // let [result] = await connection.query(sql) 
    //         console.log("Query realizada")
    //         console.log(result)

    // let sql = "SELECT * FROM dia1.grupos;"
    // let [result] = await connection.query(sql) 
    //         console.log("Query realizada")
    //         console.log(result)

    // let params = [5, '2023-01-01', '2023-12-31'];
    // let sql = "DELETE FROM marks WHERE marks.mark > ? AND date > ? AND date < ?";
    // let [result] = await connection.query(sql, params);
    // console.log("Query realizada");
    // console.log(result);

    // let params = [2024];
    // let sql = "SELECT * FROM dia1.students WHERE año_ingreso = 2024;"
    // let [result] = await connection.query(sql, params) 
    //         console.log("Query realizada")
    //         console.log(result)

  
    // let sql = "SELECT subject_id, COUNT(*) AS num_marks FROM subject_teacher GROUP BY subject_id;"
    // let [result] = await connection.query(sql) 
    //         console.log("Query realizada")
    //         console.log(result)


    //R2

    // let params = [1, 20, 8, '2023-01-01', '2023-12-31'];    
    // let sql = "SELECT dia1.marks.student_id, dia1.marks.mark FROM dia1.marks WHERE (dia1.marks.student_id BETWEEN ? AND ?) OR (dia1.marks.mark > ? AND date BETWEEN ? AND ?) ;"
    // let [result] = await connection.query(sql, params) 
    //     console.log("Query realizada")
    //     console.log(result)

    // let params = ['2024-01-01', '2024-12-31']     
    // let sql = "SELECT subject_id, AVG(dia1.marks.mark) AS avg_marks FROM dia1.marks WHERE date BETWEEN ? AND ? GROUP BY subject_id;"
    // let [result] = await connection.query(sql, params) 
    //     console.log("Query realizada")
    //     console.log(result)

    //     let params = ['2024-01-01', '2024-12-31']     
    // let sql = "SELECT student_id, AVG(dia1.marks.mark) AS avg_marks FROM dia1.marks WHERE date BETWEEN ? AND ? GROUP BY student_id;"
    // let [result] = await connection.query(sql, params) 
    //     console.log("Query realizada")
    //     console.log(result)


    //RETO 3 
    // • Obtén los nombres y apellidos de los alumnos y los nombres de las asignaturas en las que
    // están apuntados.

    //Nombre (first_name)--> students
    //Apellidos (last_name) --> tabla students 
    //Asignaturas en las que estén apuntados (title) --> subjects
    //campo común sería mark_id ya que tengo el id de students y el de subject 


    //el join es con la tabla que me quiero unir
    //la primera tabla es donde quiero que se una y la segunda de donde viene

    
    // let sql = "SELECT first_name, last_name, title FROM marks JOIN students ON (dia1.marks.student_id = dia1.students.student_id) JOIN subjects ON (dia1.marks.subject_id = dia1.subjects.subject_id);"
    // let [result] = await connection.query(sql) 
    //     console.log("Query realizada")
    //     console.log(result)

   //RETO 4 
//    • Obtén todos los nombres y apellidos de los profesores y los nombres de las asignaturas que
// imparten.   

// let sql = "SELECT first_name, last_name, title FROM subject_teacher JOIN teachers ON (dia1.subject_teacher.teacher_id = dia1.teachers.teacher_id) JOIN subjects ON (dia1.subject_teacher.subject_id = dia1.subjects.subject_id);"
// let [result] = await connection.query(sql) 
//     console.log("Query realizada")
//     console.log(result)

    //RETO 5 
    // • Obtén el número total de alumnos por asignatura, el nombre de la asignatura y el nombre y
    // apellidos del profesor que la imparte.

//es de marks 

let sql = `
    SELECT 
        dia1.subject_teacher.subject_id, 
        COUNT(*) AS num_students, 
        dia1.subjects.title, 
        dia1.teachers.first_name, 
        dia1.teachers.last_name 
    FROM 
        dia1.marks 
    JOIN 
        dia1.subject_teacher ON dia1.marks.subject_id = dia1.subject_teacher.subject_id
    JOIN 
        dia1.subjects ON dia1.subject_teacher.subject_id = dia1.subjects.subject_id
    JOIN 
        dia1.teachers ON dia1.subject_teacher.teacher_id = dia1.teachers.teacher_id 
    GROUP BY 
        dia1.subject_teacher.subject_id, 
        dia1.subjects.title, 
        dia1.teachers.first_name, 
        dia1.teachers.last_name;`;

let [result] = await connection.query(sql);
console.log("Query realizada");
console.log(result);


// let sql = `
//     SELECT 
//         dia1.subject_teacher.subject_id, 
//         COUNT(*) AS num_students, 
//         dia1.subjects.title, 
//         dia1.teachers.first_name, 
//         dia1.teachers.last_name 
//     FROM 
//         dia1.marks 
//     JOIN 
//         dia1.subject_teacher ON dia1.marks.subject_id = dia1.subject_teacher.subject_id
//     JOIN 
//         dia1.subjects ON dia1.subject_teacher.subject_id = dia1.subjects.subject_id
//     JOIN 
//         dia1.teachers ON dia1.subject_teacher.teacher_id = dia1.teachers.teacher_id 
//     GROUP BY 
//         dia1.subject_teacher.subject_id, 
//         dia1.subjects.title, 
//         dia1.teachers.first_name, 
//         dia1.teachers.last_name;`;

// let [result] = await connection.query(sql);
// console.log("Query realizada");
// console.log(result);






  }
  catch(err)
  {
    console.log(err)
    // await connection.end();
  }
}

main();


