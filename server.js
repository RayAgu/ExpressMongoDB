const express = require( "express" );
const mongoose = require( "mongoose" );

const app = express()
const PORT = 2091;
app.use(express.json())

const studentSchema = new mongoose.Schema(
    {
        data:{
            name: String,
            course: String,
            designation: String},
            score:{
                html: Number,
                css: Number,
                javascript: Number,
                node: Number
            }
        }
    
)

const user = mongoose.model( "students", studentSchema)

app.get("/", (req, res) => {
    res.status(200).json("welcome to stutends APIs")
})

//creating data in database
app.post("/createuser", async(req, res)=> {
    const newResult = await new user(req.body)
    newResult.save()
    res.status(200).json(newResult)
});

// retrieving the data
app.get("/getall", async(req, res) =>{


    const ALL= await user.find()
    res.status(200).json(
        {message: "the available users are " + ALL.length,data:ALL}
    )
 });

 //retrieving a single user
 app.get("/getone/:id", async(req, res)=>{
    const id = req.params.id
    const Oneuser = await user.findById(id)
    res.status(200).json(
        {message:`kindly find below the information of the user with the id of ${id}`, data:Oneuser}
    )
 });

 // To update a data in our database
app.put("/updateuser/:id", async(req, res)=>{
    try {
        const userId = req.params.id;
        const newUser = req.body;
        const updatedUserId = await user.findByIdAndUpdate(userId, newUser)
        res.status(200).json({
            message: 'User Updated Successfully',
            data: updatedUserId
        })
    } catch (error) {
        res.status(500).json({
            message: 'failed to update user'
        })
    }
});

 //deletinga single user
 app.delete("/delete/:id", async(req, res)=>{
    const id = req.params.id
    const deleteUser = await user.findByIdAndDelete((id))

    res.status(200).json(
        {message:`the information of the user with the id of ${id}, has been deleted`,
    data: deleteUser}
    )
 })

mongoose.connect("mongodb+srv://aguyeraymond:PPcsb5fRmCdQDRCb@cluster0.ihwf957.mongodb.net/")
.then( () => { 
    console.log("connected to the database is successful");
})

app.listen(PORT, () => {
    console.log(`server is listening on port: ${PORT}`)
});