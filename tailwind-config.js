tailwind.config = {
    theme: {
        extend: {
            screens: {
                'sm': '641px',
                'md': '769px',
                'nav': '921px', // Trigger burger menu at 920px and below
                'lg': '1025px',
            },
            fontFamily: {
                'nunito': ['"Nunito Sans"', 'sans-serif'],
                'roboto': ['Roboto', 'sans-serif'],
                'body': ['"Nunito Sans"', 'sans-serif'],
                'headline': ['Roboto', 'sans-serif'],
                'manrope': ['Roboto', 'sans-serif'],
            },
            colors: {
                brand: {
                    primary: '#AAB952',
                    accent: '#528247',
                    dark: '#1a2b17',
                    copy: '#121212',
                },
                emerald: {
                    50: '#f6f8e8',
                    100: '#eaf0c8',
                    200: '#d4e19a',
                    300: '#bfd16b',
                    400: '#c4cc5f',
                    500: '#AAB952',
                    600: '#8fa03e',
                    700: '#72802f',
                    800: '#566022',
                    900: '#3a4016',
                },
                /* Brand neutral: warm green-gray */
                olive: {
                    50: '#f7f8f5',
                    100: '#eef0ea',
                    200: '#dde1d5',
                    300: '#c3cbb9',
                    400: '#97a88a',
                    500: '#6e8763',
                    600: '#528247',
                    700: '#3d6134',
                    800: '#2a4324',
                    900: '#1a2b17',
                }
            }
        }
    }
}
