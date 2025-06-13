# El Mimbar Digital

## 🕌 Your Digital Gateway for Masjid Information

[![Next.js](https://img.shields.io/badge/Next.js-Black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/react-%2320232A.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)](https://react.dev/)
[![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![ImageKit](https://img.shields.io/badge/ImageKit-F00D30?style=for-the-badge&logo=imagekit&logoColor=white)](https://imagekit.io/)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

---

### **About El Mimbar Digital**

El Mimbar Digital is a comprehensive web platform designed to empower Masjid Management Boards (DKM) in publishing and managing their mosque's information effortlessly. In today's digital age, El Mimbar aims to bridge the gap between mosques and their jamaah (congregation) by providing a user-friendly and feature-rich online presence. From daily prayer schedules to announcements, donation information, and photo galleries, El Mimbar ensures that vital mosque information is always accessible.

This project is built as a multi-tenant SaaS (Software as a Service) application, allowing multiple mosques to manage their distinct online presences from a single, scalable codebase.

### **Key Features**

El Mimbar offers two primary modes to cater to different needs:

#### **Basic Mode (Free)**

Designed for smaller or newly established mosques seeking a fundamental online presence.

- **Core Information Pages:** Dedicated pages for homepage, daily prayer schedules, general announcements (text-based), and donation information.
- **Simple Admin Dashboard:** An intuitive dashboard for DKM to easily manage and update their text-based content.
- **Limited Image Gallery:** Support for a basic photo gallery with a very limited quota (e.g., 5 gallery images, 1 logo, 1 hero image). All images are hosted on El Mimbar's central ImageKit account.
- **Domain:** Free subdomain, e.g., `[your-mosque-name].elmimbar.id`.
- **Support:** Standard email support (best-effort basis).
- **No Video Support.**

#### **Pro Mode (Paid Subscription)**

For mosques seeking a more professional, feature-rich, and dynamic online presence.

- **All Basic Mode Features +**
- **Comprehensive Admin Dashboard:** An advanced interface for full content management, offering more control and flexibility.
- **Enhanced Image & Video Management:** Substantially larger quotas for images (e.g., 50-100 gallery images, 500 MB - 1 GB storage per mosque) and limited video support (e.g., 2-5 videos, max 50-100 MB per video). All media is hosted on El Mimbar's central ImageKit account for superior performance and optimization.
- **Advanced Content Management:** Unlimited announcements, filtering, and scheduling options. Dedicated sections for managing mosque events and activities.
- **Website Customization:** More theme options, font choices, and basic color palette customization to match the mosque's branding.
- **Basic SEO Tools:** Settings for meta titles and descriptions to improve search engine visibility.
- **Domain Options:**
  - Included: Free subdomain, e.g., `[your-mosque-name].elmimbar.id`.
  - **Add-on (Paid):** Option for a custom domain (e.g., `masjidku.id`, `nama-masjid.com`), fully managed and set up by El Mimbar.
- **Priority Support:** Faster response times via email and WhatsApp.

### **Technology Stack**

- **Frontend Framework:** Next.js (React)
- **Styling:** Tailwind CSS, SCSS
- **UI Components:** Shadcn/ui
- **Database & Authentication:** Supabase (PostgreSQL, Auth, RLS)
- **Media Management & CDN:** ImageKit (for all image and video storage, optimization, and delivery)
- **Deployment:** Vercel

### **Getting Started (For Developers)**

To run El Mimbar Digital locally for development or contribution:

#### **Prerequisites**

- Node.js (v18.x or higher recommended)
- npm or Yarn
- Git
- A Supabase project (Free Tier is sufficient for local development)
- An ImageKit account (Free Tier is sufficient for local development)

#### **1. Clone the Repository**

```bash
git clone [https://your-repo-link.git](https://your-repo-link.git)
cd el-mimbar-digital
```
