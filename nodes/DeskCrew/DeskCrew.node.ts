import type { INodeType, INodeTypeDescription, NodeConnectionType } from 'n8n-workflow'

// Declarative node: every operation maps straight onto the DeskCrew v1 REST API.
export class DeskCrew implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'DeskCrew',
    name: 'deskCrew',
    // Lets an n8n AI Agent call this node directly as a tool, which is the whole point
    // of an agent-native helpdesk: the agent opens and answers tickets itself.
    usableAsTool: true,
    // Distinct assets: the dark variant lightens the gradient and darkens the glyph so
    // the mark keeps its contrast on a dark canvas. n8n's linter rejects sharing one file.
    icon: { light: 'file:deskcrew.svg', dark: 'file:deskcrew.dark.svg' },
    group: ['output'],
    version: 1,
    subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
    description: 'Work a DeskCrew support desk: tickets, replies, knowledge base, changelog, issues',
    defaults: { name: 'DeskCrew' },
    inputs: ['main' as NodeConnectionType],
    outputs: ['main' as NodeConnectionType],
    credentials: [{ name: 'deskCrewApi', required: true }],
    requestDefaults: {
      baseURL: '={{$credentials.baseUrl}}',
      headers: { 'Content-Type': 'application/json' },
    },
    properties: [
      {
        displayName: 'Resource',
        name: 'resource',
        type: 'options',
        noDataExpression: true,
        // Alphabetical by display name: the n8n linter enforces it
        // (node-param-options-type-unsorted-items), and the editor renders
        // this list in source order, so sorted here IS sorted for the user.
        options: [
          { name: 'Arena Bounty', value: 'bounty' },
          { name: 'Changelog Entry', value: 'changelog' },
          { name: 'Issue', value: 'issue' },
          { name: 'Knowledge Base Article', value: 'kb' },
          { name: 'Ticket', value: 'ticket' },
        ],
        default: 'ticket',
      },

      // ── Ticket ────────────────────────────────────────────────────────────
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { resource: ['ticket'] } },
        options: [
          {
            name: 'Create',
            value: 'create',
            action: 'Create a ticket',
            routing: { request: { method: 'POST', url: '/api/v1/tickets' } },
          },
          {
            name: 'Get',
            value: 'get',
            action: 'Get a ticket',
            routing: { request: { method: 'GET', url: '=/api/v1/tickets/{{$parameter.ticketId}}' } },
          },
          {
            name: 'Get Many',
            value: 'getMany',
            action: 'List tickets',
            routing: { request: { method: 'GET', url: '/api/v1/tickets' } },
          },
          {
            name: 'Reply',
            value: 'reply',
            action: 'Reply to a ticket',
            routing: {
              request: { method: 'POST', url: '=/api/v1/tickets/{{$parameter.ticketId}}/reply' },
            },
          },
        ],
        default: 'create',
      },
      {
        displayName: 'Subject',
        name: 'subject',
        type: 'string',
        required: true,
        default: '',
        displayOptions: { show: { resource: ['ticket'], operation: ['create'] } },
        routing: { send: { type: 'body', property: 'subject' } },
      },
      {
        displayName: 'Customer Email',
        name: 'customerEmail',
        type: 'string',
        required: true,
        default: '',
        displayOptions: { show: { resource: ['ticket'], operation: ['create'] } },
        routing: { send: { type: 'body', property: 'customer_email' } },
      },
      {
        displayName: 'Customer Name',
        name: 'customerName',
        type: 'string',
        default: '',
        displayOptions: { show: { resource: ['ticket'], operation: ['create'] } },
        routing: { send: { type: 'body', property: 'customer_name' } },
      },
      {
        displayName: 'Ticket ID',
        name: 'ticketId',
        type: 'string',
        required: true,
        default: '',
        displayOptions: { show: { resource: ['ticket'], operation: ['get', 'reply'] } },
      },
      {
        displayName: 'Reply Body',
        name: 'replyBody',
        type: 'string',
        typeOptions: { rows: 4 },
        required: true,
        default: '',
        displayOptions: { show: { resource: ['ticket'], operation: ['reply'] } },
        routing: { send: { type: 'body', property: 'body' } },
      },
      {
        displayName: 'Mode',
        name: 'mode',
        type: 'options',
        options: [
          {
            name: 'Draft (Human Approves Before It Sends)',
            value: 'draft',
          },
          { name: 'Send (Delivers Immediately)', value: 'send' },
        ],
        default: 'draft',
        description:
          'Draft queues the reply for human approval in the dashboard. Send requires the workspace to allow live replies for API keys.',
        displayOptions: { show: { resource: ['ticket'], operation: ['reply'] } },
        routing: { send: { type: 'body', property: 'mode' } },
      },
      {
        displayName: 'Status',
        name: 'status',
        type: 'string',
        default: '',
        description: 'Optionally filter by status, e.g. active or resolved',
        displayOptions: { show: { resource: ['ticket'], operation: ['getMany'] } },
        routing: { send: { type: 'query', property: 'status' } },
      },

      // ── Knowledge base ───────────────────────────────────────────────────
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { resource: ['kb'] } },
        options: [
          {
            name: 'Create',
            value: 'create',
            action: 'Create a KB article',
            routing: { request: { method: 'POST', url: '/api/v1/kb' } },
          },
          {
            name: 'Get Many',
            value: 'getMany',
            action: 'List KB articles',
            routing: { request: { method: 'GET', url: '/api/v1/kb' } },
          },
        ],
        default: 'create',
      },
      {
        displayName: 'Title',
        name: 'kbTitle',
        type: 'string',
        required: true,
        default: '',
        displayOptions: { show: { resource: ['kb'], operation: ['create'] } },
        routing: { send: { type: 'body', property: 'title' } },
      },
      {
        displayName: 'Body (Markdown)',
        name: 'kbBody',
        type: 'string',
        typeOptions: { rows: 6 },
        required: true,
        default: '',
        displayOptions: { show: { resource: ['kb'], operation: ['create'] } },
        routing: { send: { type: 'body', property: 'body' } },
      },
      {
        displayName: 'Status',
        name: 'kbStatus',
        type: 'options',
        options: [
          { name: 'Draft', value: 'draft' },
          { name: 'Published', value: 'published' },
        ],
        default: 'draft',
        displayOptions: { show: { resource: ['kb'], operation: ['create'] } },
        routing: { send: { type: 'body', property: 'status' } },
      },

      // ── Changelog ────────────────────────────────────────────────────────
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { resource: ['changelog'] } },
        options: [
          {
            name: 'Create',
            value: 'create',
            action: 'Create a changelog entry',
            routing: { request: { method: 'POST', url: '/api/v1/changelog' } },
          },
          {
            name: 'Get Many',
            value: 'getMany',
            action: 'List changelog entries',
            routing: { request: { method: 'GET', url: '/api/v1/changelog' } },
          },
        ],
        default: 'create',
      },
      {
        displayName: 'Title',
        name: 'clTitle',
        type: 'string',
        required: true,
        default: '',
        displayOptions: { show: { resource: ['changelog'], operation: ['create'] } },
        routing: { send: { type: 'body', property: 'title' } },
      },
      {
        displayName: 'Body (Markdown)',
        name: 'clBody',
        type: 'string',
        typeOptions: { rows: 6 },
        required: true,
        default: '',
        displayOptions: { show: { resource: ['changelog'], operation: ['create'] } },
        routing: { send: { type: 'body', property: 'body' } },
      },

      // ── Issues ───────────────────────────────────────────────────────────
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { resource: ['issue'] } },
        options: [
          {
            name: 'Create',
            value: 'create',
            action: 'Create an issue',
            routing: { request: { method: 'POST', url: '/api/v1/issues' } },
          },
          {
            name: 'Get Many',
            value: 'getMany',
            action: 'List issues',
            routing: { request: { method: 'GET', url: '/api/v1/issues' } },
          },
        ],
        default: 'create',
      },
      {
        displayName: 'Type',
        name: 'issueType',
        type: 'options',
        options: [
          { name: 'Bug', value: 'bug' },
          { name: 'Feature', value: 'feature' },
        ],
        default: 'bug',
        displayOptions: { show: { resource: ['issue'], operation: ['create'] } },
        routing: { send: { type: 'body', property: 'type' } },
      },
      {
        displayName: 'Title',
        name: 'issueTitle',
        type: 'string',
        required: true,
        default: '',
        displayOptions: { show: { resource: ['issue'], operation: ['create'] } },
        routing: { send: { type: 'body', property: 'title' } },
      },
      {
        displayName: 'Body',
        name: 'issueBody',
        type: 'string',
        typeOptions: { rows: 4 },
        default: '',
        displayOptions: { show: { resource: ['issue'], operation: ['create'] } },
        routing: { send: { type: 'body', property: 'body' } },
      },

      // ── Arena Bounty ──────────────────────────────────────────────────────
      // Open contests: real support tickets carrying a cash bounty that agents
      // compete for. Read-only by design. Entering a contest means drafting an
      // ending and paying the entry fee, which happens over the agent door, not
      // here: an automation step that silently spends money would be a trap.
      //
      // NOTE this is the one operation pointing outside /api/v1. The board is a
      // PUBLIC endpoint (/api/arena/contests) rather than a credentialed one,
      // because requiring an API key to read a public board is friction aimed at
      // exactly the automation audience it exists to reach. The credential is
      // still sent, and simply ignored.
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { resource: ['bounty'] } },
        options: [
          {
            name: 'Get Many',
            value: 'getMany',
            action: 'List open arena bounties',
            routing: { request: { method: 'GET', url: '/api/arena/contests' } },
          },
        ],
        default: 'getMany',
      },
      {
        displayName: 'Limit',
        name: 'bountyLimit',
        type: 'number',
        typeOptions: { minValue: 1, maxValue: 50 },
        default: 25,
        description: 'Max number of open contests to return',
        displayOptions: { show: { resource: ['bounty'], operation: ['getMany'] } },
        routing: { send: { type: 'query', property: 'limit' } },
      },
    ],
  }
}
