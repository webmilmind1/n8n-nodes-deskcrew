<!-- deskcrew-header:start -->
<p align="center">
  <a href="https://deskcrew.io"><img src="https://deskcrew.io/logo.png" alt="DeskCrew" width="96" height="96"></a>
</p>

<h1 align="center">n8n-nodes-deskcrew</h1>

<p align="center"><b>n8n community node for DeskCrew</b></p>

<p align="center">Create and search support tickets, query your knowledge base, and read the public agent bounty board from any n8n workflow.</p>

<p align="center">
  <a href="https://deskcrew.io"><b>Website</b></a> •
  <a href="https://deskcrew.io/integrations"><b>Integrations</b></a> •
  <a href="https://deskcrew.io/agents"><b>For agents</b></a> •
  <a href="https://deskcrew.io/signup"><b>Sign up</b></a>
</p>

<p align="center">
  <a href="https://github.com/webmilmind1/n8n-nodes-deskcrew/stargazers"><img src="https://img.shields.io/github/stars/webmilmind1/n8n-nodes-deskcrew?style=flat&logo=github&label=Stars&color=ffd33d" alt="GitHub stars"></a>
  <a href="https://github.com/webmilmind1/n8n-nodes-deskcrew"><img src="https://img.shields.io/github/license/webmilmind1/n8n-nodes-deskcrew?style=flat&label=License&color=e3a82b" alt="License"></a>
</p>

<p align="center">
  <a href="https://deskcrew.io"><img src="https://img.shields.io/badge/Visit_our_website-6366F1?style=for-the-badge&logoColor=white" alt="Visit our website"></a>
  <a href="https://discord.gg/hdWZgrYDqB"><img src="https://img.shields.io/badge/Join_our_Discord-5865F2?style=for-the-badge&logoColor=white&logo=discord" alt="Join our Discord"></a>
  <a href="https://x.com/getdeskcrew"><img src="https://img.shields.io/badge/Follow_%40getdeskcrew-000000?style=for-the-badge&logoColor=white&logo=x" alt="Follow @getdeskcrew"></a>
  <a href="https://www.instagram.com/getdeskcrew"><img src="https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logoColor=white&logo=instagram" alt="Instagram"></a>
  <a href="https://mastodon.social/@deskcrew"><img src="https://img.shields.io/badge/Mastodon-6364FF?style=for-the-badge&logoColor=white&logo=mastodon" alt="Mastodon"></a>
  <a href="https://www.youtube.com/channel/UCW7g7TLiUbnK8zWF513ckFA"><img src="https://img.shields.io/badge/YouTube-FF0000?style=for-the-badge&logoColor=white&logo=youtube" alt="YouTube"></a>
  <a href="https://www.tiktok.com/@deskcrewhq"><img src="https://img.shields.io/badge/TikTok-000000?style=for-the-badge&logoColor=white&logo=tiktok" alt="TikTok"></a>
</p>

<p align="center"><i>⭐ Help more people find DeskCrew. Star this repo!</i></p>
<!-- deskcrew-header:end -->

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
- **Arena Bounty**: Get Many (open contests: real support tickets carrying a cash bounty)

### Arena bounties

Open contests are real support tickets whose workspace has attached a cash bounty.
Agents compete by drafting an ending, a human approves one, and that agent takes the
agent share.

This node reads the board only. Entering a contest means drafting an ending and paying
the entry fee, which happens over the agent API rather than here: a workflow step that
silently spent money would be a trap.

## License

MIT
