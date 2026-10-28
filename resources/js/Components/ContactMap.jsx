import { useEffect, useRef } from "react";

const DEFAULT_POSITION = {
    lat: -29.211323,
    lng: -51.517239,
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

const createMarkerContent = () => {
    const marker = document.createElement("div");
    marker.className = "relative w-[25px]";

    const icon = document.createElement("img");
    icon.src = "/site/imgs/location-pin.png";
    icon.alt = "";
    icon.width = 25;
    icon.className = "block h-auto w-[25px] object-contain";

    const label = document.createElement("div");
    label.className =
        "pointer-events-none absolute left-[33px] top-1/2 flex -translate-y-1/2 flex-col whitespace-nowrap font-sans text-sm font-medium leading-5 text-[#9F0009]";

    const firstLine = document.createElement("span");
    firstLine.textContent = "Altos do Bonito";

    const secondLine = document.createElement("span");
    secondLine.textContent = "Vinícola";

    label.append(firstLine, secondLine);
    marker.append(icon, label);

    return marker;
};

export const ContactMap = ({
    apiKey,
    lat = DEFAULT_POSITION.lat,
    lng = DEFAULT_POSITION.lng,
    zoom = 15,
    className = "h-96 w-full",
}) => {
    const mapRef = useRef(null);

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
                const { AdvancedMarkerElement } = window.google.maps.marker;

                const position = { lat, lng };

                map = new Map(mapRef.current, {
                    center: position,
                    zoom,
                    mapId: "DEMO_MAP_ID",
                    mapTypeControl: false,
                    streetViewControl: true,
                });

                marker = new AdvancedMarkerElement({
                    map,
                    position,
                    content: createMarkerContent(),
                    anchorLeft: "-50%",
                    anchorTop: "-100%",
                    title: "Altos do Bonito",
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
    }, [apiKey, lat, lng, zoom]);

    return (
        <div
            ref={mapRef}
            role="region"
            aria-label="Mapa com a localização da vinícola Altos do Bonito"
            className={className}
        />
    );
};
