import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { AppleAnalyticsView } from 'src/sections/apple/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Apple- ${CONFIG.appName}`}</title>
      </Helmet>

      <AppleAnalyticsView />
    </>
  );
}
