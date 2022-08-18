import { ethers } from "hardhat";

async function main() {
  
    const Todo = await ethers.getContractFactory("TodoApp");
    const todo = await Todo.attach(
        "0xceF762EBb7130e4CA25e97B64B7BbFFfd7bb8959" // The deployed contract address
      );

      await todo.setTesk("Testing 2", "This is just another test"); // 0x4857b2111c22980a63e6767fb33203fd273fdd0bf25a01caf5b9df5f63440cd1

    //   await todo.getTask(0);

    //   await todo.updateStatus(0, true);

    //   await todo.getTask(0);

    //   await todo.deleteTask(0);
  

    // await todo.deployed();
    // console.log(`This contract is deploy on Goerli Address deployed to ${todo.address}`);
  }

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});