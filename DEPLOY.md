# Deploy to Vercel

1. Push this project to a GitHub repository.
2. In Vercel, choose **Add New → Project**, import the GitHub repository, and deploy with framework preset **Vite**, build command `npm run build`, and output directory `dist`.
3. After deployment, open a deep link directly, such as `https://your-deployment.vercel.app/books/the-tidekeepers-at-dusk`, and refresh it. It should load the book page instead of returning a 404.
4. To add a custom domain, open the project **Settings → Domains**, enter the domain, and follow Vercel's DNS instructions at your registrar. Update `public/robots.txt`, `public/sitemap.xml`, and the canonical metadata in `index.html` to the new live domain, then commit and push.
5. To redeploy, push a commit to the connected GitHub branch. Vercel builds and deploys automatically; use **Deployments → Redeploy** to rerun an existing deployment manually.
