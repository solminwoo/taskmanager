# taskmanager engineering guidance

<!-- ecc-engineering-defaults:start -->
## Engineering defaults
For coding work, read [.engineering/defaults.md](.engineering/defaults.md).
These are shared fallback conventions; the existing project owner, nested instructions,
skills, model choices, domain contracts and stronger verification/release gates remain authoritative.
No hooks, permissions, MCP services or background automation are installed by this guidance.

### Project adaptation
React client in `client/`, Express routes and Mongo models at the root. Candidate checks: `npm --prefix client test -- --watchAll=false` and `npm run build`; the root test script is a failing placeholder. Use an isolated test database for CRUD, dates, and ownership.
<!-- ecc-engineering-defaults:end -->
