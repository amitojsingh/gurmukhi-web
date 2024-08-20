import { AuthProvider } from "@/components/authentication";
import '@/styles/global.scss';

export const metadata = {
  title: 'Gurmukhi Shabadavali',
  description: 'Learn punjabi',
}

const RootLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <html lang="en">
      <body>
        <main className="app-wrapper">
        <AuthProvider>
          {children}
        </AuthProvider>
        </main>
      </body>
    </html>
  );
}

export default RootLayout;
