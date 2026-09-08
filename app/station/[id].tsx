import React, { useEffect, useRef } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Animated
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { stations } from "../../data/stations";

export default function StationDetailsScreen() {
const router = useRouter();
const { id } = useLocalSearchParams();

const contentAnim = useRef(new Animated.Value(30)).current;
const opacityAnim = useRef(new Animated.Value(0)).current;

useEffect(() => {
    Animated.parallel([
    Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 350,
        useNativeDriver: true,
    }),

    Animated.timing(contentAnim, {
        toValue: 0,
        duration: 350,
        useNativeDriver: true,
    }),
    ]).start();
}, []);


const stationId = Number(id);

const station = stations.find((item) => item.id === stationId);

if (!station) {
    return (
    <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
        Ponto de recarga não encontrado.
        </Text>

        <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.back()}
        >
        <Text style={styles.backButtonText}>Voltar</Text>
        </TouchableOpacity>
    </View>
    );
}

const getStatusIcon = () => {
    if (station.status === "Disponível") {
    return "checkmark-circle";
    }

    if (station.status === "Ocupado") {
    return "time";
    }

    return "close-circle";
};

return (
    <View style={styles.container}>
    <View style={styles.header}>
        <View style={styles.logoArea}>
        <Ionicons
            name="flash-outline"
            size={28}
            color="#82F1D8"
        />

        <Text style={styles.logo}>
            flui
        </Text>
        </View>

        <TouchableOpacity
        style={styles.headerBack}
    onPress={() => router.back()}
        accessibilityRole="button"
        accessibilityLabel="Voltar para o mapa"
        >
        <Ionicons
            name="arrow-back-outline"
            size={30}
            color="#0D1010"
        />
        </TouchableOpacity>
    </View>

<Animated.View
  style={{
    flex: 1,
    opacity: opacityAnim,
    transform: [{ translateY: contentAnim }],
  }}
>


    <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
    >
        <View style={styles.imagePlaceholder}>
        <Ionicons
            name="car-sport-outline"
            size={84}
            color="#0D1010"
            />

        <Text style={styles.imagePlaceholderText}>
            Foto do ponto de recarga
        </Text>
        </View>

        <Text style={styles.title}>
        {station.name}
        </Text>

        <Text style={styles.address}>
        {station.address}
        </Text>

        <View style={styles.quickActions}>
        <TouchableOpacity style={styles.actionButton}
        accessibilityRole="button"
        accessibilityLabel="Traçar rota">    
            <Ionicons
            name="navigate-outline"
            size={31}
            color="#0D1010"
            />
            
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}
        accessibilityRole="button"
        accessibilityLabel="Avaliações do ponto">
            <Ionicons
            name="star-outline"
            size={31}
            color="#0D1010"
            />
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}
        accessibilityRole="button"
        accessibilityLabel="Informações de carreamento"
        >
            <Ionicons
            name="flash-outline"
            size={31}
            color="#0D1010"
            />
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}
        accessibilityRole="button"
        accessibilityLabel="Favoritar ponto"
        >
            <Ionicons
            name="heart-outline"
            size={31}
            color="#0D1010"
            />
        </TouchableOpacity>
        </View>

        <Text style={styles.description}>
        {station.description}
        </Text>

        <View style={styles.statusCard}>
        <View style={styles.statusHeader}>
            <Ionicons
            name={getStatusIcon()}
            size={24}
            color="#0D1010"
            />

            <Text style={styles.statusText}>
            {station.status}
            </Text>
        </View>

        <Text style={styles.infoText}>
            Vagas disponíveis:{" "}
            <Text style={styles.infoStrong}>
            {station.availableSpots}/{station.totalSpots}
            </Text>
        </Text>

        <Text style={styles.infoText}>
            Potência máxima:{" "}
            <Text style={styles.infoStrong}>
            {station.power} kW
            </Text>
        </Text>

        <Text style={styles.infoText}>
            Funcionamento:{" "}
            <Text style={styles.infoStrong}>
            {station.openingHours}
            </Text>
        </Text>

        <Text style={styles.infoText}>
            Menor movimento:{" "}
            <Text style={styles.infoStrong}>
            {station.lowMovement}
            </Text>
        </Text>
        </View>

        <View style={styles.section}>
    <Text style={styles.sectionTitle}>
            Conectores
        </Text>

        <View style={styles.chipsContainer}>
            {station.connectors.map((connector) => (
                <View
                key={connector}
                style={styles.chip}
                >
                <Ionicons
                name="flash-outline"
                size={18}
                color="#0D1010"
                />

                <Text style={styles.chipText}>
                {connector}
                </Text>
            </View>
            ))}
        </View>
        </View>

        <View style={styles.section}>
        <Text style={styles.sectionTitle}>
            Comodidades próximas
        </Text>

        <View style={styles.chipsContainer}>
            {station.amenities.map((amenity) => (
                <View
                key={amenity}
                style={styles.chip}
                >
                <Ionicons
                name="checkmark-outline"
                size={18}
                color="#0D1010"
                />

                <Text style={styles.chipText}>
                {amenity}
                </Text>
            </View>
            ))}
        </View>
        </View>

        <TouchableOpacity
            style={styles.routeButton}
            accessibilityRole="button"
            accessibilityLabel={`Traçar rota até ${station.name}`}
            >
            <Ionicons
            name="navigate-outline"
            size={22}
            color="#0D1010"
            />

            <Text style={styles.routeButtonText}>
            Como chegar
            </Text>
        </TouchableOpacity>
        </ScrollView>
    </Animated.View>
