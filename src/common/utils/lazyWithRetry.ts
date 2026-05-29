import type { ComponentType } from "react";
import { lazy } from "react";

/**
 * A wrapper around React.lazy that adds a retry mechanism.
 * If fetching a dynamically imported chunk fails (e.g. after a new deployment),
 * it will force a page reload once to fetch the new chunks.
 */
export const lazyWithRetry = <T extends ComponentType<object>>(
  componentImport: () => Promise<{ default: T }>
) =>
  lazy(async () => {
    const pageHasAlreadyBeenForceRefreshed = JSON.parse(
      window.sessionStorage.getItem("page-has-been-force-refreshed") || "false"
    );

    try {
      const component = await componentImport();
      // If the component loaded successfully, reset the flag
      window.sessionStorage.setItem("page-has-been-force-refreshed", "false");
      return component;
    } catch (error) {
      if (!pageHasAlreadyBeenForceRefreshed) {
        window.sessionStorage.setItem("page-has-been-force-refreshed", "true");
        // Reload the page to get the latest index.html
        window.location.reload();
        
        // Return a promise that never resolves while the page is reloading
        return new Promise<{ default: T }>(() => {});
      }

      // If the page has already been reloaded and we still get an error,
      // something else is wrong. Throw the error so it can be caught by an ErrorBoundary.
      throw error;
    }
  });
