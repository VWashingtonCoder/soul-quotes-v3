import { User, Quote, Favorite } from "./types";
const BASE_URL = "http://localhost:3000";

// Users
export async function getAllUsers() {
  const res = await fetch(`${BASE_URL}/users`);
  const data = await res.json();
  return data;
}

export async function postNewUser(user: User) {
  const res = await fetch(`${BASE_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  const data = await res.json();
  return data;
}

// Quotes
export async function getAllQuotes() {
  const res = await fetch(`${BASE_URL}/quotesList`);
  const data = await res.json();
  return data;
}

export async function postNewQuote(quote: Quote) {
  const res = await fetch(`${BASE_URL}/quotesList`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(quote),
    redirect: "follow",
  });
  const data = await res.json();
  return data;
}

export async function deleteQuote(id: number) {
  const res = await fetch(`${BASE_URL}/quotesList/${id}`, {
    method: "DELETE",
  });
  return res.status;
}

// Favorites
export async function getAllFavorites() {
  const res = await fetch(`${BASE_URL}/favoriteUserQuotes`);
  const data = await res.json();
  return data;
}

export async function postNewFavorite(favorite: Favorite) {
  const res = await fetch(`${BASE_URL}/favoriteUserQuotes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(favorite),
  });
  const data = await res.json();
  return data;
}

export async function deleteFavorite(id: number) {
  const res = await fetch(`${BASE_URL}/favoriteUserQuotes/${id}`, {
    method: "DELETE",
  });
  return res.status;
}
