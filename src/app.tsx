import type { ChangeEvent, FC, FormEvent } from "react";

import { closest } from "color-2-name";
import { useCallback, useState } from "react";
import { GitHub } from "./components/github";

export const App: FC = () => {
  const [color, setColor] = useState<string>("#1db4ea");

  const handleColorChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setColor(event.target.value);
  }, []);

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      // Create a canvas element and draw a rectangle with the color
      const canvas = document.createElement("canvas");
      const canvasContext = canvas.getContext("2d");
      canvas.width = 256;
      canvas.height = 256;
      canvasContext!.fillStyle = color;
      canvasContext!.fillRect(0, 0, canvas.width, canvas.height);

      // Create a link element and download the canvas as an image
      const link = document.createElement("a");
      link.download = `${closest(color).name}.png`;
      link.href = canvas.toDataURL();
      link.click();
    },
    [color],
  );

  return (
    <div className="flex h-dvh items-center justify-center">
      <GitHub repoUrl="https://github.com/iamursky/color-to-image" />
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <div className="relative h-48 w-48 overflow-hidden rounded-md border border-neutral-300">
          <input
            type="color"
            value={color}
            onChange={handleColorChange}
            className="absolute inset-1/2 h-52 w-52 -translate-1/2"
          />
        </div>
        <button className="w-full rounded-md border border-neutral-300 bg-neutral-200 p-2">
          Download
        </button>
      </form>
    </div>
  );
};
