import dayjs from "dayjs";

export default function getMomentTime(range) {
  const transformToMomentTime = (time) => {
    if (!time) return null;

    const [hours, minutes] = time.split(":").map(Number);
    return dayjs().hour(hours).minute(minutes);
  };

  if (typeof range === "string") {
    return transformToMomentTime(range);
  }

  if (Array.isArray(range)) {
    return range.map(transformToMomentTime);
  }

  return range;
}