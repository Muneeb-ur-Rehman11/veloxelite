# Car Rental Website

A modern, responsive car rental website built with React, Vite, and Tailwind CSS. Features include 3D car models, luxury car carousels, and smooth fade-in animations.

## Features

- **Multi-step Contact Form**: Collect customer information and car rental preferences
- **Fade-in Animations**: Smooth scroll-triggered animations using GSAP
- **3D Car Models**: Interactive 3D car visualizations
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Email Integration**: Send inquiries directly to your email using EmailJS

## 🚀 Quick Start

The contact form is now working in **Demo Mode**! You can test it immediately:

1. Run the development server: `npm run dev`
2. Navigate to the Contact page
3. Fill out and submit the form
4. Check the browser console for the submitted data

## 📧 Email Configuration

### Current Status: Demo Mode Active ✅

The form currently works in demo mode and logs submissions to the console. To send real emails:

### Option 1: Use Demo Credentials (Already Configured)
The `.env` file already contains working demo credentials. The form will:
- Accept submissions
- Log data to console
- Show success message
- Reset the form

### Option 2: Set Up Real EmailJS (For Production)

1. **Create EmailJS Account**: Visit [https://www.emailjs.com/](https://www.emailjs.com/)

2. **Configure Service & Template**: Follow the detailed guide in `emailjs-setup.js`

3. **Update `.env` file** with your real credentials:
   ```env
   VITE_EMAILJS_SERVICE_ID=your_actual_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_actual_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_actual_public_key
   ```

4. **Test**: Submit the form and check `bbbhaiff@gmail.com` for emails

### 4. Build for Production

```bash
npm run build
```

## Project Structure

```
src/
├── Components/
│   ├── Hero.jsx              # Main hero section
│   ├── InteractiveCar3D.jsx  # 3D car model component
│   ├── LuxuryCarCarousel.jsx # Car carousel
│   ├── CarsList.jsx          # Car listings
│   └── ...
├── Pages/
│   ├── Home.jsx              # Home page
│   ├── AboutUs.jsx           # About page
│   ├── ContactUs.jsx         # Contact page with multi-step form
│   └── OurFleet.jsx          # Fleet page
├── useFadeInAnimation.js     # Custom animation hook
└── App.jsx                   # Main app component
```

## Technologies Used

- **React 19** - Frontend framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **GSAP** - Animations
- **Three.js & React Three Fiber** - 3D graphics
- **EmailJS** - Email service
- **React Router** - Navigation

## Animations

The app includes smooth fade-in animations that trigger when sections come into view:

- **Hero Section**: Slides up from bottom
- **Interactive 3D**: Fades in
- **Car Carousel**: Slides up with delay
- **Car Lists**: Slides up with delay
- **Page Titles**: Slide up animations
- **Forms**: Fade in animations

## Contact Form Features

- **Step 1**: Basic customer information (name, email, phone)
- **Step 2**: Car rental details (car type, dates, passengers, special requests)
- **Progress Indicator**: Visual progress bar showing current step
- **Form Validation**: Required fields validation
- **Email Integration**: Sends formatted emails to bbbhaiff@gmail.com
- **Success/Error Messages**: User feedback on form submission
