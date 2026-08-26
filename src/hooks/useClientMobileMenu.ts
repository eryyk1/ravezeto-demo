import { useCallback, useEffect, useRef, useState } from 'react';

const MENU_ID = 'mmenu';

export function useClientMobileMenu() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);

  const close = useCallback(() => {
    document.body.classList.remove('mopen');
    setOpen(false);
    buttonRef.current?.setAttribute('aria-expanded', 'false');
    document.getElementById(MENU_ID)?.setAttribute('aria-hidden', 'true');
  }, []);

  const toggle = useCallback(() => {
    const next = !document.body.classList.contains('mopen');
    document.body.classList.toggle('mopen', next);
    setOpen(next);
    buttonRef.current?.setAttribute('aria-expanded', String(next));
    document.getElementById(MENU_ID)?.setAttribute('aria-hidden', String(!next));
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.classList.remove('mopen');
    };
  }, [close]);

  return { buttonRef, open, toggle, close, menuId: MENU_ID };
}
