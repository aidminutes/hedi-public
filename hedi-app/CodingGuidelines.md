# Coding Guidelines

This document gathers the conventions and workflows we as developers on the project have agreed on together.
If you find any issue, stumble upon inconsistencies, problems or undefined topic, please bring it up for discussion.

The aim is to create very concise and well structured code. Not for aesthetic or 'coding philosophy' reasons, but because it proved to be helpful for working together on the same codebase.

## General Workflow

### Tooling

__required__: git, docker, nodejs
__recommended__: VS Code, yarn, make

#### Editor / IDE

since the whole team currently uses VS Code, the project contains recommended __extension__ for our workflow:
* Todo Tree: sidebar pane listing code marked with TODO, HACK, etc
* prettier: typescript formatter, with configuration we as a team agreed on plus a precommit hook, running the prettier on files to commit

also __debug / launch__ settings are preconfigured in order to encourage using the node debugger.

### Git

The (git) main branch is defined as a correctly working state of the project.
Development happens in small feature branches, which are merged back into main when correctly working, and passed a review through another developer. Thus the process heavily relies on github pullrequest.
Small features currently mean about maximum a week of work. This way we avoid diverging too much and avoid merge conflicts.
Ideally merging is possible through rebase. (rebase and merge on github PR). No squashing on merge is applied to keep the possibility of finegrained reverts.

### Schedule / Milestones / Tasks / Issues

Team process management is handled on github, with __project (kanban) boards__, __milestones__ and __issues__ which are discussed together in meetings.

A project dev board exists, where everyone puts her/his tasks currently being worked on (or in very near future) into their respecitve kanban column.

Additionally everyone posts a short note on slack when moving to the next task.

Any issue, which comes into ones mind should be posted as issue on github. very code specific details are marked with TODO or HACK directly as __comment__ in the sourcecode.

## Coding Style

this project relies heavily on typescript __interface definitions__ & __interface inheritance__. The tooling around it (with VS-Code) simplifies refactoring and keeps field types and names consistent.

The actual code written is rather functional though. Classes are only in use through external libraries. data flow is mostly pure functional, objects are adhoc types. The preference of simple objects without classes simply stems from the fact, that nextjs handles server side, request api, and client side. serialization on transport is required anyways. so attaching functions is impractical.

## Structuring

general aim is to achieve clear __separation of concerns__, reusability through __modularization__ and ease of use by everyone through __concious exporting__ (public/private).

### Application Structure

thematic or technical app features are split into __modules__.

e.g.
* 'editorial': handles static content provided by our content team
* 'auth': handles user and service authorization flow
* 'search': app content search
* 'react': react specific reusable code, which is not specific to one topic/module/function

for overarching functions there is still the 'common' module. whenever something within the common grows bigger, refactor to decicated module.

### Module Structure 
_= functional structuring_

The final application consists of __backend__ services (like drupal cms, solr search server, matrix chat server), the app __server__ and the __client__ application on the enduser devices.
The communication between _backend_ and _server_ is named __query__ and the communication between _server_ and _client_ called __request__.
Due to security and code reusability reasons, it is required to separate clearly between all those parts. (e.g. auth tokens, server secrets, backend node ids...).

exporting of function should be done with the team in mind: only export what is necessary, allowing a quicker overview over the module. export what could potentially be useful for other modules (type guards, object transform functions, validation functions)

the common structure of a module therefore:

* types: typescript interfaces
* query: mostly graphQL or REST
* server: nextjs nodejs
  * generators: static site generator functions
* request: mostly useswr or REST
* client: react nextjs
  * components: react components
  * hooks: react hooks

#### Folders

* always use a dedicated index.ts to export the content of the folder
* __components__ are each placed within a distinct folder (for test integration later on)

#### Misc

commonly in use names for 'the other stuff'
* __functions__: pool for reusable functions
* __utils__: helpers, validators
* __config__: data for initial configuration / startup

## Naming Convention

generally the direction is to have very speaking identifiers (variables, function names). 
this states the intent, makes reviewing and getting the grip of the code of someone else easier.


### Casing
* __camelCase__: default naming for _variables_, _functions_, _fields_...
* __PascalCase__: react components, graphql Types
* __I Prefix + PascalCase__: only for typescript interfaces. e.g. `IArticleEntry`
* __all caps__: in case the word is an abreviation. e.g. `parseCSS`

### Objects/Types

`{TypeModifier} {TypeIdentifier} {TypeSpecialization} {Usage}`

e.g. CategoryEntry, CategoryComponent, CategoryRootComponent, TranslatedArticleEntryView

### Functions

`({verb}) {Object} ('to' {Result})`

e.g. glossaryToGlossaryGroup, queryUser

keep name explicit

### Events

`'on' { Object } { Verb (present tense)}`

e.g. onSuggestSelect

the verb is deliberately not passive/past tense since to leave the exact time of issueing (before, after) open

### Event handler
`'handle' { Eventname without 'on' prefix}`

e.g. handleSuggestSelect

### Boolean / states
`'is' { Type or verb passive}`

e.g. isEnabled, isIHTTPError

always default 'false' to better align with js/ts default fallbacks

### Arrays
pluralized type name

e.g.: articles, categories


## Typing

* reuse interfaces
* make use of Typescript Utility types for partial oder composite types (prevent redefining fieldname)
* explicit function return types