// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract TodoApp {
    struct Todo {
        string title;
        string decs;
        bool isDone;
    }

    uint taskId = 0;
    mapping(address => Todo[]) userToTasks;

    event addTask(address user, uint id);
    event taskDone(uint id, bool isDone);

    function setTesk(string calldata _title, string calldata _desc) 
    external {
        // uint8 _id = taskId;
        userToTasks[msg.sender].push(Todo(
            _title,
            _desc,
            false
        ));

        emit addTask(msg.sender, taskId++);
    }

    function getTask(uint _taskId) 
    external view returns (Todo memory) {

       Todo storage task = userToTasks[msg.sender][_taskId];

       return task;
   }

   function updateStatus(uint _taskId, bool _status) 
   external{

        userToTasks[msg.sender][_taskId].isDone = _status;

        emit taskDone(_taskId, true);
   }
 
    function deleteTask(uint _taskId) 
    external{

       delete userToTasks[msg.sender][_taskId];

   } 

}