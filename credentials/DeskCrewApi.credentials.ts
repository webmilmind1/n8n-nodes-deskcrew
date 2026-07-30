import type {
  Icon,
  IAuthenticateGeneric,
  ICredentialTestRequest,
  ICredentialType,
  INodeProperties,
} from 'n8n-workflow'

export class DeskCrewApi implements ICredentialType {
  name = 'deskCrewApi'
  displayName = 'DeskCrew API'
  // Both themes point at the same asset deliberately: the mark is a filled squircle
  // carrying its own background, so it reads correctly on light and dark alike.
  icon: Icon = { light: 'file:deskcrew.svg', dark: 'file:deskcrew.svg' }
  documentationUrl = 'https://deskcrew.io'
  properties: INodeProperties[] = [
    {
      displayName: 'API Key',
      name: 'apiKey',
      type: 'string',
      typeOptions: { password: true },
      default: '',
      required: true,
      description:
        'A DeskCrew API key (starts with dk_). Create one in your dashboard under API keys, with the scopes the operations you use need (tickets:read, tickets:write, tickets:reply, kb:write, changelog:write, issues:write).',
    },
    {
      displayName: 'Base URL',
      name: 'baseUrl',
      type: 'string',
      default: 'https://deskcrew.io',
      description: 'Leave as-is unless you were told otherwise',
    },
  ]

  authenticate: IAuthenticateGeneric = {
    type: 'generic',
    properties: {
      headers: { Authorization: '=Bearer {{$credentials.apiKey}}' },
    },
  }

  test: ICredentialTestRequest = {
    request: { baseURL: '={{$credentials.baseUrl}}', url: '/api/v1/tickets?limit=1' },
  }
}
