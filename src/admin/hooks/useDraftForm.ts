import { useCallback, useEffect, useRef, useState } from 'react';

export function useDraftForm<T>(source: T, isEqual: (a: T, b: T) => boolean = Object.is) {
  const [form, setForm] = useState(source);
  const [dirty, setDirty] = useState(false);
  const sourceRef = useRef(source);

  useEffect(() => {
    if (!dirty && !isEqual(source, sourceRef.current)) {
      sourceRef.current = source;
      setForm(source);
    }
  }, [source, dirty, isEqual]);

  const update = useCallback((updater: T | ((current: T) => T)) => {
    setForm((current) => {
      const next = typeof updater === 'function' ? (updater as (value: T) => T)(current) : updater;
      setDirty(!isEqual(next, sourceRef.current));
      return next;
    });
  }, [isEqual]);

  const reset = useCallback(() => {
    setForm(sourceRef.current);
    setDirty(false);
  }, []);

  const markSaved = useCallback((saved: T) => {
    sourceRef.current = saved;
    setForm(saved);
    setDirty(false);
  }, []);

  useEffect(() => {
    if (!dirty) return;
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = '';
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [dirty]);

  return { form, setForm: update, dirty, reset, markSaved };
}
