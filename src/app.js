import express from "express";
import routes from "./routes/index.js";
import __dirname from "./dirname.js";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import viewsRoutes from "./routes/views.routes.js";
import { connectMongoDB } from "./config/mongoDB.config.js";


const app = express();
connectMongoDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.engine("handlebars", handlebars.engine()); 
app.set("views", __dirname + "/views"); 
app.set("view engine", "handlebars"); 
app.use(express.static("public"));

app.use("/api",routes);
app.use("/", viewsRoutes);

// Iniciar el servidor en el puerto 8080
const PORT = 8080;
const httpServer = app.listen(PORT, () => {
    console.log(`Server OK on Port ${PORT}`);
})

export const io = new Server(httpServer);

io.on("connection", (socket) => {
  console.log(`User Connected ${socket.id}`);
});



