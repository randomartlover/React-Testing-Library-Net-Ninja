import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';
import Todo from '../Todo';

const MockTodo = () => {
  return (
    <BrowserRouter>
      <Todo />
    </BrowserRouter>
  )
}

const addTasks = (tasks) => {
  const inputElement = screen.getByPlaceholderText(/Add a new task here.../i);
  const buttonElement = screen.getByRole("button", { name: /Add/i });

  tasks.forEach(task => {
    fireEvent.change(inputElement, { target: { value: task } } )
    fireEvent.click(buttonElement);
  });
}


describe("Todo", () => {
  it('should render added todo', async () => {
    render(
      <MockTodo
      />
    );
    addTasks(["Go Grocery Shopping"])
    const divElement = screen.getByText("Go Grocery Shopping");
    expect(divElement).toBeInTheDocument();
  });

  it('should render added todos', async () => {
    render(
      <MockTodo
      />
    );
    addTasks(["Go Grocery Shopping", "Learn to skateboard", "Stare at walls"])
    const divElements = screen.getAllByTestId("task-container");
    expect(divElements.length).toBe(3);
  });

  it('should not have completed class when initially rendered', async () => {
    render(
      <MockTodo
      />
    );
    addTasks(["Go Grocery Shopping"])
    const divElement = screen.getByText(/Go Grocery Shopping/i);
    expect(divElement).not.toHaveClass("todo-item-active");
  });

  it('should have completed class when clicked', async () => {
    render(
      <MockTodo
      />
    );
    addTasks(["Go Grocery Shopping"])
    const divElement = screen.getByText(/Go Grocery Shopping/i);
    fireEvent.click(divElement);
    expect(divElement).toHaveClass("todo-item-active");
  });
});
