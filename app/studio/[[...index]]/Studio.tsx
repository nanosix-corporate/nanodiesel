'use client'

import {NextStudio} from 'next-sanity/studio'
import config from '../../../sanity.config'
import { useEffect, useState } from 'react'

export function Studio() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return <NextStudio config={config} />
}
