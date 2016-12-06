var express = require('express');
var router = express.Router();
var path = require("path");

router.get('/', function(req, res, next) {
  res.sendFile('main.html', { root: path.join(__dirname, '../public') });
});

router.post('/api/encrypt', function(req, res) {
  res.json(req.body);
})

// router.get('/api/todos', function(req, res) {
//   Todo.find(function(err, todos) {
//     if (err) res.send(err)
//     res.json(todos);
//   });
// });

// router.post('/api/todos/new', function(req, res) {
//   var thisTodo = new Todo({
//     text: req.body.text,
//     completed: false
//   });
//   thisTodo.save(function (err) {
//     res.json(thisTodo);
//   })
// });

// router.post('/api/todos/delete', function(req, res) {
//   Todo.findById(req.body._id, function (err, todo) {
//     if (err) console.log(err);

//     // Delete entry
//     todo.remove(function(err) {
//       if (err) return console.log(err);
//       Todo.find(function(err, todos) {
//         if (err) res.send(err)
//         res.json(todos);
//       });
//     })
//   });
// });

// router.post('/api/todos/toggleComplete', function(req, res) {
//   Todo.findById(req.body.id, function (err, todo) {
//     if (err) console.log(err);

//     todo.completed = !todo.completed;
//     todo.save(function (err) {
//       if (err) res.send(err)
//       Todo.find(function(err, todos) {
//         if (err) res.send(err)
//         res.json(todos);
//       });
//     })
//   });
// });

module.exports = router;
