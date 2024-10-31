# _Pocket Recipes_

![App Screenshot](/public/app-front.jpg)

![Recipe Modal](/public/Modal.jpg)

## Background Info

_Pocket Recipes_ is designed to allows users to search for recipes on the go, even on their tablets and mobile phones. They can even toggle to search by ingredients, where they can input whatever ingredients they would like to have in the recipe. Users may also save the recipes to their favourites for their convenience.

## Technologies Used

- `React Javascript`
- `Node.js`
- `Vite`
- `HTML`
- `CSS`
- `Visual Studio Code`
- `Airtable`

## Getting Started

1. Ensure [Node.js](https://nodejs.org/en) is installed.

1. Click the **fork** button at the top right of this page.

1. Open your terminal (example gitbash, powershell), and clone to your desired folder.
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

In your terminal, run `npm run dev`.

Begin searching for recipes! Each favourited recipe will be stored in your Airtable workspace table. In the app under favourites tab, you may view / remove your favourites.

Alernatively, the recipe data can also be removed via your Airtable.

## Limitations & Future Enhancements

As this program requires the use of Spoonacular API, there is a limit of 150 calls/day, therefore, if the recipe search hits the limit, user may only continue after it resets. _(Saved recipes are still accesible in favourites tab.)_

You may also fork this repository and make necessary changes to fetch from your desired API.

As data is needed to be stored in your Airtable API, the deployment of this program may be worked around with, such as implementing login or authentication features.

A local storage version of this application can also be found in my repositories: [PocketRecipesApp](https://github.com/eeexuanlyx/PocketRecipesApp). This allows users to save the recipes to their own local storage device on their web browser.

## Planning Materials

[Spoonacular API](https://spoonacular.com/food-api/) | [Airtable](https://airtable.com/) | [Postman](https://www.postman.com/) | [Image Generator](https://gemini.google.com/app) | [Google Fonts](https://fonts.google.com/selection/embed) | [React Developer Tools](https://react.dev/learn/react-developer-tools) | [React Icons](https://react-icons.github.io/react-icons/) | [Bootstrap](https://getbootstrap.com/)
