// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Polyfill MutationObserver for React Testing Library waitFor
class MutationObserver {
  constructor(callback: Function) {}
  disconnect() {}
  observe(element: any, init: any) {}
}
// @ts-ignore
global.MutationObserver = MutationObserver;
