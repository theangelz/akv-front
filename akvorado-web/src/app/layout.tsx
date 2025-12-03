import './globals.css'

export const metadata = {
  title: 'Akvorado - NetFlow Analyzer',
  description: 'Flow collector and analyzer',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
