# Rocket Pool GMC Round 43 — grant application

**Applicant:** LuxeDigitalNest / LDN rETH Mint Access
**Category:** Proposed future-work microgrant, not retrospective.
**Requested amount:** **US $500** for a one-time, approximately 20-hour, three-week extension, payable in Rocket Pool GMC-supported assets.
**Recipient on Ethereum mainnet:** `0xadfc0cb6819bc49939b021e45b0d43306575e5d3` (existing LuxeDigitalNest EVM wallet; no invoice).
**Application window:** November 7–December 7, 2026 (23:59 UTC).

## Name of Grant

**rETH Mint Access: accessible, multilingual, independently verifiable pre-mint checks (public-service pilot)**

### What work is proposed?

Fund a **focused 3-week extension** to an **already existing** open-source, read-only rETH mint-readiness prototype, with the goal of making the actual Rocket Pool protocol conditions understandable and verifiable for newcomers, including keyboard and screen-reader users and Spanish-language readers.

Our functioning unfunded pilot is live at https://luxedigitalnest.github.io/ldn-rocketpool-reth-access/ and public at https://github.com/luxedigitalnest/ldn-rocketpool-reth-access. It dynamically resolves current Rocket Pool deposit-pool, settings and rETH contracts through the official RocketStorage address; gets Ethereum mainnet read-only `eth_call` readings pinned to one block; and displays deposit enabled/disabled, minimum amount, a reported contract maximum and protocol rETH/ETH rate with conservative warnings. It **never** connects a wallet or sends a transaction. GitHub Actions verifies **15 passing tests, 0 failures**: https://github.com/luxedigitalnest/ldn-rocketpool-reth-access/actions/runs/44905877008.

This proposal funds **new incremental work only**, not the completed public pilot:
1. English/Spanish end-to-end plain-language accessible UI, beginner mode, additional risk and minting-vs-secondary-market explanation, reviewed against official Rocket Pool docs.
2. Two-provider block-hash **agreement** checks, stale-data and RPC discrepancy warnings, and a protocol-upgrade fallback when RocketStorage points to a new implementation; no false "mintable" status on uncertainty.
3. Automated accessibility testing (axe-core/Playwright), keyboard and screen-reader smoke-test report, unit/integration negative cases, documented release, community feedback process and 14-day correction window.

The product is explicitly **not** a replacement for Rocket Pool's staking UI, will never custody ETH, and will never include a mint/sign/approve button or guarantee availability.

### Related work

Credit and link the official Rocket Pool staking site, `rocketpool.app`, and independent dashboard/Voltfin trackers. Our distinct focus is **low-friction accessible preflight with independent block-anchored source provenance and fault states**, rather than a yield dashboard, exchange, staking router or another analytics catalog. We use official immutable RocketStorage, which resolves the *current* deposit contract rather than hardcoding an old one (observed 21 November 2026: `0xCE15294273CFb9D9b628F4D61636623decDF4fdC`; historical block 26,463,602). Full references: README.

### Will results be entirely open source?

**Yes**, Apache-2.0 for code, original documentation and tests. The public Pages site runs with static, free hosting, no backend, login, tracking, token or paid API.

## Benefit

| Group | Benefits |
|---|---|
| Potential rETH holders | A plain-language, accessible explanation of the actual current on-chain deposit switch, minimum and exchange rate **before** deciding to visit the official mint page. The status deliberately does not equate a public read with a guaranteed successful transaction. |
| rETH holders | Better understanding of protocol vs. market exchange rate, source provenance and the practical limitations of deposit and redemption capacity; no suggested sale or swap. |
| Potential node operators | Indirect benefit: straightforward explanation of the relationship between rETH minting and ETH being available to the protocol; not a node-setup toolkit. |
| Current node operators | N/A: no additional node-control capabilities or promised income changes. |
| Community | A zero-cost accessible educational tool and reusable, reproducible RPC and accessibility test fixtures, with a transparent uncertainty state and references to official contracts. |
| RPL holders | Indirect benefit from lower onboarding confusion, without any promised RPL demand or token price effect. |

### Other beneficiaries

Open-source Ethereum educators, researchers, accessible web app developers and people exploring liquid staking may reuse the public code. No other protocol receives rights, contracts or privileged data.

## Work

### Who is doing the work?

**LuxeDigitalNest**, an independent open-source developer/content production account, is responsible for the deliverables and all source attribution. Project repository history and issue tracker provide public accountability.

### Relevant evidence of feasibility

