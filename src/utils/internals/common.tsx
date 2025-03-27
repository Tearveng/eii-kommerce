import { orderStatus } from "../../pages/admin/internals/data/gridData.tsx";
import Chip, { ChipProps } from "@mui/material/Chip";

const getChipStatus = (value: string, chipProps?: ChipProps) => {
  const status = orderStatus(value);

  return (
    <Chip
      color={status.color as any}
      icon={status.icon}
      label={`${status.title}`}
      {...chipProps}
    />
  );
};

const formatCambodianPhoneNumber = (phone) => {
  // Remove any non-digit characters (spaces, dashes, etc.)
  let cleaned = phone.replace(/\D/g, "");

  // Handle different input formats
  if (cleaned.startsWith("855")) {
    cleaned = "+" + cleaned; // Add + if it starts with 855
  } else if (cleaned.startsWith("0")) {
    cleaned = "+855" + cleaned.slice(1); // Replace leading 0 with +855
  } else if (!cleaned.startsWith("+")) {
    cleaned = "+855" + cleaned; // Assume Cambodian number, prepend +855
  }

  // Extract parts: country code (+855), mobile code (2 digits), rest (6-7 digits)
  const match = cleaned.match(/^\+855(\d{2})(\d{3})(\d{3,4})$/);
  if (match) {
    return `+855 ${match[1]} ${match[2]} ${match[3]}`;
  }
  return "Invalid Cambodian phone number";
};

export { getChipStatus, formatCambodianPhoneNumber };
