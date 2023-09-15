const isNodeChanged = (node1, node2) => {
  const n1Attributes = node1.attributes;
  const n2Attributes = node2.attributes;
  if (n1Attributes.length !== n2Attributes.length) {
    // DOM의 attributes의 갯수가 달라졌을 때
    return true;
  }

  const differentAttribute = Array.from(n1Attributes).find((attribute) => {
    const { name } = attribute;
    const attribute1 = node1.getAttribute(name);
    const attribute2 = node2.getAttribute(name);

    return attribute1 !== attribute2;
  });

  if (differentAttribute) {
    return true;
  }

  if (
    node1.children.length === 0 &&
    node2.children.length === 0 &&
    node1.textContent !== node2.textContent
  ) {
    // 텍스트가 바뀌었을 때
    return true;
  }

  return false;
};

const applyDiffAndRender = (parentNode, realNode, virtualNode) => {
  if (realNode && !virtualNode) {
    // 아무런 변화가 없음
    realNode.remove();
    return;
  }

  if (!realNode && virtualNode) {
    // 실제노드가 없는데, 가상돔만 있는 경우는
    // 새로운 노드가 생긴거니까
    // 그대로 parentNode에 추가
    parentNode.appendChild(virtualNode);
    return;
  }

  if (isNodeChanged(virtualNode, realNode)) {
    // 변화됐다면, realNode를 virtualNode로 교체
    realNode.replaceWith(virtualNode);
    return;
  }

  const realChildren = Array.from(realNode.children);
  const virtualChildren = Array.from(virtualNode.children);

  const max = Math.max(realChildren.length, virtualChildren.length);
  // children 계층구조를 모두 돌기 위해서
  // 재귀함수를 이용해서 다 applyDiffAndRender를 적용
  for (let i = 0; i < max; i++) {
    applyDiffAndRender(realNode, realChildren[i], virtualChildren[i]);
  }
};

export default applyDiffAndRender;
