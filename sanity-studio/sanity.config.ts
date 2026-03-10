import { defineConfig } from 'sanity'
import { structure } from './structure'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Alexey Marketing',

  projectId: '21das8f4',
  dataset: 'production',

  plugins: [
    structureTool({
      structure
    }),
    visionTool()
  ],

  schema: {
    types: schemaTypes,
  },
})
