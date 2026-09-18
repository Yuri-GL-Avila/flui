import React, { useMemo, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  Switch,
  ScrollView,
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import { stations } from "../../data/stations";
import { useRouter } from "expo-router";
import { Animated } from "react-native";

export default function HomeScreen() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [selectedConnector, setSelectedConnector] = useState<string | null>(null);
  const [minPower, setMinPower] = useState<number | null>(null);
  const [only24Hours, setOnly24Hours] = useState(false);
  const [selectedAmenity, setSelectedAmenity] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [showFilterFeedback, setShowFilterFeedback] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  

  const applyFilters = () => {
  setShowFilters(false);
  setShowFilterFeedback(true);

  setTimeout(() => {
    setShowFilterFeedback(false);
  }, 1800);
};

  const handleMapReady = () => {
  setMapLoaded(true);

  Animated.timing(fadeAnim, {
    toValue: 1,
    duration: 500,
    useNativeDriver: true,
  }).start();
};

  const filteredStations = useMemo(() => {
  const normalizedSearch = search
    .trim()
    .toLowerCase();

  return stations.filter((station) => {
    const searchMatch =
      normalizedSearch === "" ||
      station.name
        .toLowerCase()
        .includes(normalizedSearch) ||
      station.address
        .toLowerCase()
        .includes(normalizedSearch);

    const connectorMatch =
      !selectedConnector ||
      station.connectors.includes(selectedConnector);

    const powerMatch =
      !minPower ||
      station.power >= minPower;

    const hoursMatch =
      !only24Hours ||
      station.open24Hours;

    const amenityMatch =
      !selectedAmenity ||
      station.amenities.includes(selectedAmenity);

    return (
      searchMatch &&
      connectorMatch &&
      powerMatch &&
      hoursMatch &&
      amenityMatch
    );
  });
}, [
  search,
  selectedConnector,
  minPower,
  only24Hours,
  selectedAmenity,
]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logoArea}>
          <Ionicons name="flash-outline" size={30} color="#82F1D8" />
          <Text style={styles.logoText}>flui</Text>
        </View>

        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel="Abrir menu"
        >
          <Ionicons name="menu-outline" size={38} color="#82F1D8" />
        </TouchableOpacity>
      </View>

        <View style={styles.mapContainer}>
    {!mapLoaded && (
      <View style={styles.loadingMap}>
        <Ionicons
          name="flash-outline"
          size={42}
          color="#82F1D8"
        />

        <Text style={styles.loadingText}>
          Carregando pontos de recarga...
        </Text>
      </View>
    )}
        <Animated.View
    style={[
      styles.mapWrapper,
      { opacity: fadeAnim },
    ]}
  >


      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        onMapReady={handleMapReady}
        initialRegion={{
          latitude: -30.0346,
          longitude: -51.2177,
          latitudeDelta: 0.11,
          longitudeDelta: 0.11,
        }}
        >
        {filteredStations.map((station) => (
  <Marker
    key={station.id}
    coordinate={{
      latitude: station.latitude,
      longitude: station.longitude,
    }}
    title={station.name}
    description={`${station.power} kW • ${station.status}`}
    onCalloutPress={() =>
      router.push({
        pathname: "/station/[id]",
        params: { id: String(station.id) },
      })
    }
  >
    <View style={styles.customMarker}>
      <Ionicons
        name="flash"
        size={20}
        color="#0D1010"
      />

      {station.status === "Disponível" && (
        <View style={styles.availableIndicator}>
          <Ionicons
            name="checkmark"
            size={10}
            color="#0D1010"
          />
        </View>
      )}
    </View>
  </Marker>
))}
      </MapView>
    </Animated.View>
  </View>

      <View style={styles.searchSection}>
  <View style={styles.searchRow}>

    <View style={styles.searchBar}>
      <Ionicons
        name="search-outline"
        size={28}
        color="#0D1010"
      />

      <TextInput
        style={styles.input}
        placeholder="Buscar..."
        placeholderTextColor="#0D1010"
        value={search}
        onChangeText={setSearch}
        accessibilityLabel="Buscar ponto de recarga"
      />
    </View>

    <TouchableOpacity
      style={styles.filterButton}
      onPress={() => setShowFilters(true)}
      accessibilityRole="button"
      accessibilityLabel="Abrir filtros"
    >
      <Ionicons
        name="options-outline"
        size={28}
        color="#0D1010"
      />
    </TouchableOpacity>

  </View>
</View>

{showFilterFeedback && (
  <View style={styles.feedback}>
    <Ionicons
      name="checkmark-circle-outline"
      size={20}
      color="#0D1010"
    />

    <Text style={styles.feedbackText}>
      Filtros aplicados • {filteredStations.length} pontos encontrados
    </Text>
  </View>
)}

<View style={styles.resultBar}>
  <Text style={styles.resultText}>
    {filteredStations.length === 1
      ? "1 ponto encontrado"
      : `${filteredStations.length} pontos encontrados`}
  </Text>
</View>

      <ScrollView
  style={styles.stationList}
  showsVerticalScrollIndicator={false}
>
        {filteredStations.length === 0 && (
  <View style={styles.emptyState}>
    <Ionicons
      name="search-outline"
      size={35}
      color="#0D1010"
    />

    <Text style={styles.emptyTitle}>
      Nenhum ponto encontrado
    </Text>

    <Text style={styles.emptyText}>
      Tente alterar sua busca ou remover algum filtro.
    </Text>
  </View>
)}
        {filteredStations.map((station) => (
          <TouchableOpacity
            key={station.id}
            style={styles.stationCard}
            onPress={() =>
              router.push({
                pathname: "/station/[id]",
                params: { id: String(station.id) },
              })
            }
            accessibilityRole="button"
            accessibilityLabel={`Abrir ${station.name}`}
          >
            <Ionicons
              name="flash-outline"
              size={42}
              color="#0D1010"
              style={styles.stationIcon}
            />

            <View style={styles.stationText}>
              <Text style={styles.stationTitle} numberOfLines={1}>
                {station.name}
              </Text>

              <Text style={styles.stationAddress} numberOfLines={1}>
                {station.address}
              </Text>

              <Text style={styles.stationPower}>
                {station.power} kW
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.bottomButton}
          accessibilityLabel="Buscar"
        >
          <Ionicons name="search-outline" size={31} color="#82F1D8" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.bottomButton}
          accessibilityLabel="Início"
        >
          <Ionicons name="home-outline" size={32} color="#82F1D8" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.bottomButton}
          onPress={() => router.push("/activity")}
          accessibilityLabel="Perfil"
        >
          <Ionicons name="person-outline" size={32} color="#82F1D8" />
        </TouchableOpacity>
      </View>
        <Modal
          visible={showFilters}
          animationType="slide"
          transparent
          onRequestClose={() => setShowFilters(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.filterModal}>
              <View style={styles.filterHeader}>
                <Text style={styles.filterTitle}>
                  Filtros
                </Text>

                <TouchableOpacity
                  onPress={applyFilters}
                  accessibilityLabel="Fechar filtros"
                >
                  <Ionicons
                    name="close-outline"
                    size={32}
                    color="#82F1D8"
                  />
                </TouchableOpacity>
              </View>

              <Text style={styles.filterSectionTitle}>
                Tipo de conector
              </Text>

              <View style={styles.filterOptions}>
                {["CCS", "Tipo 2", "CHAdeMO"].map((connector) => (
                  <TouchableOpacity
                    key={connector}
                    style={[
                      styles.filterChip,
                      selectedConnector === connector &&
                        styles.filterChipSelected,
                    ]}
                    onPress={() =>
                      setSelectedConnector(
                        selectedConnector === connector
                          ? null
                          : connector
                      )
                    }
                  accessibilityRole="button"
                  accessibilityLabel={`Filtrar por conector ${connector}`}
                  accessibilityState={{
                    selected: selectedConnector === connector,
                  }}
                  >
                    
                    <Text
                      style={[
                        styles.filterChipText,
                        selectedConnector === connector &&
                          styles.filterChipTextSelected,
                      ]}
                    >
                      {connector}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text style={styles.filterSectionTitle}>
                Potência mínima
              </Text>

              <View style={styles.filterOptions}>
                {[60, 120, 150].map((power) => (
                  <TouchableOpacity
                    key={power}
                    style={[
                      styles.filterChip,
                      minPower === power &&
                        styles.filterChipSelected,
                    ]}
                    onPress={() =>
                      setMinPower(
                        minPower === power ? null : power
                      )
                    }
                  
                  >
                    <Text
                      style={[
                        styles.filterChipText,
                        minPower === power &&
                          styles.filterChipTextSelected,
                      ]}
                    >
                      {power} kW+
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text style={styles.filterSectionTitle}>
                Comodidades
              </Text>

              <View style={styles.filterOptions}>
                {["Café", "Wi-Fi", "Restaurante", "Banheiro"].map(
                  (amenity) => (
                    <TouchableOpacity
                      key={amenity}
                      style={[
                        styles.filterChip,
                        selectedAmenity === amenity &&
                          styles.filterChipSelected,
                      ]}
                      onPress={() =>
                        setSelectedAmenity(
                          selectedAmenity === amenity
                            ? null
                            : amenity
                        )
                      }
                        accessibilityRole="button"
  accessibilityLabel={`Filtrar por conector ${amenity}`}
  accessibilityState={{
    selected: selectedAmenity === amenity,
  }}
                    >
                      <Text
                        style={[
                          styles.filterChipText,
                          selectedAmenity === amenity &&
                            styles.filterChipTextSelected,
                        ]}
                      >
                        {amenity}
                      </Text>
                    </TouchableOpacity>
                  )
                )}
              </View>

              <View style={styles.switchRow}>
                <Text style={styles.switchLabel}>
                  Somente 24 horas
                </Text>

                <Switch
                  value={only24Hours}
                  onValueChange={setOnly24Hours}
                    accessibilityLabel="Mostrar somente pontos que funcionam 24 horas"
                    accessibilityRole="switch"
                    accessibilityState={{
                      checked: only24Hours,
  }}
                />
              </View>

              <TouchableOpacity
                style={styles.applyButton}
                onPress={() => setShowFilters(false)}
              >
                <Text style={styles.applyButtonText}>
                  Aplicar filtros
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.clearButton}
                onPress={() => {
                  setSelectedConnector(null);
                  setMinPower(null);
                  setOnly24Hours(false);
                  setSelectedAmenity(null);
                }}
              >
                <Text style={styles.clearButtonText}>
                  Limpar filtros
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D1010",
  },

  header: {
    height: 72,
    backgroundColor: "#0D1010",
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  logoArea: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  logoText: {
    color: "#82F1D8",
    fontSize: 30,
    fontWeight: "500",
    letterSpacing: 2,
  },

  mapContainer: {
  height: "40%",
  width: "100%",
  position: "relative",
},

mapWrapper: {
  flex: 1,
},

map: {
  width: "100%",
  height: "100%",
},

loadingMap: {
  ...StyleSheet.absoluteFillObject,
  backgroundColor: "#0D1010",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 2,
},

customMarker: {
  width: 42,
  height: 42,
  borderRadius: 21,
  backgroundColor: "#82F1D8",
  borderWidth: 3,
  borderColor: "#0D1010",
  justifyContent: "center",
  alignItems: "center",
},

availableIndicator: {
  position: "absolute",
  right: -4,
  top: -4,
  width: 17,
  height: 17,
  borderRadius: 9,
  backgroundColor: "#FFFFFF",
  borderWidth: 1,
  borderColor: "#0D1010",
  justifyContent: "center",
  alignItems: "center",
},

loadingText: {
  color: "#82F1D8",
  fontSize: 16,
  marginTop: 10,
},

  searchSection: {
    backgroundColor: "#0D1010",
    paddingHorizontal: 18,
    paddingVertical: 18,
  },

  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  searchBar: {
    flex: 1,
    height: 52,
    borderRadius: 28,
    backgroundColor: "#8DEBD2",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    gap: 10,
  },

  input: {
    flex: 1,
    fontSize: 20,
    color: "#0D1010",
  },

  resultBar: {
    backgroundColor: "#B7F4F4",
    paddingHorizontal: 16,
    paddingVertical: 7,
  },

  resultText: {
    color: "#0D1010",
    fontSize: 13,
    fontWeight: "600",
  },

    emptyState: {
    paddingVertical: 28,
    paddingHorizontal: 20,
    alignItems: "center",
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#0D1010",
    marginTop: 8,
  },

  emptyText: {
    fontSize: 14,
    color: "#0D1010",
    textAlign: "center",
    marginTop: 4,
  },

    feedback: {
    backgroundColor: "#82F1D8",
    marginHorizontal: 18,
    marginBottom: 10,
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },

  feedbackText: {
    color: "#0D1010",
    fontSize: 13,
    fontWeight: "600",
    flex: 1,
  },

  filterButton: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#8DEBD2",
    alignItems: "center",
    justifyContent: "center",
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "flex-end",
  },

  filterModal: {
    backgroundColor: "#0D1010",
    padding: 22,
    paddingBottom: 32,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
  },

  filterHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  filterTitle: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "600",
  },

  filterSectionTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    marginTop: 15,
    marginBottom: 10,
  },

  filterOptions: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },

  filterChip: {
    backgroundColor: "#B7F4F4",
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 20,
  },

  filterChipSelected: {
    backgroundColor: "#82F1D8",
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },

  filterChipText: {
    color: "#0D1010",
    fontSize: 14,
  },

  filterChipTextSelected: {
    fontWeight: "700",
  },

  switchRow: {
    marginTop: 22,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  switchLabel: {
    color: "#FFFFFF",
    fontSize: 17,
  },

  applyButton: {
    backgroundColor: "#82F1D8",
    borderRadius: 26,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
  },

  applyButtonText: {
    color: "#0D1010",
    fontSize: 17,
    fontWeight: "700",
  },

  clearButton: {
    alignItems: "center",
    paddingVertical: 14,
  },

  clearButtonText: {
    color: "#82F1D8",
    fontSize: 15,
    fontWeight: "600",
  },

  stationList: {
    flex: 1,
    backgroundColor: "#B7F4F4", 
  },

  stationCard: {
    minHeight: 78,
    borderBottomWidth: 1,
    borderBottomColor: "#0D1010",
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
  },

  stationIcon: {
    marginRight: 12,
  },

  stationText: {
    flex: 1,
  },

  stationTitle: {
    fontSize: 21,
    color: "#0D1010",
    fontWeight: "500",
  },

  stationAddress: {
    fontSize: 14,
    color: "#0D1010",
    marginTop: 2,
  },

  stationPower: {
    fontSize: 13,
    color: "#0D1010",
    marginTop: 3,
    fontWeight: "600",
  },

bottomBar: {
  height: 82,
  flexShrink: 0,
  backgroundColor: "#0D1010",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-around",
  paddingHorizontal: 24,
},  

  bottomButton: {
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
  },

});