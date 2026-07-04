import { navigate } from "astro:transitions/client";
import { navLinks } from "../data/nav";

const routes = Object.fromEntries(
  navLinks.map(({ key, href }) => [key, href]),
) as Record<(typeof navLinks)[number]["key"], string>;

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

function getPanel(): HTMLElement | null {
  return document.getElementById("shortcuts-panel");
}

function isPanelOpen(): boolean {
  const panel = getPanel();
  return panel instanceof HTMLElement && !panel.hidden;
}

function setPanelOpen(open: boolean): void {
  const panel = getPanel();
  if (!(panel instanceof HTMLElement)) return;
  panel.hidden = !open;
}

function handleKeydown(event: KeyboardEvent): void {
  if (event.defaultPrevented) return;
  if (event.repeat) return;
  if (event.metaKey || event.ctrlKey || event.altKey) return;
  if (event.isComposing) return;
  if (isEditableTarget(event.target)) return;

  const key = event.key.toLowerCase();

  // Shortcuts panel: ? toggles, Esc closes (only when already open)
  if (key === "?" || key === "escape") {
    if (key === "escape" && !isPanelOpen()) return;
    event.preventDefault();
    setPanelOpen(!isPanelOpen());
    return;
  }

  // While the panel is open, ignore nav shortcuts so it behaves as a modal.
  if (isPanelOpen()) return;

  if (!isShortcutKey(key)) return;

  const targetPath = routes[key];
  const currentPath = window.location.pathname;

  if (normalizePath(currentPath) === normalizePath(targetPath)) return;

  event.preventDefault();
  navigate(targetPath);
}

function handlePointerDown(event: PointerEvent): void {
  if (!isPanelOpen()) return;
  const panel = getPanel();
  if (panel instanceof HTMLElement && event.target === panel) {
    setPanelOpen(false);
  }
}

if (!window.__keyboardNavRegistered) {
  window.__keyboardNavRegistered = true;
  document.addEventListener("keydown", handleKeydown);
  document.addEventListener("pointerdown", handlePointerDown);
}
