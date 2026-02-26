# Love Fresh Marketplace (Demo)

A modern, clean e-commerce demo site built for hackathons. Features a curated "Love Fresh" theme (coffee, skincare, wellness) with a super stable shopping-to-checkout flow.

## Features
- **Modern UI**: Built with React, Tailwind CSS, and Lucide Icons.
- **Product Filtering**: Filter by category, price, scent, caffeine level, and rating.
- **Cart & Checkout**: LocalStorage cart, upsell traps, and a demo-safe checkout gate.
- **Bonus Features**: "Compare 2 items" drawer and "Budget mode" toggle.

## Local Development

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Open `http://localhost:3000` in your browser.

## Deployment

This project includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) to automatically build and deploy the site to GitHub Pages.

1. Push your code to the `main` branch.
2. In your GitHub repository settings, go to **Pages**.
3. Under **Build and deployment**, select **GitHub Actions** as the source.
4. The workflow will automatically build the `dist` folder and deploy it.

## Demo Script

Follow this script to showcase the agent's capabilities:

1. **Filter & Shop**: Go to the Shop page. Filter for coffee under €15, select "beans", and ensure a high rating.
2. **Interrupt**: Say "wait—make it decaf". The agent should update the filters to show decaf options.
3. **Cart Upsell**: Add an item to the cart and proceed to the cart page. Detect the pre-checked "Carbon-neutral delivery +€1.99" upsell trap. The agent should ask if you want to keep it.
4. **Checkout Gate**: Proceed to checkout. Fill in dummy shipping details. At the "Place order" step, the flow will stop at the `GREENLIGHT` gate. Type "GREENLIGHT" to commit the demo order.
