import { useLang } from "@/hooks/useLang";
import { useEffect, useRef } from "react";

const DEFAULT_POSITION = {
    lat: -0,
    lng: -0,
};

const GOOGLE_MAPS_SCRIPT_ID = "google-maps-javascript-api";
const GOOGLE_MAPS_SCRIPT_URL = "https://maps.googleapis.com/maps/api/js";

let googleMapsPromise;

const loadGoogleMaps = (apiKey) => {
    if (window.google?.maps?.marker?.AdvancedMarkerElement) {
        return Promise.resolve(window.google.maps);
    }

    if (googleMapsPromise) {
        return googleMapsPromise;
    }

    googleMapsPromise = new Promise((resolve, reject) => {
        const existingScript = document.getElementById(GOOGLE_MAPS_SCRIPT_ID);

        if (existingScript) {
            const checkMaps = () => {
                if (window.google?.maps?.marker?.AdvancedMarkerElement) {
                    resolve(window.google.maps);
                } else {
                    reject(
                        new Error(
                            "Google Maps carregou sem a biblioteca marker.",
                        ),
                    );
                }
            };

            if (window.google?.maps?.marker?.AdvancedMarkerElement) {
                checkMaps();
            } else {
                existingScript.addEventListener("load", checkMaps, {
                    once: true,
                });
            }

            return;
        }

        const callbackName = "__googleMapsLoaded";

        window[callbackName] = () => {
            if (window.google?.maps?.marker?.AdvancedMarkerElement) {
                resolve(window.google.maps);
            } else {
                googleMapsPromise = undefined;

                reject(
                    new Error("Google Maps carregou sem a biblioteca marker."),
                );
            }

            delete window[callbackName];
        };

        const script = document.createElement("script");
        const params = new URLSearchParams({
            key: apiKey,
            libraries: "marker",
            callback: callbackName,
            v: "weekly",
        });

        script.id = GOOGLE_MAPS_SCRIPT_ID;
        script.src = `${GOOGLE_MAPS_SCRIPT_URL}?${params}`;
        script.async = true;
        script.defer = true;

        script.onerror = () => {
            googleMapsPromise = undefined;

            delete window[callbackName];

            reject(new Error("Não foi possível carregar o Google Maps."));
        };

        document.head.appendChild(script);
    });

    return googleMapsPromise;
};

export const ContactMap = ({
    apiKey,
    lat,
    lng,
    zoom = 15,
    className = "h-96 w-full",
}) => {
    const lang = useLang();
    const mapRef = useRef(null);

    const latitude = lat ?? DEFAULT_POSITION.lat;
    const longitude = lng ?? DEFAULT_POSITION.lng;

    useEffect(() => {
        if (!apiKey || !mapRef.current) return;

        let map;
        let marker;
        let cancelled = false;

        const initializeMap = async () => {
            try {
                await loadGoogleMaps(apiKey);

                if (cancelled || !mapRef.current) return;

                const { Map } = window.google.maps;

                const position = {
                    lat: Number(latitude),
                    lng: Number(longitude),
                };

                map = new Map(mapRef.current, {
                    center: position,
                    zoom,
                    mapId: "DEMO_MAP_ID",
                    mapTypeControl: false,
                    streetViewControl: true,
                });
            } catch (error) {
                console.error("Erro ao inicializar o mapa:", error);
            }
        };

        initializeMap();

        return () => {
            cancelled = true;

            if (marker) {
                marker.map = null;
            }

            if (map && window.google?.maps?.event) {
                window.google.maps.event.clearInstanceListeners(map);
            }
        };
    }, [apiKey, latitude, longitude, zoom, lang]);

    return (
        <div
            ref={mapRef}
            role="region"
            aria-label={lang("mapaVinicola")}
            className={className}
        />
    );
};
