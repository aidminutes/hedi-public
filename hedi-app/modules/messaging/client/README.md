# HEDI Messaging Client

_= custom matrix client_

The original idea to _just use_ the [matrix-react-sdk](https://github.com/matrix-org/matrix-react-sdk) had to be omitted due to a couple of reasons:

- built as drop in sdk but as standalone webapp together with the element frontend (=skin)
- covers all features, however, we need to deliberately hide or customize some
- _grown_ codebase: a mix of different react styles, js and ts

## HEDI architecture

#### Naming and Nesting

since we also build upon [matrix-js-sdk](https://github.com/matrix-org/matrix-js-sdk)
and still want to lean on the react sdk the **naming** of the components doesn't follow HEDI conventions but retain the names from the react sdk

### SDK Integration

the majority of matrix features are accessible via the sdk's client class instance
which is therefore integrated via **react Context**

since HEDI only features messaging in certain conditions the client is accessible via **two contexts**:
1. MessagingContext: accessible app-wide, but client might be null
2. MatrixClientContext: wraps client most messaging components and asserts a valid matrix client

### Component structure

The underlying matrix-js-sdk is a **pub/sub** architecture, with the MatrixClient as bus, some backing **data stores** and a minimal mutating object model.

This architecture creates some friction 'standard' react component composition, props nesting and state change detection.

matrix-react-sdk tackles this issue via big stateful class components, which sometimes grow to 2000 LOCs. (also a reason, it was hard to reuse only parts)

#### Component State

stateful components which rely on events fired by the matrix client need to keep their own state
and **attach** a listener in an effect hook which also needs to be **removed** in the useEffect return function