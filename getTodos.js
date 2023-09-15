const createElement = () => ({
  text: "text",
  completed: false,
});

const repeat = (elementFactory, number) => {
  const array = [];
  for (let index = 0; index < number; index++) {
    array.push(elementFactory());
  }
  return array;
};

export default () => {
  const howMany = faker.random.number(10) + 1;
  return repeat(createElement, howMany);
};
