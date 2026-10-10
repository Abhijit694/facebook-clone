module.exports = {
  theme: {
    extend: {
      scrollbar: {
        none: 'none',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.scrollbar-none': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
      };
      addUtilities(newUtilities);
    },
  ],
};