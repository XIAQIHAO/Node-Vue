const mongoose = require("mongoose");
const express = require("express");
const app = express();
let person = require("./Schema/index");
mongoose.connect("mongodb://localhost:27018/vuex", { useNewUrlParser: true }).then(() => {
    console.log("数据库连接成功");
    app.listen(3000, () => {
        console.log("node服务器已开启在3000端口")
    })
}).catch(err => {
    if (err) throw err;
    console.log("数据库连接失败");
});
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//增加
// person.create({username:"爱吃西瓜的小夏",password:"xqh20001206"},()=>{
//     console.log("添加成功")
// })

app.post("/login", (req, res) => {
    let { username, password } = req.body

    person.findOne(
        { username, password },

    ).then(mes => {
        if (mes) {
            res.send(
                { errno: 1 }
            )
        } else {
            res.send(
                { errno: 0 }
            )
        }

    })
});


app.post("/register", (req, res) => {
    let { username, password } = req.body;
    console.log(req.body)
    person.findOne(
        { username }
    ).then(mes => {
        if (mes) {
            res.send({ errno: 0 })
        } else {
            res.send({ errno: 1 })
            person.create({
                username,
                password
            }).then(() => {
                console.log("添加成功")
            })
        }
    })
})


//获取所有数据
app.get("/userlist", (req, res) => {
    person.find().then(mes => {
        res.send(mes)
    })
})

//修改数据
app.use("/change", (req, res) => {
    let { username, password, age, _id } = req.body;

    person.updateOne({ _id }, { username, password, age }).then(() => {
        console.log("修改成功！")
    })

})

//删除
app.post("/del", (req, res) => {
    let { _id } = req.body;
    person.deleteOne({ _id }).then(() => {
        console.log("删除成功")
    })
})

//增
app.post("/add",(req,res)=>{
    let {username,password,age} = req.body;
    person.create({
        username,
        password,
        age
    }).then(()=>{
        console.log("添加成功")
    })
});

//查
app.post("/query",(req,res)=>{
    let {queryname} = req.body;

        person.findOne({username:queryname}).then(mes=>{
            res.send(mes);
            console.log(mes);
        })

})






