import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});


const EdgeSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    source: {
        type: String,
        required: true,
    },
    target: {
        type: String,
        required: true,
    },
},{
    _id: false,
});


const PositionSchema = new Schema({
    x:{
        type: String,
        required: true,
    },
    y:{
        type: String,
        required: true,
    },
}, {
    _id: false,
})

const NodeDataSchema = new Schema({
    kind: {
        type: String,
        enum : ["ACTION" , "TRIGGER"],
        required: true,
    },
    metadata: Schema.Types.Mixed,
})


const WorkflowNodesSchema = new Schema({
    id:{
        type: String,
        required: true,
    },
    position: PositionSchema,
    credentials: Schema.Types.Mixed,
    type:{
        type: mongoose.Types.ObjectId,
        ref: "Nodes",
    },
    data: NodeDataSchema,
},{
    _id: false,
})


const WorkflowSchema = new Schema({
    userId:{
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "Users",
    },
    nodes:[WorkflowNodesSchema],
    edges:[EdgeSchema],
})

const CredentialsTypeSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    required: {
        type: Boolean,
        required: true
    }
})

const NodesSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ["ACTION" , "TRIGGER"],
        required: true,
    },
    credentialsType: [CredentialsTypeSchema]
})


export const UserModel = mongoose.model("Users", UserSchema);
export const WorkflowModel = mongoose.model("Workflows",WorkflowSchema);
export const NodesModel = mongoose.model("Nodes",NodesSchema)