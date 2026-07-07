import React from 'react'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {seoMetaFields} from 'sanity-plugin-seo'
import {schemaTypes} from './sanity/schemaTypes'
import {dataset, projectId} from './sanity/env'
import {defaultDocumentNode} from './sanity/defaultDocumentNode'
import {GuideButton} from './sanity/components/GuideButton'

export default defineConfig({
  basePath: '/studio',
  name: 'default',
  title: 'nanodiesel',
  projectId,
  dataset,
  plugins: [structureTool({ defaultDocumentNode }), visionTool(), seoMetaFields()],
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
