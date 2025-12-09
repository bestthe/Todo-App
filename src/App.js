import React, { useEffect, useState } from 'react';
import './App.css';
import { Journals, Trash3Fill, Trash3 } from 'react-bootstrap-icons';

function App() {
  const time = new Date();
  const year = String(time.getFullYear());
  const month = String(time.getMonth() + 1).padStart(2, '0');
  const day = String(time.getDate()).padStart(2, '0');

  const today = `${year}.${month}.${day}`;

  const [todos, setTodos] = useState([]);
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupAnim, setPopupAnim] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const todo = e.target.addlist.value.trim();
    if (!todo) return;

    setTodos((prev) => [
      ...prev,
      { id: Date.now(), text: todo, check: false, active: false },
    ]);

    setTimeout(() => {
      setTodos((prev) =>
        prev.map((t, idx2) =>
          idx2 === prev.length - 1 ? { ...t, active: true } : t
        )
      );
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
              <div className="todo_days">
                <div className="line"></div>
                <div className="day">2025.12.09 Todos</div>
                <div className="line"></div>
              </div>

              <ul className="todoLists">
                {todos.map((todo) => (
                  <li key={todo.id} className={todo.active ? 'active' : ''}>
                    <button type="button" className="check_btn">
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
                      <div className={`dle_popup ${popupAnim ? 'active' : ''}`}>
                        <p>정말 삭제하시겠습니까?</p>
                        <div className="btns">
                          <button onClick={() => handelDelete(currentIdx)}>
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
