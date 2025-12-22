# 🔧 Fix Render Deployment Error

## Problem
Render is trying to run the widget as a Node.js application instead of serving it as static files.

Error: `Cannot find module '/opt/render/project/src/dist/valaha-widget.iife.js'`

## Solution: Recreate as Static Site

### Option 1: Delete and Recreate (Recommended)

1. **Go to Render Dashboard**: https://dashboard.render.com
2. **Delete the current service** (if it exists)
   - Go to your service
   - Click "Settings"
   - Scroll down and click "Delete Service"

3. **Create a NEW Static Site**:
   - Click "New +" button
   - Select **"Static Site"** (NOT Web Service!)
   - Connect to your GitHub repository
   - Render should auto-detect `render.yaml`

4. **If auto-detection doesn't work, manually set**:
   - **Name**: `valahala-widget`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
   - **Environment Variables**:
     - `NODE_VERSION` = `18.x`
     - `VITE_BASE_URL` = `https://api.valahala.com` (your API URL)

### Option 2: Change Service Type (If Available)

1. Go to your service in Render Dashboard
2. Go to "Settings"
3. Look for "Service Type" or "Change Service Type"
4. Change from "Web Service" to "Static Site"
5. Update:
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
   - **Remove any Start Command** (should be empty for static sites)

## Important Notes

- ✅ **Service Type MUST be "Static Site"** (not Web Service)
- ✅ **No Start Command** should be set for static sites
- ✅ **Publish Directory** should be `dist`
- ✅ The `render.yaml` file is correct, but Render might not be reading it if service type is wrong

## Verification

After recreating, check:
1. Service type shows "Static Site"
2. Build logs show successful build
3. No errors about "Cannot find module"
4. The widget file is accessible at: `https://your-service.onrender.com/valaha-widget.iife.js`

