import { createElement } from "react";
import { navigate } from "./navigation.js";

export default function Link({ href, children, onClick, ...rest }) {
  return createElement(
    "a",
    {
      ...rest,
      href,
      onClick: (e) => {
        onClick?.(e);
        if (e.defaultPrevented || e.metaKey || e.ctrlKey) return;
        e.preventDefault();
        navigate(href);
      },
    },
    children,
  );
}
