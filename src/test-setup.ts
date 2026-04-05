import "@testing-library/jest-dom/vitest";

// jsdom does not implement IntersectionObserver; stub it for components that use it.
class IntersectionObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
}
(globalThis as any).IntersectionObserver = IntersectionObserverStub;
