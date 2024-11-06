export const defaultMetadata = {
  title: "Textfully — The Open Source Twilio Alternative",
  description:
    "Textfully makes it easy for developers to send texts. We're the Twilio alternative that is affordable, easy to use, and open source. Get started today for free.",
};

export const defaultOpenGraph = {
  title: defaultMetadata.title,
  description: defaultMetadata.description,
  images: [
    {
      url: "https://textfully.dev/banner.png",
      width: 600,
      height: 600,
      alt: "Textfully",
    },
  ],
};
