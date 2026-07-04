import { navigate } from "astro:transitions/client";

const routes = {
  h: "/",
  b: "/blog",
  p: "/projects",
  n: "/now",
  u: "/uses",
} as const;

type ShortcutKey = keyof typeof routes;

declare global {
  interface Window {
    __keyboardNavRegistered?: boolean;
  }
}

function isShortcutKey(key: string): key is ShortcutKey {
  return key in routes;
}

function isEditableTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;

  const tagName = target.tagName.toLowerCase();

  return (
    tagName === "input" ||
    tagName === "textarea" ||
    tagName === "select" ||
    target.isContentEditable
  );
}

function normalizePath(path: string): string {
  return path.length > 1 ? path.replace(/\/$/, "") : path;
}

function handleKeydown(event: KeyboardEvent): void {
  if (event.defaultPrevented) return;
  if (event.repeat) return;
  if (event.metaKey || event.ctrlKey || event.altKey) return;
  if (event.isComposing) return;
  if (isEditableTarget(event.target)) return;

  const key = event.key.toLowerCase();

  if (!isShortcutKey(key)) return;

  const targetPath = routes[key];
  const currentPath = window.location.pathname;

  if (normalizePath(currentPath) === normalizePath(targetPath)) return;

  event.preventDefault();
  navigate(targetPath);
}

if (!window.__keyboardNavRegistered) {
  window.__keyboardNavRegistered = true;
  document.addEventListener("keydown", handleKeydown);
}
