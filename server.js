import express, { response } from "express";
import bodyParser from "body-parser";
import axios from "axios";
import pg from "pg";
import bcrypt from "bcrypt";

const app = express();
const port = 3000;
const API_URL = "http://localhost:4000";

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Route to render the main page

const saltRounds = 10;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "pbl",
  password: "shireen@777",
  port: 5432,
});
db.connect();


app.get("/", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/loans`);
    console.log(response);
    res.render("index1.ejs", { 
      lts: response.data,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching" });
  }
});
app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.post("/register", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;
  const response = await axios.get(`${API_URL}/loans`);

  try {
    const checkResult = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (checkResult.rows.length > 0) {
      res.send("Email already exists. Try logging in.");
    } else {
      //hashing the password and saving it in the database
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
          console.error("Error hashing password:", err);
        } else {
          console.log("Hashed Password:", hash);
          await db.query(
            "INSERT INTO users (email, password) VALUES ($1, $2)",
            [email, hash]
          );
            console.log(response);
             res.render("index11.ejs", { 
              lts: response.data,
              });
        }
      });
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/login", async (req, res) => {
  const email = req.body.username;
  const loginPassword = req.body.password;
  const response = await axios.get(`${API_URL}/loans`);

  try {
    const result = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (result.rows.length > 0) {
      const user = result.rows[0];
      const storedHashedPassword = user.password;
      //verifying the password
      bcrypt.compare(loginPassword, storedHashedPassword, (err, result) => {
        if (err) {
          console.error("Error comparing passwords:", err);
        } else {
          if (result) {
             console.log(response);
              res.render("index11.ejs", { 
               lts: response.data,
               });
          } else {
            res.send("Incorrect Password");
          }
        }
      });
    } else {
      res.send("User not found");
    }
  } catch (err) {
    console.log(err);
  }
});





  app.get("/edit/:type", async (req, res) => {
     const response = await axios.get(`${API_URL}/loans/${req.params.type}`);
      console.log(response.data);
    
      res.render("index.ejs", {
        loans: response.data,
      });
    
  });
app.get("/all",async(req,res)=>{
    try {
      const response = await axios.get(`${API_URL}/allloans`);
      console.log(response);
      res.render("index.ejs", { loans: response.data });
    } catch (error) {
      res.status(500).json({ message: "Error fetching posts" });
    }
});



app.listen(port, () => {
    console.log(`Backend server is running on http://localhost:${port}`);
  });
  