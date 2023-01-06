# **Contributing to resi-script-manager**

First thanks for take time to contribute and read this document! 👍✨

This document sets up some basic guidelines for contributing to [resi-script-manager](https://github.com/TheKeineAhnung/resi-script-manager)
Most of this are guidelines but no rules. Use your best judgement when you open issues and pull requests.
Also feel free to propose changes on this document in a pull request or issue.

### **Table Of Contents**

[Code of Conduct](#code-of-conduct)

[I just have a question](#i-just-have-a-question)

[How can I contribute](#how-can-i-contribute)

- [Reporting bugs](#reporting-bugs)

- [Suggesting enhancements](#suggesting-enhancements)

- [Your first code contribution](#your-first-code-contribution)

- [Pull requests](#pull-requests)

[Styleguides](#styleguides)

- [Git commit messages](#git-commit-messages)

[Additional Notes](#additional-notes)

- [Issue and pull request labels](#issue-and-pull-request-labels)

[Short Credits](#short-credits)

## **Code of Conduct**

The project and everyone in it is governed by the [Code of conduct](https://github.com/TheKeineAhnung/resi-script-manager/blob/dev/CODE_OF_CONDUCT.md). By participating, you are expected to uphold this. Please report unacceptable behavior to kontakt@keineahnung.eu.

## **I just have a question**

> **Note:** Please don´t open an issue for questions.

For questions please use the [Discussions tab](https://github.com/TheKeineAhnung/resi-script-manager/discussions).

## **How can I contribute**

### **Reporting bugs**

This should help you to report a bug for resi-script-manager. Following this guide could help contributors to understand, reproduce and fix your bug.

We use [GitHub issues](https://guides.github.com/features/issues/) for bug tracking and documentation of problems.

Before you create a bug report, please check [this list](#before-submitting-a-bug-report) and maybe you don´t need to create a bug report. Please [include as many details as possible](#how-do-i-submit-a-good-bug-report). Please use the issue template for bug reports.

#### **Before submitting a bug report**

- Please check your installed version of the script. When it is not the newest version please update the script and check if your bug is fixed.

- Perform a [cursory search](https://github.com/search?q=is%3Aissue+repo%3Athekeineahnung%2Fresi-script-manager&type=issues) to see if your problem has already been reported. If it has **and** the issue is open add a comment instead opening a new one.

> **Note:** If you find a closed issue that describes the same problem as you, open a new issue and link the original issue at the end of your text.

#### **How do I submit a (good) bug report?**

Provide the following information by filling out the template.

Explain the problem and include additional details to help contributors reproduce your problem

    - Use a clear and despriptive title for your issue.

    - Provide the exact steps which reproduce the problem.

    - Describe the observed behavior and point out what exactly is the problem with that behavior.

    - Explain your expected behavior.

### **Suggesting enhancements**

This should help you to suggest enhancements for resi-script-manager. Following this guide could help contributors to understand and implement your feature.

We use [GitHub issues](https://guides.github.com/features/issues/) for getting enhancement input.

Before you create an enhancement suggestion, please check [this list](#before-submitting-an-enhancement-suggestion) and maybe you don´t need to create one. Please [include as many details as possible](#how-do-i-submit-a-good-enhancement-suggestion). Please use the issue template for enhancement suggsetions.

#### **Before submitting an Enhancement suggestion**

- Please check your installed version of the script. When it is not the newest version please update the script and check if your feature idea is included.

- Perform a [cursory search](https://github.com/search?q=is%3Aissue+repo%3Athekeineahnung%2Fresi-script-manager&type=issues) to see if your enhancement has already been suggested. If it has, add a comment to the existing issue instead of opening a new one.

#### **How do I submit a (good) enhancement suggestion**

    - Use a clear and despriptive title for your issue.

    - Provide a step-by-step description of the suggested enhancement in as many steps as possible.

    - Explain why this enhancement would be useful.

### **Your first code contribution**

When you are unshure where you should start? You can start with `beginner` or `help wanted` issues:

- [Beginner issues](https://github.com/search?q=is%3Aopen+is%3Aissue+repo%3Athekeineahnung%2Fresi-script-manager+label%3Abeginner)

- [Help wanted issues](https://github.com/search?q=is%3Aopen+is%3Aissue+repo%3Athekeineahnung%2Fresi-script-manager+is%3Aopen+is%3Aissue+label%3A%22help+wanted%22&type=)

### **Pull requests**

1. Follow instructions in the template.
2. Follow the [styleguides](#styleguides).
3. When you opened a pull request for an issue, open the pull request to the branch the milestone label is set on the issue.

   3.1. When your pull request isn´t for an issue or the issue has no milestone label, open the pull request to the branch for the next version.

4. After submitting your pull request, verifiy that all status checks are passing
<details><summary>What if the status checks are failing</summary>If a status check fails and you believe that this is a mistake, please leave a comment on the pull request explaining why you believe the failure is a mistake. A maintainer will re-run the status checks for you. When the status check fails again you must check your contribution.</details>

## **Styleguides**

### **Git commit messages**

- Use past participle ("Added feature" not "Add feature")

- Consider starting the commit message with an applicable emoji:

  - :arrow_down: `:arrow_down:` when downgrading dependencies

  - :arrow_up: `:arrow_up:` when upgrading dependencies

  - :art: `:art:` when improving the format/structure of the code

  - :books: `:books:` when writing documentation

  - :bug: `:bug:` when fixing a bug

  - :fire: `:fire:` when removing code or files

  - :lock: `:lock:` when dealing with security

  - :racehorse: `:racehorse:` when improving performance

  - :sparkles: `:sparkles:` when adding new feature

For a full list take a look at [gitmoji.dev](https://gitmoji.dev/).

## **Additional notes**

### **Issue and pull request labels**

#### **Type of issue and issue state**

| Label name         | search :mag_right:                                                                                                                  | Description                               |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| beginner           | [search](https://github.com/search?q=repo%3Athekeineahnung%2Fresi-script-manager+label%3Abeginner&type=)                            | Good for newcomers                        |
| bug                | [search](https://github.com/search?q=repo%3Athekeineahnung%2Fresi-script-manager+label%3Abug+is%3Aissue&type=)                      | Something doesn´t work                    |
| duplicate          | [search](https://github.com/search?q=repo%3Athekeineahnung%2Fresi-script-manager+is%3Aissue+label%3Aduplicate&type=)                | This issue or pull request already exists |
| enhancement        | [search](https://github.com/search?q=repo%3Athekeineahnung%2Fresi-script-manager+is%3Aissue+label%3Aenhancement&type=)              | New feature request                       |
| feedback           | [search](https://github.com/search?q=repo%3Athekeineahnung%2Fresi-script-manager+is%3Aissue+label%3Afeedback&type=)                 | Generall feedback                         |
| help wanted        | [search](https://github.com/search?q=repo%3Athekeineahnung%2Fresi-script-manager+is%3Aissue+label%3A%22help+wanted%22&type=)        | Extra attention is needed                 |
| invalid            | [search](https://github.com/search?q=repo%3Athekeineahnung%2Fresi-script-manager+is%3Aissue+label%3Ainvalid&type=)                  | That doesn´t seem right                   |
| needs reproduction | [search](https://github.com/search?q=repo%3Athekeineahnung%2Fresi-script-manager+is%3Aissue+label%3A%22needs+reproduction%22&type=) | Bugs that need hints for reproduction     |
| question           | [search](https://github.com/search?q=repo%3Athekeineahnung%2Fresi-script-manager+is%3Aissue+label%3Aquestion&type=)                 | Further information is requested          |
| wontfix            | [search](https://github.com/search?q=repo%3Athekeineahnung%2Fresi-script-manager+is%3Aissue+label%3Awontfix&type=)                  | This will not be worked on                |

#### **Topic categorie**

| Label name    | search :mag_right:                                                                                                       | Description                                |
| ------------- | ------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------ |
| documentation | [search](https://github.com/search?q=repo%3Athekeineahnung%2Fresi-script-manager+label%3Adocumentation+is%3Aissue&type=) | Improvements or additions to documentation |
| security      | [search](https://github.com/search?q=repo%3Athekeineahnung%2Fresi-script-manager+is%3Aissue+label%3Asecurity&type=)      | Security problems                          |

## **Short credits**

I got my inspiration for this file from the [Atom](https://github.com/atom/atom) [CONTRIBUTING.md](https://github.com/atom/atom/blob/master/CONTRIBUTING.md) file. Thank you! :green_heart:
