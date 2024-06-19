import "./toDo.css";

export const ToDo = ({ selectedDate }) => {
  return (
    <div className="todo-container">
      <div className="separator">
        <h3>Tasks - {selectedDate ? selectedDate.toLocaleDateString() : 'No date selected'}</h3>
      </div>
    </div>
  );
};
