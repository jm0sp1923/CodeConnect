import express from "express";
import mysql from "mysql";
import cors from "cors";
import multer from "multer";
import path from "path";
import fs from 'fs';


const app = express();
const upload = multer({ dest: 'imgs/' });


//app.use('/imgs', express.static(new URL('imgs', import.meta.url).pathname)); //Obtener URL del modulo y convertirla en ruta de directorio

// const currentModuleFile = new URL(import.meta.url);
// const currentModuleDir = path.dirname(currentModuleFile.pathname);

// // Configuración para servir archivos estáticos desde la carpeta "imgs"
// const publicPath = path.resolve(currentModuleDir, 'imgs');
// app.use('/imgs', express.static(publicPath));


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

// Query para registrar usuario
app.post("/registrar", (req, response) => {
  const user = req.body.user;
  const email = req.body.email;
  const contraseña = req.body.contraseña;

  db.query(
    "INSERT INTO usuario (user,nombre,edad,email,contraseña) VALUES (?,?,?,?,?)",
    [user, " ", 0, email, contraseña],
    (err, res) => {
      if (err) {
        response.send(err);
      } else {
        response.send(true);
      }
    }
  );
});

//Query para validar informacion del usuario
app.post("/login", (req, res) => {
  const { user, contraseña } = req.body;
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

//Query para actualizar la informacion del usuario
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

// Query para guardar la información de los post en la base de datos
app.post("/savePost", upload.single('image'), (req, res) => {
  const { text, id_User } = req.body;
  const file = req.file;


  if (file && file.filename) {
    const allowedTypes = ['image/jpeg', 'image/png'];
    if (!allowedTypes.includes(file.mimetype)) {
      console.log('Tipo de archivo no permitido');
      return res.status(400).send('Tipo de archivo no permitido');
    }

    const fileExtension = file.mimetype === 'image/jpeg' ? 'jpg' : 'png';
    const newFilename = `${file.filename}.${fileExtension}`;
    const destinationPath = path.join('imgs/', newFilename);
    const imagePath = `${path.basename(destinationPath)}`;
    const createdAt = new Date().toISOString(); // Obtiene la fecha y hora actual en formato ISO


    // Mueve el archivo a la carpeta correcta con la extensión en el nombre
    fs.renameSync(file.path, destinationPath);
    const data = [text, imagePath, createdAt, id_User, 0];
    db.query("INSERT INTO publicaciones (text, imageUrl, createdAt, id_User,likes) VALUES (?, ?, ?, ?,?)", data, (err, result) => {
      if (err) {
        console.error('Error al insertar en la base de datos:', err);
        return res.status(500).send('Error al insertar en la base de datos');
      }

      console.log('Post guardado exitosamente');
      return res.status(200).send('Post guardado exitosamente');
    });
  } else {
    console.log('Archivo no válido');
    return res.status(400).send('Archivo no válido');
  }
});


//Query para obtener todas las publicaciones de la database
app.get("/getImages", (req, res) => {

  const sql = 'SELECT * FROM publicaciones';
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error en la consulta SELECT: " + err);
      return res.status(500).send("Error en la consulta SELECT");
    }
    res.send(result);
  });
});


//Query para obtener las publicaciones por nombre de usuario
app.get("/getImagesUser/:user", (req, res) => {
  const user = req.params.user;
  const values = [user];
  const sql = 'SELECT * FROM publicaciones WHERE id_User = ?';
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error en la consulta SELECT: " + err);
      return res.status(500).send("Error en la consulta SELECT");
    }
    res.send(result);
  });
});


app.get("/images/:imageName", (req, res) => {
  const { imageName } = req.params;
  const currentDirectory = process.cwd();
  const imagePath = path.join(currentDirectory, "imgs", imageName);
  res.sendFile(imagePath);
});


app.post('/like/add', (req, res) => {
  const postId = req.body.postId;
  const sql = 'UPDATE publicaciones SET likes = likes + 1 WHERE id = ?';
  db.query(sql, [postId], (error, results) => {
    if (error) {
      console.error('Error al agregar like:', error);
      return res.status(500).send('Error al agregar like en la base de datos');
    }
    return res.status(200).send("agregado");
  });
});

app.post('/like/remove', (req, res) => {
  const postId = req.body.postId;
  const sql = 'UPDATE publicaciones SET likes = CASE WHEN likes > 0 THEN likes - 1 ELSE 0 END WHERE id = ?';
  db.query(sql, [postId], (error, results) => {
    if (error) {
      console.error('Error al quitar like:', error);
      return res.status(500).send('Error al quitar like en la base de datos');
    }
    return res.status(200).send('Like eliminado correctamente');
  });
});

const puerto = 5500;
app.listen(puerto, () => {
  console.log(`Server en el puerto ${puerto}`);
}); 
