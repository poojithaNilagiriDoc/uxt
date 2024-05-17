export default function convertToDate(remainingTime: string): Date {
  const date: Date = new Date();
  const timer: string[] = remainingTime.split(':');

  timer.forEach((countdownTime: string, index: number) => {
    index === 0
      ? date.setHours(date.getHours() + parseInt(countdownTime))
      : index === 1
      ? date.setMinutes(date.getMinutes() + parseInt(countdownTime))
      : date.setSeconds(date.getSeconds() + parseInt(countdownTime));
  });

  return date;
}
