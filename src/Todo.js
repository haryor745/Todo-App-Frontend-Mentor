import "./todo.css";
import React, { useState, useEffect } from "react";
const sun = (
  <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26">
    <path
      fill="#FFF"
      fill-rule="evenodd"
      d="M13 21a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-5.657-2.343a1 1 0 010 1.414l-2.121 2.121a1 1 0 01-1.414-1.414l2.12-2.121a1 1 0 011.415 0zm12.728 0l2.121 2.121a1 1 0 01-1.414 1.414l-2.121-2.12a1 1 0 011.414-1.415zM13 8a5 5 0 110 10 5 5 0 010-10zm12 4a1 1 0 110 2h-3a1 1 0 110-2h3zM4 12a1 1 0 110 2H1a1 1 0 110-2h3zm18.192-8.192a1 1 0 010 1.414l-2.12 2.121a1 1 0 01-1.415-1.414l2.121-2.121a1 1 0 011.414 0zm-16.97 0l2.121 2.12A1 1 0 015.93 7.344L3.808 5.222a1 1 0 011.414-1.414zM13 0a1 1 0 011 1v3a1 1 0 11-2 0V1a1 1 0 011-1z"
    />
  </svg>
);
const moon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26">
    <path
      fill="#FFF"
      fill-rule="evenodd"
      d="M13 0c.81 0 1.603.074 2.373.216C10.593 1.199 7 5.43 7 10.5 7 16.299 11.701 21 17.5 21c2.996 0 5.7-1.255 7.613-3.268C23.22 22.572 18.51 26 13 26 5.82 26 0 20.18 0 13S5.82 0 13 0z"
    />
  </svg>
);
const close = (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18">
    <path
      fill="#494C6B"
      fill-rule="evenodd"
      d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"
    />
  </svg>
);
const check = (
  <svg xmlns="http://www.w3.org/2000/svg" width="11" height="9">
    <path fill="none" stroke="#FFF" stroke-width="2" d="M1 4.304L3.696 7l6-6" />
  </svg>
);
const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return JSON.parse(localStorage.getItem("list"));
  } else {
    return [
      {
        id: "1616369946218",
        title: "Complete online JavaScript course",
        isCompleted: true,
      },
      {
        id: "1616369960742",
        title: "Jog around the park 3x",
        isCompleted: false,
      },
      {
        id: "1616369973250",
        title: "10 minutes meditation",
        isCompleted: false,
      },
      { id: "1616369987044", title: "Read for 1 hour", isCompleted: false },
      { id: "1616369998272", title: "Pick up groceries", isCompleted: false },
      {
        id: "1616370018789",
        title: "Complete Todo App on Frontend Mentor",
        isCompleted: false,
      },
    ];
  }
};
function Todo() {
  const [dark, setDark] = useState(true);
  const [name, setName] = useState("");
  const [data, setData] = useState(getLocalStorage());
  const [newList, setNewList] = useState("all");
  const [complete, setComplete] = useState({ value: false });
  const completed = data.filter((s) => s.isCompleted);
  const active = data.filter((z) => !z.isCompleted);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      return;
    } else {
      const newList = {
        id: new Date().getTime().toString(),
        title: name,
        isCompleted: false,
      };
      setData([...data, newList]);
      setName("");
    }
  };
  const icon = dark ? sun : moon;
  const removeItem = (id) => {
    const newList = data.filter((item) => item.id !== id);
    setData(newList);
  };
  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(data));
  }, [data]);
  return (
    <div className={`todo-body ${dark && `dark-theme`}`}>
      <div className="header">
        <div className="header-cont">
          <h1>TODO</h1>
          <button onClick={() => setDark(!dark)}>{icon}</button>
        </div>
        <div className="input-box">
          <div className="input-cont">
            <div className="check"></div>
            <form className="form" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Create a new todo..."
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </form>
          </div>
        </div>
      </div>
      <div className="list-container">
        {newList === "all" &&
          data.map((item) => {
            return (
              <TodoList item={item} key={item.id} removeItem={removeItem} />
            );
          })}
        {newList === "active" &&
          active.map((item) => {
            return (
              <TodoList item={item} key={item.id} removeItem={removeItem} />
            );
          })}
        {newList === "completed" &&
          completed.map((item) => {
            return (
              <TodoList item={item} key={item.id} removeItem={removeItem} />
            );
          })}
        <div className="footer">
          <div className="footer-inner">
            <p>
              {data.length} item{data.length > 1 ? "s" : ""} left
            </p>
            <Filter list={data} setNewList={setNewList} newList={newList} />
            <button
              className="clear"
              onClick={() => {
                setData(data.filter((q) => !q.isCompleted));
              }}
            >
              Clear Completed
            </button>
          </div>
        </div>
      </div>
      <div className="below">
        <div className="filter-below">
          <Filter list={data} setNewList={setNewList} newList={newList} />
        </div>
      </div>
      <Attribution />
    </div>
  );
}
const Filter = ({ setNewList, newList }) => {
  return (
    <div className="filter-box">
      <button
        className={`filter-btn ${newList === "all" && "chosen"}`}
        onClick={() => {
          setNewList("all");
        }}
      >
        All
      </button>
      <button
        className={`filter-btn ${newList === "active" && "chosen"}`}
        onClick={() => {
          setNewList("active");
        }}
      >
        Active
      </button>
      <button
        className={`filter-btn ${newList === "completed" && "chosen"}`}
        onClick={() => {
          setNewList("completed");
        }}
      >
        Completed
      </button>
    </div>
  );
};
const TodoList = ({ item, removeItem }) => {
  const [isComp, setIsComp] = useState(item.isCompleted);
  let { id, title } = item;
  item.isCompleted = isComp;
  return (
    <div className={`todo ${item.isCompleted === true && `completed`}`}>
      <div
        className="check"
        onClick={(e) => {
          setIsComp(!isComp);
        }}
      ></div>
      <div className="title">
        <p>{title}</p>
      </div>
      <button
        onClick={() => {
          removeItem(id);
        }}
      >
        {close}
      </button>
    </div>
  );
};
const Attribution = () => {
  return (
    <div className="attribution">
      <p>Don't drag and drop to re-order list</p>
      <p>
        Challenge by{" "}
        <a href="https://www.frontendmentor.io/?ref=challenge">
          Frontend Mentor
        </a>
      </p>
    </div>
  );
};
export default Todo;
