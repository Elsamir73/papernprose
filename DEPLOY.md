# Deploy to Vercel

1. Push this project to the GitHub repository at `https://github.com/Elsamir73/papernprose`.
2. In Vercel, choose **Add New → Project** and import `https://github.com/Elsamir73/papernprose`.
3. Set framework preset to **Vite**, build command to `npm run build`, and output directory to `dist`, then deploy.
4. After deployment, open `https://papernprose.vercel.app/books` directly in a new tab and refresh. The catalog should load instead of returning a 404.
5. To add a custom domain, open the project **Settings → Domains**, enter the domain, and follow Vercel's DNS instructions at your registrar. Update `public/robots.txt`, `public/sitemap.xml`, and the canonical metadata in `index.html` to the new live domain, then commit and push.
6. To redeploy manually, use **Deployments → Redeploy**. New commits pushed to the connected GitHub branch deploy automatically.

## Updating the site

Edit the project files, then run:

```sh
git add .
git commit -m "message"
git push
```

Vercel redeploys automatically after the push.
