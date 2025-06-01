import Header from "@/components/header";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./globals.css";
import { Toaster } from "sonner";
import Footer from "@/components/footer";
import { ReduxProvider } from "@/components/redux-provider";

const googleClientId = process.env.NEXT_PUBLIC_GG_CLIENT_ID || "";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <GoogleOAuthProvider clientId={googleClientId}>
          <ReduxProvider>
            <Toaster
              position="top-right"
              richColors
              toastOptions={{
                classNames: {
                  toast: "toast-slide-in",
                },
              }}
            />
            <Header />

            <main>{children}</main>
            <Footer />
          </ReduxProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
