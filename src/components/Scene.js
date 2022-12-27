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

    // Luz 
    const AL = new THREE.AmbientLight(0xffffff, 0.4)
    scene.add(AL)
    // PointLight
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.y = 25;
    pointLight.position.x = 20;
    pointLight.position.z = 25;

    scene.add(pointLight)

    //texture loader del cubo
    const textureLoaderCubo = new THREE.TextureLoader();
    const basecolor = textureLoaderCubo.load('./metal_texture/basecolor.jpg');
    const AO = textureLoaderCubo.load('./metal_texture/ambientOcclusion.jpg');
    const roughness = textureLoaderCubo.load('./metal_texture/roughness.jpg');
    const normal = textureLoaderCubo.load('./metal_texture/normal.jpg');
    const metalness = textureLoaderCubo.load('./metal_texture/metallic.jpg');
    const heightx = textureLoaderCubo.load('./metal_texture/height.png');

    //creando un cubo
    const cube = new THREE.Mesh(
      new THREE.BoxBufferGeometry(10, 10, 10, 250, 250, 250),
      new THREE.MeshStandardMaterial({
        map: basecolor,
        aoMap: AO,
        roughnessMap: roughness,
        normalMap: normal,
        metalnessMap: metalness,
        displacementMap: heightx,
        displacementScale: 0.5
      })
    );
    scene.add(cube);

    // creacndo un toroirde
    const torus = new THREE.Mesh(
      new THREE.TorusGeometry(10, 3, 16, 100),
      new THREE.MeshNormalMaterial({ wireframe: true })
    );
    torus.position.x = -20;
    scene.add(torus);

    // texture loader para torusKnot
    const textureLoader = new THREE.TextureLoader();
    const matcap = textureLoader.load('./textures/texture.png');
    // agregando una torusKnot
    const torusKnot = new THREE.Mesh(
      new THREE.TorusKnotGeometry(10, 3, 100, 16),
      new THREE.MeshMatcapMaterial({ 
        matcap: matcap
      })
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
