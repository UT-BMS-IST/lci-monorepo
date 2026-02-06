# LC Incubator Monorepo

## Overview

This repository contains the questionnaire application developed for the LC Incubator project. It is an Angular-based web application designed as a platform for learning, experimentation, and exploration of various technologies.

The application is hosted on a server at the University of Twente and is publicly accessible at:  
https://lc-incubator-develop.utwente.nl/

The app guides users through a questionnaire in which they:
- Select the context in which they are looking for a tool
- Specify the goal they want to achieve

Based on their answers, the application recommends a suitable tool using a predefined knowledge base.

**Privacy note**  
No user data is collected or stored. The application has no backend or database and runs entirely as a client-side web application on a server.

## Running the application locally

To start the application locally, run:

```bash
nx serve lc-incubator
```

## How it works

The questionnaire is fully configured using two YAML files found in the `public` directory:

- **`questions.yaml`**  
  Defines the questions that are shown to the user, including the available answer options and their descriptions.

- **`results.yaml`**  
  Defines which tool is recommended for each possible combination of answers.

Together, these files determine both the flow of the questionnaire and the final recommendation shown to the user.

### Questions configuration

The structure and wording of these questions are fully defined in `questions.yaml`, making it easy to update or extend the questionnaire without changing application code.

### Recommendation logic

After the user answers all questions, the application looks up a matching entry in `results.yaml`.

Each entry in `results.yaml` contains:
- A set of conditions (one answer per question)
- A corresponding URL to a tool that fits that specific situation

When a matching combination is found, the user is redirected to the associated tool.

### Key characteristics

- All logic is rule-based and transparent
- No personal or questionnaire data is stored
- No backend or database is used
- The recommendation is determined instantly on the client side

This approach makes the application easy to extend, without much technical knowledge.
