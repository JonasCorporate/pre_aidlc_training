# Pre AWS AI DLC Training

Pre-training exercise for AI DLC workshops.

## 0. Introduction and setup

### Sign-Up Purpose

A purpose of this pre AIDLC training is to do a quick run of a full iteration of the AIDLC process prior to the actual workshop. The application under development is a trivial shopping API under Node/Express. This training will also help with setup on a local laptop, even though prerequisites are minimal. This pre-training may be redundant if you already have experience with the AIDLC process or if you are confident your local setup is already in place.

### Companion video guide

Progression of this project together with some additional insights have been recorded in [a companion video guide](https://jonassoftware.sharepoint.com/sites/AIatJonas/AIDLC%20PreTraining%20Material/Forms/AllItems.aspx). Video guides ideally should be followed with hands on execution. It's possible to work without videos with this readme alone, or even without any instructions, just following agents guidance of AWS AI DLC workflow.

Video for this part: `pre_aidlc_v0_setup`

### Prerequisites
- [Node.js](https://nodejs.org/en/download/current) installed on your local machine. This is for sample app, which is a Node/Express API.
- A code editor of your choice (typically [Visual Studio Code](https://code.visualstudio.com/))
- Coding agent. This repo is pre-set for [Claude Code](https://code.claude.com/docs/en/quickstart) and [Copilot CLI](https://github.com/github/copilot-cli?tab=readme-ov-file#installation), though it is possible to use other agents of your choice. This workshop is not token intensive, but would need basic access, paid or trial. 

### References


- [Current repo](https://github.com/JonasCorporate/pre_aidlc_training). Please clone this in a manner of your choice. eg cloning or downloading zip. Once available locally, please open that folder in `VS Code`.  

```bash
git clone https://github.com/JonasCorporate/pre_aidlc_training
```

<img src="guides/pic002-cloning.png" alt="alt text" width="670" />

- [AI DLC Workshop repo](https://github.com/awslabs/aidlc-workflows?tab=readme-ov-file#platform-specific-setup). For the moment you don't have to clone this, but in your future work you will need part of this repo as your setup. The `.aidlc-rule-details` that you see in our project has been copied from this repo. From time to time one can pull fresh version and make sure we are using latest version of the workflow. 
- Various stages of progression will be snapshotted with tags. Present initial stage (which is also `HEAD` of the `main` branch) is for instance tagged as `v0.0-initial`. If at any point you feel your process has diverged, you can always recover either leaning on 
  - Your own version control. Hence frequent commits recommended. or 
  - Using one of our tags. This will put you in the desired state, but obviously lose any customizations peculiar to choices you've made. Reseting to tag can be executed (for instance) by:
  ```powerShell
    git reset --hard v0.0-initial
    ``` 

### Validation gate:

- VS Code running with project open in it. 
- Coding agent launched and on standby. 

Validation and gates is a also a concept extensively used in AI DLC. We'll have validations at various checkpoints, and often they will gate progress. Sometimes this validation will be performed by AI, sometimes by human reviewer. 

## 1. Initiation, Reverse engineering

### 1.1 Video guide (optional)

Video guide: `pre_aidlc_v1_init.mp4`

### 1.2 (Optional): Review AI DLC platform markdowns

It will help to review the markdowns in the `.aidlc-rule-details` folder. For now in [common](./.aidlc-rule-details/common) folder. Most helpful is `process-overview` (with Mermaid diagram). 

### 1.3 Workspace detection

Agent guides us through process

> using `ai dlc`, what is the first step?

From earlier review we do expect to get a suggestion `Workspace detection`. once suggested, prompt the agent carry it out. "using ai dlc" in prompt is a trigger word that guides agent to use AWS process. Eventually in a session with developed context agent will know to use them with or without trigger phrase. 

Once agent is done with detection step notice two files: `aidlc-state.md` and `audit.md` created. These files make AI DOC process stateful and transferrable from one machine to another. Please review these files and push commit them. 

### 1.4 Reverse Engineering

Again, let's let agent guide us. Prompt:

> using `ai dlc`, what is the next step?

Agent will suggest `reverse engineering`, to which we respond with confirmation to proceed.

You will notice artifacts of RE generated in aidlc-docs. Please review, possibly adjust and commit these. These files is a good place to take control of technical stack of your project, document prior and target stack. 

To get an idea of actual app vs above spec, can:

```bash
npm install
npm run dev
```

Open [http://localhost:3000/docs](http://localhost:3000/docs) in browser and test existing functionality in Scalar.

Validation:
- `aidlc-state.md` and `audit.md` present and indicating progression. 
- `RE` spec present in `aidlc-docs\inception\reverse-engineering`

Completion of this step is tagged as `v1.0_RE_complete`.

## 2. Requirements, user stories, personas

Video guide for this step: `pre_aidlc_v2_inception`

Once agent completes pevious step, a markdown for requirements review will be generated. Most likely it will be questions, before we will get actual `requirements.md`. Given non-deterministic nature of AI and also possibly due to drift in previous answers and contaxt some variation in output and exact steps is possible. However overall spec output should be equivalent. Key artifacts are `requirements.md` and possibly markdowns for user stories. 

At some point AI will ask questions. Please either review markdown file with questions inline, or ask agent to go through those and interview you ineractively in console.

Once happy with requirements, proceed to the next step, which should outline execution plan and units agents will be workin on. Each unit is unit of work for coding agent and deliverable of code, which typically should be available for valid deployment. 

Tag of this step as `v2.0_inception_done`.

Validation:
- `requirements.md` present in `aidlc-docs\inception\requirements`
- Markdown on execution plan (eg `execution-plan.md`), with user stories grouped in units. In our case chances are there will be no user stores (`requirements.md` is enough), and there will only be one unit of execution. 

## 3. Construction, code generation

Video guide for this step: `pre_aidlc_v3_construction`.

Essentially follow `approve, proceed` agent guided process. After code generation some outstanding issues are possible. If that happens, agent should be able to fix it. Once running, you should see new CRUD ops in Scalar. 

As wrapping up, review idea for upcoming in-person workshop. Ideally something that is simple enough to let concentrate on AI DLC learning process, but also something that can contribute to eventual business solution. 