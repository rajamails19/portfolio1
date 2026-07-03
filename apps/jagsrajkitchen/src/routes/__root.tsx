import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

function NotFoundComponent() {
  return (
    <div style={{minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', padding:'0 16px'}}>
      <div style={{textAlign:'center', maxWidth:400}}>
        <h1 style={{fontSize:72, fontFamily:'Playfair Display, serif'}}>404</h1>
        <p style={{marginTop:8, color:'#6B6860'}}>Page not found</p>
        <Link to="/" style={{display:'inline-block', marginTop:24, background:'#5C6B3A', color:'white', padding:'12px 28px', borderRadius:50}}>Go home</Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  return (
    <div style={{minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', padding:'0 16px'}}>
      <div style={{textAlign:'center', maxWidth:400}}>
        <h1 style={{fontSize:24, fontFamily:'Playfair Display, serif'}}>Something went wrong</h1>
        <p style={{marginTop:8, color:'#6B6860'}}>{error.message}</p>
        <button onClick={() => { router.invalidate(); reset(); }} style={{marginTop:24, background:'#2C2C2A', color:'white', padding:'12px 28px', borderRadius:50, border:'none', cursor:'pointer'}}>Try again</button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Raja Kitchen — Indian Bar and Restaurant" },
      { name: "description", content: "Raja Kitchen — fine-casual Indian dining in Suwanee, Georgia." },
      { property: "og:title", content: "Raja Kitchen — Indian Bar and Restaurant" },
      { property: "og:description", content: "Raja Kitchen — fine-casual Indian dining in Suwanee, Georgia." },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "Raja Kitchen — Indian Bar and Restaurant" },
      { name: "twitter:description", content: "Raja Kitchen — fine-casual Indian dining in Suwanee, Georgia." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/ed79f96b-a4fc-4adc-96cd-e86e12df0e3d/id-preview-3559cd62--ff0ca2b8-7f36-4804-b4de-782aa79542f8.lovable.app-1779070455868.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/ed79f96b-a4fc-4adc-96cd-e86e12df0e3d/id-preview-3559cd62--ff0ca2b8-7f36-4804-b4de-782aa79542f8.lovable.app-1779070455868.png" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Navbar />
      <Outlet />
      <Footer />
    </QueryClientProvider>
  );
}
