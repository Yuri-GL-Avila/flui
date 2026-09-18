import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useRouter } from "expo-router";

import { stations } from "../data/stations";
import {
  getFavorites,
  getHistory,
  getRatings,
  Ratings,
} from "../services/storage";

export default function ActivityScreen() {
  const router = useRouter();

  const [favorites, setFavorites] = useState<number[]>([]);
  const [history, setHistory] = useState<number[]>([]);
  const [ratings, setRatings] = useState<Ratings>({});

  useFocusEffect(
    useCallback(() => {
      async function loadData() {
        const savedFavorites = await getFavorites();
        const savedHistory = await getHistory();
        const savedRatings = await getRatings();

        setFavorites(savedFavorites);
        setHistory(savedHistory);
        setRatings(savedRatings);
      }

      loadData();
    }, [])
  );

  const favoriteStations = favorites
    .map((id) => stations.find((station) => station.id === id))
    .filter(Boolean);

  const historyStations = history
    .map((id) => stations.find((station) => station.id === id))
    .filter(Boolean);

  const openStation = (id: number) => {
    router.push({
      pathname: "/station/[id]",
      params: { id: String(id) },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          accessibilityRole="button"
          accessibilityLabel="Voltar"
        >
          <Ionicons
            name="arrow-back"
            size={30}
            color="#0D1010"
          />
        </TouchableOpacity>

        <View>
          <Text style={styles.logo}>flui</Text>
          <Text style={styles.headerSubtitle}>
            Minha atividade
          </Text>
        </View>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionTitle}>
          Favoritos
        </Text>

        {favoriteStations.length === 0 ? (
          <View style={styles.emptyCard}>
            <Ionicons
              name="heart-outline"
              size={30}
              color="#0D1010"
            />

            <Text style={styles.emptyText}>
              Nenhum ponto favoritado.
            </Text>
          </View>
        ) : (
          favoriteStations.map((station) => {
            if (!station) return null;

            return (
              <TouchableOpacity
                key={station.id}
                style={styles.stationCard}
                onPress={() => openStation(station.id)}
                accessibilityRole="button"
                accessibilityLabel={`Abrir ${station.name}`}
              >
                <Ionicons
                  name="heart"
                  size={27}
                  color="#0D1010"
                />

                <View style={styles.cardContent}>
                  <Text style={styles.stationName}>
                    {station.name}
                  </Text>

                  <Text
                    style={styles.stationAddress}
                    numberOfLines={1}
                  >
                    {station.address}
                  </Text>

                  <View style={styles.cardInfo}>
                    <Text style={styles.power}>
                      {station.power} kW
                    </Text>

                    {ratings[station.id] > 0 && (
                      <Text style={styles.rating}>
                        ★ {ratings[station.id]}/5
                      </Text>
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            );
          })
        )}

        <Text style={styles.sectionTitle}>
          Histórico recente
        </Text>

        {historyStations.length === 0 ? (
          <View style={styles.emptyCard}>
            <Ionicons
              name="time-outline"
              size={30}
              color="#0D1010"
            />

            <Text style={styles.emptyText}>
              Nenhum ponto visitado.
            </Text>
          </View>
        ) : (
          historyStations.map((station) => {
            if (!station) return null;

            return (
              <TouchableOpacity
                key={station.id}
                style={styles.stationCard}
                onPress={() => openStation(station.id)}
                accessibilityRole="button"
                accessibilityLabel={`Abrir ${station.name}`}
              >
                <Ionicons
                  name="time-outline"
                  size={27}
                  color="#0D1010"
                />

                <View style={styles.cardContent}>
                  <Text style={styles.stationName}>
                    {station.name}
                  </Text>

                  <Text
                    style={styles.stationAddress}
                    numberOfLines={1}
                  >
                    {station.address}
                  </Text>

                  <View style={styles.cardInfo}>
                    <Text style={styles.power}>
                      {station.power} kW
                    </Text>

                    {ratings[station.id] > 0 && (
                      <Text style={styles.rating}>
                        ★ {ratings[station.id]}/5
                      </Text>
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            );
          })
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D1010",
  },

  header: {
    backgroundColor: "#0D1010",
    paddingHorizontal: 20,
    paddingVertical: 18,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },

  backButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#82F1D8",
    alignItems: "center",
    justifyContent: "center",
  },

  logo: {
    color: "#82F1D8",
    fontSize: 28,
    fontWeight: "700",
  },

  headerSubtitle: {
    color: "#FFFFFF",
    fontSize: 14,
  },

  content: {
    flex: 1,
    backgroundColor: "#DDF8FC",
  },

  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },

  sectionTitle: {
    color: "#0D1010",
    fontSize: 25,
    fontWeight: "700",
    marginTop: 12,
    marginBottom: 12,
  },

  stationCard: {
    backgroundColor: "#82F1D8",
    borderRadius: 18,
    padding: 16,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },

  cardContent: {
    flex: 1,
  },

  stationName: {
    color: "#0D1010",
    fontSize: 18,
    fontWeight: "700",
  },

  stationAddress: {
    color: "#0D1010",
    fontSize: 13,
    marginTop: 3,
  },

  cardInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    marginTop: 6,
  },

  power: {
    color: "#0D1010",
    fontSize: 14,
    fontWeight: "700",
  },

  rating: {
    color: "#0D1010",
    fontSize: 14,
    fontWeight: "700",
  },

  emptyCard: {
    backgroundColor: "#B7F4F4",
    borderRadius: 18,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 12,
  },

  emptyText: {
    color: "#0D1010",
    fontSize: 15,
  },
});