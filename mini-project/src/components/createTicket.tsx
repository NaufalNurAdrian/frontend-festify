import React from "react";
import { useFormik } from "formik";
import { ticketSchema } from "@/libs/shema";

interface CreateTicketFormProps {
  onSubmit: (values: any) => void;
}

const CreateTicketForm: React.FC<CreateTicketFormProps> = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      type: "",
      price: 0,
      seats: 0,
      lastOrder: "",
    },
    validationSchema: ticketSchema,
    onSubmit,
  });

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <h3 className="text-xl font-semibold text-gray-700 mb-4">Add Ticket</h3>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-600 font-medium mb-2">Type</label>
          <input
            type="text"
            name="type"
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            value={formik.values.type}
            onChange={formik.handleChange}
          />
          {formik.errors.type && (
            <p className="text-sm text-red-500">{formik.errors.type}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-600 font-medium mb-2">Price</label>
          <input
            type="number"
            name="price"
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            value={formik.values.price}
            onChange={formik.handleChange}
          />
          {formik.errors.price && (
            <p className="text-sm text-red-500">{formik.errors.price}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-600 font-medium mb-2">Seats</label>
          <input
            type="number"
            name="seats"
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            value={formik.values.seats}
            onChange={formik.handleChange}
          />
          {formik.errors.seats && (
            <p className="text-sm text-red-500">{formik.errors.seats}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-600 font-medium mb-2">
            Last Order
          </label>
          <input
            type="date"
            name="lastOrder"
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            value={formik.values.lastOrder}
            onChange={formik.handleChange}
          />
          {formik.errors.lastOrder && (
            <p className="text-sm text-red-500">{formik.errors.lastOrder}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Add Ticket
        </button>
      </form>
    </div>
  );
};

export default CreateTicketForm;
