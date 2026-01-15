import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  const mouse = useRef({ x: 0, y: 0 });      // ตำแหน่งเมาส์จริง
  const ring = useRef({ x: 0, y: 0 });       // ตำแหน่งวงแหวนแบบตามช้าๆ (lerp)
  const rafRef = useRef(null);

  const [isHover, setIsHover] = useState(false);
  const [isDown, setIsDown] = useState(false);

  useEffect(() => {
    const move = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;

      // dot ตามติดทันที
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    const loop = () => {
      // วงแหวนตามแบบหน่วงๆ
      ring.current.x += (mouse.current.x - ring.current.x) * 0.15;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.15;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0)`;
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    const down = () => setIsDown(true);
    const up = () => setIsDown(false);

    // hover เฉพาะ element ที่อยากให้ “cursor เปลี่ยนโหมด”
    const handleMouseOver = (e) => {
      const target = e.target.closest("[data-cursor='hover']");
      if (target) setIsHover(true);
    };
    const handleMouseOut = (e) => {
      const target = e.target.closest("[data-cursor='hover']");
      if (target) setIsHover(false);
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      {/* ซ่อน cursor เดิม */}
      <div className="pointer-events-none fixed inset-0 z-[9999] cursor-none" />

      {/* Ring (วงนอก) */}
      <div
        ref={ringRef}
        className={[
          "pointer-events-none fixed left-0 top-0 z-[10000]",
          "-translate-x-1/2 -translate-y-1/2",
          "h-10 w-10 rounded-full border",
          "transition-[width,height,transform,opacity] duration-200 ease-out",
          isHover ? "h-14 w-14 opacity-80" : "opacity-60",
          isDown ? "h-8 w-8 opacity-90" : "",
        ].join(" ")}
      />

      {/* Dot (จุดกลาง) */}
      <img
  ref={dotRef}
  src="/Gemini_Generated_Image_ivz3x6ivz3x6ivz3-Photoroom.png"
  alt=""
  className="pointer-events-none fixed left-0 top-0 z-[10001]  h-10 w-10
    -translate-x-1/2 -translate-y-1/2
    transition-transform duration-150 ease-out"
/>
    </>
  );
}
