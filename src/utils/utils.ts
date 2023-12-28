// 定义 debounce 函数，它接受一个泛型 F，这个泛型是一个函数类型，它可以接受任意数量的参数并返回任意类型的结果。
export function debounce<F extends (...args: any[]) => any>(
  func: F, // func 参数是要防抖的函数，它符合泛型 F 的定义。
  waitFor = 1000, // waitFor 参数指定了在执行函数之前要等待的时间，默认是 1000 毫秒。
  immediate = false // immediate 参数指定了是否立即执行函数，然后等待 waitFor 毫秒之后才能再次触发，默认为 false。
): (...args: Parameters<F>) => void {
  // 返回一个新函数，它接受与 func 相同的参数。
  let timeoutId: number | null = null; // timeoutId 用于存储 setTimeout 返回的计时器 ID。

  // 返回的新函数使用了剩余参数（...args）来收集所有传入的参数。
  return function (this: ThisParameterType<F>, ...args: Parameters<F>): void {
    // 清除之前的计时器（如果存在），这样就只有最后一次函数调用会在 waitFor 毫秒后执行。
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }
    // 立即执行的逻辑
    if (immediate && timeoutId === null) {
      // 如果 immediate 为 true 且 timeoutId 为 null，表示是第一次调用，立即执行函数。
      func.apply(this, args); // 使用 apply 方法调用 func，并传入当前的 this 上下文和参数。
    }

    // 无论是否立即执行，都设置一个新的计时器。
    timeoutId = setTimeout(() => {
      // 如果不是立即执行，或者计时器已经结束，调用 func 函数。
      if (!immediate) {
        func.apply(this, args); // 使用 apply 方法调用 func，并传入当前的 this 上下文和参数。
      }
      timeoutId = null; // 计时器结束后，将 timeoutId 设置为 null，表示可以重新开始计时。
    }, waitFor);
  };
}
