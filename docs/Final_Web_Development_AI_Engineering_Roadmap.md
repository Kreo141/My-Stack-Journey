# Stack Planning

TypeScript - Gemini, Claude, ChatGPT

- tRPC - Claude
- Vite - Claude

Frontend:

React - Gemini, Claude, ChatGPT

Next.js - Gemini, Claude, ChatGPT

Tailwind - Claude, ChatGPT

Backend:

Python - Gemini

- FastAPI -  Gemini
- Django - Gemini

Node.js

Database:

PostgreSQL - Gemini, Claude, ChatGPT

- ORM - Gemini, ChatGPT

Infrastructure:

Docker - Gemini, Claude

Linux (Ubuntu, Kali) - Gemini, ChatGPT

GitHub or GitLab - Gemini, Claude, ChatGPT

OAuth - ChatGPT

Session - ChatGPT

Authorization and Secure Cookies - ChatGPT

### **Claude Advice**

- **Now to mid-2027:** go deep on TypeScript, React, Next.js, Postgres and deployment. Build two or three real projects, such as a full-stack app with auth, a database and a payment or AI feature.
- **Mid-2027 to 2028:** add depth in one direction (AI features, security, or performance), contribute to open source, and build a polished portfolio with live demos.
- **Stay flexible.** Revisit the stack every six months. If TanStack Start or something else overtakes Next.js, your React and TypeScript skills transfer directly.
1. **Using AI well.** 51% of professional developers now use AI tools daily. Learn to build features with LLM APIs (chat, search, RAG), not just to use Copilot-style tools. TypeScript helps here, because types give AI tools something to work with, so there are fewer fixes after generation. [humanx](https://builder-proxy.humanx.co/blog/react-ai-stack-2026)[builder](https://site.builder.io/blog/react-ai-stack-2026)
2. **Security basics.** Expect more incidents like the December 2025 React2Shell vulnerability, which was actively exploited and needed patches across React and Next.js. npm supply-chain attacks are also reportedly rising. Learn auth, input validation and dependency hygiene, which fits well with your CTF interests. [strapi](https://strapi.io/blog/state-of-javascript-2025-key-takeaways)[agilitycms](https://agilitycms.com/blog/top-10-web-development-trends-technologies-for-2026)
3. **Fundamentals.** HTML, CSS, JavaScript, HTTP, REST, SQL and browser behavior never expire. Frameworks change, but these carry over.

# Developing With AI Agents - Advices

## Gemini

The leap from using an AI "copilot" (where you ask for a snippet of code and it spits it out) to an AI "agent" (where you give it a goal, and it plans, uses tools, edits files, and runs tests) is massive. It completely changes your role from *executor* to *supervisor*.

To get the most out of agentic development without ending up with a tangled, un-deployable mess, you need a solid strategy. Here is how to properly wrangle AI agents for development.

### 1. Plan Out Loud Before Generating Code

Never just throw a vague instruction like "build a login system" at an agent. They will make assumptions, and usually, those assumptions are wrong.Before the agent writes a single line of code, use it as a sounding board.

- **What to do:** Tell the agent to create a `plan.md` file first. Have it outline the architecture, list the specific files it intends to create or modify, and note any dependencies it needs. You review and approve the plan, *then* authorize it to start coding.

### 2. Context is Everything (Pack the Prompt)

Agents hallucinate when they are flying blind. If you want it to use a specific library, API, or architectural pattern (like your Jetpack Compose state hoisting), you have to hand it the playbook.

- **What to do:** Feed the agent the relevant official documentation, your database schemas, or code snippets showing the style you want it to mimic. The more context you provide, the less the AI has to guess, resulting in code that actually fits your project.

### 3. Keep the Leash Short (Iterative Development)

Do not ask an agent to build an entire app in one go. It will get confused, overwrite its own logic, and break things.

- **What to do:** Break the project down into bite-sized, testable milestones. Have the agent build the database schema first. Test it. Then have it build the API endpoints for one table. Test them. By validating each small component in isolation, you catch bad AI logic early before it infects the whole codebase.

### 4. Sandbox and Restrict Permissions

Agents can now run terminal commands and modify files. If an agent misinterprets a command, it could accidentally nuke your directory or expose a sensitive API key.

- **What to do:** Only give the agent the permissions it strictly needs for the current task. Use a controlled environment (like a Docker container or a dedicated WSL instance) so that if the agent goes rogue, the blast radius is contained.

### 5. Review the Diff, Not the Summary

When an agent finishes a task, it will usually give you a nice, cheerful summary of what it did. Do not trust it.

- **What to do:** Treat the agent like a junior developer submitting a pull request. Read the actual code diff. Look out for edge cases it might have missed, error handling it skipped, or unrelated files it accidentally tweaked while trying to solve a problem.

Essentially, you are moving to a workflow where you define the architecture and the constraints, the agent does the heavy lifting of typing out the boilerplate and logic, and you step back in to strictly review, test, and refine.

## Claude

The core principle is that AI writes code, but you own it. If you can't explain what the code does, you shouldn't ship it. Here's how I'd approach it.

## Mindset

- **Treat the agent like a fast junior developer.** It's quick and knowledgeable, but it can be confidently wrong, miss context, and take shortcuts. You're the reviewer and architect.
- **Don't let it replace learning.** Employers will expect you to debug, design and explain. If the agent writes everything and you can't read it, you'll be stuck the first time it fails. A good rule is to understand every line before you commit it.
- **Learn the fundamentals first.** Without HTTP, SQL, async behavior and browser basics, you can't tell good output from bad.

## A workflow that works

1. **Plan before coding.** Describe the feature, constraints and stack, and ask for a plan first. Review the plan, fix it, then let the agent implement it.
2. **Work in small steps.** One feature or bug per task. Large "build my whole app" prompts produce messy, hard-to-review code.
3. **Give good context.** Specify your stack and versions, the conventions to follow, and what not to touch. Most agent tools support a project instructions file (such as `CLAUDE.md` or similar) where you can record architecture decisions, commands and style rules once.
4. **Use Git heavily.** Commit before each agent task, work on a branch, and review the diff afterward. If the agent goes off the rails, you can revert cleanly.
5. **Ask for tests, and run them.** Have the agent write tests, but read them too, because agents sometimes write tests that pass without proving anything. Linting and type checking (TypeScript helps here) are a cheap safety net.
6. **Review every diff.** Check for unrequested changes, deleted code, hardcoded values, and "fixes" that just silence an error.

## Prompting tips

- Be specific about the outcome, constraints, and what "done" looks like.
- Give examples of existing code in your project to match.
- When something breaks, give the agent the full error message and what you expected, not just "it doesn't work."
- If the agent loops or keeps failing, stop and start a fresh session with a clearer description rather than piling on corrections.
- Ask it to explain its code and trade-offs. This is a great way to learn.

## Security and safety

Since you're interested in security, this part matters most:

- **Never paste secrets** (API keys, `.env` files, credentials) into prompts, and keep them out of commits.
- **Be careful with agent permissions.** Don't let an agent run destructive commands (deleting files, force-pushing, dropping databases) without your approval. Use a sandbox or a throwaway environment when experimenting.
- **Verify dependencies.** Agents sometimes suggest packages that don't exist or are outdated, and fake package names can be a supply-chain attack vector. Check that a package is real, maintained and popular before installing.
- **Review auth, input validation and database queries yourself.** Agent-written code often skips input sanitization or authorization checks, so these are common sources of vulnerabilities.
- **Treat outside content as untrusted.** Web pages, files and issues the agent reads can contain hidden instructions (prompt injection).

## Common mistakes

- Accepting code you don't understand because it "works."
- Letting one giant session accumulate until the agent's context gets confused.
- Skipping version control.
- Over-engineering. Agents love adding abstractions you don't need, so ask for the simplest solution.
- Trusting outdated answers. Frameworks change quickly, so check the official docs for the version you're using.

## For you as a student

Use agents to go faster at what you already understand, and to explain things you don't. A good habit is to try solving a problem yourself first, then use the agent to compare approaches or review your solution. Build at least a couple of projects where you write the core logic yourself, so you have proof of real skill.

If you want, I can help you set up a concrete workflow for a project you're working on, including a starter instructions file for your stack.

## ChatGPT

Siege, my biggest advice is this: learn to be the engineer who directs, verifies, and improves AI-generated code—not the person who merely asks AI to build an application.

By the time you graduate in 2028–2029, AI coding agents will likely be even more capable than they are today. You don't need to compete with AI at typing code. You need to become good at deciding what should be built, how it should work, whether the implementation is correct, and how to maintain it.

Since you're learning programming and aiming to build real projects, I'd develop two skills in parallel:

- Software engineering: understanding code, architecture, debugging, testing, security, and databases.
- AI-assisted engineering: breaking down tasks, providing context, delegating work, reviewing diffs, and verifying results.

The first skill makes the second one effective. Without it, an AI agent can produce a convincing application that you don't know how to fix when something breaks.

## 1. The correct AI-assisted development workflow

### 1

### Define

Specify the problem and acceptance criteria.

### 2

### Plan

Ask AI for an approach and review its trade-offs.

### 3

### Implement

Delegate one bounded task at a time.

### 4

### Verify

Run tests, inspect changes and challenge assumptions.

### 5

### Understand

Explain the solution and record important decisions.

### 6

### Ship

Commit, deploy and monitor the result.

The critical difference between this and "vibe coding" is that AI proposes and implements; you remain responsible for correctness.

You don't need to write every line yourself. You do need to know what the code is supposed to do, how to check it, and where to look when it fails.

## 2. Learn to prompt agents like an engineer

The biggest mistake is giving an agent a broad request with no boundaries.

Compare these two prompts.

Weak prompt

Build me a complete student management system using Next.js.

Strong prompt

Build the student listing and search feature in the existing Next.js project.

- First inspect the project structure and existing conventions.
- Use the current database schema and installed dependencies; don't replace them without asking.
- Support searching by student name and student number.
- Validate input on the server and handle database errors.
- Add tests for normal results, empty results, invalid input, and database failures.
- Keep the change limited to this feature.
- Run the relevant tests and type checks.
- Report which files changed, what you verified, and anything still incomplete.
- Do not implement unrelated features or claim a test passed unless you actually ran it.

Why does the second work better? It supplies context, constraints, expected behavior, and a definition of done. These practices align with Microsoft's current guidance for agent-assisted development.

[](https://www.google.com/s2/favicons?domain=https://code.visualstudio.com&sz=32)

Visual Studio Code+1

### A reusable prompt template

Use this for most tasks in your future projects.

# Task

[Describe one specific feature, bug, or improvement.]

# Context

- Project: [What the application does]
- Stack: [Languages, frameworks, database]
- Relevant files: [Known files, or ask the agent to find them]
- Current behavior: [What happens now]

# Expected behavior

- [Acceptance criterion 1]
- [Acceptance criterion 2]
- [Expected error handling and edge cases]

# Constraints

- Follow the existing architecture and conventions.
- Avoid unnecessary dependencies and unrelated changes.
- Preserve existing behavior unless explicitly instructed otherwise.
- Do not expose secrets or weaken security controls.

# Workflow

1. Inspect the relevant code before editing.
2. Identify assumptions and propose a plan if the change is nontrivial.
3. Implement the smallest complete solution.
4. Add or update appropriate tests.
5. Run relevant tests, linting, and type checks.
6. Review the diff for regressions, security problems, and unnecessary complexity.

# Completion report

Summarize the changes, files affected, checks actually run and their results, remaining risks, and any manual verification still needed. Do not claim success without evidence.

You don't need to paste this entire template every time. For a simple bug fix, a few precise sentences may be enough. Use the full version for substantial features.

## 3. Understand the different levels of AI assistance

Not every task needs an autonomous agent. Choose the least complicated approach that works.

Level 1 — Ask and learn

Use chat to explain unfamiliar code, compare approaches, understand errors, or learn a concept.

Example: "Explain why this React component rerenders when this state changes. Don't rewrite it yet."

Level 2 — Assisted implementation

Ask AI to draft a function, component, test, or refactor. Review and integrate the change yourself.

Example: "Implement this validation function and explain its edge cases."

Level 3 — Agentic development

Give a coding agent access to your project so it can inspect files, edit code, run tests, and iterate on results.

Example: "Implement this feature, verify it with the existing test suite, inspect your diff, and report unresolved issues."

My recommendation is to use all three. Chat is excellent for learning; direct edits work well for bounded tasks; agents shine when a task involves multiple steps and has clear ways to verify the result.

## 4. Give the agent a project handbook

One of the best habits you can develop is maintaining a small instruction file in your repository. This prevents you from repeatedly explaining your architecture, conventions, and commands.

Depending on the coding tool, the file might be `AGENTS.md`, `CLAUDE.md`, or a tool-specific instructions file. Keep the format appropriate to the agent you use.

For example, an `AGENTS.md` in a TypeScript web project could look like this:

```

# Project Guide

## Stack
- TypeScript
- Next.js
- PostgreSQL
- Tailwind CSS

## Rules
- Follow the existing project structure.
- Use strict TypeScript; avoid `any` unless justified.
- Validate untrusted input at the server boundary.
- Keep database access out of presentation components.
- Never commit secrets or real user data.
- Avoid adding dependencies without a clear reason.

## Before Finishing
- Run the relevant tests.
- Run linting and type checking.
- Review the complete diff.
- Update documentation when behavior or setup changes.
- Report checks that failed or could not be run.

## Working Style
- Inspect before editing.
- Plan substantial changes before implementation.
- Prefer small, reviewable changes.
- Ask before destructive actions or major architectural changes.
```

Customize the guide as the project grows. Don't fill it with generic rules that the agent can infer or with commands that no longer work.

Microsoft's guidance similarly recommends concise, project-specific instructions covering architecture, conventions, verification commands, and the definition of done.

[](https://www.google.com/s2/favicons?domain=https://code.visualstudio.com&sz=32)

Visual Studio Code+1

## 5. Never let the agent skip verification

This is probably the single most important technical habit to develop.

AI can generate code that compiles but is logically wrong. It can also write tests that pass while failing to test the actual requirements.

For every meaningful change, use a verification loop:

### Implement

Make a small, reviewable change.

### Run checks

Tests, type checks, linting and browser testing.

### Inspect the evidence

Read failures, examine the diff and try edge cases.

### Fix and repeat

Continue until acceptance criteria are met.

If a check fails, investigate rather than hiding or weakening it.

Anthropic's coding-agent guidance and Microsoft's agent documentation both emphasize closing this feedback loop through tests, build checks, and direct inspection.

[](https://www.google.com/s2/favicons?domain=https://support.claude.com&sz=32)

Claude Help Center+1

For your TypeScript stack, become comfortable running commands like these:

```
npm run lint
npx tsc --noEmit
npm test
npm run build
```

These are examples; use the scripts your actual project provides. Also test the running application in a browser. A successful build doesn't prove that a login flow works or that a page looks right on mobile.

## 6. Protect your project when agents have access to your computer

An agent with terminal access is more powerful than a chatbot. It can potentially delete files, modify configuration, install packages, run scripts, or interact with external services.

Use these safeguards:

- Git checkpoints: commit working states before substantial changes. Use feature branches when appropriate.
- Review destructive commands: don't blindly approve recursive deletions, database resets, or unfamiliar shell commands.
- Protect credentials: never expose API keys, passwords, private keys, production database credentials, or sensitive customer data.
- Use isolated environments: develop against a local or disposable database, not production.
- Limit permissions: grant access to the files and tools needed for the task, not everything by default.
- Review dependencies: inspect unfamiliar packages and their purpose before adding them.

Remember that Git can restore tracked file changes, but it cannot automatically undo every external action, such as a deleted remote database or an email sent by an agent.

## 7. Learn to delegate work to multiple agents

Once you're comfortable with a single agent, you can experiment with parallel work.

Imagine you're building a student management system. You could divide work like this:

You — Tech lead

Define requirements, approve architecture and integrate changes.

Agent A

Build the student listing UI using an agreed interface.

Agent B

Review database queries and propose test cases.

Agent C

Audit authorization and input validation.

Agent D

Review test coverage and identify edge cases.

The trick is to give agents independent, well-defined tasks and shared interface contracts. Two agents editing the same files can conflict or overwrite each other's work. Separate Git worktrees or branches can help isolate changes.

Don't start with four agents, though. One agent that reliably completes and verifies a feature is more valuable than four agents producing code you cannot integrate. Parallelism is an optimization, not a requirement.

[](https://www.google.com/s2/favicons?domain=https://code.visualstudio.com&sz=32)

Visual Studio Code+1

## 8. Use AI in a way that makes you a better programmer

Because you're still learning, I would avoid letting AI handle every unfamiliar problem without explanation.

Try this learning cycle:

First: predict

Before asking AI to fix something, write down what you think is wrong and what you expect the solution to do.

Second: understand

Ask the agent to explain the relevant code, alternatives, and trade-offs. Don't settle for a line-by-line explanation if you don't understand the overall design.

Third: modify

Make a small change yourself, or ask the agent to implement one. Predict how it should behave before running it.

Fourth: reproduce

Close the chat and explain the solution from memory. Then try implementing a similar feature without copying the original answer.

A useful rule: if the agent writes a function you cannot explain, treat that as an unfinished learning task—even if the tests pass.

You don't have to memorize every API or syntax detail. You do need to understand the concepts well enough to recognize incorrect logic, bad architecture, and security problems.

## 9. A practical daily workflow

Here's a routine you can use for a personal project or school project.

| Stage | What you do |
| --- | --- |
| 10 minutes | Define today's goal and inspect the current project state. |
| 10–15 minutes | Ask AI to investigate and plan if the task is complex. |
| 30–60 minutes | Implement a small feature with AI assistance. |
| 15–20 minutes | Run checks, review the diff and test manually. |
| 5–10 minutes | Record what you learned, remaining issues and the next task. |

Adjust the times based on your workload. The important thing is to reserve time for verification and understanding, rather than spending your entire session generating code.

## 10. Your AI development checklist

Use this checklist whenever you finish a meaningful feature.

## Definition of done

0 of 7

- [ ]  
    
    Requirements
    The feature meets the acceptance criteria.
    
- [ ]  
    
    Code review
    I inspected the changes and understand the important logic.
    
- [ ]  
    
    Tests
    Relevant automated tests ran, and failures were investigated.
    
- [ ]  
    
    Security
    I considered input validation, authorization, and secret handling.
    
- [ ]  
    
    Integration
    The application builds and the feature works in its real context.
    
- [ ]  
    
    Git
    The changes are scoped, reviewed, and committed when ready.
    
- [ ]  
    
    Learning
    I can explain the solution and debug it if it breaks.
    

ResetCopy checklist

## What I'd do in your position

For the next two years, I'd use AI agents from the beginning of your web development journey, but increase their autonomy as your skills grow:

- First few months: use AI as a tutor and coding assistant. Learn HTML, CSS, JavaScript, TypeScript, and Git.
- After the fundamentals: use an agent to build React components, write tests, and fix bounded bugs.
- Once you can build a full-stack application: let agents implement larger features from reviewed plans, while you own architecture, integration, security, and quality.
- Before graduation: practice working from issues, reviewing pull requests, maintaining existing code, deploying applications, and debugging problems you didn't create.

Your goal isn't to prove that you can code without AI. It's to demonstrate that you can use AI to deliver software that is correct, secure, maintainable, and useful.

One final principle: never confuse the amount of code an agent generates with the amount of engineering work you've completed. The real work is delivering a system you can trust.