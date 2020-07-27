import React from 'react';
import PropTypes from 'prop-types';
import { ListGroup, ListGroupItem } from 'reactstrap';
TodoList.propTypes = {
  todos: PropTypes.array,
  onTodoClick: PropTypes.func,
};
TodoList.defaultProps = {
  todos: [],
  onTodoClick: null,
};

function TodoList(props) {
  const { todos, onTodoClick } = props;
  function handleClick(todo) {
    if (!onTodoClick) return;
    onTodoClick(todo);
  }
  return (
    <div>
      <ListGroup>
        {todos.map((item) => (
          <ListGroupItem onClick={() => handleClick(item)} key={item.id}>
            {item.title}
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
}

export default TodoList;
