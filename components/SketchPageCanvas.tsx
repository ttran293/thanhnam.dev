import { Canvas, FabricObject, PencilBrush } from "fabric";
import { useCallback, useEffect, useRef, useState } from "react";

type SketchPageCanvasProps = {
  disabled?: boolean;
};

type PageTool = "browse" | "draw";
type DrawingColor = "blue" | "green" | "yellow" | "neutral";

const drawingColors: DrawingColor[] = ["blue", "green", "yellow", "neutral"];

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
  const [themeName, setThemeName] = useState(() =>
    document.documentElement.dataset.theme === "dark" ? "dark" : "light"
  );

  const getDrawingColorValue = useCallback((color: DrawingColor) => {
    if (color === "blue") return "#1727e8";
    if (color === "green") return "#018a49";
    if (color === "yellow") return "#f6c945";
    if (color === "neutral") return themeName === "dark" ? "#ffffff" : "#000000";

    return getThemeColor("--color-poster-blue", "#1727e8");
  }, [themeName]);

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
    const root = document.documentElement;
    const updateThemeName = () => {
      setThemeName(root.dataset.theme === "dark" ? "dark" : "light");
    };
    const observer = new MutationObserver(updateThemeName);

    updateThemeName();
    observer.observe(root, { attributes: true, attributeFilter: ["data-theme"] });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!canvasElementRef.current) return;

    const canvas = new Canvas(canvasElementRef.current, {
      backgroundColor: "transparent",
      selection: false,
      skipTargetFind: true,
    });
    const brush = new PencilBrush(canvas);

    brush.color = getDrawingColorValue("blue");
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
  }, [getDrawingColorValue, setCanvasSize]);

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
        <div className="relative z-30 flex flex-col items-start gap-3 text-left lg:items-end lg:text-right">
          <div className="display-font flex w-full flex-nowrap items-baseline justify-start gap-x-1 whitespace-nowrap text-[clamp(0.875rem,3.8vw,1.3rem)] leading-[0.86] sm:gap-x-2 sm:text-[clamp(1.1rem,2.5vw,2.5rem)] lg:gap-x-3 lg:justify-end">
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
            <span className="relative inline-flex items-baseline pt-8 sm:pt-7">
              <span className="font-mono absolute left-0 top-0 flex items-center justify-start gap-3 text-xs uppercase leading-none tracking-wide lg:left-auto lg:right-0 lg:justify-end lg:pr-1">
                <span className="opacity-60">Color</span>
                {drawingColors.map((color) => {
                  const colorValue = getDrawingColorValue(color);

                  return (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setDrawingColor(color)}
                      aria-label={`Use ${color} drawing color`}
                      aria-pressed={drawingColor === color}
                      className="h-4 w-4 rounded-full border bg-transparent p-0 cursor-pointer sm:h-5 sm:w-5"
                      style={{ backgroundColor: colorValue, borderColor: colorValue }}
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
