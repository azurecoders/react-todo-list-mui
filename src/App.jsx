import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import styles from "./style.module.css";
import TodoItem from "./components/todo-item/TodoItem";
import TodoDetails from "./components/todo-details/TodoDetails";
import { Skeleton } from "@mui/material";

const App = () => {
  const [todoList, setTodoList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  const [todoDetails, setTodoDetails] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const fetchListOfTodos = async () => {
    try {
      setLoading(true);
      const apiResponse = await fetch("https://dummyjson.com/todos", {
        method: "GET",
      });
      const result = await apiResponse.json();

      if (result?.todos && result?.todos.length > 0) {
        setTodoList(result?.todos);
        setLoading(false);
      } else {
        setTodoList([]);
        setLoading(false);
        setErrorMsg("Something went wrong");
      }
    } catch (error) {
      console.log(error);
      setErrorMsg("Some error Occured");
    }
  };

  const fetchDetailsOfCurrentTodo = async (getCurrentTodoId) => {
    console.log(getCurrentTodoId);
    try {
      const apiResponse = await fetch(
        `https://dummyjson.com/todos/${getCurrentTodoId}`
      );
      const details = await apiResponse.json();
      if (details) {
        setTodoDetails(details);
        setOpenDialog(true);
      } else {
        setTodoDetails(null);
        setOpenDialog(false);
      }
    } catch (error) {
      console.log(error);
      setErrorMsg("Something went wrong");
    }
  };

  useEffect(() => {
    fetchListOfTodos();
  }, []);

  if (loading) {
    return <Skeleton variant="rectangular" height={650} width={650} />;
  }

  return (
    <div className={styles.mainWrapper}>
      <h1 className={styles.headerTitle}>Simple TODO App using Material UI</h1>
      <div className={styles.todoListWrapper}>
        {todoList && todoList.length > 0
          ? todoList.map((todoItem) => (
              <TodoItem
                fetchDetailsOfCurrentTodo={fetchDetailsOfCurrentTodo}
                todo={todoItem}
              />
            ))
          : null}
      </div>
      <TodoDetails
        openDialog={openDialog}
        todoDetails={todoDetails}
        setOpenDialog={setOpenDialog}
        setTodoDetails={setTodoDetails}
      />
    </div>
  );
};

export default App;
