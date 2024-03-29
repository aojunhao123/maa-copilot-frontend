import '@blueprintjs/core/lib/css/blueprint.css'
import '@blueprintjs/icons/lib/css/blueprint-icons.css'
import '@blueprintjs/popover2/lib/css/blueprint-popover2.css'
import '@blueprintjs/select/lib/css/blueprint-select.css'
import * as Sentry from '@sentry/react'
import { BrowserTracing } from '@sentry/tracing'

import 'normalize.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Route, Routes } from 'react-router-dom'

import { AboutPage } from 'pages/about'
import { ViewPage } from 'pages/view'
import { clearOutdatedSwrCache } from 'utils/swr'

import { App } from './App'
import { AppLayout } from './layouts/AppLayout'
import { NotFoundPage } from './pages/404'
import { CreatePage } from './pages/create'
import { IndexPage } from './pages/index'
import './styles/blueprint.less'

import './styles/index.css'

Sentry.init({
  dsn: 'https://0a2bb44996194bb7aff8d0e32dcacb55@o1299554.ingest.sentry.io/6545242',
  integrations: [new BrowserTracing(), new Sentry.Replay()],
  tracesSampleRate: 0.05,

  replaysSessionSampleRate: 0.001,
  replaysOnErrorSampleRate: 0.1,

  debug: import.meta.env.DEV,

  enabled: import.meta.env.PROD,
  beforeSend: (event) => {
    if (import.meta.env.DEV) return null
    return event
  },
})

// add platform class to root element
if (navigator.userAgent.includes('Win')) {
  document.documentElement.classList.add('platform--windows')
} else {
  document.documentElement.classList.add('platform--non-windows')
}

clearOutdatedSwrCache()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App>
      <AppLayout>
        <Routes>
          <Route path="/" element={<IndexPage />} />
          <Route path="/create/:id" element={<CreatePage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/operation/:id" element={<ViewPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AppLayout>
    </App>
  </React.StrictMode>,
)
