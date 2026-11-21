# LDN rETH Mint Access — accessible, read-only Rocket Pool readiness explorer

**Live prototype:** https://luxedigitalnest.github.io/ldn-rocketpool-reth-access/

An original, zero-cost browser-based accessibility pilot by LuxeDigitalNest. It helps a prospective Rocket Pool liquid staker understand publicly verifiable **protocol conditions** *before* deciding whether to open the official rETH minting interface. It makes **no trade, token transfer, mint, purchase, recommendation, or wallet request**.

**Status: real deployed public web prototype with 15/15 automated tests passing, tested against Ethereum mainnet block 26,463,602 on November 21, 2026. This is not endorsed by Rocket Pool or the GMC, and it is not an approved grant.**

## Why this is different from other trackers

The goal is not another rETH price dashboard or a node statistics catalog. It is a **minimal-friction accessibility-first preflight** for newcomers: large labels, keyboard-first focus, assistive status announcements, a clearly explained mint minimum and enabled switch, conservative eligibility messaging, an extremely transparent provenance panel and a direct exit to the official staking page. Users do not connect a wallet or risk an accidental on-chain action.

Existing reference products include the official Rocket Pool web app, independent Rocket Pool dashboard and Voltfin rETH tracker. Their work should not be replicated without acknowledgment. We focus on **understandable, independent pre-mint verification**, not monitoring yield or making trade recommendations.

## Verified data path

1. Browser uses public read-only Ethereum mainnet JSON-RPC; validates chain ID 1, block hash and contract bytecode.
2. Uses official immutable RocketStorage `0x1d8f8f00cfa6758d7be78336684788fb0ee0fa46`, plus dynamic `getAddress(keccak256("contract.address" + name))` lookups for **rocketDepositPool, rocketTokenRETH, rocketDAOProtocolSettingsDeposit**. This avoids frozen obsolete contract addresses.
3. Anchors every contract call to the **same Ethereum block number**, then reads `getDepositEnabled()`, `getMinimumDeposit()`, `getMaximumDepositAmount()`, `getBalance()`, and `getExchangeRate()`.
4. Uses BigInt for wei parsing and math and rounds conservatively. The exchange-rate estimate is **illustrative and excludes fees and gas**. If live RPC data fails, the dashboard shows unknown rather than mintable.
5. Tries a public RPC fallback if the primary fails. It does **not** independently verify two endpoints against one another yet; that is a future enhancement.

### Live test evidence

On Ethereum mainnet block **26,463,602** the public site reported:
- Deposit setting: **enabled**.
- Minimum: **0.01 ETH**.
- ETH backing one rETH: approximately **1.176152 ETH**.
- Registry dynamically returned rETH contract `0xae78736Cd615f374D3085123A210448E74Fc6393`, deposit pool `0xCE15294273CFb9D9b628F4D61636623decDF4fdC`.

These are historical readings, **not live claims now**. The site refreshes its own data per visit. The deposit pool's maximum reported amount is not necessarily practically mintable capacity. Do not treat it as a guarantee.

## Verification, tests and safety

- [GitHub Actions: 15 Node tests passed, 0 failed](https://github.com/luxedigitalnest/ldn-rocketpool-reth-access/actions/runs/44905877008).
- Tests cover exact ABI registry address decoding, malformed inputs, wei conversion, fee-free illustrative calculations, disabled/unknown/below-minimum/above-maximum classification, and absence of wallet-access or transaction code.
- Manual Opera browser smoke tests: public Pages reachable, live RPC response valid, 0.001 ETH classified below minimum, 0.1 ETH classified as read-only conditions met **without claiming mint success**.
- No cookies, wallets, analytics, secrets, database, paid RPC, or transaction broadcasts.

To reproduce: install Node 20+ and run `npm test`; see `.github/workflows/check.yml`.

## Risks and explicit limits

This is not Rocket Pool's official staking interface, not a quote and not financial advice. A green read-only check does not imply that a subsequent mint will succeed; a real transaction can fail for gas, protocol changes, conditions, contract reverts or liquidity constraints. The site does not validate withdrawal liquidity, exchange execution routes, slippage, oracle freshness, staking risk, MEV, or real account balances. Never transfer ETH to a contract based only on this page. Confirm details on `https://rocketpool.net/` and `https://stake.rocketpool.net/`.

Open source under Apache License 2.0.

## Planned grant-funded extension (not yet delivered)

- Complete English and Spanish accessible explanations, with a simpler step-by-step mode and localized terminology reviewed against official documentation.
- Cross-check live data from two independent RPC endpoints at the same block, including discrepancy handling and stale-data warnings, and validate contract upgrade transitions.
- Introduce automated browser accessibility tests with axe-core/Playwright plus documented keyboard/screen-reader acceptance checks.
- Publish a reproducible QA report, a no-secrets deployment manual, maintainer handoff and 14-day corrections window.

**No grant is awarded or implied.** Funding application, if posted, must state these items as future milestones and must not request retrospective compensation for this self-funded prototype.

## Primary sources

- [Rocket Pool contracts, deployments and RocketStorage](https://docs.rocketpool.net/en/protocol/contracts-integrations.html)
- [Rocket Pool liquid staking overview](https://docs.rocketpool.net/liquid-staking/overview.html)
- [Rocket Pool protocol smart-contract usage](https://docs.rocketpool.net/protocol/contracts-usage/)
- [Rocket Pool GMC Round 43](https://dao.rocketpool.net/t/round-43-gmc-call-for-grant-applications-deadline-is-december-7/4154)

Maintainer: LuxeDigitalNest. Feedback and corrections through GitHub Issues.
