const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs');
const path = require('path')


const app = express()
const PORT = 3000;
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname,'/frontend')))

function findTodoIndex(arr, id) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].id === id) {
        return i;
    }
}
    
  }
  
  function removeAtIndex(arr, index) {
    let newArray = [];
    for (let i = 0; i < arr.length; i++) {
      if (i !== index) newArray.push(arr[i]);
    }
    return newArray;
  }

app.get('/',(req,res)=>{
  res.sendFile('/Users/faisalkhan/harkirat course/frontend/index.html')
})

app.get('/todos',(req,res)=>{
    fs.readFile('/Users/faisalkhan/harkirat course/todo_app/todos.json','utf8',(err,data)=>{
     if(err) throw err;
     res.json(JSON.parse(data))
    })
    
})

app.get('/todos/:id', (req, res) => {
    fs.readFile("/Users/faisalkhan/harkirat course/todo_app/todos.json", "utf8", (err, data) => {
      if (err) throw err;
      const todos = JSON.parse(data);
      const id = parseInt(req.params.id);
      const todoIndex = findTodoIndex(todos, id);
      if (id === -1) {
        res.status(404).send();
      } else {
        res.json(todos[todoIndex]);
      }
    });
  });


app.post('/todos',(req,res)=>{
    const newTodo = {
        id: Math.floor(Math.random() * 1000000),
        title: req.body.title,
        description: req.body.description,
    }
    fs.readFile('/Users/faisalkhan/harkirat course/todo_app/todos.json' , 'utf8' , (err,data)=>{
     if(err) throw err;
     const todos = JSON.parse(data)
     todos.push(newTodo)
     
     fs.writeFile('/Users/faisalkhan/harkirat course/todo_app/todos.json',JSON.stringify(todos),(err)=>{
        if(err) throw err;
        res.status(201).json(newTodo)
     })
    })
})

app.put('/todos/:id',(req,res)=>{

   fs.readFile('/Users/faisalkhan/harkirat course/todo_app/todos.json','utf-8',(err,data)=>{
    const updates ={
      title: req.body.title,
      description: req.body
    }

    if(err) throw err;
    const todos = JSON.parse(data)
    const id = parseInt(req.params.id)
    const todoIndex = findTodoIndex(todos , id)
    
    if (todoIndex === -1){
      res.status(404).send()
    }
    else{
      const updateTodo = {
       id: todos[todoIndex].id,
       title: req.body.title,
       description: req.body.description
      }

      todos[todoIndex] = updateTodo;
      const data = JSON.stringify(todos)
      fs.writeFile('/Users/faisalkhan/harkirat course/todo_app/todos.json',data,(err)=>{
        if (err) throw err;
        res.send(updateTodo)
      })
    }

   })

})

app.delete('/todos/:id',(req,res)=>{
fs.readFile('/Users/faisalkhan/harkirat course/todo_app/todos.json','utf-8',(err,data)=>{
  if (err) throw err;
  let todos = JSON.parse(data)
  const id = parseInt(req.params.id);
  const todoIndex = findTodoIndex(todos, id)
 
  
   if (todoIndex === -1){
    res.status(404).send()
   }
   else{
    todos = removeAtIndex(todos , todoIndex)
    const data = JSON.stringify(todos)
    fs.writeFile('/Users/faisalkhan/harkirat course/todo_app/todos.json', data,(err)=>{
      if (err) throw err;
      
      res.send()
    })
   }

})
})

app.listen(PORT,()=>{
    console.log(`listning server at PORT:${PORT}`);
})
