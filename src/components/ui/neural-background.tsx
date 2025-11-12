"use client";

import React, { useRef, useEffect } from "react";
import { Renderer, Camera, Transform, Program, Mesh, Plane } from "ogl";
import { cn } from "@/lib/utils";

interface NeuralBackgroundProps {
  hue?: number;
  saturation?: number;
  chroma?: number;
  className?: string;
  isDark?: boolean; // 是否为暗色模式
}

const vertexShader = `
  precision mediump float;

  attribute vec2 position;
  attribute vec2 uv;

  varying vec2 vUv;

  void main() {
      vUv = uv;
      gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const fragmentShader = `
  precision mediump float;

  varying vec2 vUv;
  uniform float u_time;
  uniform float u_ratio;
  uniform vec2 u_pointer_position;
  uniform float u_scroll_progress;
  uniform float u_hue;
  uniform float u_saturation;
  uniform float u_chroma;

  vec2 rotate(vec2 uv, float th) {
      return mat2(cos(th), sin(th), -sin(th), cos(th)) * uv;
  }

  float neuro_shape(vec2 uv, float t, float p) {
      vec2 sine_acc = vec2(0.);
      vec2 res = vec2(0.);
      float scale = 6.;

      for (int j = 0; j < 18; j++) {
          uv = rotate(uv, 1.);
          sine_acc = rotate(sine_acc, 1.);
          vec2 layer = uv * scale + float(j) + sine_acc - t;
          sine_acc += sin(layer) + 3.0 * p;
          res += (.5 + .5 * cos(layer)) / scale;
          scale *= (1.25);
      }
      return res.x + res.y;
  }

  // HSL to RGB conversion
  vec3 hsl2rgb(vec3 c) {
      vec3 rgb = clamp(abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),6.0)-3.0)-1.0, 0.0, 1.0);
      return c.z + c.y * (rgb - 0.5) * (1.0 - abs(2.0 * c.z - 1.0));
  }

  void main() {
      vec2 uv = .5 * vUv;
      uv.x *= u_ratio;

      vec2 pointer = vUv - u_pointer_position;
      pointer.x *= u_ratio;
      float p = clamp(length(pointer), 0., 1.);
      p = .5 * pow(1. - p, 2.);

      float t = .001 * u_time;
      vec3 color = vec3(0.);

      float noise = neuro_shape(uv, t, p);

      noise = 1.5 * pow(noise, 2.5);
      noise += pow(noise, 8.);
      noise = max(.0, noise - .4);
      noise *= (1. - length(vUv - .5));

      // Convert hue from degrees to 0-1 range
      float normalizedHue = u_hue / 360.0;

      // Create HSL color with animation
      vec3 hsl = vec3(
          normalizedHue + 0.1 * sin(3.0 * u_scroll_progress + 1.5),
          u_saturation,
          u_chroma * 0.5 + 0.2 * sin(2.0 * u_scroll_progress)
      );

      // Convert to RGB
      color = hsl2rgb(hsl);
      color = color * noise;

      gl_FragColor = vec4(color, noise);
  }
