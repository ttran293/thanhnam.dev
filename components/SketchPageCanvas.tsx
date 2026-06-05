import { Canvas, FabricObject, PencilBrush } from "fabric";
import { useCallback, useEffect, useRef, useState } from "react";

type SketchPageCanvasProps = {
  disabled?: boolean;
};

type PageTool = "browse" | "draw";
type DrawingColor = "blue" | "green";

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
  const [drawingColor, setDrawingColor] = useState<DrawingColor>("blue");

  const getDrawingColorValue = useCallback((color: DrawingColor) => {
    if (color === "blue") return getThemeColor("--color-poster-blue", "#1727e8");

    return getThemeColor("--color-poster-green", "#018a49");
  }, []);

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

    if (canvas.freeDrawingBrush) {
      canvas.freeDrawingBrush.color = getDrawingColorValue(drawingColor);
    }
  }, [disabled, drawingColor, getDrawingColorValue, tool]);

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
        <div className="relative z-30 flex flex-col items-end gap-3 text-right">
          <div className="display-font flex flex-wrap items-baseline justify-end gap-x-3 gap-y-2 text-[clamp(1.25rem,2.4vw,2.5rem)] leading-[0.86]">
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
            <span className="relative inline-flex items-baseline pt-6">
              <span className="font-mono absolute right-0 top-0 flex items-center justify-end gap-3 pr-1 text-xs uppercase leading-none tracking-wide">
                <span className="opacity-60">Color</span>
                {(["blue", "green"] as const).map((color) => {
                  const colorValue = getDrawingColorValue(color);

                  return (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setDrawingColor(color)}
                      aria-label={`Use ${color} drawing color`}
                      aria-pressed={drawingColor === color}
                      className={`h-4 w-4 rounded-full border bg-transparent p-0 cursor-pointer sm:h-5 sm:w-5 ${
                        drawingColor === color
                          ? "border-(--color-poster-blue)"
                          : "border-(--link-decoration)"
                      }`}
                      style={{ backgroundColor: colorValue }}
                    />
                  );
                })}
              </span>
              <button
                type="button"
                onClick={() => setTool("draw")}
                className={`interactive-link bg-transparent border-0 p-0 cursor-pointer uppercase leading-[0.86] ${
                  tool === "draw" ? "filter-active" : "opacity-60"
                }`}
              >
                I&apos;ll Draw Something
              </button>
            </span>
            <span className="opacity-35">/</span>
            <button
              type="button"
              onClick={clearMarks}
              className="interactive-link bg-transparent border-0 p-0 cursor-pointer uppercase leading-[0.86] opacity-70"
            >
              Clear That
            </button>
          </div>
        </div>
      )}
    </>
  );
}
