const mongoose= require('mongoose');
//Schema
const TaskSchema = mongoose.Schema({
	_id:mongoose.Types.ObjectId,
	title: { type: String },
	description: { type: String },
	progress: { type: Number, default: 0, min:0,max:100},
	createdDate: { type: Date, default: Date.now() },
	updatedDate: { type: Date, default: Date.now() },
    deadline: { type: Date,},
	status:{type:String, default:"To do"}, 
});;

// const today = new Date();
// const tomorrow = new Date(today);
// const nextMonth = new Date(today);
// tomorrow.setDate(tomorrow.getDate() + 1);
// nextMonth.setMonth(nextMonth.getMonth() + 1);

// const ExampleData = {
// 	title: 'Make to do list project',
// 	description: 'Achieve 5 basic function and more',
// 	deadline: nextMonth,
// };
// const NewTask = new ToDoTask(ExampleData);

// NewTask.save((error) => {
// 	if (error) {
// 		console.log('Oops, something happened');
// 	} else {
// 		console.log('Data saved Successfully');
// 	}
// });
//Model
const ToDoTask = mongoose.model('ToDoTask', TaskSchema);

module.exports= ToDoTask;