import { useQuery, gql } from "@apollo/client";

const GET_RECIPES = gql`
  query GetRecipes {
    recipes {
      id
      title
      ingredients
      instructions
      groceries {
        name
        quantity
      }
    }
  }
`;

export default function RecipeList() {
  const { loading, error, data } = useQuery(GET_RECIPES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Recipes</h2>
      <ul>
        {data.recipes.map((recipe: any) => (
          <li key={recipe.id}>
            <h3>{recipe.title}</h3>
            <p>Ingredients: {recipe.ingredients.join(", ")}</p>
            <p>Instructions: {recipe.instructions}</p>
            <h4>Groceries:</h4>
            <ul>
              {recipe.groceries.map((grocery: any) => (
                <li key={grocery.name}>{grocery.name} - {grocery.quantity}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
