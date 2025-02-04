import { useRouter } from 'next/router';
import { cn } from '@xyflow/xy-ui';

import { useData } from 'nextra/hooks';
import { useConfig } from 'nextra-theme-docs';

import { SharedContext, useFathom } from 'xy-shared';
import { ntDapperFont, fontClassNames } from 'xy-shared/fonts';

import { NhostClient, NhostProvider } from '@nhost/nextjs';

import '../global.css';

const fathomOptions = {
  id: 'LXMRMWLB',
  domains: ['reactflow.dev'],
};

const sharedContext = { useConfig, useData };

const nhost = new NhostClient({ subdomain: 'local', devTools: true });

export default function App({ Component, pageProps }) {
  const router = useRouter();
  // we need this to be able to override nextra theme styles for specific pages
  const routeSegment = router.pathname?.split('/')?.[1];
  useFathom(fathomOptions);

  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${ntDapperFont.style.fontFamily}, sans-serif;
        }
      `}</style>
      <div className={cn(fontClassNames, routeSegment)}>
        <NhostProvider nhost={nhost} initial={pageProps.nhostSession}>
          <SharedContext.Provider value={sharedContext}>
            <Component {...pageProps} />
          </SharedContext.Provider>
        </NhostProvider>
      </div>
    </>
  );
}
