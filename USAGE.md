# 📖 How to Use Valahala Widget in Your HTML

## 🚀 Quick Start

After deploying to Render, you'll get a URL like:

```
https://valahala-widget.onrender.com
```

## 📝 Basic Implementation

### Step 1: Add the Widget Script

Add this script tag to your HTML file, typically before the closing `</body>` tag:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My Website</title>
  </head>
  <body>
    <!-- Your website content here -->

    <!-- Valahala Widget Script -->
    <script
      src="https://valahala-widget.onrender.com/valaha-widget.iife.js"
      data-public-key="YOUR_PUBLIC_KEY_HERE"
    ></script>
  </body>
</html>
```

**Important**: Replace `YOUR_PUBLIC_KEY_HERE` with your actual Valahala public key.

### Step 2: The Widget Appears Automatically

The widget will automatically:

- ✅ Initialize on page load
- ✅ Appear in the bottom-right corner
- ✅ Connect to your API backend
- ✅ Be ready to use

---

## 🎯 Complete Example

Here's a complete HTML example:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My Website with Valahala Widget</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 20px;
      }
    </style>
  </head>
  <body>
    <h1>Welcome to My Website</h1>
    <p>
      This is my website content. The chat widget will appear in the
      bottom-right corner.
    </p>

    <!-- Valahala Widget -->
    <script
      src="https://valahala-widget.onrender.com/valaha-widget.iife.js"
      data-public-key="YOUR_PUBLIC_KEY_HERE"
    ></script>
  </body>
</html>
```

---

## 👤 User Identification (Optional)

If you want to identify logged-in users, dispatch an event after the widget loads:

### Example: After User Login

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>My Website</title>
  </head>
  <body>
    <!-- Your website content -->

    <!-- Widget Script -->
    <script
      src="https://valahala-widget.onrender.com/valaha-widget.iife.js"
      data-public-key="YOUR_PUBLIC_KEY_HERE"
    ></script>

    <!-- Identify User After Login -->
    <script>
      // This should run after user login
      function identifyUser(userData) {
        window.dispatchEvent(
          new CustomEvent("valaha:identify", {
            detail: {
              businessCustomerId: userData.id, // Your internal user ID
              name: userData.name, // User's name
              email: userData.email, // User's email
              phone: userData.phone, // User's phone (optional)
            },
          })
        );
      }

      // Example: Call this after user logs in
      // identifyUser({
      //   id: "user-123",
      //   name: "John Doe",
      //   email: "john@example.com",
      //   phone: "+1234567890"
      // });
    </script>
  </body>
</html>
```

### Example: React/JavaScript Integration

```javascript
// After successful login
function onUserLogin(user) {
  // Identify user in widget
  window.dispatchEvent(
    new CustomEvent("valaha:identify", {
      detail: {
        businessCustomerId: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
      },
    })
  );
}

// Example usage
const loggedInUser = {
  id: "user-456",
  name: "Jane Smith",
  email: "jane@example.com",
  phone: "+1987654321",
};

onUserLogin(loggedInUser);
```

---

## 📍 Best Practices

### 1. Script Placement

**✅ Recommended**: Place the script before `</body>`

```html
<body>
  <!-- Your content -->
  <script src="..."></script>
</body>
```

**❌ Avoid**: Don't place in `<head>` (may block page rendering)

### 2. Load Order

The widget auto-initializes, but if you need to identify users, make sure the widget script loads first:

```html
<!-- Widget loads first -->
<script
  src="https://valahala-widget.onrender.com/valaha-widget.iife.js"
  data-public-key="YOUR_KEY"
></script>

<!-- Then identify user -->
<script>
  // Widget is ready, now identify
  window.dispatchEvent(new CustomEvent("valaha:identify", { ... }));
</script>
```

### 3. Multiple Pages

You can use the same script tag on all pages of your website. The widget will:

- ✅ Remember the user via localStorage
- ✅ Maintain conversation state
- ✅ Work across page navigations

---

## 🔧 Configuration Options

### Required Attributes

| Attribute         | Required | Description                                |
| ----------------- | -------- | ------------------------------------------ |
| `src`             | ✅ Yes   | URL to the widget script (your Render URL) |
| `data-public-key` | ✅ Yes   | Your Valahala public API key               |

### Example with All Attributes

```html
<script
  src="https://valahala-widget.onrender.com/valaha-widget.iife.js"
  data-public-key="VALAHA-PUBLIC-KEY-12345"
></script>
```

---

## 🎨 Widget Appearance

The widget will appear as:

- **Position**: Fixed in bottom-right corner
- **Button**: Circular chat button (56x56px)
- **Chat Window**: Opens when clicked (320px width, 500px height)
- **Responsive**: Adapts to mobile screens

---

## 🔍 Troubleshooting

### Widget Not Appearing

1. **Check Console**: Open browser DevTools (F12) and check for errors
2. **Verify URL**: Make sure the Render URL is correct
3. **Check Public Key**: Ensure `data-public-key` is set correctly
4. **Network Tab**: Check if the script file loads successfully

### Widget Not Connecting

1. **API URL**: Verify `VITE_BASE_URL` is set correctly in Render
2. **CORS**: Ensure your API allows requests from Render domain
3. **Network**: Check browser console for network errors

### User Identification Not Working

1. **Timing**: Make sure widget script loads before identifying
2. **Event Name**: Use exact event name: `"valaha:identify"`
3. **Data Format**: Ensure data matches the expected format

---

## 📱 Mobile Support

The widget is fully responsive and works on:

- ✅ Desktop browsers
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)
- ✅ Tablets

---

## 🔐 Security Notes

- ✅ **Public Keys**: Safe to include in HTML (they're public)
- ✅ **HTTPS**: Always use HTTPS in production
- ✅ **CORS**: Configure CORS on your API to allow Render domain

---

## 📞 Support

If you need help:

1. Check the [Deployment Guide](./DEPLOYMENT.md)
2. Review [README](./README.md)
3. Open an issue on [GitHub](https://github.com/AmrMagdy00/Valahala_Widget/issues)

---

## 🎯 Quick Reference

**Minimal Implementation:**

```html
<script
  src="https://YOUR-RENDER-URL.onrender.com/valaha-widget.iife.js"
  data-public-key="YOUR_PUBLIC_KEY"
></script>
```

**With User Identification:**

```html
<script src="..."></script>
<script>
  window.dispatchEvent(
    new CustomEvent("valaha:identify", {
      detail: { name: "User Name", email: "user@example.com" },
    })
  );
</script>
```

---

**That's it!** The widget will work automatically once you add the script tag. 🎉
