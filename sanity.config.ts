import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {seoMetaFields} from 'sanity-plugin-seo'
import {schemaTypes} from './sanity/schemaTypes'
import {dataset, projectId} from './sanity/env'
import {defaultDocumentNode} from './sanity/defaultDocumentNode'

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
})
