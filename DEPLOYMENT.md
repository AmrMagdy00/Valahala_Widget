# 🚀 Render Deployment Guide - Valahala Widget

## 📋 Overview

This guide explains how to deploy the widget to Render as a Static Site.

## ✅ Pre-Deployment Requirements

### 1. Project Readiness Check

- ✅ **Build Script**: Available in `package.json`
- ✅ **Vite Config**: Properly configured
- ✅ **Output Directory**: `dist/` contains built files
- ✅ **Environment Variables**: `VITE_BASE_URL` must be set before building

### 2. Required Environment Variables

Before deployment, make sure to set:

```env
VITE_BASE_URL=https://api.valahala.com
```

**Important Note**: The `VITE_BASE_URL` value is embedded in the bundle at build time, so it must be set before running `npm run build`.

## 🔧 Render Deployment Steps

### Method 1: Using render.yaml (Recommended)

1. **Ensure `render.yaml` file exists** in the project root
2. **Go to [Render Dashboard](https://dashboard.render.com)**
3. **Create a new Static Site**
4. **Connect to GitHub Repository**
5. **Render will automatically detect the `render.yaml` file**

### Method 2: Manual Setup

1. **Create a new Static Site in Render**
2. **Connect to GitHub Repository**
3. **Enter the following settings**:
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
   - **Environment Variables**:
     - `NODE_VERSION`: `18.x`
     - `VITE_BASE_URL`: `https://api.valahala.com` (Replace with your API URL)

## ⚙️ Render Settings

### Build Command

```bash
npm install && npm run build
```

### Publish Directory

```
dist
```

**Note**: In `render.yaml`, use `publishPath: dist` (not `staticPublishPath`)

### Environment Variables

| Variable        | Value                      | Required |
| --------------- | -------------------------- | -------- |
| `NODE_VERSION`  | `18.x`                     | ✅ Yes   |
| `VITE_BASE_URL` | `https://api.valahala.com` | ✅ Yes   |

**⚠️ Warning**: Make sure to update `VITE_BASE_URL` to your production API URL.

## 📦 What Will Be Deployed

After building, the following will be deployed:

- `dist/valaha-widget.iife.js` - Complete widget file (JavaScript + CSS)

## 🔗 Using the Widget After Deployment

After deploying to Render, you'll get a URL like:

```
https://valahala-widget.onrender.com
```

### Using the widget in your site:

```html
<script
  src="https://valahala-widget.onrender.com/valaha-widget.iife.js"
  data-public-key="YOUR_PUBLIC_KEY"
></script>
```

**📖 For detailed usage instructions, see [USAGE.md](./USAGE.md)**

## 🔄 Updating the Widget

1. **Make code changes**
2. **Commit & Push to GitHub**
3. **Render will build and update automatically**

## 🧪 Pre-Deployment Testing

### 1. Test Build Locally

```bash
# Make sure VITE_BASE_URL is set
export VITE_BASE_URL=https://api.valahala.com

# Or create a .env file
echo "VITE_BASE_URL=https://api.valahala.com" > .env

# Build the project
npm run build

# Verify the file exists
ls -la dist/valaha-widget.iife.js
```

### 2. Test Widget Locally

Open `test.html` in your browser and verify:

- ✅ Widget displays correctly
- ✅ API connection works
- ✅ WebSocket connection works

## 🐛 Troubleshooting Common Issues

### Issue: Build Failed

**Solution**:

- Ensure `node_modules/` exists
- Verify all dependencies are installed
- Check that `NODE_VERSION` is correct

### Issue: "Cannot find module" or Render trying to run as Node.js app

**Solution**:

- **Remove `main` field from `package.json`** - This field can confuse Render into thinking it's a Node.js app
- **Verify `render.yaml` uses `publishPath: dist`** (not `staticPublishPath`)
- **Ensure service type is `static`** in render.yaml
- **In Render Dashboard**: Make sure you selected "Static Site" (not "Web Service") when creating the service

### Issue: Widget Not Connecting to API

**Solution**:

- Check `VITE_BASE_URL` value in Environment Variables
- Verify the API URL is correct and accessible
- Check CORS settings in the API

### Issue: CSS Not Appearing

**Solution**:

- The widget uses `vite-plugin-css-injected-by-js`, CSS should be embedded in JS
- Verify the plugin exists in `vite.config.ts`

## 📝 Pre-Deployment Checklist

- [ ] ✅ Updated `VITE_BASE_URL` to production URL
- [ ] ✅ Tested build locally (`npm run build`)
- [ ] ✅ Tested widget locally (`test.html`)
- [ ] ✅ Pushed code to GitHub
- [ ] ✅ Set up Render Static Site
- [ ] ✅ Set Environment Variables in Render
- [ ] ✅ Enabled Auto-Deploy in Render

## 🔐 Security

- ✅ **HTTPS**: Render provides HTTPS automatically
- ✅ **CORS**: Make sure to configure CORS in the API to allow Render domain
- ✅ **Public Keys**: Don't put Public Keys in code, use `data-public-key` attribute

## 📞 Support

If you encounter issues:

1. Check [Render Logs](https://dashboard.render.com)
2. Review [Render Documentation](https://render.com/docs)
3. Open an Issue on [GitHub](https://github.com/AmrMagdy00/Valahala_Widget/issues)

---

**Note**: After deployment, make sure to update any sites using the widget with the new Render URL.
