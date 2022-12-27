import React from "react";
import { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const Scene = () => {
  // instacia del useRef:
  const mountRef = useRef(null);

  useEffect(() => {
    const currentMount = mountRef.current;

    // creando escena
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      25,
      currentMount.clientWidth / currentMount.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 100;
    scene.add(camera);

    // creando el renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    currentMount.appendChild(renderer.domElement);

    // agregando Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target = new THREE.Vector3(3, 3, 3);

    //creando un cubo
    const cube = new THREE.Mesh(
      new THREE.BoxBufferGeometry(10, 10, 10),
      new THREE.MeshBasicMaterial()
    );
    scene.add(cube);

    // creacndo un toroirde
    const torus = new THREE.Mesh(
      new THREE.TorusGeometry(10, 3, 16, 100),
      new THREE.MeshNormalMaterial({ wireframe: true })
    );
    torus.position.x = -20;
    scene.add(torus);

    // agregando una torusKnot
    const torusKnot = new THREE.Mesh(
      new THREE.TorusKnotGeometry(10, 3, 100, 16),
      new THREE.MeshNormalMaterial({ flatShading: true })
    );
    scene.add(torusKnot);
    torusKnot.position.x = 20;

    //renderizando la scene
    const animate = () => {
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    //clean up de useEffect:
    return () => {
      currentMount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      className="Container3D"
      ref={mountRef}
      style={{ width: "100%", height: "100vh" }}
    ></div>
  );
};

export default Scene;
