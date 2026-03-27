# Euna Claude Guide

Interactive AI tools guide for Implementation Managers and Technical Solutions Specialists at Euna Solutions.

## Deploy to GitHub Pages

### 1. Create the repo
Push this project to a new GitHub repository.

### 2. Enable GitHub Pages
- Go to your repo → **Settings** → **Pages**
- Under **Source**, select **GitHub Actions**

### 3. Set the base path (if needed)
If your site will live at `https://<username>.github.io/<repo-name>/` (not a custom domain), open `.github/workflows/deploy.yml` and set:
```yaml
NEXT_PUBLIC_BASE_PATH: '/<repo-name>'
```
For example: `NEXT_PUBLIC_BASE_PATH: '/euna-claude-guide'`

If you're using a **custom domain** (e.g. `ai.eunasolutions.com`), leave it blank.

### 4. Push to main
```bash
git add .
git commit -m "Initial deploy"
git push origin main
```

The GitHub Action will run automatically, build the static export, and deploy it. Your site will be live at the URL shown in Settings → Pages.

### Custom domain (optional)
Add a `CNAME` file to the `public/` folder with your domain:
```
ai.eunasolutions.com
```

## Local development
```bash
npm install
npm run dev
```

## Build locally
```bash
npm run build   # generates ./out static files
```
