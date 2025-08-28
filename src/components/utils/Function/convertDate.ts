// export const formatDate = (isoString: string): string => {
//   const date = new Date(isoString);
//   const day = date.getDate();
//   const month = date.toLocaleString("en-US", { month: "short" });
//   const year = date.getFullYear();

//   return `${day} ${month} ${year}`;
// };

export const formatDate = (input: string | Date): string => {
  const date = new Date(input);

  if (isNaN(date.getTime())) {
    return "Invalid Date";
  }

  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "short" });
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
};
