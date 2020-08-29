const express = require('express');

const router = express.Router();

const ToDoTask = require('../model/taskToDo');
const mongoose = require('mongoose');

router.get('/all', (req, res) => {
	ToDoTask.find({})
		.then((data) => {
			'Data: ', data;
			res.json(data);
		})
		.catch((error) => {
			'error: ', error;
		});
});

router.get('/todolist', (req, res) => {
	ToDoTask.find({ status: 'To do' })
		.then((data) => {
			'todo Data: ', data;
			res.json(data);
		})
		.catch((error) => {
			'error: ', error;
		});
});
router.get('/inprogresslist', (req, res) => {
	ToDoTask.find({ status: 'In progress' })
		.then((data) => {
			' inpro Data: ', data;
			res.json(data);
		})
		.catch((error) => {
			'error: ', error;
		});
});
router.get('/completedlist', (req, res) => {
	ToDoTask.find({ status: 'Completed' })
		.then((data) => {
			' comp Data: ', data;
			res.json(data);
		})
		.catch((error) => {
			'error: ', error;
		});
});
router.get('/:taskId', (req, res) => {
	const id = req.params.taskId;
	ToDoTask.findById(id)
		.exec()
		.then((data) => {
			'detail Data: ', data;
			res.json(data);
		})
		.catch((error) => {
			'error: ', error;
		});
});
router.post('/edit/:taskId', (req, res) => {
	const id = req.params.taskId;
	const data = req.body;
	if (data.progress == 100) {
		data.status = 'Completed';
	} else if (data.progress > 0) {
		data.status = 'In progress';
	} else {
		data.status = 'To do';
	}
	ToDoTask.findByIdAndUpdate(id, data)
		.exec()
		.then((data) => {
			'edit Data: ', data;
			res.json(data);
		})
		.catch((error) => {
			'error: ', error;
		});
});
// router.post('/initiate/:taskId', (req, res) => {
// 	const id = req.params.taskId;
// 	const data =req.body;
// 	("*****************************************************************************************",data)
// 	ToDoTask.findByIdAndUpdate(id,data)
// 		.exec()
// 		.then((data) => {
// 			('edit Data: ', data);
// 			res.json(data);
// 		})
// 		.catch((error) => {
// 			('error: ', error);
// 		});
// });
router.delete('/delete/:taskId', (req, res) => {
	const id = req.params.taskId;
	const data = req.body;
	ToDoTask.findByIdAndDelete(id)
		.exec()
		.then((data) => {
			'del Data: ', data;
			res.json(data);
		})
		.catch((error) => {
			'error: ', error;
		});
});

router.post('/create', (req, res) => {
	const data = req.body;
	// const newToDoTask = new ToDoTask(data);
	if (data.progress == 100) {
		data.status = 'Completed';
	} else if (data.progress > 0) {
		data.status = 'In progress';
	} else {
		data.status = 'To do';
	}
	const newToDoTask = new ToDoTask({
		_id: new mongoose.Types.ObjectId(),
		title: data.title,
		description: data.description,
		deadline: data.deadline,
		status: data.status,
		progress: data.progress,
	});
	// newToDoTask.save((error) =>
	// {
	// 	if (error) {
	// 		res.status(500).json({ msg: 'Failed' });
	// 		return;
	// 	}
	// 	return res.json({ msg: 'data saved' });
	// });
	newToDoTask
		.save()
		.then((data) => {
			'del Data: ', data;
			res.json(data);
		})
		.catch((error) => {
			'error: ', error;
		});
});

module.exports = router;
