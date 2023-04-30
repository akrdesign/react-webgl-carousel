/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { useEffect, useMemo, useRef } from "react";
import fragmentShader from "../shaders/fragment";
import vertexShader from "../shaders/vertex";
import { useTexture } from "@react-three/drei";
// import { useControls } from "leva";
import { useThree } from "@react-three/fiber";
import GSAP from "gsap";

export default function Plane({ texture, width, height, active, ...props }) {
  const $mesh = useRef();

  const { viewport } = useThree();

  const tex = useTexture(texture);

  // const { width, height } = useControls({
  //   width: {
  //     value: 3,
  //     min: 0.5,
  //     max: viewport.width,
  //   },
  //   height: {
  //     value: 4,
  //     min: 0.5,
  //     max: viewport.height,
  //   },
  // });

  useEffect(() => {
    if ($mesh.current.material) {
      // $mesh.current.material.uniforms.uRes.value.x = width;
      // $mesh.current.material.uniforms.uRes.value.y = height;

      //  Setting the 'uZoomScale' uniform in the 'Plane' component to resize the texture proportionally to the dimensions of the viewport.
      $mesh.current.material.uniforms.uZoomScale.value.x =
        viewport.width / width
      $mesh.current.material.uniforms.uZoomScale.value.y =
        viewport.height / height

      GSAP.to($mesh.current.material.uniforms.uProgress, {
        value: active ? 1 : 0,
        duration: 1.5,
        ease: "power3.out,",
      });
  
      GSAP.to($mesh.current.material.uniforms.uRes.value, {
        x: active ? viewport.width : width,
        y: active ? viewport.height : height,
        duration: 1.5,
        ease: "power3.out,",
      });
    }

  }, [viewport, width, height, active]);

  const uniforms = useMemo(
    () => ({
      uProgress: { value: 0 },
      uZoomScale: { value: { x: 1, y: 1 } },
      uTex: { value: tex },
      uRes: { value: { x: 1, y: 1 } },
      uImageRes: {
        value: { x: tex.source.data.width, y: tex.source.data.height },
      },
    }),
    [tex]
  );

  return (
    <mesh ref={$mesh} {...props}>
      <planeGeometry args={[width, height, 30, 30]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}
