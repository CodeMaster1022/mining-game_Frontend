export const formatNumber = (number: number): string => {
    // Helper function to format with one decimal place if needed
    const formatDecimal = (num: number): string => {
      const withOneDecimal = (Math.floor(num * 10) / 10).toFixed(1);
      return withOneDecimal.endsWith('.0') ? Math.floor(num).toString() : withOneDecimal;
    };
  
    // Add commas to numbers under 1000
    const addCommas = (num: number): string => {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };
  
    if (number >= 1_000_000) {
      return `${formatDecimal(number / 1_000_000)}M`;
    }
    
    if (number >= 1_000) {
      return `${formatDecimal(number / 1_000)}K`;
    }
    
    return addCommas(Math.floor(number));
  };