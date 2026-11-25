# FlatBill: Building Bill & Service Charge Management

FlatBill helps flat owners' committees and building managers handle monthly service charges in one place. Admins set up buildings and flats, generate monthly bills, record payments and expenses, and post notices. Owners and tenants can view their bills, pay online, check the building's income and expenses, and submit complaints.

> This repository contains the **Next.js frontend** of FlatBill.

## Live Links

| Resource | Link |
|---|---|
| Live Website | https://flatbill-bd.vercel.app/ |
| API Base URL | https://flatbill-server.vercel.app/ |
| Backend Repository | https://github.com/rezasdsju/flatbill-server |

---

## ✨ Features

### 🏠 Homepage
- Modern homepage with responsive hero banner
- Clear CTA buttons and feature highlights

### 🧭 Responsive Navbar
- Theme and language toggle (English/Bangla)
- Profile popover menu
- Hamburger menu for mobile devices

### 🎨 Theme & Language
- Light and dark mode support
- Cookie-based language preference
- Dynamic English and Bangla content

### 📱 Responsive Design
- Mobile-first layout
- Responsive navbar and banner
- Optimized for mobile, tablet, and desktop



## Planned Features

### Admin (Building Manager or Committee)

| Feature | Status |
|---|---|
| Create a building and add flats | Planned |
| Assign an owner and a tenant to each flat | Planned |
| Set up charge types (service charge, lift, generator, guard and more) | Planned |
| Generate monthly bills for all flats with one click | Planned |
| See who has paid and who is overdue | Planned |
| Record cash or manual payments | Planned |
| Add building expenses with receipt images | Planned |
| Post notices | Planned |
| Review complaints and update their status | Planned |
| Dashboard with monthly income, expense and balance | Planned |

### Owner and Tenant

| Feature | Status |
|---|---|
| View current bill and payment history | Planned |
| Pay bills online | Planned |
| See the building's income and expense summary | Planned |
| Read notices | Planned |
| Submit complaints and track their status | Planned |
| Edit profile | Planned |

### General

| Feature | Status |
|---|---|
| Email and password sign-in | Planned |
| Google sign-in | Planned |
| Role-based dashboards (Admin, Owner, Tenant) | Planned |
| Responsive design for mobile | Planned |
| Light and dark theme | Planned |

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| Framework | Next.js (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| UI Components | shadcn/ui |
| Icons | React Icons |
| Internationalization | next-intl |
| Theme Management | next-themes |

## Local Development

### Prerequisites

- Node.js
- npm
- Running FlatBill backend

### Installation

```bash
git clone https://github.com/rezasdsju/flatbill-client.git
cd flatbill-client
npm install
```

### Environment Variables

Create `.env.local` in the project root:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000
INTERNAL_API_KEY=
```

`INTERNAL_API_KEY` must be the same value as in the backend. Do not add `NEXT_PUBLIC_` before it.

### Run Locally

```bash
npm run dev
```

Open `http://localhost:3000`.

---

## Related Repository

- [FlatBill Backend](https://github.com/rezasdsju/flatbill-server)