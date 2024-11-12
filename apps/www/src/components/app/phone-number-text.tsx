import { parsePhoneNumberWithError } from "libphonenumber-js";

const getCountryFlag = (countryCode: string) => {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
};

export const PhoneNumberText = ({ phoneNumber }: { phoneNumber: string }) => {
  const formatPhoneNumberWithFlag = (phoneNumber: string) => {
    try {
      const parsed = parsePhoneNumberWithError(phoneNumber);
      if (parsed) {
        const flag = getCountryFlag(parsed.country || "");
        return (
          <div className="flex items-center gap-2">
            <span className="text-lg">{flag}</span>
            <span>{parsed.formatInternational()}</span>
          </div>
        );
      }
    } catch (error) {
      console.error("Error parsing phone number:", error);
    }
    return phoneNumber;
  };

  return <div>{formatPhoneNumberWithFlag(phoneNumber)}</div>;
};
