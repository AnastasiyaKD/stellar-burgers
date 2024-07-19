import { TIngredient } from '@utils-types';
import { getIngredients, ingredients, initialState } from '../ingredients';

const mockIngredients: TIngredient[] = [
  {
    calories: 420,
    carbohydrates: 53,
    fat: 24,
    image: '',
    image_large: '',
    image_mobile: '',
    name: 'Краторная булка N-200i',
    price: 1255,
    proteins: 80,
    type: 'bun',
    _id: '5'
  },
  {
    calories: 4242,
    carbohydrates: 242,
    fat: 142,
    image: '',
    image_large: '',
    image_mobile: '',
    name: 'Биокотлета из марсианской Магнолии',
    price: 424,
    proteins: 420,
    type: 'main',
    _id: '4'
  },
  {
    calories: 643,
    carbohydrates: 85,
    fat: 26,
    image: '',
    image_large: '',
    image_mobile: '',
    name: 'Филе Люминесцентного тетраодонтимформа',
    price: 988,
    proteins: 44,
    type: 'main',
    _id: '3'
  },
  {
    calories: 30,
    carbohydrates: 40,
    fat: 20,
    image: '',
    image_large: '',
    image_mobile: '',
    name: 'Соус Spicy-X',
    price: 90,
    proteins: 30,
    type: 'sauce',
    _id: '2'
  },
  {
    calories: 643,
    carbohydrates: 85,
    fat: 26,
    image: '',
    image_large: '',
    image_mobile: '',
    name: 'Флюоресцентная булка R2-D3',
    price: 988,
    proteins: 44,
    type: 'bun',
    _id: '1'
  }
];

describe('Проверяем ingredients', () => {
  it('Проверяем getIngredients.fulfilled', () => {
    const res = ingredients(
      initialState,
      getIngredients.fulfilled(mockIngredients, '')
    );
    expect(res.requestStatus).toBe('Success');
    expect(res.data).toEqual(mockIngredients);
  });
  it('Проверяем getIngredients.rejected', () => {
    const res = ingredients(initialState, getIngredients.rejected(null, ''));
    expect(res.requestStatus).toBe('Failed');
  });
  it('Проверяем getIngredients.pending', () => {
    const res = ingredients(initialState, getIngredients.pending(''));
    expect(res.requestStatus).toBe('Loading');
  });
});
