# AI Crop Advisor - Disease Detection Troubleshooting Guide

## Problem: Network Error when uploading photos for disease detection

### Error Message:
```
ERROR  Error detecting disease: [AxiosError: Network Error]
ERROR  Request error: {...}
ERROR  Disease detection error: [Error: Network error: Unable to reach server]
```

## Root Cause Analysis

The error "Unable to resolve host" indicates that your mobile device cannot connect to the Railway backend server. This can happen due to several reasons:

1. **Network connectivity issues**
2. **DNS resolution problems**
3. **Mobile device network restrictions**
4. **Firewall or proxy blocking the connection**

## Solutions (Try in order)

### 1. Test Network Connectivity

In the Disease Detection screen, tap the **"Test Connection"** button to run a comprehensive network diagnostic. This will:
- Test connection to Railway API
- Test connection to public APIs (to verify internet works)
- Show detailed error messages
- Display platform information

### 2. Check Internet Connection

- Ensure your device has a stable internet connection
- Try switching between WiFi and mobile data
- Test other apps that require internet to confirm connectivity

### 3. Try Different Networks

- Switch from WiFi to mobile data (or vice versa)
- Try a different WiFi network
- Use a mobile hotspot from another device

### 4. Clear App Cache (if using Expo Go)

- Close the Expo Go app completely
- Restart the Expo development server
- Reload the app in Expo Go

### 5. Use Local Development Server (For Developers)

If the Railway server is inaccessible, you can run a local test server:

1. **Install Python dependencies:**
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

2. **Run the test server:**
   ```bash
   python test_server.py
   ```

3. **The mobile app will automatically try local fallback URLs:**
   - Android Emulator: `http://10.0.2.2:5000/api`
   - iOS Simulator: `http://localhost:5000/api`

### 6. Check Railway Server Status

Verify the Railway backend is running by visiting:
- https://web-production-af45d.up.railway.app
- https://web-production-af45d.up.railway.app/api/dashboard-stats

If these URLs don't work in your browser, the Railway server might be down.

## Technical Details

### Mobile App Improvements Made:

1. **Fallback Mechanism**: The app now tries Railway first, then falls back to local server
2. **Retry Logic**: Automatic retries with exponential backoff (1s, 2s delays)
3. **Better Error Messages**: More specific error descriptions
4. **Network Diagnostic**: Built-in connectivity testing
5. **Reduced Timeouts**: Faster fallback (15s instead of 30s)

### API Endpoints Tested:

- **Primary**: `https://web-production-af45d.up.railway.app/api`
- **Android Fallback**: `http://10.0.2.2:5000/api`
- **iOS Fallback**: `http://localhost:5000/api`

## Expected Behavior

### Successful Flow:
1. User selects/takes photo
2. App uploads image to `/upload-image` endpoint
3. App sends base64 image to `/disease-detection` endpoint
4. Server returns disease analysis
5. Results displayed to user

### Error Handling:
- Network errors show specific connectivity advice
- Server errors indicate temporary service issues
- Timeout errors suggest trying again
- Multiple retry attempts before giving up

## Getting Help

If the issue persists:

1. **Check Console Logs**: Look for detailed error messages in the development console
2. **Run Network Diagnostic**: Use the "Test Connection" button and share the results
3. **Try Local Server**: Use the test server to isolate the issue
4. **Check Network Settings**: Ensure no firewall/proxy is blocking the connection

## Files Modified

- `mobile-app/src/api/cropService.ts` - Enhanced error handling and fallback logic
- `mobile-app/src/screens/DiseaseDetectionScreen.tsx` - Added connectivity testing
- `mobile-app/src/utils/networkDiagnostic.ts` - Network diagnostic utility
- `backend/test_server.py` - Local test server for debugging
- `backend/requirements.txt` - Python dependencies for local testing

## Quick Test Commands

```bash
# Test Railway API directly
curl https://web-production-af45d.up.railway.app/api/dashboard-stats

# Run local test server
cd backend && python test_server.py

# Test local server
curl http://localhost:5000/api/dashboard-stats
```
