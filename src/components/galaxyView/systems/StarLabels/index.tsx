import "./styles.css";
import {
  useState,
  useRef,
  useContext,
  useEffect,
  Fragment,
  FunctionComponent,
} from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";

import { GamestateContext } from "_Main";
import { addArrays } from "_helpers";
import { StarSystem } from "scripts/galaxyGeneration";

interface StarLabelsProps {
  focusOnSystem: Function;
  labelsRef: any;
  controlsRef: any;
}

const StarLabels: FunctionComponent<StarLabelsProps> = (props): JSX.Element => {
  const _GAME = useContext(GamestateContext);
  const { camera } = useThree();
  const [zoomLevel, setZoomLevel] = useState<number>(0);

  useEffect((): void => {}, []);

  useFrame((): void => {
    const newZoomLevel = ~~(
      camera.position.clone().sub(props.controlsRef.current.target).length() /
      60
    );
    if (newZoomLevel !== zoomLevel) {
      setZoomLevel(newZoomLevel);
    }
  });

  return (
    <group ref={props.labelsRef}>
      {_GAME.GALAXY.systems.map((system: StarSystem, index: number) => {
        return (
          <Fragment key={index}>
            <Html
              position={system.position}
              as="Fragment"
              matrixAutoUpdate={false}
              style={{
                opacity: zoomLevel >= 2 ? 0 : 0.8,
                transition: "all .4s",
              }}
            >
              <Label
                index={index}
                system={system}
                onClick={() => {
                  props.focusOnSystem(system.index);
                }}
                zoomLevel={zoomLevel}
              />
            </Html>
          </Fragment>
        );
      })}
    </group>
  );
};

interface LabelProps {
  index: number;
  system: StarSystem;
  onClick: any;
  zoomLevel: number;
}

const Label: FunctionComponent<LabelProps> = (props): JSX.Element => {
  return (
    <>
      <div
        className="outer-box"
        onClick={props.onClick}
        style={{
          ...(props.zoomLevel >= 1
            ? {
                height: "1.75rem",
              }
            : {
                height: "3.2rem",
              }),
          ...{ borderColor: props.system.star.color },
        }}
      >
        <div className="name-box" style={{ background: "#fff6" }}>
          <b>{props.system.name}</b>
        </div>
        <div
          className="planet-box"
          style={
            props.zoomLevel >= 1
              ? {
                  transform: "translate(0, -1.75em)",
                  opacity: "0",
                }
              : {
                  transform: "translate(0, 0%)",
                  opacity: "1",
                }
          }
        >
          {props.system.planets.length}
        </div>
        <div
          className="self-center"
          style={{
            borderLeft: "2px solid #fff8",
            height: "60%",
            transform: "translate(calc(50% - 1px), 20%)",
          }}
        />
      </div>
    </>
  );
};

export default StarLabels;