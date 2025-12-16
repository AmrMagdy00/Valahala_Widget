# Valahala Widget

<div dir="rtl">

## 📦 ويدجت الدردشة التفاعلي لـ Valahala

ويدجت JavaScript حديث ومتطور لدمج نظام الدردشة المباشر في أي موقع ويب. مبني باستخدام TypeScript و Clean Architecture principles.

</div>

## ✨ Features

- 🚀 **Zero Configuration** - Auto-initializes from script tag attributes
- 💬 **Real-time Chat** - WebSocket-based messaging with Socket.IO
- 🎨 **Modern UI** - Beautiful, responsive chat interface
- 🔒 **Secure** - JWT-based authentication
- 📱 **Mobile Friendly** - Fully responsive design
- 🏗️ **Clean Architecture** - SOLID principles, maintainable codebase
- ⚡ **Lightweight** - Optimized bundle size with Vite
- 🔄 **State Management** - Centralized state with localStorage persistence

## 📋 Table of Contents

- [Installation](#installation)
- [Quick Start](#quick-start)
- [Configuration](#configuration)
- [API Reference](#api-reference)
- [Architecture](#architecture)
- [Development](#development)
- [Contributing](#contributing)

## 🚀 Installation

### Using npm

```bash
npm install valahala_widget
```

### Using CDN (Recommended)

```html
<script 
  src="https://cdn.example.com/valaha-widget.iife.js"
  data-public-key="YOUR_PUBLIC_KEY"
></script>
```

### Build from Source

```bash
# Clone the repository
git clone https://github.com/AmrMagdy00/Valahala_Widget.git
cd Valahala_Widget

# Install dependencies
npm install

# Build the widget
npm run build

# The built file will be in dist/valaha-widget.iife.js
```

## 🎯 Quick Start

### Basic Usage

1. Include the widget script in your HTML:

```html
<!DOCTYPE html>
<html>
<head>
  <title>My Website</title>
</head>
<body>
  <!-- Your website content -->
  
  <!-- Widget Script -->
  <script 
    src="./dist/valaha-widget.iife.js"
    data-public-key="YOUR_PUBLIC_KEY"
  ></script>
</body>
</html>
```

2. The widget will automatically initialize and appear in the bottom-right corner.

### With User Identification

If you want to identify logged-in users:

```html
<script>
  // After user login
  const user = {
    businessCustomerId: "user-123",  // Your internal user ID
    name: "Ahmed Mohamed",
    email: "ahmed@example.com",
    phone: "+201234567890"
  };

  // Dispatch identify event
  window.dispatchEvent(
    new CustomEvent("valaha:identify", {
      detail: {
        businessCustomerId: user.businessCustomerId,
        name: user.name,
        email: user.email,
        phone: user.phone,
      },
    })
  );
</script>
```

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_BASE_URL=https://api.valahala.com
```

For production builds, the base URL is embedded at build time.

### Script Attributes

| Attribute | Required | Description |
|-----------|----------|-------------|
| `data-public-key` | ✅ Yes | Your Valahala public API key |
| `src` | ✅ Yes | Path to the widget script |

## 📚 API Reference

### Events

#### `valaha:identify`

Identify a user with their information. This should be dispatched after user login.

```javascript
window.dispatchEvent(
  new CustomEvent("valaha:identify", {
    detail: {
      businessCustomerId: string,  // Optional: Your internal user ID
      name: string,                 // Optional: User's name
      email: string,                // Optional: User's email
      phone: string                 // Optional: User's phone
    }
  })
);
```

### Widget Lifecycle

The widget automatically:
1. Initializes on page load
2. Creates or retrieves an `externalId` (stored in localStorage)
3. Authenticates with the backend
4. Mounts the UI
5. Listens for identify events

## 🏗️ Architecture

This project follows **Clean Architecture** principles with clear separation of concerns:

```
src/
├── app/              # Application layer - business logic
├── domain/           # Domain layer - pure business models
├── infrastructure/   # Infrastructure - HTTP, WebSocket
├── ui/               # UI layer - components and rendering
├── state/            # State management
├── config/           # Configuration
└── utils/            # Utilities
```

### Key Principles

- ✅ **Separation of Concerns** - Each layer has one responsibility
- ✅ **SOLID** - Single responsibility, dependency inversion
- ✅ **Testability** - Domain layer is pure, no dependencies
- ✅ **Maintainability** - Files < 200 lines, clear naming
- ✅ **No Circular Dependencies** - Unidirectional flow

For detailed architecture documentation, see [ARCHITECTURE.md](./ARCHITECTURE.md)

For widget flow diagrams, see [WIDGET_FLOW.md](./WIDGET_FLOW.md)

## 🛠️ Development

### Prerequisites

- Node.js >= 18
- npm >= 9

### Setup

```bash
# Install dependencies
npm install

# Start development server (if using Vite dev server)
npm run dev

# Build for production
npm run build
```

### Project Structure

```
Valahala_Widget/
├── src/
│   ├── app/                    # Application logic
│   │   ├── widgetApp.ts        # Widget lifecycle
│   │   ├── widgetController.ts # UI controller
│   │   └── ...
│   ├── domain/                 # Business models
│   │   ├── message/
│   │   ├── conversation/
│   │   └── agent/
│   ├── infrastructure/         # External services
│   │   ├── http/              # HTTP client & API
│   │   └── socket/            # WebSocket client
│   ├── ui/                     # UI components
│   │   ├── components/
│   │   └── renderer.ts
│   ├── state/                  # State management
│   └── index.ts                # Entry point
├── dist/                       # Build output
├── test.html                   # Test page
├── vite.config.ts              # Vite configuration
└── package.json
```

### Building

The widget is built as an IIFE (Immediately Invoked Function Expression) bundle:

```bash
npm run build
```

Output: `dist/valaha-widget.iife.js`

## 🔐 Security

- **JWT Tokens**: Stored securely in localStorage
- **Public Keys**: Passed via data attributes (never hardcoded)
- **Environment Variables**: Never commit `.env` files
- **HTTPS**: Always use HTTPS in production

See [.gitignore](./.gitignore) for files that should never be committed.

## 📝 License

ISC

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

For issues and questions:
- Open an issue on [GitHub Issues](https://github.com/AmrMagdy00/Valahala_Widget/issues)
- Check the [Architecture Documentation](./ARCHITECTURE.md)
- Review the [Widget Flow](./WIDGET_FLOW.md)

## 🎯 Roadmap

- [ ] TypeScript type definitions package
- [ ] React/Vue integration examples
- [ ] Customizable themes
- [ ] Multi-language support
- [ ] File upload support
- [ ] Typing indicators
- [ ] Read receipts

---

Made with ❤️ by the Valahala Team

