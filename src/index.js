const express = require('express')
const session = require("express-session")
const passport = require("passport")
const app = express()
const port = 3000
const auth = require("./routes/auth")
const products = require("./routes/products")


require("./database/index")



app.use(express.urlencoded())
app.use(express.json())

app.use(
    session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true,

    }));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => res.send('Hello World!'))

// Routes
app.use("/user/", auth)
app.use("/products/", products)




app.listen(port, () => console.log(`Ecommerce app listening on port ${port}!`))