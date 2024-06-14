export const contactForm = {
  formAction: "/contact",
  formMethod: "post",
  fields: [
    {
      name: "name",
      type: "text",
      id: "name",
      placeholder: "YOURNAME...*",
      required: true,
    },
    {
      name: "email",
      type: "text",
      id: "email",
      pattern: "[^ @]*@[^ @]*",
      placeholder: "YOUR EMAIL...",
      required: true,
    },
    {
      name: "subject",
      type: "text",
      id: "subject",
      placeholder: "SUBJECT...*",
      required: true,
    },
    {
      name: "message",
      type: "textarea",
      id: "message",
      placeholder: "YOUR MESSAGE...",
      required: true,
    },
  ],
  submitButton: {
    type: "submit",
    id: "form-submit",
    className: "button",
    text: "SEND MESSAGE NOW",
  },
};

export const contactInfoContent = [
  {
    phone: "+2348071448323",
    email: "imion@navy.mil.ng",
    address: "NNS QUORRA Complex, Harbour Road Apapa Lagos Nigeria.",
    url: "imion.com.ng",
  },
];
export const contactInfo = [
  {
    title: "Phone Number",
    value: "+234 8071448323",
  },
  {
    title: "Email Address",
    value: "imion@navy.mil.ng",
  },
  {
    title: "Street Address",
    value: "NNS QUORRA Complex, Harbour Road Apapa Lagos Nigeria.",
  },
  {
    title: "Website URL",
    value: "imion.com.ng",
  },
];
