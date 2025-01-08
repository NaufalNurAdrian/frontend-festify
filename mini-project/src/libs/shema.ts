import * as Yup from "yup";

export const validateCreateEventSchema = Yup.object().shape({
  title: Yup.string()
    .min(5, "Title must be at least 5 characters")
    .max(150, "Title must not exceed 100 characters")
    .required("Title is required"),
  description: Yup.string()
    .min(100, "Description must be at least 100 characters")
    .required("Description is required"),
  location: Yup.string().required("Location is required"),
  startTime: Yup.date()
    .required("Start time is required")
    .typeError("Invalid start time"),
  endTime: Yup.date()
    .required("End time is required")
    .typeError("Invalid end time")
    .min(Yup.ref("startTime"), "End time must be after start time"),
  category: Yup.string()
    .oneOf(["MUSIC", "FILM", "SPORT", "EDUCATION"], "Invalid category")
    .required("Category is required"),
  thumbnail: Yup.mixed().required("Thumbnail is required"),
  tickets: Yup.array()
    .of(
      Yup.object().shape({
        type: Yup.string()
          .oneOf(["STANDARD", "VIP", "VVIP", "FREE"], "Invalid ticket type")
          .required("Ticket type is required"),
        price: Yup.number().min(0, "Price must be greater than or equal to 0"),

        seats: Yup.number()
          .min(1, "Seats must be greater than or equal to 1")
          .required("Seats are required"),
        lastOrder: Yup.date()
          .required("Last order date is required")
          .typeError("Invalid last order date"),
      })
    )
    .min(1, "At least one ticket is required"),
});
