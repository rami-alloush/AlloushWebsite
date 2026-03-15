# Dr. Rami M. Alloush - Portfolio Website

A professional portfolio website showcasing the work and expertise of Dr. Rami M. Alloush, an AI and Energy Technical Leader.

## 🌐 Live Website

Visit: [https://ramialloush.com](https://ramialloush.com)

## 📋 Overview

This portfolio website highlights:
- **Professional Background**: AI product ownership, data science, and petroleum engineering expertise
- **Skills & Expertise**: Technical leadership, digital transformation, machine learning, reservoir simulation
- **Experience**: Comprehensive work history and achievements
- **Projects**: Notable contributions to the energy and AI sectors

## 🚀 Deployment

### cPanel Deployment

This repository is configured for automatic deployment to cPanel using Git Version Control.

#### Setup Instructions:

1. **Connect Repository to cPanel**:
   - Log in to your cPanel account
   - Navigate to **Git Version Control**
   - Click **Create** to add a new repository
   - Enter your repository URL (GitHub/GitLab/Bitbucket)
   - Set the repository path (e.g., `/home/username/repositories/AlloushWebsite`)
   - Click **Create**

2. **Configure Deployment Path**:
   - Edit `.cpanel.yml` and update the `DEPLOYPATH` variable:
     ```yaml
     - export DEPLOYPATH=/home/your_cpanel_username/public_html/
     ```
   - Replace `your_cpanel_username` with your actual cPanel username

3. **Deploy**:
   - In cPanel Git Version Control, click **Manage** next to your repository
   - Click **Pull or Deploy** → **Deploy HEAD Commit**
   - The `.cpanel.yml` file will automatically copy all files to your public_html directory

4. **Automatic Deployment** (Optional):
   - Set up a webhook in your Git provider (GitHub/GitLab/Bitbucket)
   - Use the webhook URL provided in cPanel Git Version Control
   - Every push to your repository will trigger automatic deployment

### Manual Deployment

Alternatively, you can manually upload files via:
- **FTP/SFTP**: Upload all files to `/public_html/` directory
- **cPanel File Manager**: Upload and extract files directly

## 📁 Project Structure

```
AlloushWebsite/
├── index.html          # Main portfolio page
├── ai-for-eng.html     # AI for Engineering content
├── .cpanel.yml         # cPanel deployment configuration
└── README.md           # This file
```

## 🛠️ Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with Tailwind CSS
- **JavaScript**: Interactive features
- **Schema.org**: Structured data for SEO
- **Responsive Design**: Mobile-first approach

## 📝 Customization

To customize the website:
1. Edit `index.html` for the main portfolio content
2. Update meta tags for SEO optimization
3. Modify structured data for better search engine visibility
4. Adjust styling and layout as needed

## 🔧 Maintenance

- Keep content up to date with latest achievements and projects
- Regularly update meta descriptions and keywords for SEO
- Test website responsiveness across different devices
- Monitor website performance and loading times

## 📄 License

© Dr. Rami M. Alloush. All rights reserved.

## 📞 Contact

For inquiries or collaborations, please visit the contact section on the website.

---

**Note**: Remember to update the `DEPLOYPATH` in `.cpanel.yml` before deploying to match your cPanel account structure.
