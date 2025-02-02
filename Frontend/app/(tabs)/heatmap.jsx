
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Switch, Alert } from "react-native";
import MapView, { Marker, Polyline, Polygon } from "react-native-maps";
import axios from "axios";
import Icon from 'react-native-vector-icons/FontAwesome5'

// Static data for polygon areas (latitude, longitude)
const staticPolygons = [
  { center: [21.17024, 72.831061], radius: 400 }, // Example polygon 1 (Surat City)
  { center: [21.16024, 72.841061], radius: 300 }, // Example polygon 2 (Surat City)
  { center: [21.19024, 72.851061], radius: 500 }, // Example circle 3 (Surat City)
  { center: [21.18524, 72.861061], radius: 200 }, // Example circle 4 (Surat City)
  { center: [21.15024, 72.841061], radius: 600 }, // Example circle 5 (Surat City)
  { center: [21.13524, 72.861061], radius: 350 }, // Example circle 6 (Surat City)

  // Circles at Adajan
  { center: [21.18024, 72.831061], radius: 500 }, // Adajan area
  { center: [21.18524, 72.835061], radius: 400 }, // Nearby Adajan

  // Circles at Vesu
  { center: [21.14024, 72.761061], radius: 300 }, // Vesu area
  { center: [21.14524, 72.765061], radius: 250 }, // Nearby Vesu

  // Circles at Katargam
  { center: [21.22024, 72.881061], radius: 600 }, // Katargam area
  { center: [21.22524, 72.885061], radius: 400 }, // Nearby Katargam

  // Circles at Varachha
  { center: [21.20024, 72.871061], radius: 450 }, // Varachha area
  { center: [21.20524, 72.875061], radius: 300 }, // Nearby Varachha

  // Circles at Athwa
  { center: [21.17024, 72.821061], radius: 700 }, // Athwa area
  { center: [21.17524, 72.825061], radius: 400 }, // Nearby Athwa

  // Circles at Piplod
  { center: [21.16024, 72.781061], radius: 700 }, // Piplod area
  { center: [21.16524, 72.785061], radius: 650 }, // Nearby Piplod

  // Circles at Udhna
  { center: [21.13024, 72.871061], radius: 400 }, // Udhna area
  { center: [21.13524, 72.875061], radius: 350 }, // Nearby Udhna

  // Circles at Sachin
  { center: [21.09024, 72.881061], radius: 500 }, // Sachin area
  { center: [21.09524, 72.885061], radius: 300 }, // Nearby Sachin

  // Circles at Hazira
  { center: [21.10024, 72.631061], radius: 400 }, // Hazira area
  { center: [21.10524, 72.635061], radius: 350 }, // Nearby Hazira

  // Circles at Pandesara
  { center: [21.21024, 72.831061], radius: 300 }, // Pandesara area
  { center: [21.21524, 72.835061], radius: 250 }, // Nearby Pandesara

  // Circles at Limbayat
  { center: [21.23024, 72.881061], radius: 400 }, // Limbayat area
  { center: [21.23524, 72.885061], radius: 300 }, // Nearby Limbayat

  // Circles at Althan
  { center: [21.15024, 72.821061], radius: 450 }, // Althan area
  { center: [21.15524, 72.825061], radius: 300 }, // Nearby Althan

  // Circles at Dindoli
  { center: [21.18024, 72.871061], radius: 500 }, // Dindoli area
  { center: [21.18524, 72.875061], radius: 400 }, // Nearby Dindoli
];
// Function to create a polygon from center and radius
const createPolygon = (center, radius) => {
    const coords = [];
    const numberOfPoints = 30; // More points for a smoother circle

    for (let i = 0; i < numberOfPoints; i++) {
        const angle = (i / numberOfPoints) * (2 * Math.PI);
        const lat = center[0] + (radius / 111300) * Math.cos(angle); // Rough conversion for latitude
        const lng = center[1] + (radius / (111300 * Math.cos(center[0] * Math.PI / 180))) * Math.sin(angle); // Rough conversion for longitude
        coords.push([lat, lng]);
    }
    return coords.map(coord => ({ latitude: coord[0], longitude: coord[1] }));
};

