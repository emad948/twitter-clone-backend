const express=require('express');
const app=express();
const bcrypt=require('bcrypt')

app.use(express.json())

const users=[]
const newsFeed=[]

app.get('/users',(req,res)=>{
    res.json(users)
})


app.get('/newsfeed',(req,res)=>{
    res.json(newsFeed)
})

app.post('/users',async (req,res)=>{
    try{
        const salt=await bcrypt.genSalt()
        const hashedPass= await bcrypt.hash(req.body.password,salt)
        const user={name:req.body.name,password:hashedPass,email:req.body.email}
        users.push(user);
        res.status(201).send()
    }
    catch {
        res.status(500).send()
    }

})

app.post('/login',async (req,res)=> {
    const user = users.find(user => user.name === req.body.name)
    if (user) {
        try{

            if(await bcrypt.compare(req.body.password,user.password)){
                res.send("success")
            }
            else
            {
                res.send('wrong data')
            }

        }
        catch{
            res.status(500).send()
        }
    } else
    {
        return res.status(400).send("no account found")
    }


})

app.post('/newsfeed',(req,res)=>{
    const feed={userName:req.body.userName,text:req.body.text}
    newsFeed.push(feed)
    res.status(201).send()

})





app.listen(3001)

