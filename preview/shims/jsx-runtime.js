const R = window.React;
function jsx(type, props, key) {
  return R.createElement(type, key === undefined ? props : { ...props, key });
}
export const Fragment = R.Fragment;
export { jsx, jsx as jsxs, jsx as jsxDEV };
