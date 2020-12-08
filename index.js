const express = require('express')
const { createQuery } = require('mysql2/typings/mysql/lib/Connection')
const { Sequelize, DataTypes, where } = require('sequelize')
const task = require('./models/task')
const Task = require('./models/task')

const app = express()
const sequelize = new Sequelize({ dialect: 'sqlite', storage: './task-list.db' })
const tasks = Task(sequelize, DataTypes)



// We need to parse JSON coming from requests
app.use(express.json())

// List tasks
app.get('/tasks', async (req, res) => {
  res.json(await tasks.findAll())
})

// Create task

// app.post('/tasks', async (req, res) => {
//   const body = await tasks.create({
//     description: "NewTask",
//     done: "false"
//   }, { tasks: ['description', 'done'] });
//   console.log(tasks.description)
//   console.log(tasks.done)

  
//   res.json(body)
  
// })


app.post('/tasks', async (req, res) => {
  const body = req.body.tasks
await queryInterface.bulkInsert('Tasks', [{
    description: body.tasks.description,
    done: body.tasks.done,
    createdAt: new Date(),
    updatedAt: new Date()
  }
  
})




// Show task
app.get('/tasks/:id', async (req, res) => {
  const taskId = req.params.id
  const Find = await tasks.findByPk(taskId)
  res.send({ Find })
 
})

// Update task
app.put('/tasks/:id',async (req, res) => {
  const taskId = req.params.id
  const Find = await tasks.findByPk(taskId)
  const des = req.params.description
  const don = req.params.done
  res.send(Find)
})

// // Delete task
// app.delete('/tasks/:id', (req, res) => {
//   const taskId = req.params.id

//   res.send({ action: 'Deleting task', taskId: taskId })
// })

app.listen(3000, () => {
  console.log('Iniciando o ExpressJS na porta 3000')
})
