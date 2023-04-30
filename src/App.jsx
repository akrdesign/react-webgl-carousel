import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import Carousel from "./Carousel";

export default function App() {
  return (
    <>
      <Canvas>
        <Suspense fallback={null}>
          <Carousel />
        </Suspense>
      </Canvas>
    </>
  );
}
