import {
  DetailedHTMLProps,
  FunctionComponent,
  HTMLAttributes,
  MouseEvent,
  useCallback,
} from "react";
import useSound from "use-sound";

export const InteractiveBlock: FunctionComponent<
  DetailedHTMLProps<HTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
> = ({ children, ...divProps }) => {
  const [play] = useSound("/assets/po.wav", { interrupt: true });
  const handleMouseOver = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      divProps.onMouseOver?.(event);
      play();
    },
    [divProps, play]
  );
  return (
    <button
      onMouseOver={handleMouseOver}
      {...divProps}
      className={[
        "flex justify-center items-center border border-gray-50 hover:bg-gray-700 active:bg-gray-500 outline-none",
        divProps.className ?? "",
      ].join(" ")}
    >
      {children}
    </button>
  );
};
