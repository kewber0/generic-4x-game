import { useRef, FunctionComponent } from "react";

interface CloudLayerProps {
  scale: number
  position: [number, number, number],
  color: THREE.Texture,
  alpha: THREE.Texture,
}

const CloudLayer: FunctionComponent<CloudLayerProps> = (props): JSX.Element => {
  return <mesh
    position={props.position} // The group has been rotated so z becomes global y
    scale={props.scale}
    // visible={false}
  >
    <planeBufferGeometry />
    <meshBasicMaterial
      transparent
      depthWrite={false}
      map={props.color}
      alphaMap={props.alpha}
    />
  </mesh>;
}

export default CloudLayer;