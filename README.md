# LC Incubator Monorepo

## Overview

This repository contains the questionnaire application developed for the LC Incubator project. It is an Angular-based web application designed as a platform for learning, experimentation, and exploration of various technologies.

The application is hosted on a server at the University of Twente and is publicly accessible at:  
https://lc-incubator-develop.bms.utwente.nl/

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

The questionnaire is fully configured using a YAML file found in the `public` directory:

- **`questions.yaml`**  
  Defines the questions that are shown to the user, including the available answer options and their descriptions.

### Questions configuration

The structure and wording of these questions are fully defined in `questions.yaml`, making it easy to update or extend the questionnaire without changing application code.

### Key characteristics

- No personal or questionnaire data is stored
- No backend or database is used

This approach makes the application easy to extend, without much technical knowledge.
