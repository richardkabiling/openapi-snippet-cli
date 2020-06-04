declare module 'openapi-snippet' {
  import {OpenAPI} from 'openapi-types'
  export type Snippet = {
    id: string
    title: string
    content: string
  }

  export type Endpoint = {
    method: string
    url: string
    description: string
    resource: string
    snippets: ReadonlyArray<Snippet>
  }

  export function getSnippets(openApi: OpenAPI.Document, targets: ReadonlyArray<string>): ReadonlyArray<Endpoint>
  export function getEndpointSnippets(openApi: OpenAPI.Document, path: string, method: string, targets: ReadonlyArray<string>, ...values: object[]): Endpoint
}