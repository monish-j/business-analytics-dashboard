import './globals.css'

export const metadata = {
  title: 'Business Analytics Dashboard | Modern Data Visualization',
  description: 'Professional business analytics dashboard showcasing key performance indicators, revenue trends, customer growth, and traffic analytics. Built with Next.js and modern data visualization tools.',
  keywords: 'business analytics, dashboard, data visualization, KPI, revenue tracking, customer analytics',
  author: 'Business Analytics Team',
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen">
        {children}
      </body>
    </html>
  )
}