import '@/styles/globals.css'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AdminPanel from '@/components/AdminPanel';
import AuthContextProvider, { AuthContext } from '@/context/AuthContext';
import NextNProgress from 'nextjs-progressbar';
import MessageContextProvider from '@/context/MessageContext';




const mdTheme = createTheme({
  palette: {
      primary: {
          main: '#008080'
      }
  }
});


export default function App({ Component, pageProps }) {
  return (
    <>
      <NextNProgress />
      {!Component.guest ?  (
        <AuthContextProvider>
          <MessageContextProvider>
            <ThemeProvider theme={mdTheme}>
              <AdminPanel title={pageProps.title ?? 'Erabiz'}>
                <Component {...pageProps} />
              </AdminPanel>
            </ThemeProvider>
          </MessageContextProvider>
        </AuthContextProvider>
      ) : (
      <ThemeProvider theme={mdTheme}>
        <MessageContextProvider>
          <Component {...pageProps} />
        </MessageContextProvider>
      </ThemeProvider>
      )}
    </>
  )

}
