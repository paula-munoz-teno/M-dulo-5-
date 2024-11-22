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
          database     : "proyecto_museo"
    });
    console.log("Conexion correcta")

   // - Obtener un listado de todos los objetos que el museo tiene en préstamo, su localización dentro
// de la exposición, la fecha de expiración de este, la información básica (nombre, apellidos y
// email) de la persona que los ha prestado.

// let sql = `
//      SELECT 
//         proyecto_museo.piezas.nombre, 
//         proyecto_museo.lugar.tipo_lugar,
//         proyecto_museo.estado.fechadevolucion_estado,
//         proyecto_museo.piezas.datos_dueño_id
         
//     FROM 
//         proyecto_museo.piezas
   
//     JOIN 
//         proyecto_museo.estado ON proyecto_museo.piezas.estado_id = proyecto_museo.estado.estado_id
// 	JOIN
//         proyecto_museo.lugar ON proyecto_museo.piezas.lugar__id = proyecto_museo.lugar.lugar_id
// 	JOIN
//         proyecto_museo.datos_dueño ON proyecto_museo.piezas.datos_dueño_id = proyecto_museo.datos_dueño.datos_dueño_id
    
//     WHERE
//         proyecto_museo.estado.tipo_estado = 'prestado a' 
    
//     GROUP BY 
//         proyecto_museo.piezas.piezas_id, 
//         proyecto_museo.piezas.lugar__id,
//         proyecto_museo.estado.fechadevolucion_estado,
//         proyecto_museo.piezas.datos_dueño_id;`;

// let [result] = await connection.query(sql);
// console.log("Query realizada");
// console.log(result);

// - Obtener de forma ordenada de mayor a menor, el número total de objetos o piezas agrupados
// por su situación dentro de la organización, esto es, cuántos hay expuestos, cuántos en
// itinerancia y cuántos almacenados. 
let sql = `
     	SELECT 
        proyecto_museo.estado.tipo_estado,
        COUNT(*) AS totalpiezas
    FROM 
        proyecto_museo.piezas
    JOIN 
        proyecto_museo.estado ON proyecto_museo.piezas.estado_id = proyecto_museo.estado.estado_id
    GROUP BY 
        proyecto_museo.estado.tipo_estado
    ORDER BY 
		totalpiezas DESC;`;

let [result] = await connection.query(sql);
console.log("Query realizada");
console.log(result);

  }
  catch(err)
  {
    console.log(err)
    // await connection.end();
  }
}

main();


