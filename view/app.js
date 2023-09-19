let template;

const getTemplate = () => {
  if (!template) template = document.getElementById("todo-app");
  return template.content.firstElementChild.cloneNode(true);
};

const addEvents = (targetElement, events) => {
  // 바로 targetElement.querySelector('.new-todo').addEventListener를 하면 에러가 뜰 수 있음
  // targetElement.querySelector('.new-todo')가 유효한 DOM을 못찾은 상태에서
  // addEventListener를 걸면 에러가 뜸(is not a function)
  const newTodo = targetElement.querySelector(".new-todo");
  newTodo.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      events.addItem(e.target.value);
      e.target.value = "";
    }
  });
};

export default (targetElement, state, events) => {
  const newApp = targetElement.cloneNode(true);
  newApp.innerHTML = "";
  newApp.appendChild(getTemplate());
  addEvents(newApp, events);
  return newApp;
};
