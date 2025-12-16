# Valahala Widget - Clean Architecture

## Overview

Refactored chat widget following Clean Code & SOLID principles with clear separation of concerns.

## Architecture Layers

### Entry Point

- **`src/index.ts`** - Thin entry point, exposes `window.ValahaWidget.init()`

### Application Layer (`src/app/`)

- **`widgetApp.ts`** - Widget lifecycle (init, destroy)
- **`widgetController.ts`** - Coordinates UI ↔ services ↔ state

### Domain Layer (`src/domain/`)

Pure business logic - no browser APIs, fully testable:

- **`message/`** - Message model & DTO mapper
- **`conversation/`** - Conversation model & state
- **`agent/`** - Agent state management

### Infrastructure Layer (`src/infrastructure/`)

External communication:

- **`http/`** - HTTP client & widget API endpoints
- **`socket/`** - Socket.IO client, events, handlers

### UI Layer (`src/ui/`)

Presentation only - stateless components:

- **`components/`** - ChatWindow, MessageList, MessageInput, SystemMessage
- **`renderer.ts`** - DOM utilities
- **`uiEvents.ts`** - User interaction handlers

### State Layer (`src/state/`)

Single source of truth:

- **`widgetState.ts`** - State type definitions
- **`stateStore.ts`** - State management & persistence

### Configuration & Utilities

- **`config/widgetConfig.ts`** - Widget configuration types
- **`utils/`** - Logger, type guards

## Key Principles

✅ **Separation of Concerns** - Each layer has one responsibility  
✅ **SOLID** - Single responsibility, dependency inversion  
✅ **Testability** - Domain layer is pure, no dependencies  
✅ **Maintainability** - Files < 200 lines, clear naming  
✅ **No Circular Dependencies** - Unidirectional flow

## Data Flow

```
User Action → UI Events → Controller → Services/State → Infrastructure → Backend
                                                              ↓
Backend → Infrastructure → Controller → State → UI Components → DOM Update
```

## Socket Events

**Received:** `conversation.assigned`, `message.new`, `conversation.closed`, `error`  
**Emitted:** `conversation.join`, `message.send`
