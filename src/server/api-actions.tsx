import { User, Quote, Favorite } from "../types";
const BASE_URL = "http://localhost:3000";

// Users
export async function getUserByUsername(username: string) {
  const user = await fetch(`${BASE_URL}/users/?username=${username}`);

  if (user.status === 404) {
    alert("Error getting user by username");
    return {} as User;
  }

  return await user.json();
}

export async function getUserByEmail(email: string) {
  const user = await fetch(`${BASE_URL}/users/?email=${email}`);
  
  if (user.status === 404) {
    alert("Error getting user by email");
    return {} as User;
  }

  return await user.json();
}

export function postNewUser(user: User) {
  fetch(`${BASE_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
      alert("Error posting new user");
    });
}

// Quotes
export async function getAllQuotes() {
  const allQuotes = await fetch(`${BASE_URL}/quotesList`);

  if (allQuotes.status === 404) {
    alert("Error getting all quotes");
    return [] as Quote[];
  }

  return await allQuotes.json();
}

export function postNewQuote(quote: Quote) {
  fetch(`${BASE_URL}/quotesList`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(quote),
    redirect: "follow",
  })
    .then((res) => res.json())
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
      alert("Error posting new quote");
    });
}

export function deleteQuote(id: number) {
  fetch(`${BASE_URL}/quotesList/${id}`, {
    method: "DELETE",
  })
    .then((res) => res.status)
    .catch((err) => {
      console.log(err);
      alert("Error deleting quote");
    });
}

// Favorites
export async function getFavoritesByUsername(username: string) {
  const params = `?username=${username}`;
  const favorites = await fetch(`${BASE_URL}/favoriteUserQuotes/${params}}`)
    
  if (favorites.status === 404) {
    alert("Error getting favorites by username");
    return [] as Favorite[];
  }
  
  return await favorites.json();
}

export function postNewFavorite(favorite: Favorite) {
  fetch(`${BASE_URL}/favoriteUserQuotes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(favorite),
  })
    .then((res) => res.json())
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
      alert("Error posting new favorite");
    });
}

export function deleteFavorite(id: number) {
  fetch(`${BASE_URL}/favoriteUserQuotes/${id}`, {
    method: "DELETE",
  })
    .then((res) => res.status)
    .catch((err) => {
      console.log(err);
      alert("Error deleting favorite");
    });
}
