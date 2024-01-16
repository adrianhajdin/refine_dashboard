import dayjs from "dayjs";

type DateColors = "success" | "processing" | "error" | "default" | "warning";

//  returns a color based on the date
export const getDateColor = (args: {
  date: string;
  defaultColor?: DateColors;
}): DateColors => {
  const date = dayjs(args.date);
  const today = dayjs();

  if (date.isBefore(today)) {
    return "error";
  }

  if (date.isBefore(today.add(3, "day"))) {
    return "warning";
  }

  // ?? is the nullish coalescing operator. It returns the right-hand side operand when the left-hand side is null or undefined.
  return args.defaultColor ?? "default";
};
