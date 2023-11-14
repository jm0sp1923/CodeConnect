import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();

app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "codeconnect",
});

db.connect((err) => {
  if (err) {
    console.error("Error de conexión a la base de datos: " + err);
    return;
  }
  console.log("Conexión a la base de datos MySQL establecida");
});

app.use(express.json()); // Agrega esta línea para poder analizar el cuerpo de la solicitud en formato JSON

app.post("/registrar", (req, response) => {
  const user = req.body.user;
  const email = req.body.email;
  const contraseña = req.body.contraseña;

  db.query(
    "INSERT INTO usuario (user,nombre,edad,email,contraseña) VALUES (?,?,?,?,?)",
    [user, " ", 0, email, contraseña],
    (err, res) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Registrado");
      }
    }
  );
});

app.get("/login", (req, res) => {
  const userName = req.query.userName;
  const contraseña = req.query.email;
  const sql = `SELECT userName, email FROM usuario WHERE userName = "jm0sp" AND email = "jm0sp1923@gmail.com"`;
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error en la consulta SELECT: " + err);
      return res.status(500).send("Error en la consulta SELECT");
    }
    res.send(result);
  });
});

const puerto = 5500;
app.listen(puerto, () => {
  console.log(`Server en el puerto ${puerto}`);
});
