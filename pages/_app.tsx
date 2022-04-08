import '@frontend/assets/styles/proxima-nova-600.css'
import '@frontend/assets/styles/tailwind.css'

import type { AppProps } from 'next/dist/shared/lib/router/router'
import { MuiThemeProvider } from '@frontend/components/MuiThemeProvider'
import { createTheme, ThemeProvider } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#42A87A',
    },
  },
})

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider theme={theme}>
      <MuiThemeProvider>
        <Component {...pageProps} />
      </MuiThemeProvider>
    </ThemeProvider>
  )
}

export default MyApp
