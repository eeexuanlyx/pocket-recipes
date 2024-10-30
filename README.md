# _Pocket Recipes_

![App Screenshot](/public/app-front.jpg)

![Recipe Modal](/public/Modal.jpg)

## Background Info

_Pocket Recipes_ is designed to allows users to search for recipes on the go, even on their tablets and mobile phones. They can even toggle to search by ingredients, where they can input whatever ingredients they would like to have in the recipe. Users may also save the recipes to their favourites for their convenience.

## Technologies Used

- `Javascript`
- `HTML`
- `CSS`
- `vscode`

## Getting Started

1. Click the **fork** button at the top right of this page.

2. Open your terminal (example gitbash, powershell), and clone to your desired folder.
   `<your-username>` should be your github username.

```
git clone https://github.com/<your-username>/pocket-recipes.git
```

3. cd to your new cloned directory:

```
cd pocket-recipes
```

4. Type the following and it will open up in vscode:

```
code .
```

5. In your terminal, run `npm i` .

## Prerequisites

1. Create a `.env` file at the root of the directory with the following:

```
VITE_SERVER=http://localhost:5001

VITE_API_KEY=<your-spoonacular-api-key>

VITE_AIRTABLE_API_KEY=<your-air-table-api-key>

VITE_AIRTABLE_BASE_ID=<your-airtable-base-id>

VITE_AIRTABLE_TABLE_ID=<your-airtable-id>
```

2. Sign up for an account on [Spoonacular](https://spoonacular.com/food-api) and replace `<your-spoonacular-api-key>` with your spoonacular api key.

3. Sign up for an account on [Airtable](https://airtable.com/). Create a new workspace.

- Create a table with the following fields:

```
- id
- Title
- Image
- Minutes
- Vegetarian
- Vegan
- Ingredients
- Instructions
```

- Go to [Developer Web API](https://airtable.com/developers/web/api/introduction) and follow the API documentation instructions on the workspace you created to get `<your-air-table-api-key>`, `<your-airtable-base-id>` & `<your-airtable-id>`. Replace these inside your `.env` file.

## Running The Application

In your terminal, run `npm start`.

Begin searching for recipes! Each favourited recipe will be stored in your Airtable workspace table. In the app under favourites tab, you may view / remove your favourites.

## Planning Materials

[Spoonacular API](https://spoonacular.com/food-api/) | [Airtable](https://airtable.com/) | [Postman](https://www.postman.com/) | [Image Generator](https://gemini.google.com/app) | [Google Fonts](https://fonts.google.com/selection/embed) | [React Developer Tools](https://react.dev/learn/react-developer-tools) | [React Icons](https://react-icons.github.io/react-icons/) | [Bootstrap](https://getbootstrap.com/)
