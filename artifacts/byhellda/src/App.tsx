import { useEffect, useRef } from 'react';
import { ClerkProvider, SignIn, SignUp, useClerk } from '@clerk/react';
import { shadcn } from '@clerk/themes';
import { QueryClient, QueryClientProvider, useQueryClient } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, Router as WouterRouter, useLocation } from 'wouter';
import { SiteLayout } from '@/components/layout/SiteLayout';
import { CartProvider } from '@/context/CartContext';
import { getClerkBootstrap } from '@/lib/clerkConfig';
import { setBaseUrl } from '@workspace/api-client-react';

import Index from '@/pages/Index';
import Products from '@/pages/Products';
import Gallery from '@/pages/Gallery';
import Checkout from '@/pages/Checkout';

const queryClient = new QueryClient();

const basePath = import.meta.env.BASE_URL.replace(/\/$/, '');
const clerkBootstrap = getClerkBootstrap({
  hostname: window.location.hostname,
  publishableKeyEnv: import.meta.env.VITE_CLERK_PUBLISHABLE_KEY,
  proxyUrlEnv: import.meta.env.VITE_CLERK_PROXY_URL,
  basePath,
});

const clerkPubKey = clerkBootstrap.publishableKey;
const clerkProxyUrl = clerkBootstrap.proxyUrl;

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, '') ?? null;
setBaseUrl(apiBaseUrl ?? window.location.origin);

function stripBase(path: string): string {
  return basePath && path.startsWith(basePath)
    ? path.slice(basePath.length) || '/'
    : path;
}

const clerkAppearance = {
  theme: shadcn,
  cssLayerName: 'clerk',
  options: {
    logoPlacement: 'inside' as const,
    logoLinkUrl: basePath || '/',
    logoImageUrl: `${window.location.origin}${basePath}/logo.svg`,
  },
  variables: {
    colorPrimary: 'hsl(330, 65%, 50%)',
    colorForeground: 'hsl(330, 20%, 15%)',
    colorMutedForeground: 'hsl(330, 10%, 50%)',
    colorDanger: 'hsl(0, 72%, 51%)',
    colorBackground: '#ffffff',
    colorInput: 'hsl(330, 20%, 97%)',
    colorInputForeground: 'hsl(330, 20%, 15%)',
    colorNeutral: 'hsl(330, 15%, 85%)',
    fontFamily: 'Poppins, sans-serif',
    borderRadius: '0.75rem',
  },
  elements: {
    rootBox: 'w-full flex justify-center',
    cardBox: 'bg-white rounded-2xl w-[440px] max-w-full overflow-hidden shadow-[0_8px_40px_rgba(244,114,182,0.15)]',
    card: '!shadow-none !border-0 !bg-transparent !rounded-none',
    footer: '!shadow-none !border-0 !bg-transparent !rounded-none',
    headerTitle: 'text-[hsl(330,20%,15%)] font-semibold',
    headerSubtitle: 'text-[hsl(330,10%,50%)]',
    socialButtonsBlockButtonText: 'text-[hsl(330,20%,15%)]',
    formFieldLabel: 'text-[hsl(330,20%,15%)]',
    footerActionLink: 'text-[hsl(330,65%,50%)] hover:text-[hsl(330,65%,40%)]',
    footerActionText: 'text-[hsl(330,10%,50%)]',
    dividerText: 'text-[hsl(330,10%,50%)]',
    identityPreviewEditButton: 'text-[hsl(330,65%,50%)]',
    formFieldSuccessText: 'text-green-600',
    alertText: 'text-[hsl(330,20%,15%)]',
    logoBox: 'mb-2',
    logoImage: 'h-16 w-auto',
    socialButtonsBlockButton: 'border border-[hsl(330,15%,85%)] bg-white hover:bg-[hsl(330,20%,97%)]',
    formButtonPrimary: 'bg-[hsl(330,65%,50%)] hover:bg-[hsl(330,65%,44%)] text-white',
    formFieldInput: 'bg-[hsl(330,20%,97%)] border-[hsl(330,15%,85%)] text-[hsl(330,20%,15%)]',
    footerAction: 'bg-[hsl(330,20%,98%)]',
    dividerLine: 'bg-[hsl(330,15%,88%)]',
    alert: 'bg-[hsl(330,20%,98%)]',
    otpCodeFieldInput: 'border-[hsl(330,15%,85%)] bg-[hsl(330,20%,97%)]',
    formFieldRow: '',
    main: '',
  },
};

