import express from "express";
import mongoose from "mongoose";
import { SignUpSchema } from "@tradix/common";
import { UserModel, WorkflowModel, NodesModel } from "@tradix/db";

mongoose.connect(process.env.MONGO_URL!);

const app = express();
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

app.post("/signup" , async(req,res) => {

    const{success, data} = SignUpSchema.safeParse(req.body);

    if(!success){
        res.status(401).json({error: "Invalid credentials"});
        return
    }

    try {
        const user = await UserModel.create({
        username: data.username,
        password: data.password
    })

    res.json({
        id: user._id,
        message: "User created successfully"
    });
    
    } catch (error) {
        res.status(411).json({error: "Username already Exists"});
        return
    }
})

app.post("/signin" , (req,res) => {

})