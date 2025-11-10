if (typeof window !== undefined)
  (window as Window).IGNORED_ERRORS = [
    'Warning: React does not recognize the `%s` prop on a DOM element. If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase `%s` instead. If you accidentally passed it from a parent component, remove it from the DOM element.',
    'Warning: [antd: TreeSelect] `onDropdownVisibleChange` is deprecated. Please use `onOpenChange` instead.',
    'Warning: [antd: TreeSelect] `bordered` is deprecated. Please use `variant` instead.',
  ];

/** 忽略特定的错误日志
 *
 * 包括部分无法解决的问题、特性被废弃的警告、不影响系统运行的错误
 */
export const ignoreConsoleError = () => {
  if (process.env.NODE_ENV !== 'development') return;
  const originalConsoleError = console.error;

  console.error = function filterErrors(msg, ...args) {
    if (typeof msg !== 'string') originalConsoleError(msg, ...args);
    else if (!window.IGNORED_ERRORS.some((error) => msg.includes(error)))
      originalConsoleError(msg, ...args);
  };
};
