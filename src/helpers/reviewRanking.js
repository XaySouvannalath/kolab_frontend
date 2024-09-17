let ranking = {
  rwranking(value) {
    let rank = "-";
    let color = "#cccccc"; // Default color for undefined rankings

    if (value > 0 && value <= 2.0) {
      rank = "F";
      color = "#ff4d4d"; // Red
    } else if (value >= 2.1 && value <= 3.0) {
      rank = "D";
      color = "#ff944d"; // Orange
    } else if (value >= 3.1 && value <= 4.0) {
      rank = "C";
      color = "#ffd700"; // Yellow
    } else if (value >= 4.1 && value <= 4.5) {
      rank = "B";
      color = "#add8e6"; // Light Blue
    } else if (value >= 4.6 && value <= 5.0) {
      rank = "A";
      color = "#32cd32"; // Green
    }

    return { rank, color };
  },
  engagementRanking(value) {
    value = parseInt(value);

    if (value < 300) {
      return "Low";
    } else if (value >= 300 && value < 1000) {
      return "Medium";
    } else if (value >= 1000) {
      return "High";
    } else {
      return "";
    }
  },
  impressionRanking(value) {
    value = parseInt(value);

    if (value < 500) {
      return "Low";
    } else if (value >= 500 && value < 3000) {
      return "Medium";
    } else if (value >= 3000) {
      return "High";
    } else {
      return "Invalid impression value";
    }
  },
  viewRanking(value) {
    if (value >= 1000 && value < 5000) {
      return "Low";
    } else if (value >= 5000 && value < 10000) {
      return "Medium";
    } else if (value >= 10000) {
      return "High";
    } else {
      return "Invalid view value";
    }
  },

  tiktokRanking(followers) {
    if (typeof followers === "number") {
      if (followers < 1000) {
        return "Less than Nano";
      } else if (followers >= 1000 && followers < 30000) {
        return "Nano";
      } else if (followers >= 30000 && followers < 100000) {
        return "Micro";
      } else if (followers >= 100000 && followers < 500000) {
        return "Mid-Tier";
      } else if (followers >= 500000 && followers < 1000000) {
        return "Macro";
      } else if (followers >= 1000001) {
        return "Mega";
      } else {
        return "-";
      }
    } else {
      return "-";
    }
  },
  facebookRanking(followers) {
    if (typeof followers === "number") {
      if (followers < 1000) {
        return "Less than Nano";
      } else if (followers >= 1000 && followers < 10000) {
        return "Nano";
      } else if (followers >= 10000 && followers < 50000) {
        return "Micro";
      } else if (followers >= 50000 && followers < 100000) {
        return "Mid-Tier";
      } else if (followers >= 100000 && followers < 500000) {
        return "Macro";
      } else if (followers > 500001) {
        return "Mega";
      } else {
        return "-";
      }
    } else {
      return "-";
    }
  },
};

export default ranking;
