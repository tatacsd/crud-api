<div align="center" justify="center">
<img src="https://visitor-badge.glitch.me/badge?page_id=tatacsd.visitor-badge&left_color=#black&right_color=white" />

 &nbsp;&nbsp;&nbsp;


<div align="center" justify="center">
    <h1> Challenge 01 - NodeJS Fundamentals </h1>
  
</div>
<br />
<p align="center">
  <a href="#-technologies"> Technologies </a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-project"> Project </a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-business-rules"> Business Rules </a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-routes-business-rules"> Routes Business Rules </a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-bonus-challenge"> Bonus Challenge </a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-how-to-run"> How to run </a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
</p>

</div>

<br>



## 🚀 Technologies

This project was developed using the following technologies:

- [Node.js](https://nodejs.org/en/)

## 💻 Project



This project was developed during the on the [Ignite](https://rocketseat.com.br/ignite) trail, provided by [Rocketseat](https://rocketseat.com.br/) 

<!-- In this challenge, you will develop an API to perform CRUD operations on your tasks. -->
In this challenge, I developed an API to perform CRUD operations for tasks. The API requirements are:

- Create a task
- List all tasks
- Update a task by id
- Remove a task by id
- Mark a task as complete by id


<!-- // Business Rules -->
## 📝 Business Rules
Below are the business rules that must be followed for the application to be considered complete:
Each task must have the following properties:
- id - Unique identifier of each task
- title - Title of the task
- description - Detailed description of the task
- completed_at - Date when the task was completed. The initial value must be null.
- created_at - Date when the task was created.
- updated_at - Must always be updated to the date when the task was last updated.

<!-- routes business rules -->
### 📝 Routes Business Rules
- POST - /tasks
It should be possible to create a task in the database by sending the title and description fields through the request body.
When creating a task, the fields id, created_at, updated_at, and completed_at should be automatically filled in, according to the guidance of the properties mentioned above.


- GET - /tasks
It should be possible to list all tasks that are registered in the database.
Additionally, it should be possible to filter tasks by the `title` and `description` fields, using the query parameters `title` and `description`.


- PUT - /tasks/:id
It should be possible to update a task by sending the `id` of the task through the request parameters and the fields to be updated through the request body.
The request body must contain at least one of the following fields: `title`, `description`. Sending an empty body should return an error. Also, the `id` field must be verified and, if it does not exist, an error should be returned.


- DELETE - /tasks/:id
It should be possible to delete a task by sending the `id` of the task through the request parameters.
Before deleting a task, it must be verified whether the `id` sent through the request parameters corresponds to a task that is registered in the database. If not, an error should be returned.

- PATCH - /tasks/:id/done
It should be possible to mark a task as completed by sending the `id` of the task through the request parameters.
OBS: If a task is marked as completed it should return to a "normal" state.


## 📝 Bonus Challenge
- Bulk import of tasks through a CSV file

## 🚀 How to run

- Clone the repository
```bash
$ git clone https://github.com/tatacsd/crud-api.git
```
- Enter the folder
```bash
$ cd crud-api
```
- Install the dependencies
```bash
$ npm i
```
- Run the application
```bash
$ npm run dev
```

