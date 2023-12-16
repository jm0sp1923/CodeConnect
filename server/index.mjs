import express from "express";
import mysql from "mysql";
import cors from "cors";
import multer from "multer";
import path from "path";
import fs from 'fs';


const app = express();
const upload = multer({dest: 'imgs/'});



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
        console.log(err);
      } else {
        response.send("Registrado");
      }
    }
  );
});

//Query para obtener todas las publicaciones de la database
app.get("/getUser", (req, res) => {
  const sql = 'SELECT usuario.user FROM usuario';
  
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error en la consulta SELECT: " + err);
      return res.status(500).send("Error en la consulta SELECT");
    }
    res.send(result);
  });
});


//Query para validar informacion del usuario
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
 

  if (file && file.filename ) {
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

    const data = [text, imagePath, createdAt, id_User];
    db.query("INSERT INTO publicaciones (text, imageUrl, createdAt, id_User) VALUES (?, ?, ?, ?)", data, (err, result) => {
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
  const limit = req.query.limit || 12;
  const sql = 'SELECT * FROM publicaciones ORDER BY createdAt DESC LIMIT ?';
  const values = [limit];
  db.query(sql, values, (err, result) => {
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


app.get("/fotoPerfil", (req, res) => {
  const {fotoPerfil} = req.body; 
  const values = [fotoPerfil];
  const sql = `SELECT usuario.foto_Perfil
                FROM usuario
                
                `;
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error en la consulta SELECT: " + err);
      return res.status(500).send("Error en la consulta SELECT");
    }
    res.send(result);
  });
});

//Query para registrar likes and comments 
app.post("/datePost", async (req, response) => {
  try {
    const { id_post, id_user, comments } = req.body;
    const data = [id_post, id_user, comments];

    await db.query(
      "INSERT INTO datepost (id_post, id_user, comments) VALUES (?,?,?)",
      data
    );

    response.status(200).send("Registrado");
  } catch (error) {
    console.error(error);
    response.status(500).send("Error interno del servidor");
  }
});

//Query para consulta de los ID de las publicaciones
app.get("/getIdPost", (req, res) => {
  const {id_post} = req.body; 
  const values = [id_post];
  const sql = `SELECT publicaciones.id
                FROM publicaciones
                `;
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error en la consulta SELECT: " + err);
      return res.status(500).send("Error en la consulta SELECT");
    }
    res.send(result);
  });
});


//Query para sacar el comentario y el usuario de los post
app.get("/getCommentPost/:id_post", (req, res) => {
  const  {id_post} = req.params;
  
  const values = [id_post];
  const sql = `SELECT datepost.id_user, datepost.comments
                FROM datepost WHERE id_post =?
                
                `;
  db.query(sql, values, (err, result) => {
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
