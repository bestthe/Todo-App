import React, { useEffect, useState } from 'react';
import './App.css';
import { Journals, Trash3Fill } from 'react-bootstrap-icons';

function App() {
  function setVh() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh * 100}px`);
  }

  window.addEventListener('resize', setVh);
  setVh();

  const time = new Date();
  const today = `${time.getFullYear()}.${String(time.getMonth() + 1).padStart(
    2,
    '0'
  )}.${String(time.getDate()).padStart(2, '0')}`;

  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todo');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupAnim, setPopupAnim] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(null);

  const groupedTodos = todos.reduce((acc, todo) => {
    const date = todo.date || today;
    if (!acc[date]) acc[date] = [];
    acc[date].push(todo);
    return acc;
  }, {});

  const handleSubmit = (e) => {
    e.preventDefault();
    const todo = e.target.addlist.value.trim();
    if (!todo) return;

    setTodos((prev) => [
      { id: Date.now(), text: todo, check: false, active: false, date: today },
      ...prev,
    ]);

    setTimeout(() => {
      setTodos((prev) => {
        const newTodos = [...prev];
        newTodos[0] = { ...newTodos[0], active: true };
        return newTodos;
      });
    }, 200);

    e.target.addlist.value = '';
  };

  const openPopup = (id) => {
    setCurrentIdx(id);
    setPopupOpen(true);

    setTimeout(() => {
      setPopupAnim(true);
    }, 10);
  };

  const closePopup = () => {
    setPopupAnim(false);
    setTimeout(() => setPopupOpen(false), 300);
  };

  const handelDelete = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const handleCheck = (id) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, check: !t.check } : t))
    );
  };

  useEffect(() => {
    localStorage.setItem('todo', JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="App">
      <div id="todo">
        <div className="todo_wrap">
          <div className="todo_textbox">
            <h1 className="todo_title">
              <Journals size={70} />
              TodoList App
            </h1>
            <p className="todo_hi">Hey, Hello!</p>
            <p className="todo_subtitle">
              TodoList App에 오신 것을 환영합니다.
            </p>
            <p className="todo_desc">
              React로 제작한 포트폴리오용 TodoList 앱입니다. 브라우저의 로컬
              저장소(Local Storage)를 활용해 하루 일정을 간편하게 관리할 수
              있으며, 실제 사용 가능한 실용적인 기능들을 담았습니다.
            </p>
          </div>

          <div className="todo_contents">
            <div className="content_header">
              <h2>TodoList App</h2>
              <p>추가하고 싶으신 TodoList 목록을 자유롭게 추가해 보세요</p>
            </div>
            <form className="add_todo" onSubmit={(e) => handleSubmit(e)}>
              <input
                type="text"
                name="addlist"
                id="addlist"
                placeholder="할일을 작성해주세요"
              />
              <button className="addBtn" type="submit">
                Add
              </button>
            </form>

            <div className="todos">
              {Object.keys(groupedTodos)
                .sort((a, b) => (a < b ? 1 : -1))
                .map((date) => (
                  <div key={date} className="todo_days_group">
                    <div className="todo_days">
                      <div className="line"></div>
                      <div className="day">{date} Todos</div>
                      <div className="line"></div>
                    </div>

                    <ul className="todoLists">
                      {groupedTodos[date].map((todo) => (
                        <li
                          key={todo.id}
                          className={[
                            todo.active && 'active',
                            todo.check && 'checked',
                          ]
                            .filter(Boolean)
                            .join(' ')}
                        >
                          <button
                            type="button"
                            className="check_btn"
                            onClick={() => handleCheck(todo.id)}
                          >
                            <div className="chek_shape"></div>
                            <div className="real_todo">{todo.text}</div>
                          </button>
                          <button
                            type="button"
                            className="delete_btn"
                            onClick={() => openPopup(todo.id)}
                          >
                            <Trash3Fill size={18} color="#999" />
                          </button>

                          {popupOpen && currentIdx === todo.id && (
                            <div
                              className={`dle_popup ${
                                popupAnim ? 'active' : ''
                              }`}
                            >
                              <p>정말 삭제하시겠습니까?</p>
                              <div className="btns">
                                <button
                                  onClick={() => handelDelete(currentIdx)}
                                >
                                  확인
                                </button>
                                <button onClick={closePopup}>취소</button>
                              </div>
                            </div>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
