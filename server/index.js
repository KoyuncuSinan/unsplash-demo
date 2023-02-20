const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose");
const bodyparser = require("body-parser")
const dotenv = require("dotenv")

const app = express();
const helmet = require("helmet");
dotenv.config()

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));
app.use(bodyparser.json({limit: "30mb", extended:true}));
app.use(bodyparser.urlencoded({limit: "30mb"}));




// db connection

const PORT = process.env.PORT || 6001
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
}).catch((error) => console.log(`${error} did not connect.`))