// utils/getRecommendations.js

// Helper to convert a weeks string into a [min, max] range.
function parseWeeksRange(weeksStr) {
  if (!weeksStr) return null;
  weeksStr = weeksStr.replace(/weeks/i, "").trim();
  if (weeksStr.includes("-")) {
    const parts = weeksStr.split("-");
    return [parseInt(parts[0].trim()), parseInt(parts[1].trim())];
  } else if (weeksStr.includes("+")) {
    return [parseInt(weeksStr), Infinity];
  } else {
    return [parseInt(weeksStr), parseInt(weeksStr)];
  }
}

// Helper function to check if userData matches a given criteria
const matchesCriteria = (userData, criteria) => {
  const { age, gender, pregnant, weeksPregnant, selectedOptions } = userData;

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
    if (userMax < reqMin || userMin > reqMax) return false;
  }

  // Check for specific condition requirement (e.g., "Inflammatory Bowel Disease")
  if (criteria.requiresCondition && !selectedOptions.includes(criteria.requiresCondition)) {
    return false;
  }

  return true;
};

export function getRecommendations(formData, screeningsData) {
  return screeningsData.screenings.flatMap(screening => {
    if (screening.conditions) {
      return screening.conditions
        .filter(({ criteria }) => matchesCriteria(formData, criteria))
        .map(({ recommendation }) => ({
          id: screening.id,
          title: screening.title,
          recommendation
        }));
    } else if (screening.criteria) {
      if (matchesCriteria(formData, screening.criteria)) {
        return [{
          id: screening.id,
          title: screening.title,
          recommendation: screening.recommendation
        }];
      }
    }
    return [];
  });
}
