const express=require('express');
const app=express();
const cors=require('cors');
const  ObjectID = require('mongodb').ObjectId;
require('dotenv').config();
const { MongoClient } = require('mongodb');

const port=process.env.PORT|| 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mrwnd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// run function 
async function run(){
    try{
        await client.connect();
        console.log('server connected successfully');

        const database=client.db('mug_fair');
        const mugCollection=database.collection('mugs');
        const usersCollection=database.collection('users');
        const ordersCollection=database.collection('orders');
        const reviewCollection=database.collection('reviews')
        app.get('/mugs',async(req,res)=>{
            const cursor=mugCollection.find({});
            const result=await cursor.toArray();
            res.json(result)
        })

        app.get('/mugs/:id',async(req,res)=>{
            const buyOrder=req.params.id;
            // console.log(buyOrder)
            const query={_id:new  
                ObjectID(buyOrder)};
            console.log(query)
            const result=await mugCollection.findOne(query);
            console.log(result)
            res.json(result)
        })
        app.post('/mugs',async(req,res)=>{
            const productData=req.body;
            const result=await mugCollection.insertOne(productData)
            res.json(result)
        })

        //  orders collection
        app.get('/order',async(req,res)=>{
            const orders=ordersCollection.find({})
            const result=await orders.toArray();
            res.json(result);
        })
        app.get('/order/:email',async(req,res)=>{
            const email=req.params.email;
            const query={email:email};;
            const cursor=ordersCollection.find(query);
            const result=await cursor.toArray();
            res.json(result);
        })

        app.post('/order',async(req,res)=>{
            const oreder=(req.body);
            const result=await ordersCollection.insertOne(oreder);
            res.json(result)
        })

        app.delete('/order/:id',async(req,res)=>{
            const id=req.params.id;
            const query={_id:new ObjectID(id)};
            const result=await ordersCollection.deleteOne(query);
            res.json(result)
        })
        
        //users collection  
        app.get('/users/:email',async(req,res)=>{
            const email=req.params.email;
            const query={email:email};
            const user=await usersCollection.findOne(query);
            let isAdmin=false;
            if(user?.role==='admin'){
                isAdmin=true;
            }
            res.json({admin:isAdmin});
        })

        app.post('/users',async(req,res)=>{
            const user=req.body;
            const result=await usersCollection.insertOne(user);
            res.json(result)
        })

        app.put('/users',async(req,res)=>{
            const user=req.body;
            const filter={email:user.email}
           const updateDoc={$set:{role:'admin'}}
           const result=await usersCollection.updateOne(filter,updateDoc);
           res.json(result);

        })
        
        // review collection 
        app.get('/review',async(req,res)=>{
            const reviews=reviewCollection.find({})
            const result=await reviews.toArray();
            res.json(result);
        })
        app.post('/review',async(req,res)=>{
            const reviewData=req.body;
            const result=await reviewCollection.insertOne(reviewData);
            res.json(result);
        })
        

    }
    finally{
        // client.close();
    }
}

run().catch(console.dir);

app.get('/',(req,res)=>{
    res.send('welcome to mug fair');
})

app.listen(port,()=>{
    console.log('mug fair server Running on ',port)
})