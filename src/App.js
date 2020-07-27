import React, { useState, useEffect } from 'react';
import ColorBox from './components/ColorBox';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import { v4 as uuidv4 } from 'uuid';
import PostList from './components/PostList';
import Pagination from './components/Pagination';
import qs from 'query-string';
import FilterForm from './components/FilterForm';
function App() {
  const [todoList, setTodoList] = useState([
    { id: 1, title: 'Cras justo odio' },
    { id: 2, title: 'Dapibus ac facilisis' },
    { id: 3, title: 'DQsspibus bqac facilisis' },
  ]);
  const [postList, setPostList] = useState([]);
  const [pagination, setPagination] = useState({
    _page: 1,
    _limit: 10,
    _totalRows: 11,
  });
  const [filter, setFilter] = useState({
    _page: 1,
    _limit: 10,
  });
  useEffect(() => {
    async function fetchPostList() {
      // ...
      try {
        // _limit=10&_page=1
        const paramsString = qs.stringify(filter);
        const requestUrl = `http://js-post-api.herokuapp.com/api/posts?${paramsString}`;
        const response = await fetch(requestUrl);
        const responseJSON = await response.json();
        console.log({ responseJSON });

        const { data, pagination } = responseJSON;
        setPostList(data);
        setPagination(pagination);
      } catch (error) {
        console.log('Failed to fetch post list: ', error.message);
      }
    }

    console.log('POST list effect');
    fetchPostList();
  }, [filter]);

  useEffect(() => {
    console.log('TODO list effect');
  });
  function handlePageChange(newPage) {
    setFilter({ ...filter, _page: newPage });
  }
  function handleTodoClick(todo) {
    let newArray = todoList.filter((item) => item.id !== todo.id);
    setTodoList(newArray);
  }
  function handleTodoFormSubmit(formValues) {
    const newTodo = {
      id: uuidv4(),
      ...formValues,
    };
    const newTodoList = [...todoList];
    newTodoList.push(newTodo);
    setTodoList(newTodoList);
  }
  function handleFilterChange(newFilter) {
    setFilter({
      ...filter,
      _page: 1,
      title_like: newFilter.searchTerm,
    });
  }
  return (
    <div className="App">
      <header
        className="App-header"
        style={{ textAlign: 'center', color: 'red', padding: '20px' }}
      >
        Welcome to hook
      </header>
      <ColorBox />
      <TodoList todos={todoList} onTodoClick={handleTodoClick} />
      <TodoForm onSubmit={handleTodoFormSubmit} />
      <br />
      <PostList posts={postList} />
      <FilterForm onSubmit={handleFilterChange} />
      <br />
      <Pagination pagination={pagination} onPageChange={handlePageChange} />
    </div>
  );
}

export default App;
