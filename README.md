# aicd demo

A tiny shop whose pipelines **fail on purpose**, to show [aicd](https://github.com/cayrol-hub/aicd) at work:
an AI layer for CI/CD where agents propose, deterministic policies decide and humans approve.

`main` is green. Each `demo/*` branch breaks something in a different way; its pull request shows what aicd says
and does. Open the pull requests of this repository to see the comments, labels and statuses.

## Scenarios

| Branch | What breaks | What aicd does |
| --- | --- | --- |
| `demo/regression` | The 50 % discount cap is removed | **Triage**: probable regression, quoting the failing assertion. **Intent check**: compares the change with issue #1 and flags the criterion it breaks (with an LLM). **Risk**: low |
| `demo/flaky` | A test that fails one run out of two | **Triage** then **flaky tests**: re-run the failed jobs; once the test has passed and failed on the same commit, it is quarantined (comment + issue) |
| `demo/broken-dependency` | A dependency pinned to a version that does not exist | **Triage**: dependency problem, quoting the npm error. No LLM needed |
| `demo/missing-env` | A required environment variable is not defined in CI | **Triage**: configuration problem |
| `demo/network` | The tests reach a host that does not resolve | **Triage**: infrastructure problem; a retry is suggested |
| `demo/security` | User input reaches `eval` and a shell command | **Security triage**: new Semgrep alerts only (not the existing ones), verdict per alert, `aicd/security` status |
| `demo/risky-migration` | A migration drops a table | **Risk score**: high (destructive SQL in a migration), `risk:high` label, failing `aicd/risk` status |

Without an LLM key, every diagnosis comes from rules and history: that is what this repository shows by default.
With the `ANTHROPIC_API_KEY` secret, failures no rule explains get an LLM diagnosis — kept only if it quotes the log
or the diff verbatim — and the intent check compares the diff with the issue's acceptance criteria.

## How it is wired

- [`.github/workflows/ci.yml`](.github/workflows/ci.yml): `review` (pull requests, early), `test` and `security`
  (Semgrep, SARIF), then `aicd analyze` at the end of every run, green or red.
- [`.aicd.yaml`](.aicd.yaml): one autonomy per agent. Triage only advises; the flaky test agent, security triage and
  risk score may act (quarantine, statuses, labels). Nothing can merge or push.

## Run it yourself

1. Fork this repository (keep the branches), enable Actions, and optionally add the `ANTHROPIC_API_KEY` secret.
2. Create the issue in [`docs/issue-1.md`](docs/issue-1.md) so that it gets number 1.
3. Open one pull request per `demo/*` branch against `main` (for `demo/regression`, write `Closes #1` in its
   description).
4. For `demo/flaky`, use **Re-run failed jobs** until the test has both passed and failed.

Locally: `npm test` (Node 24, no dependency), then
`npx @aicd-ci/cli analyze --ci local --junit "reports/**/*.xml" --set llm.provider=none`.
