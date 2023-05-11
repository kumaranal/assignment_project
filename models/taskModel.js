
const mongoose=require('mongoose')
const schema=mongoose.Schema;

let taskdata=new schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        required:true,
        trim:true
    },
    status:{
        type:String,
        enum:{

            values:["pending","in progress","completed"],
            message:`Value is not suppoting`,
        },
        required:true
    },
    userId:{
        type:String,
        required:true,

    }
},
    {
        collection:"taskdata"
    }
)

//collection name will be tableData
module.exports=mongoose.model("TaskData",taskdata)