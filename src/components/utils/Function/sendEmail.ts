const sendEmail = (emailAddress: string) => {
  window.location.href = `mailto:${emailAddress}`;
};

export default sendEmail;
