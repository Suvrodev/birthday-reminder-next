// // utils/dateUtils.ts
// export const getDaysUntilBirthday = (birthDateStr: string) => {
//   const today = new Date();
//   const birthDate = new Date(birthDateStr);

//   // শুধু মাস এবং দিন বিবেচনা করবো, বছর নয়
//   const nextBirthday = new Date(
//     today.getFullYear(),
//     birthDate.getMonth(),
//     birthDate.getDate()
//   );

//   // যদি জন্মদিন ইতিমধ্যে হয়ে গেছে এই বছরে, তাহলে আগামী বছরের জন্মদিন নাও
//   if (nextBirthday < today) {
//     nextBirthday.setFullYear(today.getFullYear() + 1);
//   }

//   // মিলিসেকেন্ড থেকে দিন বের করা
//   const diffTime = nextBirthday.getTime() - today.getTime();
//   const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

//   return diffDays;
// };

export const getDaysUntilBirthday = (birthDateStr: string) => {
  const today = new Date();
  const birthDate = new Date(birthDateStr);

  // শুধু year, month, day ব্যবহার, time ignore
  const todayDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );
  const nextBirthday = new Date(
    today.getFullYear(),
    birthDate.getMonth(),
    birthDate.getDate()
  );

  if (nextBirthday < todayDate) {
    nextBirthday.setFullYear(today.getFullYear() + 1);
  }

  const diffTime = nextBirthday.getTime() - todayDate.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
};
