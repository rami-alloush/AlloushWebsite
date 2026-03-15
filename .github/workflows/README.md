# GitHub Actions Deployment

This directory contains GitHub Actions workflows for automatic deployment to cPanel.

## Workflow: Deploy to cPanel via SSH

**File:** `deploy.yml`

### What it does:

- Automatically deploys your website to cPanel hosting
- Triggers on every push to the `main` branch
- Uses SSH to connect and pull latest changes
- Can also be manually triggered from the Actions tab

### Setup Instructions:

#### 1. **Set up Git Repository on cPanel:**

First, ensure your cPanel has a Git repository set up:

```bash
# SSH into your cPanel
ssh mycpanel

# Navigate to your project directory
cd ~/repositories/myproject

# Initialize git if not already done
git init
git remote add origin https://github.com/[username]/AlloushWebsite.git
git pull origin main
```

#### 2. **Configure GitHub Secrets:**

Go to your GitHub repository and add these secrets:

- **Settings** → **Secrets and variables** → **Actions** → **New repository secret**

Add the following secrets:

| Secret Name       | Description                         | Example                            |
| ----------------- | ----------------------------------- | ---------------------------------- |
| `CPANEL_HOST`     | Your cPanel server hostname         | `yourdomain.com` or `123.45.67.89` |
| `CPANEL_USERNAME` | Your cPanel SSH username            | `mycpanel`                         |
| `CPANEL_PASSWORD` | Your cPanel SSH password            | `your-secure-password`             |
| `CPANEL_PORT`     | SSH port (optional, defaults to 22) | `22`                               |

**Security Note:** Never commit passwords or credentials to your repository. Always use GitHub Secrets.

#### 4. **Push your code:**

```bash
git add .
git commit -m "Add cPanel auto-deployment"
git push origin main
```

#### 5. **Monitor deployment:**

- Go to the **Actions** tab in your repository
- Watch the deployment workflow run
- Once complete, your site will be updated on cPanel

### Workflow Features:

- ✅ Automatic deployment on push to main
- ✅ Manual deployment trigger
- ✅ Secure SSH connection
- ✅ Git pull to update files
- ✅ Deployment confirmation message

### Manual Deployment:

You can also deploy manually:

1. Go to **Actions** tab in GitHub
2. Select "Deploy to cPanel" workflow
3. Click **Run workflow**
4. Select branch and click **Run workflow**

### Troubleshooting:

**Authentication fails:**

- Verify you copied the **entire** private key including BEGIN/END lines
- Check if passphrase is correct (or remove if key has no passphrase)
- Ensure the public key is in `~/.ssh/authorized_keys` on cPanel
- Test SSH connection manually: `ssh -i ~/.ssh/your_key ramiallo@your-host`
- Verify username is correct (should be `ramiallo` based on your login)

**Git pull fails:**

- Ensure Git is installed on cPanel
- Verify repository path: `~/repositories/myproject`
- Check if remote origin is set correctly
- Ensure cPanel user has read/write permissions

**Deployment succeeds but site not updating:**

- Clear browser cache (Ctrl+Shift+R)
- Check if files are in the correct web directory
- Verify service worker isn't caching old content
- Check cPanel file manager to confirm files updated

**Permission denied:**

- Ensure cPanel user has SSH access enabled
- Check file permissions in the repository directory
- Contact hosting provider to enable SSH if disabled
