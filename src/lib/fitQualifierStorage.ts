/** Set when the user starts the inline qualifier (leaves the intro step). */
const KEY_INLINE_ENGAGED = 'hv_fit_inline_engaged_v1';

/** Set the first time the scroll prompt modal is shown so we never show it again. */
const KEY_SCROLL_PROMPT_SHOWN = 'hv_scroll_qualifier_prompt_shown_v1';

export function readInlineFitEngaged(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return localStorage.getItem(KEY_INLINE_ENGAGED) === '1';
  } catch {
    return false;
  }
}

export function markInlineFitEngaged(): void {
  try {
    localStorage.setItem(KEY_INLINE_ENGAGED, '1');
  } catch {
    /* ignore */
  }
}

export function readScrollPromptShown(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return localStorage.getItem(KEY_SCROLL_PROMPT_SHOWN) === '1';
  } catch {
    return false;
  }
}

export function markScrollPromptShown(): void {
  try {
    localStorage.setItem(KEY_SCROLL_PROMPT_SHOWN, '1');
  } catch {
    /* ignore */
  }
}
