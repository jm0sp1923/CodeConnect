import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

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
        response.send("Registrado");
      }
    }
  );
});


app.post("/login", (req, res) => {
  const {user, contraseña} = req.body; 
  const values = [user, contraseña];
  const sql = `SELECT * FROM usuario WHERE user = ? AND contraseña = ?`;
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error en la consulta SELECT: " + err);
      return res.status(500).send("Error en la consulta SELECT");
    }
    res.send(result);
  });
});



app.put("/changeUserInfo", (req, res) => {
  const { user, nombre, edad, email, contraseña } = req.body;
  const consulta = "UPDATE usuario SET user = ?, nombre=?, edad=?, email=?, contraseña=? WHERE user= ? ";
  const datos = [user, nombre, edad, email, contraseña, user];

  db.query(consulta, datos, (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).send("Error al actualizar la información del usuario");
    } else {
      console.log(user)
      res.send(req.body.nombre);
    }
  });
});

const puerto = 5500;
app.listen(puerto, () => {
  console.log(`Server en el puerto ${puerto}`);
}); 
