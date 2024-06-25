import { render, screen, fireEvent } from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import App from './App';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

test('test that App component doesn\'t render duplicate Task', () => {
  render(<App />);

  // Add a task
  const inputTask = screen.getByRole('textbox', { name: /Add New Item/i });
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const addButton = screen.getByRole('button', { name: /Add/i });
  const dueDate = "05/30/2023";
  fireEvent.change(inputTask, { target: { value: "History Test" } });
  fireEvent.change(inputDate, { target: { value: dueDate } });
  fireEvent.click(addButton);

  // Try adding the same task again
  fireEvent.change(inputTask, { target: { value: "History Test" } });
  fireEvent.change(inputDate, { target: { value: dueDate } });
  fireEvent.click(addButton);

  // Check that only one task with "History Test" is rendered
  const tasks = screen.getAllByText(/History Test/i);
  expect(tasks.length).toBe(1);
});

test('test that App component doesn\'t add a task without due date', () => {
  render(<App />);

  // Add a task without a due date
  const inputTask = screen.getByRole('textbox', { name: /Add New Item/i });
  const addButton = screen.getByRole('button', { name: /Add/i });
  fireEvent.change(inputTask, { target: { value: "Task Without Due Date" } });
  fireEvent.click(addButton);

  // Check that the task is not added
  const taskWithoutDueDate = screen.queryByText(/Task Without Due Date/i);
  expect(taskWithoutDueDate).toBeNull();
});

test('test that App component doesn\'t add a task without task name', () => {
  render(<App />);

  // Add a task without a task name
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const addButton = screen.getByRole('button', { name: /Add/i });
  const dueDate = "05/30/2023";
  fireEvent.change(inputDate, { target: { value: dueDate } });
  fireEvent.click(addButton);

  // Check that the task is not added
  const taskWithoutName = screen.queryByText(new RegExp(dueDate, "i"));
  expect(taskWithoutName).toBeNull();
});

test('test that App component can delete task through checkbox', () => {
  render(<App />);

  // Add a task
  const inputTask = screen.getByRole('textbox', { name: /Add New Item/i });
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const addButton = screen.getByRole('button', { name: /Add/i });
  const dueDate = "05/30/2023";
  fireEvent.change(inputTask, { target: { value: "Task to be Deleted" } });
  fireEvent.change(inputDate, { target: { value: dueDate } });
  fireEvent.click(addButton);

  // Find the checkbox for deleting the task
  const deleteCheckbox = screen.getByTestId('delete-checkbox'); // Assuming you have a data-testid for the delete checkbox

  // Simulate clicking on the delete checkbox
  fireEvent.click(deleteCheckbox);

  // Check that the task is no longer in the DOM
  const deletedTask = screen.queryByText(/Task to be Deleted/i);
  expect(deletedTask).toBeNull();
});

test('test that App component renders different colors for past due events', () => {
  render(<App />);

  // Add a task with a past due date
  const inputTask = screen.getByRole('textbox', { name: /Add New Item/i });
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const addButton = screen.getByRole('button', { name: /Add/i });

  // Set a due date that is in the past
  const pastDueDate = "05/01/2023";
  fireEvent.change(inputTask, { target: { value: "Past Due Task" } });
  fireEvent.change(inputDate, { target: { value: pastDueDate } });
  fireEvent.click(addButton);

  // Get the element representing the task
  const pastDueTask = screen.getByText(/Past Due Task/i);

  // Check that the task has a different color (you can use inline styles or classes for this)
  expect(pastDueTask).toHaveStyle('background-color: red'); // Example: assuming past due tasks should be red
});
