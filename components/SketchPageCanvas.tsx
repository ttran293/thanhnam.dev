import { Canvas, FabricObject, PencilBrush } from "fabric";
import { useCallback, useEffect, useRef, useState } from "react";

type SketchPageCanvasProps = {
  disabled?: boolean;
};

type PageTool = "browse" | "draw";

function getThemeColor(name: string, fallback: string) {
  return (
    getComputedStyle(document.documentElement).getPropertyValue(name).trim() ||
    fallback
  );
}

export default function SketchPageCanvas({
  disabled = false,
}: SketchPageCanvasProps) {
  const canvasElementRef = useRef<HTMLCanvasElement | null>(null);
  const canvasRef = useRef<Canvas | null>(null);
  const [tool, setTool] = useState<PageTool>("browse");

  const setCanvasSize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });
    canvas.requestRenderAll();
  }, []);

  const clearMarks = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.getObjects().forEach((object: FabricObject) => {
      canvas.remove(object);
    });
    canvas.discardActiveObject();
    canvas.requestRenderAll();
  }, []);

  useEffect(() => {
    if (!canvasElementRef.current) return;

    const canvas = new Canvas(canvasElementRef.current, {
      backgroundColor: "transparent",
      selection: false,
      skipTargetFind: true,
    });
    const brush = new PencilBrush(canvas);

    brush.color = getThemeColor("--color-poster-blue", "#1727e8");
    brush.width = 2.2;
    canvas.freeDrawingBrush = brush;
    canvas.defaultCursor = "crosshair";
    canvas.hoverCursor = "crosshair";
    canvas.isDrawingMode = false;
    canvasRef.current = canvas;
    setCanvasSize();

    window.addEventListener("resize", setCanvasSize);

    return () => {
      window.removeEventListener("resize", setCanvasSize);
      canvas.dispose();
      canvasRef.current = null;
    };
  }, [setCanvasSize]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.isDrawingMode = tool === "draw" && !disabled;
    canvas.defaultCursor = "crosshair";
    canvas.hoverCursor = "crosshair";
  }, [disabled, tool]);

  return (
    <>
      <div
        className={`fixed inset-0 z-20 ${
          tool === "draw" && !disabled ? "pointer-events-auto" : "pointer-events-none"
        }`}
        aria-hidden="true"
      >
        <canvas ref={canvasElementRef} />
      </div>

      {!disabled && (
        <div className="display-font fixed right-6 top-16 z-30 flex max-w-[50vw] flex-wrap items-end justify-end gap-x-3 gap-y-2 text-right text-[clamp(1.25rem,2.4vw,2.5rem)] leading-[0.86] sm:right-10 lg:right-20 lg:top-20">
          <button
            type="button"
            onClick={() => setTool("browse")}
            className={`interactive-link bg-transparent border-0 p-0 cursor-pointer uppercase leading-[0.86] ${
              tool === "browse" ? "filter-active" : "opacity-60"
            }`}
          >
            I&apos;ll Look Around
          </button>
          <span className="opacity-35">/</span>
          <button
            type="button"
            onClick={() => setTool("draw")}
            className={`interactive-link bg-transparent border-0 p-0 cursor-pointer uppercase leading-[0.86] ${
              tool === "draw" ? "filter-active" : "opacity-60"
            }`}
          >
            I&apos;ll Draw Something
          </button>
          <span className="opacity-35">/</span>
          <button
            type="button"
            onClick={clearMarks}
            className="interactive-link bg-transparent border-0 p-0 cursor-pointer uppercase leading-[0.86] opacity-70"
          >
            Clear That
          </button>
        </div>
      )}
    </>
  );
}
