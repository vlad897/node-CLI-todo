import fs from "node:fs";
import path from "node:path";
import readline from "node:readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const dbPath = path.resolve("todos.json");

const addTodo = (todoTitle) => {
  fs.readFile(dbPath, (err, data) => {
    if (err) {
      console.log("Can't read the file.");
      return;
    }
    const contentOfDb = JSON.parse(data.toString("utf-8"));
    contentOfDb.push({ title: todoTitle, done: false });
    const updatedContedOfDb = JSON.stringify(contentOfDb);

    fs.writeFile(dbPath, updatedContedOfDb, (err) => {
      if (err) {
        console.log("Can't write a file.");
        return;
      }
    });
  });
};

const updateTodo = (index, title) => {
  fs.readFile(dbPath, (err, data) => {
    if (err) {
      console.log("Can't read the file.");
      return;
    }
    const contentOfDb = JSON.parse(data.toString("utf-8"));
    const updatedContedOfDb = JSON.stringify(contentOfDb.map((el, i) => (i === +index ? { title: title, done: el.done } : el)));

    fs.writeFile(dbPath, updatedContedOfDb, (err) => {
      if (err) {
        console.log("Can't write a file.");
        return;
      }
    });
  });
};

const toggleTodoStatus = (index) => {
  fs.readFile(dbPath, (err, data) => {
    if (err) {
      console.log("Can't read the file.");
      return;
    }
    const contentOfDb = JSON.parse(data.toString("utf-8"));
    const updatedContedOfDb = JSON.stringify(contentOfDb.map((el, i) => (i === +index ? { title: el.title, done: !el.done } : el)));

    fs.writeFile(dbPath, updatedContedOfDb, (err) => {
      if (err) {
        console.log("Can't write a file.");
        return;
      }
    });
  });
};

const readTodos = () => {
  fs.readFile(dbPath, (err, data) => {
    if (err) {
      console.log("Can't read the file.");
      return;
    }
    const contentOfDb = JSON.parse(data.toString("utf-8"));
    const structuredDbContent = contentOfDb.map((el, i) => `${i + 1}. ${el.title} - ${el.done}`).join("\n");
    console.log(structuredDbContent);
  });
};

const deleteTodo = (index) => {
  fs.readFile(dbPath, (err, data) => {
    if (err) {
      console.log("Can't read the file.");
      return;
    }
    const contentOfDb = JSON.parse(data.toString("utf-8"));
    contentOfDb.splice(index, 1);
    const updatedContedOfDb = JSON.stringify(contentOfDb);

    fs.writeFile(dbPath, updatedContedOfDb, (err) => {
      if (err) {
        console.log("Can't write a file.");
        return;
      }
    });
  });
};

rl.question("What do you want to do?\n", (action) => {
  switch (action.toLowerCase()) {
    case "add":
      rl.question("Please, Enter the title of todo.\n", (todoTitle) => {
        addTodo(todoTitle);
        console.log("Todo succesfully added.");
        rl.close();
      });
      break;
    case "update":
      rl.question("Please, Enter the index of todo.\n", (index) => {
        rl.question("Please, Enter the new title of todo.\n", (title) => {
          updateTodo(index, title);
          rl.close();
        });
      });
      break;
    case "mark_as_done":
      rl.question("Please, Enter the index of todo.\n", (index) => {
        toggleTodoStatus(index);
        rl.close();
      });
      break;
    case "read":
      readTodos();
      rl.close();
      break;
    case "delete":
      rl.question("Please, Enter the index of todo.\n", (index) => {
        deleteTodo(index);
        console.log(`Todo in index ${index} succesfully deleted.`);
        rl.close();
      });
      break;
  }
});
