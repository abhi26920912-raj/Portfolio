import * as THREE from "three";
import { DRACOLoader, GLTF, GLTFLoader } from "three-stdlib";
import { setCharTimeline, setAllTimeline } from "../../utils/GsapScroll";
import { decryptFile } from "./decrypt";

const setCharacter = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
) => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  loader.setDRACOLoader(dracoLoader);

  const loadCharacter = () => {
    return new Promise<GLTF | null>(async (resolve, reject) => {
      try {
        const encryptedBlob = await decryptFile(
          "/models/character.enc?v=2",
          "MyCharacter12"
        );
        const blobUrl = URL.createObjectURL(new Blob([encryptedBlob]));

        let character: THREE.Object3D;
        loader.load(
          blobUrl,
          async (gltf) => {
            character = gltf.scene;
            await renderer.compileAsync(character, camera, scene);
            character.traverse((child: any) => {
              if (child.isMesh) {
                const mesh = child as THREE.Mesh;

                if (mesh.material) {
                  if (mesh.name === "BODY.SHIRT") {
                    const newMat = (mesh.material as THREE.Material).clone() as THREE.MeshStandardMaterial;
                    newMat.color = new THREE.Color("#0d001f");        // deep midnight purple
                    newMat.emissive = new THREE.Color("#a855f7");     // bright neon purple glow
                    newMat.emissiveIntensity = 0.6;
                    newMat.metalness = 0.55;
                    newMat.roughness = 0.25;
                    newMat.envMapIntensity = 3.0;
                    mesh.material = newMat;
                  } else if (mesh.name === "Pant") {
                    const newMat = (mesh.material as THREE.Material).clone() as THREE.MeshStandardMaterial;
                    newMat.color = new THREE.Color("#000814");         // ultra dark navy
                    newMat.emissive = new THREE.Color("#3b82f6");      // electric blue edge glow
                    newMat.emissiveIntensity = 0.15;
                    newMat.metalness = 0.9;
                    newMat.roughness = 0.12;
                    newMat.envMapIntensity = 3.5;
                    mesh.material = newMat;
                  } else {
                    const mat = mesh.material as THREE.MeshStandardMaterial;
                    if (mat && mat.envMapIntensity !== undefined) {
                      mat.envMapIntensity = 2.0;
                      mat.roughness = Math.max(mat.roughness - 0.15, 0.1);
                      mat.metalness = Math.min((mat.metalness || 0) + 0.1, 1.0);
                    }
                  }
                }

                child.castShadow = true;
                child.receiveShadow = true;
                mesh.frustumCulled = true;
              }
            });
            resolve(gltf);
            setCharTimeline(character, camera);
            setAllTimeline();
            character!.getObjectByName("footR")!.position.y = 3.36;
            character!.getObjectByName("footL")!.position.y = 3.36;

            // Monitor scale is handled by GsapScroll.ts animations

            dracoLoader.dispose();
          },
          undefined,
          (error) => {
            console.error("Error loading GLTF model:", error);
            reject(error);
          }
        );
      } catch (err) {
        reject(err);
        console.error(err);
      }
    });
  };

  return { loadCharacter };
};

export default setCharacter;
