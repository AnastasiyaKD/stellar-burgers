import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useParams } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { selectIngredients } from '../../services/slices/ingredients';

export const IngredientDetails: FC = () => {
  /** TODO: взять переменную из стора */
  const ingredients = useSelector(selectIngredients);
  const { id } = useParams();

  const ingredientData = ingredients.find((item) => item._id === id);

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
