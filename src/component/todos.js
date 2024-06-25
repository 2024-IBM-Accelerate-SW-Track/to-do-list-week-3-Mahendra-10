import React from "react";
import "../component/todos.css";
import { Card, Grid, ListItemButton, ListItemText, Checkbox } from "@mui/material";

const Todos = ({ todos, deleteTodo }) => {
  const todoList = todos.length ? (
    todos.map((todo) => {
      // Initialize color to white
      let color = "#ffffff";

      // Check if the due date is in the past
      const dueDate = new Date(todo.due);
      const currentDate = new Date();
      if (dueDate < currentDate) {
        color = "#ffcccb"; // Light red color for overdue tasks
      }

      return (
        <Grid key={todo.id}>
          <Card style={{ marginTop: 10, backgroundColor: color }} data-testid={todo.content}>
            {/* Return the todo list item {todo.content} as well as its current date/time {todo.date}.
                The item's id is utilized in order to correctly delete an item from the Todo list. */}
            <ListItemButton component="a" href="#simple-list">
              <Checkbox style={{ paddingLeft: 0 }} color="primary" onClick={() => deleteTodo(todo.id)} />
              <ListItemText primary={todo.content} secondary={`Due: ${todo.due}`} />
            </ListItemButton>
          </Card>
        </Grid>
      );
    })
  ) : (
    <p>You have no todo's left </p>
  );
  // Lastly, return the todoList constant that we created above to show all of the items on the screen.
  return (
    <div className="todoCollection" style={{ padding: "10px" }}>
      {todoList}
    </div>
  );
};

export default Todos;
