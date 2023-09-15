const registry = {};

const renderWrapper = (component) => {
  return (targetElement, state) => {
    // rootDOM을 복사한다
    const element =
      targetElement.classList[0] === "todoapp"
        ? // realNode일 경우는 state를 안 넘겨줘도 되지 않음
          component(targetElement)
        : // realNode일 경우 state를 넣어줘서 새로운 것으로 리턴할 때 써야함
          component(targetElement, state);

    // realNode를 클론한 것을 기준으로 querySelectorAll하기
    const childComponents = element.querySelectorAll("[data-component]");

    // children들 중 변경된 것은 새로운 것으로 교체
    Array.from(childComponents).forEach((target) => {
      const name = target.dataset.component;

      const child = registry[name];

      if (!child) {
        return;
      }

      // 없으면 넣어주고
      // 있으면 새로운 것으로 넣어줌
      target.replaceWith(child(target, state));
    });

    return element;
  };
};

const add = (name, component) => {
  // renderWrapper는 함수를 리턴한다.
  registry[name] = renderWrapper(component);
};

const renderRoot = (realNode, state) => {
  const cloneComponent = (realNode) => {
    // root DOM을 클론
    return realNode.cloneNode(true);
  };

  // root를 렌더링한다
  return renderWrapper(cloneComponent)(realNode, state);
};

export default {
  add,
  renderRoot,
};
