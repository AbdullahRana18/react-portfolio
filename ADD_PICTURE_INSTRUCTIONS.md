# How to Add Your Picture to the Portfolio

## 📸 Adding Your Profile Picture

To add your picture to the portfolio, follow these steps:

### 1. **Prepare Your Picture**
- **Format**: JPG, PNG, or WebP
- **Size**: 300x300 pixels (square) or larger
- **Quality**: High resolution, clear and professional
- **File name**: `abdullah-rana.jpg` (or .png/.webp)

### 2. **Add Picture to Project**
1. Place your picture file in the `public` folder
2. The file should be: `D:\react projects\abdullah-portfolio\public\abdullah-rana.jpg`

### 3. **Update the Hero Component**
Replace the placeholder in `src/components/Hero.jsx`:

**Find this code (around line 57):**
```jsx
<div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white text-4xl font-bold shadow-2xl">
  AR
</div>
```

**Replace with:**
```jsx
<img 
  src="/abdullah-rana.jpg" 
  alt="Abdullah Rana" 
  className="w-32 h-32 rounded-full object-cover shadow-2xl border-4 border-white dark:border-gray-800"
/>
```

### 4. **Alternative: Add to About Section**
You can also add your picture to the About section by updating `src/components/About.jsx`:

**Find the image section (around line 120) and replace with:**
```jsx
<div className="relative">
  <img 
    src="/abdullah-rana.jpg" 
    alt="Abdullah Rana" 
    className="w-full h-64 object-cover rounded-2xl shadow-xl"
  />
  {/* Rest of the floating elements */}
</div>
```

### 5. **Test the Changes**
1. Save the file
2. Refresh your browser
3. Your picture should now appear in the portfolio

## 🎨 Styling Tips

- The picture will be automatically styled as a circle in the Hero section
- It will have a nice shadow and border
- The image will be responsive and look good on all devices

## 📁 File Structure
```
public/
├── abdullah-rana.jpg  ← Your picture goes here
├── vite.svg
└── Abdullah_Rana_CV.html
```

## ✅ Done!
Once you add your picture and update the code, your portfolio will look even more professional and personal!
