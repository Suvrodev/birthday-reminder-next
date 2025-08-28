export const doShare = (
  e: React.MouseEvent<HTMLButtonElement>,
  shareData: { title?: string; url: string; image?: string }
) => {
  e.stopPropagation();
  e.preventDefault();

  // If using native share
  if (navigator.share) {
    navigator
      .share({
        title: shareData.title,
        text: "Check out this coaching center!",
        url: shareData.url,
      })
      .catch((error) => console.error("Share failed:", error));
  } else {
    navigator.clipboard.writeText(shareData.url);
    alert("Link copied to clipboard!");

    // Or trigger a modal
    // openShareModal(shareData); // <-- You implement this somewhere higher up
  }
};
