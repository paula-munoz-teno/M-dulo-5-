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

    // let sql = "ALTER TABLE direction ADD COLUMN numero INT";
    //    let [result] = await connection.query(sql);
    //       console.log(result);

    // let sql = "ALTER TABLE direction DROP COLUMN numero";
    // let [result] = await connection.query(sql);
    //     console.log(result);

    // let sql = "DROP TABLE direction";
    // let [result] = await connection.query(sql);
    //     console.log("Datos borrados");
    //     console.log(result);

    // let sql = "UPDATE marks SET mark=0";
    // let [result] = await connection.query(sql);
    //     console.log("Datos borrados");
    //     console.log(result);

    // let sql = "SELECT first_name, last_name FROM dia1.students";
    // let [result] = await connection.query(sql);
    //     console.log("Datos borrados");
    //     console.log(result);

    // let sql = "SELECT * FROM dia1.teachers";
    // let [result] = await connection.query(sql);
    //     console.log("Datos borrados");
    //     console.log(result);

    // let sql = "DELETE FROM dia1.marks WHERE date > '2014-11-20'";
    // let [result] = await connection.query(sql);
    //     console.log("Datos obtenidos");
    //     console.log(result);

       let sql = "UPDATE dia1.marks SET mark = 5 WHERE mark<5";
    let [result] = await connection.query(sql);
        console.log("Datos obtenidos");
        console.log(result);

  
  // Cambia la consulta a la forma correcta
//   let sql = "DELETE FROM dia1 WHERE date > '2014-11-20'";
//   let [result] = await connection.query(sql);
//   console.log("Datos eliminados");
//   console.log(result);

  }
  catch(err)
  {
    console.log(err)
    // await connection.end();
  }
}

main();


