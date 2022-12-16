const express = require("express");
const app = express();
const PORT=5000;
const cors=require("cors");
const {v4:uuid}=require("uuid");
var bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: false }));


app.use(bodyParser.json());
app.use(cors());
const map=new Map();
String.prototype.additionAt = function(index, addition) {
    return this.substring(0, index) + addition + this.substring(index);
}
app.get('/create-doc',(req,res)=>{
    const id=uuid();
    map.set(id,"");
    console.log(id);
    res.json(id);
});
app.post('/get-updated-data',(req,res)=>{
    const rcvdData=req.body;
    console.log(map.get(rcvdData.id));
    res.json(map.get(rcvdData.id));
});
app.post('/update-doc',(req,res)=>{
    const rcvdData=req.body;
    map.set(rcvdData.id,map.get(rcvdData.id).additionAt(rcvdData.pos,rcvdData.text));
    console.log(map.get(rcvdData.id));
    res.send("updated");
});
app.listen(PORT,()=>{
    console.log(`server is live at http://localhost:${PORT}`)
})