`;

export const NeuralBackground: React.FC<NeuralBackgroundProps> = ({
  hue = 200,
  saturation = 0.8,
  chroma = 0.6,
  className,
  isDark = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<Renderer | null>(null);
  const sceneRef = useRef<Transform | null>(null);
  const meshRef = useRef<Mesh | null>(null);
  const cameraRef = useRef<Camera | null>(null);
  const animationRef = useRef<number | null>(null);
  const pointerRef = useRef({
    x: 0,
    y: 0,
    tX: 0,
    tY: 0,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Initialize OGL
    try {
      const renderer = new Renderer({
        canvas,
        width: canvas.clientWidth,
        height: canvas.clientHeight,
        dpr: Math.min(window.devicePixelRatio, 2),
      });

      const camera = new Camera(renderer.gl);
      const scene = new Transform();

      const geometry = new Plane(renderer.gl, {
        width: 2,
        height: 2,
      });

      // 根据暗色模式调整参数
      // isDark=false: 亮色模式（黑色背景）-> 需要亮白色神经网络
      // isDark=true: 暗色模式（白色背景）-> 需要暗淡的神经网络，不遮挡文字
      const adjustedChroma = isDark ? chroma * 0.25 : chroma; // 暗色模式大幅降低亮度
      const adjustedSaturation = isDark ? saturation * 0.4 : saturation; // 暗色模式降低饱和度

      const program = new Program(renderer.gl, {
        vertex: vertexShader,
        fragment: fragmentShader,
        uniforms: {
          u_time: { value: 0 },
          u_ratio: { value: window.innerWidth / window.innerHeight },
          u_pointer_position: { value: [0, 0] },
          u_scroll_progress: { value: 0 },
          u_hue: { value: hue },
          u_saturation: { value: adjustedSaturation },
          u_chroma: { value: adjustedChroma },
        },
      });

      const mesh = new Mesh(renderer.gl, {
        geometry,
        program,
      });

      mesh.setParent(scene);

      rendererRef.current = renderer;
      cameraRef.current = camera;
      sceneRef.current = scene;
      meshRef.current = mesh;

      // Resize handler
      const handleResize = () => {
        if (!canvas || !renderer || !mesh) return;

        const width = canvas.clientWidth;
        const height = canvas.clientHeight;

        renderer.setSize(width, height);

        if (mesh.program && mesh.program.uniforms.u_ratio) {
          mesh.program.uniforms.u_ratio.value = width / height;
        }
      };

      // Mouse/touch handlers
      const updateMousePosition = (x: number, y: number) => {
        pointerRef.current.tX = x;
        pointerRef.current.tY = y;
      };

      const handlePointerMove = (e: PointerEvent) => {
        updateMousePosition(e.clientX, e.clientY);
      };

      const handleTouchMove = (e: TouchEvent) => {
        updateMousePosition(e.touches[0].clientX, e.touches[0].clientY);
      };

      const handleClick = (e: MouseEvent) => {
        updateMousePosition(e.clientX, e.clientY);
      };

      // Animation loop
      const render = () => {
        if (!renderer || !scene || !camera || !mesh) return;

        const currentTime = performance.now();
        const pointer = pointerRef.current;

        // Smooth pointer interpolation
        pointer.x += (pointer.tX - pointer.x) * 0.2;
        pointer.y += (pointer.tY - pointer.y) * 0.2;

        // Update uniforms
        if (mesh.program && mesh.program.uniforms) {
          const uniforms = mesh.program.uniforms;

          if (uniforms.u_time) uniforms.u_time.value = currentTime;
          if (uniforms.u_pointer_position) {
            uniforms.u_pointer_position.value = [
              pointer.x / window.innerWidth,
              1 - pointer.y / window.innerHeight,
            ];
          }
          if (uniforms.u_scroll_progress) {
            uniforms.u_scroll_progress.value =
              window.pageYOffset / (2 * window.innerHeight);
          }
        }

        renderer.render({ scene, camera });
        animationRef.current = requestAnimationFrame(render);
      };

      // Initial setup
      handleResize();
      render();

      // Add event listeners
      window.addEventListener("resize", handleResize);
      window.addEventListener("pointermove", handlePointerMove);
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("click", handleClick);

      // Cleanup
      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }

        window.removeEventListener("resize", handleResize);
        window.removeEventListener("pointermove", handlePointerMove);
        window.removeEventListener("touchmove", handleTouchMove);
        window.removeEventListener("click", handleClick);

        rendererRef.current = null;
      };
    } catch (error) {
      console.error("Error initializing OGL:", error);
    }
  }, [hue, saturation, chroma, isDark]);

  return (
    <canvas
      ref={canvasRef}
      className={cn(
        "absolute inset-0 size-full pointer-events-none",
        isDark ? "opacity-30" : "opacity-90",
        className
      )}
    />
  );
};
