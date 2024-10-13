// analytics.js
import { AnalyticsBrowser } from "@june-so/analytics-next";

// Initialize June Analytics with your write key
const analytics = AnalyticsBrowser.load({
  writeKey: import.meta.env.VITE_JUNE_KEY,
});

// Attach the analytics object to the window object if needed for global access
window.analytics = analytics;

export default analytics;
