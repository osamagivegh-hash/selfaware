# 🚀 Azure Manual Deployment Guide (Backend Only)

This guide covers manually deploying the SelfActual Backend to **Azure Container Apps** using Docker.

> **Architecture**: Frontend on Vercel ← API calls → Backend on Azure (Docker)

---

## 📋 Prerequisites

Before you begin, ensure you have:

1. **Azure Account** with active subscription
   - Sign up at [portal.azure.com](https://portal.azure.com)
   
2. **Azure CLI** installed on your machine
   - Download: https://docs.microsoft.com/en-us/cli/azure/install-azure-cli
   - Or use Azure Cloud Shell (no install needed): https://shell.azure.com

3. **Docker Desktop** installed and running
   - Download: https://www.docker.com/products/docker-desktop

4. **MongoDB Atlas** connection string ready

---

## 🔧 Step-by-Step Manual Deployment

### Step 1: Login to Azure CLI

Open your terminal/PowerShell and run:

```bash
az login
```

This opens a browser window for authentication. After login, you'll see your subscriptions listed.

If you have multiple subscriptions, set the one you want to use:

```bash
az account set --subscription "YOUR_SUBSCRIPTION_NAME_OR_ID"
```

---

### Step 2: Create Azure Resource Group

A resource group is a container for all your Azure resources.

```bash
az group create --name selfactual-rg --location eastus
```

**Available locations**: `eastus`, `westus`, `westeurope`, `northeurope`, `uaenorth`, `southeastasia`, etc.

Choose a location close to your users for better latency.

---

### Step 3: Create Azure Container Registry (ACR)

ACR stores your Docker images privately in Azure.

```bash
az acr create --resource-group selfactual-rg --name selfactualcr --sku Basic
```

> **Note**: Registry name must be globally unique, lowercase, 5-50 characters. If `selfactualcr` is taken, try `selfactualcr123` or similar.

Enable admin access (needed for Container Apps):

```bash
az acr update --name selfactualcr --admin-enabled true
```

Get your ACR login credentials (save these!):

```bash
az acr credential show --name selfactualcr
```

Output will show:
- `username`: selfactualcr
- `password`: (a long string)

---

### Step 4: Build and Push Docker Image to ACR

#### 4.1 Login to ACR from Docker

```bash
az acr login --name selfactualcr
```

#### 4.2 Build the Docker Image

Navigate to your backend folder and build:

```bash
cd c:\Users\TestUser\Desktop\myprojects\selfactual\backend

docker build -t selfactualcr.azurecr.io/selfactual-backend:v1 .
```

#### 4.3 Push Image to ACR

```bash
docker push selfactualcr.azurecr.io/selfactual-backend:v1
```

#### 4.4 Verify Image is in ACR

```bash
az acr repository list --name selfactualcr --output table
```

You should see `selfactual-backend` in the list.

---

### Step 5: Create Container Apps Environment

Container Apps Environment is the hosting environment for your containers.

```bash
az containerapp env create \
  --name selfactual-env \
  --resource-group selfactual-rg \
  --location eastus
```

> **PowerShell users**: Replace `\` with backtick `` ` `` for line continuation, or put everything on one line.

---

### Step 6: Deploy Container App

Now deploy your backend as a Container App:

```bash
az containerapp create \
  --name selfactual-backend \
  --resource-group selfactual-rg \
  --environment selfactual-env \
  --image selfactualcr.azurecr.io/selfactual-backend:v1 \
  --target-port 5000 \
  --ingress external \
  --registry-server selfactualcr.azurecr.io \
  --registry-username selfactualcr \
  --registry-password "YOUR_ACR_PASSWORD_FROM_STEP_3" \
  --cpu 0.5 \
  --memory 1.0Gi \
  --min-replicas 1 \
  --max-replicas 3 \
  --env-vars \
    NODE_ENV=production \
    PORT=5000 \
    MONGODB_URI="YOUR_MONGODB_ATLAS_CONNECTION_STRING" \
    CORS_ORIGIN="https://your-vercel-frontend.vercel.app" \
    RATE_LIMIT_WINDOW_MS=900000 \
    RATE_LIMIT_MAX=100
```

**⚠️ IMPORTANT**: Replace these values:
- `YOUR_ACR_PASSWORD_FROM_STEP_3` - password from Step 3
- `YOUR_MONGODB_ATLAS_CONNECTION_STRING` - your MongoDB Atlas URI
- `https://your-vercel-frontend.vercel.app` - your actual Vercel frontend URL

---

### Step 7: Get Your Backend URL

After deployment, get your public URL:

```bash
az containerapp show \
  --name selfactual-backend \
  --resource-group selfactual-rg \
  --query properties.configuration.ingress.fqdn \
  --output tsv
```

Output will be something like:
```
selfactual-backend.redground-abc123.eastus.azurecontainerapps.io
```

Your API is now live at:
```
https://selfactual-backend.redground-abc123.eastus.azurecontainerapps.io/api
```

---

### Step 8: Test Your Deployment

Test the health endpoint:

```bash
curl https://YOUR_CONTAINER_APP_URL/api/health
```

Or open in browser: `https://YOUR_CONTAINER_APP_URL/api/health`

You should see: `{"status":"ok"}`

---

### Step 9: Update Vercel Frontend

Go to your Vercel Dashboard and update the environment variable:

1. Go to [vercel.com](https://vercel.com) → Your Project → Settings → Environment Variables
2. Update `NEXT_PUBLIC_API_URL` to your new Azure URL:
   ```
   https://selfactual-backend.redground-abc123.eastus.azurecontainerapps.io/api
   ```
3. Redeploy your frontend (trigger a new deployment)

---

## 🔄 Updating Your Deployment

When you make changes to your backend code:

### 1. Build new Docker image with new tag

```bash
cd c:\Users\TestUser\Desktop\myprojects\selfactual\backend
docker build -t selfactualcr.azurecr.io/selfactual-backend:v2 .
```

### 2. Push to ACR

```bash
docker push selfactualcr.azurecr.io/selfactual-backend:v2
```

### 3. Update Container App to use new image

```bash
az containerapp update \
  --name selfactual-backend \
  --resource-group selfactual-rg \
  --image selfactualcr.azurecr.io/selfactual-backend:v2
```

---

## 📊 Monitoring & Logs

### View Container Logs

```bash
az containerapp logs show \
  --name selfactual-backend \
  --resource-group selfactual-rg \
  --type console \
  --follow
```

### View in Azure Portal

1. Go to [portal.azure.com](https://portal.azure.com)
2. Navigate to: Resource Groups → `selfactual-rg` → `selfactual-backend`
3. Click **Monitoring** → **Log stream** for real-time logs
4. Click **Metrics** for performance graphs

---

## 🔒 Update Environment Variables

To update environment variables after deployment:

```bash
az containerapp update \
  --name selfactual-backend \
  --resource-group selfactual-rg \
  --set-env-vars \
    CORS_ORIGIN="https://new-frontend-url.vercel.app"
```

---

## 💰 Cost Management

### Check Current Usage

```bash
az consumption usage list --top 10
```

### Estimated Costs (Container Apps)

| Resource | Estimated Cost |
|----------|----------------|
| Container Apps (0.5 vCPU, 1GB) | ~$15-30/month |
| Container Registry (Basic) | ~$5/month |
| Data Transfer | Pay as you go |

### Stop Container (to save costs when not needed)

```bash
az containerapp update \
  --name selfactual-backend \
  --resource-group selfactual-rg \
  --min-replicas 0
```

---

## 🗑️ Cleanup (Delete All Resources)

To delete everything and stop all charges:

```bash
az group delete --name selfactual-rg --yes --no-wait
```

---

## 🚨 Troubleshooting

### Container Won't Start

Check logs:
```bash
az containerapp logs show --name selfactual-backend --resource-group selfactual-rg --type console
```

### MongoDB Connection Fails

- Verify your MongoDB Atlas IP whitelist includes `0.0.0.0/0` (allow from anywhere) for Azure Container Apps
- Check connection string is correct

### CORS Errors

- Ensure `CORS_ORIGIN` matches your Vercel URL exactly (including `https://`)
- Check for trailing slashes

### Image Pull Errors

- Verify ACR admin is enabled: `az acr update --name selfactualcr --admin-enabled true`
- Check registry credentials are correct

---

## 📝 Quick Reference Commands

| Action | Command |
|--------|---------|
| View all container apps | `az containerapp list -o table` |
| Restart container | `az containerapp revision restart --name selfactual-backend -g selfactual-rg --revision REVISION_NAME` |
| Scale up | `az containerapp update --name selfactual-backend -g selfactual-rg --max-replicas 5` |
| View URL | `az containerapp show --name selfactual-backend -g selfactual-rg --query properties.configuration.ingress.fqdn -o tsv` |

---

## ✅ Deployment Checklist

- [ ] Azure CLI installed and logged in
- [ ] Docker Desktop running
- [ ] Resource Group created
- [ ] Container Registry created with admin enabled
- [ ] Docker image built and pushed
- [ ] Container Apps Environment created
- [ ] Container App deployed with correct env vars
- [ ] Health endpoint tested
- [ ] Vercel frontend updated with new API URL
- [ ] Full API tested from frontend

---

**Your backend is now running on Azure! 🎉**
