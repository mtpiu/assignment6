import { getToken } from "./authenticate";

const API = process.env.NEXT_PUBLIC_API_URL;

export async function addToFavourites(id) {
  try {
    const res = await fetch(`${API}/favourites/${id}`, {
      method: "PUT",
      headers: {
        Authorization: 'JWT ' + getToken()
      }
    });
    return res.ok ? res.json() : [];
  } catch {
    return [];
  }
}

export async function removeFromFavourites(id) {
  try {
    const res = await fetch(`${API}/favourites/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: 'JWT ' + getToken()
      }
    });
    return res.ok ? res.json() : [];
  } catch {
    return [];
  }
}

export async function getFavourites() {
  try {
    const res = await fetch(`${API}/favourites`, {
      headers: {
        Authorization: 'JWT ' + getToken()
      }
    });
    return res.ok ? res.json() : [];
  } catch {
    return [];
  }
}

// HISTORY

export async function addToHistory(id) {
  try {
    const res = await fetch(`${API}/history/${id}`, {
      method: "PUT",
      headers: {
        Authorization: 'JWT ' + getToken()
      }
    });
    return res.ok ? res.json() : [];
  } catch {
    return [];
  }
}

export async function removeFromHistory(id) {
  try {
    const res = await fetch(`${API}/history/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: 'JWT ' + getToken()
      }
    });
    return res.ok ? res.json() : [];
  } catch {
    return [];
  }
}

export async function getHistory() {
  try {
    const res = await fetch(`${API}/history`, {
      headers: {
        Authorization: 'JWT ' + getToken()
      }
    });
    return res.ok ? res.json() : [];
  } catch {
    return [];
  }
}