function SignInPage() {
  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-gradient-to-br from-pink-50 to-rose-50 px-4 py-12">
      <SignIn routing="path" path={`${basePath}/sign-in`} signUpUrl={`${basePath}/sign-up`} />
    </div>
  );
}

function SignUpPage() {
  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-gradient-to-br from-pink-50 to-rose-50 px-4 py-12">
      <SignUp routing="path" path={`${basePath}/sign-up`} signInUrl={`${basePath}/sign-in`} />
    </div>
  );
}

function ClerkQueryClientCacheInvalidator() {
  const { addListener } = useClerk();
  const qc = useQueryClient();
  const prevUserIdRef = useRef<string | null | undefined>(undefined);

  useEffect(() => {
    const unsub = addListener(({ user }) => {
      const userId = user?.id ?? null;
      if (prevUserIdRef.current !== undefined && prevUserIdRef.current !== userId) {
        qc.clear();
      }
      prevUserIdRef.current = userId;
    });
    return unsub;
  }, [addListener, qc]);

  return null;
}

function Router() {
  return (
    <SiteLayout>
      <Switch>
        <Route path="/" component={Index} />
        <Route path="/products" component={Products} />
        <Route path="/gallery" component={Gallery} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/sign-in/*?" component={SignInPage} />
        <Route path="/sign-up/*?" component={SignUpPage} />
        <Route component={NotFound} />
      </Switch>
    </SiteLayout>
  );
}

function ClerkProviderWithRoutes() {
  const [, setLocation] = useLocation();

  if (!clerkBootstrap.isConfigured) {
    return (
      <QueryClientProvider client={queryClient}>
        <CartProvider>
          <TooltipProvider>
            <div className="flex min-h-[100dvh] items-center justify-center bg-gradient-to-br from-pink-50 to-rose-50 px-4 py-12">
              <div className="max-w-md rounded-2xl border border-pink-100 bg-white p-8 text-center shadow-[0_8px_40px_rgba(244,114,182,0.15)]">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-pink-500">Authentication pending</p>
                <h1 className="mt-3 text-2xl font-semibold text-slate-900">Clerk is not configured yet</h1>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  Add your Clerk publishable key to the Vite environment to enable sign-in and sign-up flows.
                </p>
              </div>
            </div>
          </TooltipProvider>
        </CartProvider>
      </QueryClientProvider>
    );
  }

  return (
    <ClerkProvider
      publishableKey={clerkPubKey}
      proxyUrl={clerkProxyUrl}
      appearance={clerkAppearance}
      signInUrl={`${basePath}/sign-in`}
      signUpUrl={`${basePath}/sign-up`}
      localization={{
        signIn: { start: { title: 'Welcome back', subtitle: 'Sign in to your byHellda account' } },
        signUp: { start: { title: 'Join byHellda', subtitle: 'Create your account to get started' } },
      }}
      routerPush={(to) => setLocation(stripBase(to))}
      routerReplace={(to) => setLocation(stripBase(to), { replace: true })}
    >
      <QueryClientProvider client={queryClient}>
        <ClerkQueryClientCacheInvalidator />
        <CartProvider>
          <TooltipProvider>
            <Router />
            <Toaster />
          </TooltipProvider>
        </CartProvider>
      </QueryClientProvider>
    </ClerkProvider>
  );
}

function App() {
  return (
    <WouterRouter base={basePath}>
      <ClerkProviderWithRoutes />
    </WouterRouter>
  );
}

export default App;
