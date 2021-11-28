import {
  DetailedHTMLProps,
  InputHTMLAttributes,
  VoidFunctionComponent,
} from "react";

export const TextArea: VoidFunctionComponent<
  DetailedHTMLProps<
    InputHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > & {
    noBorder?: boolean;
  }
> = ({ noBorder, className, ...restProps }) => (
  <textarea
    className={[
      noBorder
        ? "bg-transparent pl-2 pr-2 w-full outline-none"
        : "bg-transparent pl-2 pr-2 w-full outline-none border border-gray-50 rounded",
      className ?? "",
    ].join(" ")}
    {...restProps}
  />
);
