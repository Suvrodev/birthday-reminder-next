export const formatTime = (dateString: string): string => {
  return new Date(dateString).toLocaleTimeString("en-BD", {
    hour: "2-digit",
    minute: "2-digit",
    // second: "2-digit",
    hour12: true, // 24-hour format
  });
};
