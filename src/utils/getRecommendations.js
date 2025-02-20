// utils/getRecommendations.js

// Helper to convert a weeks string into a [min, max] range.
// For example, "21-30 weeks" becomes [21, 30] and "30+ weeks" becomes [30, Infinity].
function parseWeeksRange(weeksStr) {
    if (!weeksStr) return null;
    // Remove the word "weeks" (case-insensitive) and trim extra spaces.
    weeksStr = weeksStr.replace(/weeks/i, "").trim();
    if (weeksStr.includes("-")) {
      const parts = weeksStr.split("-");
      const min = parseInt(parts[0].trim());
      const max = parseInt(parts[1].trim());
      return [min, max];
    } else if (weeksStr.includes("+")) {
      const num = parseInt(weeksStr);
      return [num, Infinity];
    } else {
      const num = parseInt(weeksStr);
      return [num, num];
    }
  }
  
  export function getRecommendations(formData, screeningsData) {
    const {
      age,
      gender,
      pregnant,
      weeksPregnant,
      selectedOptions,
    } = formData;
  
    const currentYear = new Date().getFullYear();
  
    // Filter out screenings that don't match the criteria.
    const filtered = screeningsData.screenings.filter((screen) => {
      const criteria = screen.criteria || {};
  
      // Age check
      if (criteria.minAge !== undefined && age < criteria.minAge) return false;
      if (criteria.maxAge !== undefined && age > criteria.maxAge) return false;
  
      // Gender check
      if (criteria.gender && criteria.gender !== gender) return false;
  
      // Pregnancy check
      if (criteria.pregnant === true && pregnant !== "Yes") return false;
  
      // Weeks Pregnant Range check
      if (criteria.weeksPregnantRange) {
        const [reqMin, reqMax] = criteria.weeksPregnantRange;
        const userRange = parseWeeksRange(weeksPregnant);
        if (!userRange) return false;
        const [userMin, userMax] = userRange;
        // Check for overlapping intervals:
        if (userMax < reqMin || userMin > reqMax) return false;
      }
  
      // Check if a specific condition is required (e.g., "Inflammatory Bowel Disease")
      if (criteria.requiresCondition && !selectedOptions.includes(criteria.requiresCondition)) {
        return false;
      }  
      return true;
    });
  
    // Post-process: For screenings that have multiple recommendation lines (like metabolic hypertension),
    // choose the line that applies for the user's age.
    const processed = filtered.map((screen) => {
      if (screen.id === "metabolic_hypertension") {
        const filteredRecs = screen.recommendation.filter((rec) => {
          if (age < 40 && rec.includes("18-40")) return true;
          if (age >= 40 && rec.includes("After 40")) return true;
          return false;
        });
        return { ...screen, recommendation: filteredRecs };
      }
      return screen;
    });
  
    return processed;
  }
  