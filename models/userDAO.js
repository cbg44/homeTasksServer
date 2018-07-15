
User = require('../models/userModel');
Task = require('../models/tasksModel');
require('mongoose').set('debug', true);


module.exports = class userDAO {

  static mostTasksDoneSoFar() {
    // return User.find().sort({scores: 'desc'})
    //   .catch(() => error("bla"));
    var length = User.aggregate([
           { $project: {
            name: 1,
            tasks_done: {$size: "$tasks.completed_tasks"}}
          }
       ])
    return length;
  }

  // static TasksPerDay() {
  //   return User.find({}, 'name scores')
  //     .catch(() => error("bla"));
  // }

  // static TheMedalists() {
  //   var achievment = User.aggregate([
  //   {
  //     $project:
  //      {
  //          medalist: { $arrayElemAt: [ "$achievments", 0 ] }
  //       }
  //    }
  // ])
  //   return achievment;
  // }

  //Tal:
  static getUserProfileSummary(usrid){
      console.log("getting profile summary");
        // console.log(usrid);
        // return User.find( {_id: usrid}, {'scores': 1, 'tasks.completed_tasks': 1 , 'achievments.length': 1})
        //              .catch(() => error("err"));
    var length = User.aggregate([
           { $project: {
            scores: 1,
            achievments: 1,
            tasks_done: {$size: "$tasks.completed_tasks"}}
          }
       ])
    
     return length;

    // JSON.stringify(length);
    // JSON.stringify(scores);
    // console.log(length);
    // console.log(scores);
    
    }
    static getUserCompletedTasks(usrId){
      console.log("getting completed tasks");
      var query = User.find({googleId: usrId}, 'tasks.completed_tasks')
      return query;

      // console.log("tasks: " + tasks)
      // console.log(
      // tasks.reduce((arr, ele) => ([].push.apply(arr, ele.Attributes.filter((v) => arr.indexOf(v) == -1)), arr), [])
      // );

      // // Task.find({ _id: { $in: tasks }, 'name' }, function (err, result) {
      // // result = result.map(function (document) {
      // //     return document.value
      // //   });
      // // });
      // // console.log(result);
      // // return result
      // var names = Task.find({ _id: { $in: tasks }}, 'name');
      // var name_res = query.exec(function (err, name) {console.log("name: " + name)});
    }
    static getUserSavedTasks(usrId){
      console.log("getting saved tasks");
      return User.find({googleId: usrId}, 'tasks.taken_tasks')
            .catch(() => error("err"));
    }
    static getUserAchievments(usrId){
      console.log("getting achievments: " + usrId);
      return User.find({googleId: usrId}, 'achievments')
            .catch(() => error("err"));
    }
    static getAllScores(){
        console.log("getting all scores");
        return User.find({}, 'name scores').sort({scores: 'desc'})
                    .catch(() => error("err"));
    }
    static putTakenTask(){
        console.log("success in routing");
        return User.find({}, 'name scores').sort({scores: 'desc'})
                    .catch(() => error("err"));

    }

    static takeATask(taskId, usrId){
      return User.findOneAndUpdate({googleId: usrId}, {$push: {"tasks.taken_tasks": taskId}}, {new: false})
      .catch(() => error("err"));
    }

   static closeATask(taskId, usrId){
     return User.findOneAndUpdate({googleId: usrId}, {$push: {"tasks.completed_tasks": taskId}}, {new: false})
      .catch(() => error("err"));
    }

    static getMedalist(){
     return User.find({}, 'achievments name')
      .catch(() => error("err"));
    }
    

};