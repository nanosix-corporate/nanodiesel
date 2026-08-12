import React from 'react'
import {defineConfig, definePlugin} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {DownloadIcon} from '@sanity/icons'

import {schemaTypes} from './sanity/schemaTypes'
import {dataset, projectId} from './sanity/env'
import {defaultDocumentNode} from './sanity/defaultDocumentNode'
import {GuideButton} from './sanity/components/GuideButton'
import {ExportReportTool} from './sanity/components/ExportReportTool'

const exportReportPlugin = definePlugin({
  name: 'export-report',
  tools: [
    {
      name: 'export-report',
      title: 'Export Report',
      icon: DownloadIcon,
      component: ExportReportTool,
    },
  ],
})

export default defineConfig({
  basePath: '/studio',
  name: 'default',
  title: 'nanodiesel',
  projectId,
  dataset,
  plugins: [structureTool({ defaultDocumentNode }), visionTool(), exportReportPlugin()],
  schema: {
    types: schemaTypes,
  },
  studio: {
    components: {
      layout: (props) => {
        return React.createElement(
          React.Fragment,
          null,
          props.renderDefault(props),
          React.createElement(GuideButton)
        )
      }
    }
  }
})
