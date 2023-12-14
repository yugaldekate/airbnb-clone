# Full Stack Airbnb Clone with Next.js 13 App Router: React, Tailwind, Prisma, MongoDB, NextAuth 2023

![App Screenshot](https://user-images.githubusercontent.com/23248726/229031522-64a49ad0-66f7-4ea8-94a8-f64a0bb56736.png)

This repository is for a Full Stack Airbnb Clone built with Next.js 13, React, Tailwind, Prisma, MongoDB, and NextAuth.

## Features

- Tailwind design
- Tailwind animations and effects
- Full responsiveness
- Credential authentication
- Google authentication
- Github authentication
- Image upload using Cloudinary CDN
- Client form validation and handling using react-hook-form
- Server error handling using react-toast
- Calendars with react-date-range
- Page loading state
- Page empty state
- Booking / Reservation system
- Guest reservation cancellation
- Owner reservation cancellation
- Creation and deletion of properties
- Pricing calculation
- Advanced search algorithm by category, date range, map location, number of guests, rooms and bathrooms
  - For example, filtering out properties with reservations in your desired date range
- Favorites system
- Shareable URL filters
  - Share a URL with filters, and a friend will see the same results

## Prerequisites

**Node version 14.x** is required.

## Cloning the repository

```shell
git clone https://github.com/yugaldekate/airbnb-clone.git
```

### Install packages

```shell
npm i
```

### Setup .env file


```js
DATABASE_URL=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_ID=
GITHUB_SECRET=
NEXTAUTH_SECRET=
```

### Setup Prisma

```shell
npx prisma db push

```

### Start the app

```shell
npm run dev
```

## Available commands

Running commands with npm `npm run [command]`

| command         | description                              |
| :-------------- | :--------------------------------------- |
| `dev`           | Starts a development instance of the app |
