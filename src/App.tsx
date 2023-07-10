import React, { useState } from 'react';
import { Card, Button } from 'antd';
import './App.css';

type Entity = {
  name: string;
  children?: Entity[];
};

const listOfSomeEntities: Entity[] = [
  {
    name: 'a',
    children: [
      {
        name: 'a1',
      },
      {
        name: 'a2',
        children: [
          {
            name: 'a21',
          },
        ],
      },
    ],
  },
  {
    name: 'b',
  },
  {
    name: 'c',
    children: [
      {
        name: 'c1',
        children: [
          {
            name: 'c11',
          },
          {
            name: 'c12',
          },
        ],
      },
    ],
  },
];

const App: React.FC = () => {
  const [flatEntities, setFlatEntities] = useState<string[]>();

  // функция, приводящая массив объектов к массиву строк
  function flattenObject(entities: Entity[], prefix: string = ''): string[] {
    let result: string[] = [];

    for (const entity of entities) {
      const fullName = prefix ? `${prefix} > ${entity.name}` : entity.name;
      result.push(fullName);

      if (entity.children) {
        const childResults = flattenObject(entity.children, fullName);
        result = result.concat(childResults);
      }
    }
    console.log(result);
    setFlatEntities(result);
    return result;
  }
  //ообработка нажатия кнопки для отображения результата выполнения задачи
  const handleClick = () => {
    flattenObject(listOfSomeEntities);
  };

  return (
    <Card className='app'>
      <div>
        <h3>Описание тестового задания:</h3>
        <p>Дан массив элементов listOfSomeEntities. Элемент имеет поле name и может содержать аналогичный вложенный массив в поле children. Уровень вложенности может быть любой. </p>
        <p>
          Привести изначальный массив к плоской форме result, где каждому элементу соответствует элемент начального массива с одного из уровней вложенности. Сам элемент массива result представляет из себя строку полученную путём конкатенации полей name соответствующего элемента и его предков по
          начальному массиву.
        </p>
        <p> Тестовое должно отрабатывать по кнопке. Т.е. необходимо собрать приложение, которое можно запустить нажатием кнопки "Показать", после чего на экране должна появиться итоговая строка.</p>
        <p>
          Массив:
          {JSON.stringify(listOfSomeEntities)}
        </p>
      </div>

      <Button className='button' type='primary' onClick={handleClick}>
        Показать решение
      </Button>
      <p>Результат: {flatEntities ? <ul className='result'>[{flatEntities && flatEntities.map((element) => <li>'{element}',</li>)}]</ul> : null}</p>
    </Card>
  );
};

export default App;
