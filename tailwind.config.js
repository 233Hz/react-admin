import { defineConfig } from 'windicss/helpers';

export default defineConfig({
  preflight: false,
  darkMode: 'class',
  shortcuts: {
    'color-transition': 'transition-colors duration-200 ease-in-out delay-0',
    'btn-icon':
      'w-[34px] h-[34px] text-[16px] flex items-center justify-center select-none cursor-pointer bg-[#fec7d7] dark:bg-[#f9bc60] text-[#ffffff] rounded-[8px] color-transition hover:(bg-[#f9bc60] dark:bg-[#fec7d7]))',
    'btn-container':
      'bg-[#fec7d7] dark:bg-[#f9bc60] text-[#ffffff] color-transition hover:(bg-[#f9bc60] dark:bg-[#fec7d7]))',
    primary:
      'dark:text-primaryTextColor-dark light:text-primaryTextColor-light text-primaryTextColor-light dark:bg-primaryBgColor-dark light:bg-primaryBgColor-light bg-primaryBgColor-light color-transition',
  },
  theme: {
    extend: {
      colors: {
        primaryTextColor: {
          dark: '#ffffff',
          light: '#333333',
        },
        primaryBgColor: {
          dark: '#16161a',
          light: '#ffffff',
        },
      },
    },
  },
});