</View>
);
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: "#DDF8FC",
  },

  header: {
    height: 78,
    backgroundColor: "#0D1010",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },

  logoArea: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  logo: {
    color: "#82F1D8",
    fontSize: 28,
    letterSpacing: 2,
  },

  headerBack: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#8DEBD2",
    justifyContent: "center",
    alignItems: "center",
  },

  scroll: {
    flex: 1,
  },

  content: {
    padding: 22,
    paddingBottom: 40,
  },

  imagePlaceholder: {
    height: 200,
    borderRadius: 25,
    backgroundColor: "#8DEBD2",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },

  imagePlaceholderText: {
    marginTop: 10,
    fontSize: 15,
    color: "#0D1010",
  },

  title: {
    fontSize: 30,
    fontWeight: "500",
    color: "#0D1010",
  },

  address: {
    fontSize: 17,
    color: "#0D1010",
    lineHeight: 23,
    marginTop: 6,
  },

  quickActions: {
    flexDirection: "row",
    marginVertical: 18,
    gap: 18,
  },

  actionButton: {
    width: 38,
    height: 38,
    justifyContent: "center",
    alignItems: "center",
  },

  description: {
    fontSize: 16,
    color: "#0D1010",
    lineHeight: 23,
    marginBottom: 20,
  },

  statusCard: {
    backgroundColor: "#8DEBD2",
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#7DD7C2",
  },

  statusHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    marginBottom: 12,
  },

  statusText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#0D1010",
  },

  infoText: {
    fontSize: 17,
    color: "#0D1010",
    marginBottom: 8,
  },

  infoStrong: {
    fontWeight: "600",
  },

  section: {
    marginTop: 25,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: "600",
    color: "#0D1010",
    marginBottom: 12,
  },

  chipsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },

  chip: {
    backgroundColor: "#B7F4F4",
    borderRadius: 20,
    paddingHorizontal: 13,
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    borderWidth: 1,
    borderColor: "#0D1010",
  },

  chipText: {
    color: "#0D1010",
    fontSize: 14,
  },

  routeButton: {
    height: 55,
    marginTop: 30,
    borderRadius: 28,
    backgroundColor: "#8DEBD2",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderWidth: 1,
    borderColor: "#0D1010",
  },

  routeButtonText: {
    color: "#0D1010",
    fontSize: 18,
    fontWeight: "600",
  },

  errorContainer: {
    flex: 1,
    backgroundColor: "#DDF8FC",
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
  },

  errorText: {
    fontSize: 20,
    color: "#0D1010",
    textAlign: "center",
  },

  backButton: {
    backgroundColor: "#8DEBD2",
    paddingHorizontal: 25,
    paddingVertical: 13,
    borderRadius: 25,
    marginTop: 20,
  },

  backButtonText: {
    color: "#0D1010",
    fontSize: 17,
    fontWeight: "600",
  },
});