Direct evidence rather than unverified credentials: the functioning public prototype linked above, 15/15 GitHub Actions tests, verifiable block-by-block read-only Ethereum queries; other separate open-source work by the same GitHub account includes a Compact test harness with 6 passing tests and Reactive Omni Solidity code with 12 passing tests. This demonstrates working developer automation and reproducible CI—not formal Rocket Pool membership or professional audit certification. No unaudited security guarantees are offered.

### Milestones, acceptance and schedule (relative to grant approval)

| Timing | Work | Acceptance evidence | Requested payment |
|---|---|---|---|
| Week 1–2 | Complete English/Spanish plain-language views; proper focus, labels, status announcements and responsive beginner mode. Implement two-RPC same-block hash comparison and stale-data fail-closed behavior. | Public versioned GitHub commit and live Pages URL; supported screenshots; unit test and failure fixtures; reviewer can select Spanish and force a disagreement case. | $250 after demonstrated completion and GMC review |
| Week 3 | Add reproducible Playwright/axe-core accessibility checks, documented keyboard tests and honest known limitations. Add protocol-upgrade and RPC timeout negative tests, ship versioned release, FAQ and source docs. | Public release tag, all CI green, concise audit/QA report, independent reproducibility steps and demo video under 3 minutes. | $250 after final review |
| Delivery +14 days | Fix factual or accessibility bugs reported through GitHub Issues; publish corrections with changelog. | Public issue and patch history. | Included, $0 additional |

No production security audit, protocol endorsement, custody of user funds or token transaction is proposed. A second provider check guards *data integrity*, not the whole staking system.

### How is testing handled?

The current 15 tests already run on every relevant push. Proposed extra tests include: different RPC block hash at matching height, RPC 429/timeouts and stale blocks, invalid/zero registry addresses, disabled deposits, under-minimum amounts, presentational accessibility, screen-reader status changes, smaller screens and no-wallet/no-transaction code checks. Source and CI logs will remain public.

### Maintenance

No paid recurring service or subscription. Static Pages hosting is free; a 14-day post-delivery correction window is included. After that, the repository remains public and can accept community issues/PRs, but maintenance is not funded or guaranteed.

## Costs

### Acceptance criteria

The exact completed improvements listed under Week 1–3, reproducible tests, Apache-2.0 license, publicly viewable site and final QA report. No acceptance criterion depends on rETH price, grants won, protocol throughput or the user buying tokens.

### Payment schedule and amount

**US $500 fixed total**, proposed as two $250 milestone payments after delivery checks. Budget basis **20 person-hours × $25/hour = $500**; free GitHub Pages/Actions/RPC hosting $0, no third-party paid services, no request for past work reimbursement. We accept GMC-approved token and conversion arrangements subject to committee rules; no invoice is required.

### Direct recipient

Ethereum EVM address: **`0xadfc0cb6819bc49939b021e45b0d43306575e5d3`**. Please confirm supported network/token before disbursement; the applicant must verify receipt. The public address is supplied only for required GMC payment.

### Verification cadence

The public GitHub repo, tagged release, CI run URLs, live Pages status, and final QA video are authoritative evidence. Every milestone will be posted in the current application or linked issue, not merely asserted.

### Alternatives and cost-saving options

Use free GitHub Pages, native BigInt and public RPCs; no servers, analytics, wallet integrations, paid language model APIs, price feeds or purchased crypto. A grant-free fallback is to keep the already published English-only read-only version unchanged.

### Prior Rocket Pool protocol compensation

**None claimed or documented by the applicant for this project.** The current MVP was completed independently and is **excluded** from the requested future-work budget.

## Conflict of interest

### Conflicts with GMC

The applicant is not presenting themselves as a GMC representative, auditor, financial adviser or official Rocket Pool partner. No committee affiliation or financial relationship is disclosed. If a previously unknown committee relationship is identified, it will be promptly disclosed.

### Other financial benefits

LuxeDigitalNest directly benefits financially from the **requested grant payments if awarded**, and may benefit reputationally from an open-source portfolio. No equity or token-trading revenue, partner commissions, affiliate links, promised RPL purchases or additional protocol payout is part of this proposal.

---

**Primary links**
- Prototype: https://luxedigitalnest.github.io/ldn-rocketpool-reth-access/
- Source: https://github.com/luxedigitalnest/ldn-rocketpool-reth-access
- Tests: https://github.com/luxedigitalnest/ldn-rocketpool-reth-access/actions/runs/44905877008
- Official GMC Round 43: https://dao.rocketpool.net/t/round-43-gmc-call-for-grant-applications-deadline-is-december-7/4154

No grant award, acceptance, reviewer commitment or sponsorship is claimed.
