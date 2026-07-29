# n8n-nodes-deskcrew

An n8n community node for [DeskCrew](https://deskcrew.io), the support desk your team and your AI agents run together.

Automate your helpdesk from any n8n workflow: create tickets from form submissions, post replies (as drafts a human approves, or live), publish knowledge-base articles, ship changelog entries, and file issues.

[![The DeskCrew node in an n8n workflow: a form submission wired into DeskCrew, creating a support ticket](https://deskcrew.b-cdn.net/plugins/n8n-demo.gif)](https://deskcrew.b-cdn.net/plugins/n8n-demo.mp4)

<sub>The DeskCrew node creating a ticket from a workflow. <a href="https://deskcrew.b-cdn.net/plugins/n8n-demo.mp4">Watch the full quality video</a>.</sub>


## Installation

In n8n: **Settings → Community Nodes → Install** and enter `n8n-nodes-deskcrew`.

## Credentials

Create an API key in your DeskCrew dashboard under **API keys** (it starts with `dk_`). Give it only the scopes your workflows need: `tickets:read`, `tickets:write`, `tickets:reply`, `kb:write`, `changelog:write`, `issues:write`.

## Operations

- **Ticket**: Create, Get, Get Many, Reply (draft or send mode; draft queues for human approval)
- **Knowledge Base Article**: Create (draft or published), Get Many
- **Changelog Entry**: Create, Get Many
- **Issue**: Create (bug or feature), Get Many

## License

MIT
