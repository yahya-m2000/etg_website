// "use client";

// import React, { useEffect, useRef } from "react";
// import * as THREE from "three";
// import ThreeGlobe from "three-globe";
// import countries from "../../../public/assets/globe-data-min.json";
// import travel from "../../../public/assets/my-flights.json";
// import airportHistory from "../../../public/assets/my-airports.json";
// import { OrbitControls } from "three/examples/jsm/Addons.js";
// import TWEEN from "@tweenjs/tween.js";

// interface FlightData {
//   status: boolean;
//   arcAlt: number;
//   order: number;
// }

// interface AirportData {
//   text: string;
//   size: number;
// }

// interface CountryFeature {
//   properties: {
//     ISO_A3: string;
//   };
// }

// const ETMGlobe = () => {
//   const globeContainerRef = useRef<HTMLDivElement | null>(null);
//   const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
//   const sceneRef = useRef<THREE.Scene | null>(null);
//   const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
//   const controlsRef = useRef<OrbitControls | null>(null);
//   const globeRef = useRef<THREE.Object3D | null>(null);

//   // Flag to avoid multiple initializations
//   const initializedRef = useRef(false);

//   useEffect(() => {
//     // Only execute in the browser and only initialize once
//     if (
//       !initializedRef.current &&
//       typeof window !== "undefined" &&
//       globeContainerRef.current
//     ) {
//       initializedRef.current = true;

//       const container = globeContainerRef.current;
//       const width = container.clientWidth;
//       const height = container.clientHeight;

//       // Renderer setup
//       const renderer = new THREE.WebGLRenderer({ antialias: false });
//       renderer.setPixelRatio(window.devicePixelRatio);
//       renderer.setSize(width, height);
//       globeContainerRef.current.appendChild(renderer.domElement);
//       rendererRef.current = renderer;

//       const scene = new THREE.Scene();
//       // scene.background = new THREE.Color("transparent");
//       scene.fog = new THREE.Fog(0x534ef3, 400, 2000);
//       scene.add(new THREE.AmbientLight(0xbbbbbb, 0.3));
//       sceneRef.current = scene;

//       // Camera setup
//       const camera = new THREE.PerspectiveCamera(
//         50,
//         window.innerWidth / window.innerHeight,
//         0.1,
//         2000
//       );
//       camera.position.set(0, 0, 0);
//       scene.add(camera);
//       cameraRef.current = camera;

//       const ambientLight = new THREE.AmbientLight(0xffffff, 1);
//       scene.add(ambientLight);

//       const pLight = new THREE.PointLight(0xffffff, 1);
//       pLight.position.set(800, 2000, 400);
//       scene.add(pLight);

//       const dLight1 = new THREE.DirectionalLight(0x7982f6, 10);
//       dLight1.position.set(-200, 500, 200);
//       camera.add(dLight1);

//       const dLight2 = new THREE.PointLight(0x8566cc, 20);
//       dLight2.position.set(-200, 500, 200);
//       camera.add(dLight2);

//       // Controls setup
//       const controls = new OrbitControls(camera, renderer.domElement);
//       controls.enableDamping = true;
//       controls.dampingFactor = 0.1;
//       controls.enablePan = false;
//       controls.enableZoom = false;
//       controls.minDistance = 200;
//       controls.maxDistance = 500;
//       controls.rotateSpeed = 0.8;
//       controls.autoRotate = true;
//       controls.autoRotateSpeed = -0.5;
//       controls.minPolarAngle = Math.PI / 3.5;
//       controls.maxPolarAngle = Math.PI - Math.PI / 3;
//       controlsRef.current = controls;

//       const globe = new ThreeGlobe({
//         waitForGlobeReady: true,
//         animateIn: true,
//       })
//         .showGlobe(true)
//         .arcsData(travel.flights as FlightData[])
//         .arcColor((e) => ((e as FlightData).status ? "#f74b16" : "#f7b416"))
//         .labelsData(airportHistory.airports as AirportData[])
//         .labelColor(() => "#f7b416")
//         .labelDotOrientation((e) =>
//           (e as AirportData).text === "ALA" ? "top" : "right"
//         )
//         .labelDotRadius(5)
//         .labelSize((e) => (e as AirportData).size)
//         .labelText("City")
//         .labelResolution(1)
//         .labelAltitude(0.01)
//         .pointsData(airportHistory.airports as AirportData[])
//         .pointColor(() => "rgba(110, 153, 255, 1)")
//         .pointsMerge(true)
//         .pointAltitude(0)
//         .pointRadius(1)
//         .hexPolygonsData(countries.features as CountryFeature[])
//         .hexPolygonResolution(3)
//         .hexPolygonMargin(0.75)
//         .hexPolygonAltitude(0.01)
//         .hexPolygonCurvatureResolution(0.1)
//         .hexPolygonsTransitionDuration(3)
//         .showAtmosphere(false)
//         .hexPolygonColor((e) => {
//           const feature = e as CountryFeature;
//           return ["SOM", "CHN", "ARE", "BGD", "IRN", "SDS"].includes(
//             feature.properties.ISO_A3
//           )
//             ? "rgba(255, 255, 255, 1)"
//             : "rgba(255, 255, 255, 0.5)";
//         });

//       globe.globeMaterial().opacity = 0.01;
//       globe.globeMaterial().transparent = true;
//       scene.add(globe);
//       globeRef.current = globe;

//       const onWindowResize = () => {
//         if (camera && renderer) {
//           camera.aspect = window.innerWidth / window.innerHeight;
//           camera.updateProjectionMatrix();
//           renderer.setSize(window.innerWidth, window.innerHeight);
//         }
//       };
//       window.addEventListener("resize", onWindowResize, false);

//       const animate = () => {
//         requestAnimationFrame(animate);
//         TWEEN.update();
//         controls.update();
//         renderer.render(scene, camera);
//       };
//       animate();

//       return () => {
//         window.removeEventListener("resize", onWindowResize);
//         renderer.dispose();
//         initializedRef.current = false;
//       };
//     }
//   }, []);

//   return (
//     <div
//       ref={globeContainerRef}
//       style={{ width: "100%", height: "100%" }}
//       className="relative"
//     />
//   );
// };

// export default ETMGlobe;
