import getTodos from "./getTodos.js";
import todosView from "./view/todos.js";
import counterView from "./view/counter.js";
import filtersView from "./view/filters.js";
import applyDiffAndRender from "./applyDiffAndRender.js";

import registry from "./registry.js";

registry.add("todos", todosView);
registry.add("counter", counterView);
registry.add("filters", filtersView);

const state = {
  todos: getTodos(),
  currentFilter: "All",
};

const render = () => {
  // requestAnimationFrame API는 프레임 사이클에 맞게 렌더링을 반영함
  window.requestAnimationFrame(() => {
    const realNode = document.querySelector(".todoapp");
    const virtualNode = registry.renderRoot(realNode, state);
    const parentNode = document.body;

    // 진짜 DOM과 가상 DOM을 비교해서 새로 교체 혹은 현상유지
    applyDiffAndRender(parentNode, realNode, virtualNode);
  });
};

// 렌더링 변환
// window.setInterval(() => {
//   state.todos = getTodos();
//   render();
// }, 3000);

render();
