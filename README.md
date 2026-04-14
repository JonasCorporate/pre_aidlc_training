# Pre AWS AI DLC Training

Pre-training exercise for AI DLC workshops.

## 0. Introduction and setup

### Sign-Up Purpose

The purpose of this pre-AIDLC training is to do a quick run-through of a full iteration of the AIDLC process prior to the actual workshop. The application under development is a trivial shopping API in Node/Express. This training will also help with setup on a local laptop, even though prerequisites are minimal. This pre-training may be redundant if you already have experience with the AIDLC process or if you are confident your local setup is already in place.

### Companion video guide

The progression of this project, together with some additional insights, has been recorded in [a companion video guide](https://jonassoftware.sharepoint.com/sites/AIatJonas/AIDLC%20PreTraining%20Material/Forms/AllItems.aspx). Video guides should ideally be followed with hands-on execution. It's possible to work without videos using this README alone, or even without any instructions, by following agent guidance for the AWS AI DLC workflow.

Video for this part: `pre_aidlc_v0_setup`

### Prerequisites
- [Node.js](https://nodejs.org/en/download/current) installed on your local machine. This is for the sample app, which is a Node/Express API.
- A code editor of your choice (typically [Visual Studio Code](https://code.visualstudio.com/))
- A coding agent. This repo is pre-set for [Claude Code](https://code.claude.com/docs/en/quickstart) and [Copilot CLI](https://github.com/github/copilot-cli?tab=readme-ov-file#installation), though it is possible to use other agents of your choice. This workshop is not token-intensive, but it does require basic access (paid or trial).

### References


- [Current repo](https://github.com/JonasCorporate/pre_aidlc_training). Please clone this in a manner of your choice, e.g., by cloning or downloading a ZIP. Once available locally, please open that folder in `VS Code`.  

```bash
git clone https://github.com/JonasCorporate/pre_aidlc_training
```

<img src="guides/pic002-cloning.png" alt="alt text" width="670" />

- [AI DLC Workshop repo](https://github.com/awslabs/aidlc-workflows?tab=readme-ov-file#platform-specific-setup). For the moment, you don't have to clone this, but in your future work you will need part of this repo as your setup. The `.aidlc-rule-details` folder in this project has been copied from this repo. From time to time, you can pull a fresh version to make sure we are using the latest workflow version. 
- Various stages of progression will be snapshotted with tags. The present initial stage (which is also `HEAD` of the `main` branch) is, for instance, tagged as `v0.0-initial`. If at any point you feel your process has diverged, you can recover by leaning on:
  - Your own version control. Hence, frequent commits are recommended.
  - One of our tags. This will put you in the desired state, but it will obviously lose any customizations peculiar to choices you've made. Resetting to a tag can be executed (for instance) by:
  ```powerShell
    git reset --hard v0.0-initial
    ``` 

### Validation gate:

- VS Code running with project open in it. 
- Coding agent launched and on standby. 

Validation gates are also a concept used extensively in AI DLC. We'll have validations at various checkpoints, and they will often gate progress. Sometimes this validation will be performed by AI, and sometimes by a human reviewer. 

## 1. Initiation, reverse engineering

### 1.1 Video guide (optional)

Video guide: `pre_aidlc_v1_init.mp4`

### 1.2 (Optional): Review AI DLC platform markdowns

It will help to review the markdowns in the `.aidlc-rule-details` folder. For now in [common](./.aidlc-rule-details/common) folder. Most helpful is `process-overview` (with Mermaid diagram). 

### 1.3 Workspace detection

The agent guides us through the process.

> using `ai dlc`, what is the first step?

From earlier review, we do expect to get a suggestion for `Workspace detection`. Once suggested, prompt the agent to carry it out. "using ai dlc" in the prompt is a trigger phrase that guides the agent to use the AWS process. Eventually, in a session with developed context, the agent will know to use it with or without a trigger phrase. 

Once the agent is done with the detection step, notice two created files: `aidlc-state.md` and `audit.md`. These files make the AI DLC process stateful and transferable from one machine to another. Please review these files and commit/push them. 

### 1.4 Reverse Engineering

Again, let's let agent guide us. Prompt:

> using `ai dlc`, what is the next step?

Agent will suggest `reverse engineering`, to which we respond with confirmation to proceed.

You will notice RE artifacts generated in aidlc-docs. Please review, possibly adjust, and commit these. These files are a good place to take control of the technical stack of your project and document the prior and target stacks. 

To get an idea of the actual app vs. the above spec, you can run:

```bash
npm install
npm run dev
```

Open [http://localhost:3000/docs](http://localhost:3000/docs) in a browser and test existing functionality in Scalar.

Validation:
- `aidlc-state.md` and `audit.md` present and indicating progression. 
- `RE` spec present in `aidlc-docs\inception\reverse-engineering`

Completion of this step is tagged as `v1.0_RE_complete`.

## 2. Requirements, user stories, personas

Video guide for this step: `pre_aidlc_v2_inception`

Once the agent completes the previous step, a markdown file for requirements review will be generated. Most likely it will contain questions before we get the actual `requirements.md`. Given the non-deterministic nature of AI, and possibly due to drift in previous answers and context, some variation in output and exact steps is possible. However, the overall spec output should be equivalent. Key artifacts are `requirements.md` and possibly markdown files for user stories. 

At some point AI will ask questions. Please either review the markdown file with questions inline, or ask the agent to go through them and interview you interactively in the console.

Once happy with the requirements, proceed to the next step, which should outline the execution plan and the units the agents will be working on. Each unit is a unit of work for the coding agent and a deliverable of code that should typically be available for valid deployment. 

Tag for this step is `v2.0_inception_done`.

Validation:
- `requirements.md` present in `aidlc-docs\inception\requirements`
- Markdown on execution plan (e.g., `execution-plan.md`), with user stories grouped in units. In our case, chances are there will be no user stories (`requirements.md` is enough), and there will only be one unit of execution. 

## 3. Construction, code generation

Video guide for this step: `pre_aidlc_v3_construction`.

Essentially, follow the `approve, proceed` agent-guided process. After code generation, some outstanding issues are possible. If that happens, the agent should be able to fix it. Once running, you should see new CRUD ops in Scalar. 

Tag of this step is `v3.0_construction_done`.

With this, our cycle of iteration is done. Please note, while AI DLC methodology envisions the third operation phase, it is not currently implemented in workflows.

Validation:
- Tests passing, application running with new functionality.

## 4. Wrap-up

As you wrap up, review ideas for the upcoming in-person workshop. Ideally, pick something simple enough to let you concentrate on the AI DLC learning process, but also something that can contribute to an eventual business solution. 

Also, some reflection about testing strategies, iteration strategies, and the structure of spec artifacts across cycles would help with planning ahead.