import { ProductProvider } from '@/context/ProductProvider'
import '@/styles/globals.css'
import { ThemeProvider } from "next-themes"

export default function App({ Component, pageProps }) {
  return (
    <ProductProvider>
      <ThemeProvider attribute="class">
        <Component {...pageProps} />
      </ThemeProvider>
    </ProductProvider>
  )
}
