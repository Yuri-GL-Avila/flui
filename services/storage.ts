import AsyncStorage from "@react-native-async-storage/async-storage";

const FAVORITES_KEY = "@flui:favorites";
const HISTORY_KEY = "@flui:history";
const RATINGS_KEY = "@flui:ratings";

// =========================
// FAVORITOS
// =========================

export async function getFavorites(): Promise<number[]> {
  const data = await AsyncStorage.getItem(FAVORITES_KEY);

  return data ? JSON.parse(data) : [];
}

export async function isFavorite(
  stationId: number
): Promise<boolean> {
  const favorites = await getFavorites();

  return favorites.includes(stationId);
}

export async function toggleFavorite(
  stationId: number
): Promise<boolean> {
  const favorites = await getFavorites();

  let updatedFavorites: number[];

  if (favorites.includes(stationId)) {
    updatedFavorites = favorites.filter(
      (id) => id !== stationId
    );
  } else {
    updatedFavorites = [...favorites, stationId];
  }

  await AsyncStorage.setItem(
    FAVORITES_KEY,
    JSON.stringify(updatedFavorites)
  );

  return updatedFavorites.includes(stationId);
}

// =========================
// HISTÓRICO
// =========================

export async function getHistory(): Promise<number[]> {
  const data = await AsyncStorage.getItem(HISTORY_KEY);

  return data ? JSON.parse(data) : [];
}

export async function addToHistory(
  stationId: number
): Promise<void> {
  const history = await getHistory();

  // Remove repetição e coloca o ponto mais recente no início
  const updatedHistory = [
    stationId,
    ...history.filter((id) => id !== stationId),
  ].slice(0, 10);

  await AsyncStorage.setItem(
    HISTORY_KEY,
    JSON.stringify(updatedHistory)
  );
}

// =========================
// AVALIAÇÕES
// =========================

export type Ratings = Record<number, number>;

export async function getRatings(): Promise<Ratings> {
  const data = await AsyncStorage.getItem(RATINGS_KEY);

  return data ? JSON.parse(data) : {};
}

export async function getRating(
  stationId: number
): Promise<number> {
  const ratings = await getRatings();

  return ratings[stationId] ?? 0;
}

export async function saveRating(
  stationId: number,
  rating: number
): Promise<void> {
  const ratings = await getRatings();

  ratings[stationId] = rating;

  await AsyncStorage.setItem(
    RATINGS_KEY,
    JSON.stringify(ratings)
  );
}