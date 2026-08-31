/**
 * DEMENTIA Platform Configuration
 * 
 * Centralized configuration for the DEMENTIA website and caregiver portal.
 * To update the official Android APK release link, update the DOWNLOAD_URL constant below.
 */

// ============================================================================
// GITHUB RELEASE DOWNLOAD URL CONFIGURATION
// ============================================================================
// Replace this placeholder string with your direct GitHub Release APK download URL
// e.g., "https://github.com/your-org/dementia/releases/download/v1.0.0/dementia-v1.0.0-release.apk"
export const DOWNLOAD_URL = "REPLACE_WITH_GITHUB_RELEASE_URL";

// Repository link for source code / releases
export const GITHUB_REPO_URL = "https://github.com/dementia-project/dementia-app";

// Platform Metadata
export const APP_CONFIG = {
  name: "DEMENTIA",
  tagline: "AI-Powered Cognitive Assistance for Elderly Care",
  subTagline: "An AI-powered cognitive gaming and memory assistance platform designed to make cognitive engagement, daily assistance, and caregiver support more accessible.",
  version: "v1.0.0 (Release Build)",
  targetOS: "Android 8.0+",
  buildFormat: "Universal APK",
  offlineReady: true,
  engine: "Godot Engine 4.x (GDScript)",
  regionFocus: "North Eastern Region (NER) & Remote Communities",
  supportContact: "support@dementia-care.org",
  adaptiveAIEngine: "3-Tier Explainable Rule-Based Adaptive Heuristic Engine",
};

/**
 * Helper to trigger APK download or prompt release URL modal if placeholder is still set
 */
export function handleAppDownload(): void {
  if (DOWNLOAD_URL && DOWNLOAD_URL !== "REPLACE_WITH_GITHUB_RELEASE_URL") {
    window.open(DOWNLOAD_URL, "_blank", "noopener,noreferrer");
  } else {
    // Open friendly instructions or fallback to repository releases
    window.open(`${GITHUB_REPO_URL}/releases`, "_blank", "noopener,noreferrer");
  }
}
