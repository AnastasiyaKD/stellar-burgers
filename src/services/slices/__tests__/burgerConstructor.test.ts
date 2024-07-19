import { TConstructorIngredient } from '@utils-types';
import {
  addToConstructor,
  burgerSlice,
  clearConstructor,
  initialState,
  moveItemDown,
  moveItemUp,
  removeFromConstructor,
  resetConstructor
} from '../burgerConstructor';

const mockIngredients: TConstructorIngredient[] = [
  {
    id: '1',
    _id: '2',
    name: 'Помидоры',
    type: 'main',
    proteins: 3,
    fat: 4,
    carbohydrates: 5,
    calories: 6,
    price: 7,
    image: 'string',
    image_large: 'string',
    image_mobile: 'string'
  },
  {
    id: '2',
    _id: '3',
    name: 'Булочка',
    type: 'bun',
    proteins: 2,
    fat: 3,
    carbohydrates: 4,
    calories: 5,
    price: 6,
    image: 'string',
    image_large: 'string',
    image_mobile: 'string'
  },
  {
    id: '3',
    _id: '4',
    name: 'Огурец',
    type: 'maim',
    proteins: 3,
    fat: 3,
    carbohydrates: 4,
    calories: 5,
    price: 6,
    image: 'string',
    image_large: 'string',
    image_mobile: 'string'
  }
];

describe('Проверяем работу constructor', () => {
  it('добавляем ингредиент', () => {
    const state = burgerSlice.reducer(
      initialState,
      addToConstructor(mockIngredients[0])
    );
    expect(state).toEqual({
      bun: null,
      ingredients: [mockIngredients[0]]
    });
  });
  it('удаляем ингредиент', () => {
    const initialState = {
      bun: null,
      ingredients: [mockIngredients[0]]
    };
    const state = burgerSlice.reducer(initialState, removeFromConstructor(0));
    expect(state).toEqual({
      bun: null,
      ingredients: []
    });
  });
  it('сбрасываем конструктор', () => {
    const initialState = {
      bun: mockIngredients[1],
      ingredients: [mockIngredients[0]]
    };
    const state = burgerSlice.reducer(initialState, resetConstructor());
    expect(state).toEqual({
      bun: null,
      ingredients: []
    });
  });
  it('перемещаем ингредиент вверх', () => {
    const initialState = {
      bun: null,
      ingredients: [mockIngredients[0], mockIngredients[2]]
    };
    const state = burgerSlice.reducer(initialState, moveItemUp(1));
    expect(state).toEqual({
      bun: null,
      ingredients: [mockIngredients[2], mockIngredients[0]]
    });
  });
  it('перемещаем ингредиент вниз', () => {
    const initialState = {
      bun: null,
      ingredients: [mockIngredients[0], mockIngredients[2]]
    };
    const state = burgerSlice.reducer(initialState, moveItemDown(0));
    expect(state).toEqual({
      bun: null,
      ingredients: [mockIngredients[2], mockIngredients[0]]
    });
  });
  it('очищаем конструктор', () => {
    const initialState = {
      bun: null,
      ingredients: [mockIngredients[0], mockIngredients[2]]
    };
    const state = burgerSlice.reducer(initialState, clearConstructor());
    expect(state).toEqual({
      bun: null,
      ingredients: []
    });
  });
});
