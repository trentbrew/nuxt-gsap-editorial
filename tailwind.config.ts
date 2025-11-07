export default {
  theme: {
    extend: {
      fontFamily: {
        serif: ['Libre Baskerville', 'Georgia', 'serif'],
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      spacing: {
        xs: '0.5rem',
        sm: '1rem',
        md: '2rem',
        lg: '4rem',
        xl: '8rem',
      },
      colors: {
        accent: '#d4af37',
      },
    },
  },
  daisyui: {
    themes: [
      {
        // Light mode theme (default)
        acme: {
          'color-scheme': 'light',
          primary: '#d4af37',
          'primary-content': '#ffffff',
          secondary: '#666666',
          'secondary-content': '#ffffff',
          accent: '#d4af37',
          'accent-content': '#ffffff',
          neutral: '#121212',
          'neutral-content': '#ffffff',
          'base-100': '#fafafa',
          'base-200': '#ffffff',
          'base-300': '#e5e5e5',
          'base-content': '#121212',
          info: '#3abff8',
          'info-content': '#ffffff',
          success: '#36d399',
          'success-content': '#ffffff',
          warning: '#fbbd23',
          'warning-content': '#ffffff',
          error: '#f87272',
          'error-content': '#ffffff',
        },
      },
      {
        // Alternative light theme
        beta: {
          'color-scheme': 'light',
          primary: '#4338ca',
          'primary-content': '#ffffff',
          secondary: '#64748b',
          'secondary-content': '#ffffff',
          accent: '#0ea5e9',
          'accent-content': '#ffffff',
          neutral: '#1e293b',
          'neutral-content': '#ffffff',
          'base-100': '#f8fafc',
          'base-200': '#ffffff',
          'base-300': '#e2e8f0',
          'base-content': '#0f172a',
          info: '#3abff8',
          'info-content': '#ffffff',
          success: '#36d399',
          'success-content': '#ffffff',
          warning: '#fbbd23',
          'warning-content': '#ffffff',
          error: '#f87272',
          'error-content': '#ffffff',
        },
      },
    ],
    darkTheme: false, // Disable automatic dark mode
    base: true,
    styled: true,
    utils: true,
  },
  plugins: [require('daisyui')],
}
