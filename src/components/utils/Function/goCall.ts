const goCall = (phoneNumber: string) => {
  // const phoneNumber = "+8801951912997";
  window.location.href = `tel:${phoneNumber}`;
};

export default goCall;
