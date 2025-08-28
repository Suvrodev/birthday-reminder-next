export const createTitle = (title?: string) => {
  const siteName = "Sarkar Nayan";
  if (!title) return { title: siteName };
  return {
    title: `${title} | ${siteName}`,
  };
};
