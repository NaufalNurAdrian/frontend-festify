import * as Yup from "yup";

export const eventSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  category: Yup.string().required("Category is required"),
  startTime: Yup.date().required("Start time is required"),
  endTime: Yup.date()
    .required("End time is required")
    .min(Yup.ref("startTime"), "End time must be after start time"),
  location: Yup.string().required("Location is required"),
  thumbnail: Yup.mixed().required("Thumbnail is required"),
});

export const ticketSchema = Yup.object().shape({
  type: Yup.string().required("Ticket type is required"),
  price: Yup.number()
    .nullable()
    .test(
      "is-required-or-positive",
      "Price is required and must be positive for non-FREE tickets",
      function (value) {
        // Mengakses `type` dari parent schema
        const type = this.parent.type;

        // Jika type bukan "FREE", price harus valid
        if (type !== "FREE") {
          return value !== undefined && value !== null && value > 0;
        }

        // Jika type adalah "FREE", price valid meski null atau undefined
        return true;
      }
    ),
  seats: Yup.number()
    .required("Seats are required")
    .positive("Seats must be positive"),
  lastOrder: Yup.date().required("Last order date is required"),
});
