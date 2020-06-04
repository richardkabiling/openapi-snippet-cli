import {Command, flags} from '@oclif/command'
import * as SwaggerParser from "@apidevtools/swagger-parser"
import * as OpenAPISnippet from 'openapi-snippet'
import { OpenAPI } from 'openapi-types'
import * as _ from 'lodash'
import * as yaml from 'js-yaml'
import * as fs from 'fs'

const methods = [
  'get', 'put', 'post', 'delete', 'options', 'head', 'patch', 'trace'
]

const targets = [
  'c_libcurl',
  'csharp_restsharp',
  'go_native',
  'java_okhttp',
  'java_unirest',
  'javascript_jquery',
  'javascript_xhr',
  'javascript',
  'node_native',
  'node_request',
  'node_unirest',
  'objc_nsurlsession',
  'ocaml_cohttp',
  'php_curl',
  'php_http1',
  'php_http2',
  'python_python3',
  'python_requests',
  'ruby_native',
  'shell_curl',
  'shell_httpie',
  'shell_wget',
  'swift_nsurlsession',
]

const langs = targets.map(t => t.split('_')[0])
  .filter((value, index, self) => self.indexOf(value) === index)

class OpenapiSnippetCli extends Command {
  static description = 'Adds snippets in specified laguages and frameworksAdds openapi snippets using openapi-snippet module in redoc style'

  static flags = {
    version: flags.version({char: 'v'}),
    help: flags.help({char: 'h'}),
    targets: flags.string({
      description: 'Target snippet languages + frameworks. Can be provided multiple times. If inputting language only, defaults to one of the frameworks. Supports languages supported in https://github.com/ErikWittern/openapi-snippet',
      char: 't',
      multiple: true,
      parse: (input) => input.split(',')
    }),
    ext: flags.string({
      description: 'Output format and extension',
      char: 'e',
      options: [
        'yaml', 'json'
      ],
      default: 'yaml'
    }),
    output: flags.string({
      description: 'Output file name',
      char: 'o',
      default: 'output'
    })
  }

  static args = [{name: 'file'}]

  async run() {
    const isT = <T> (value: T|undefined): value is T => {
      return value != undefined
    }
    const {args, flags} = this.parse(OpenapiSnippetCli)

    const api = await SwaggerParser.validate(args.file)
    const resolvedTargets = (flags.targets || targets)
      .map(arg => targets.find(target => target.startsWith(arg)))
      .filter(isT)
    const apiWithSnippets = this.withSnippets(api, resolvedTargets)

    const filename = `${process.cwd()}/${flags.output}.${flags.ext}`
    if(flags.ext == 'yaml') {
      const dump = yaml.safeDump(apiWithSnippets)
      fs.writeFileSync(filename, dump)
    } else {
      const dump = JSON.stringify(apiWithSnippets)
      fs.writeFileSync(filename, dump)
    }
  }

  withSnippets(api: OpenAPI.Document, targets: ReadonlyArray<string>) {
    const clone = _.cloneDeep(api)
    for(let path in clone.paths){
      for(let method in clone.paths[path]){
        if(methods.includes(method)) {
          clone.paths[path][method]["x-codeSamples"] = this.fetchSnippets(clone, path, method, targets)
        }
      }
    }
    return clone
  }

  fetchSnippets(api: OpenAPI.Document, path: string, method: string, targets: ReadonlyArray<string>) {
    const snippets = OpenAPISnippet.getEndpointSnippets(api, path, method, targets)
      .snippets
      .map(snippet => ({ lang: snippet.title, source: snippet.content }))
    return snippets
  }

}

export = OpenapiSnippetCli
