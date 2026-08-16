"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Нужен там, где адаптив меняет не стили, а саму механику секции
 * (S5: sticky-рельс на десктопе против вертикального списка на мобильном) —
 * CSS-классами такое не переключить, потому что различаются хуки скролла.
 * На сервере всегда false: SSR отдаёт мобильную ветку, десктоп догоняет
 * после гидрации через useSyncExternalStore.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const list = window.matchMedia(query);
      list.addEventListener("change", onChange);
      return () => list.removeEventListener("change", onChange);
    },
    [query],
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );
}