const MapComponent = () => {
    const [points, setPoints] = useState([]); // Points for routing
    const [shortestRoute, setShortestRoute] = useState(null);
    const [avoidingHeatmapRoute, setAvoidingHeatmapRoute] = useState(null);

    // Function to handle map press events for waypoints
    const handleMapPress = (e) => {
        const newPoint = [e.nativeEvent.coordinate.latitude, e.nativeEvent.coordinate.longitude];
        setPoints((prevPoints) => [...prevPoints, newPoint]);
    };

    // Function to request route from GraphHopper API
    const getRoutes = async () => {
        if (points.length < 2) {
            console.error("At least 2 points are required for routing.");
            return; // Exit if not enough points
        }

        const graphHopperPoints = points.map((point) => [point[1], point[0]]);

        // Request for the shortest route
        const shortestRouteRequest = {
            points: graphHopperPoints,
            profile: "car",
            locale: "en",
            instructions: true,
            calc_points: true,
            points_encoded: false,
        };

        // Request for the route avoiding heatmaps
        const avoidHeatmapRequest = {
            ...shortestRouteRequest,
            custom_model: {
                priority: staticPolygons.map((_, index) => ({
                    if: `in_polygon_${index}`,
                    multiply_by: 0, // Avoid areas
                })),
                areas: {
                    type: "FeatureCollection",
                    features: staticPolygons.map((polygon, index) => ({
                        type: "Feature",
                        id: `polygon_${index}`,
                        properties: {},
                        geometry: {
                            type: "Polygon",
                            coordinates: [[
                                ...createPolygon(polygon.center, polygon.radius).map(coord => [coord.longitude, coord.latitude]),
                                [createPolygon(polygon.center, polygon.radius)[0].longitude, createPolygon(polygon.center, polygon.radius)[0].latitude] // Close the polygon
                            ]],
                        },
                    })),
                },
            },
            "ch.disable": true, // Enable custom model
        };

        try {
            // Fetch shortest route
            const shortestResponse = await axios.post(
                "https://graphhopper.com/api/1/route?key=ffe308b0-02b3-447f-989e-3593bedcc607",
                shortestRouteRequest
            );

            const shortestRouteData =
                shortestResponse.data.paths[0].points.coordinates.map((coord) => [
                    coord[1],
                    coord[0],
                ]);
            setShortestRoute(shortestRouteData);

            // Fetch route avoiding heatmaps
            const avoidHeatmapResponse = await axios.post(
                "https://graphhopper.com/api/1/route?key=ffe308b0-02b3-447f-989e-3593bedcc607",
                avoidHeatmapRequest
            );

            const avoidHeatmapRouteData =
                avoidHeatmapResponse.data.paths[0].points.coordinates.map((coord) => [
                    coord[1],
                    coord[0],
                ]);
            setAvoidingHeatmapRoute(avoidHeatmapRouteData);

        } catch (error) {
            console.error("Error fetching route:", error);
            if (error.response) {
                console.error("Server Response:", error.response.data);
            }
        }
    };

    // Function to clear the routes
    const clearRoutes = () => {
        setShortestRoute(null); // Clear the shortest route
        setAvoidingHeatmapRoute(null); // Clear the heatmap-avoiding route
        setPoints([]); // Clear the points
        Alert.alert("Routes cleared", "Both routes have been successfully removed."); // Alert for confirmation
    };

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: 19.224552,
                    longitude: 72.832728,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                onPress={handleMapPress}
            >
                {/* Plot markers for selected points */}
                {points.map((point, index) => (
                    <Marker key={index} coordinate={{ latitude: point[0], longitude: point[1] }} />
                ))}

                {/* Draw polyline for the shortest route */}
                {shortestRoute && (
                    <Polyline
                        coordinates={shortestRoute.map(coord => ({ latitude: coord[0], longitude: coord[1] }))}
                        strokeColor="black"
                        strokeWidth={4}
                        zIndex={1}
                    />
                )}

                {/* Draw polyline for the route avoiding heatmaps */}
                {avoidingHeatmapRoute && (
                    <Polyline
                        coordinates={avoidingHeatmapRoute.map(coord => ({ latitude: coord[0], longitude: coord[1] }))}
                        strokeColor="#00FF00"
                        strokeWidth={6}
                        zIndex={2}
                        lineDashPattern={[5, 5]}
                    />
                )}

                {/* Draw polygons for avoidance areas */}
                {staticPolygons.length > 0 &&
                    staticPolygons.map((polygon, index) => {
                        const coords = createPolygon(polygon.center, polygon.radius);
                        return (
                            <Polygon
                                key={index}
                                coordinates={coords}
                                strokeColor="red"
                                fillColor="rgba(255, 0, 0, 0.2)"
                                strokeWidth={2}
                                zIndex={0}
                            />
                        );
                    })}
            </MapView>

            {/* Circular Button to fetch and draw the routes */}
            <TouchableOpacity style={styles.circleButton} onPress={getRoutes}>
                <Icon name="route" size={35} color="#fda001" />
                <Text style={styles.buttonText1}>Go</Text>
            </TouchableOpacity>

            {/* Button to clear the routes */}
            <TouchableOpacity style={styles.clearButton} onPress={clearRoutes}>
                <Icon name="trash" size={20} color="white" />
                <Text style={styles.buttonText}>Clear</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    map: {
        width: '100%',
        height: '100%',
    },
    circleButton: {
        position: 'absolute',
        bottom: 100,
        right: 30,
        width: 70,
        height: 70,
        borderRadius: 50,
        backgroundColor: '#f9e8c1',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5, // For Android shadow
        shadowColor: '#000', // For iOS shadow
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 3.84,
    },
    clearButton: {
        position: 'absolute',
        bottom: 30,
        right: 35,
        marginTop: 10,
        width: 60,
        height: 60,
        borderRadius: 50,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5, // For Android shadow
        shadowColor: '#000', // For iOS shadow
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 3.84,
    },
    buttonText1: {
        color: '#fda001',
        fontWeight: 'bold',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default MapComponent;