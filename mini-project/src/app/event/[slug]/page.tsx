import { formatDate, formatDateTime } from "@/helpers/formatDate";
import { getEventSlug } from "@/libs/events";
import { IEvent } from "@/types/event";
import Image from "next/image";
import Link from "next/link";
import { FaCalendarAlt, FaClock, FaMapMarkerAlt } from "react-icons/fa";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const data: IEvent = await getEventSlug(params.slug);

  return {
    title: data.title,
    description: data.description,
    username: data.organizer.username || "Unknown Organizer",
    openGraph: {
      images: [`https:${data.thumbnail}`],
    },
  };
}

export default async function EventDetail({
  params,
}: {
  params: { slug: string };
}) {
  const data: IEvent = await getEventSlug(params.slug);

  console.log(data);

  return (
    <div className="max-w-6xl mx-auto p-4 py-14">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Image
            src={data.thumbnail}
            alt="Cinta Kala Senja"
            width={700}
            height={300}
            className="rounded-lg"
          />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md ">
          <h2 className="text-xl font-bold mb-4 pb-4">{data.title}</h2>
          <div className="space-y-2 text-gray-600">
            <div className="flex items-center gap-2">
              <FaCalendarAlt />
              <span>
                {formatDate(data.startTime)} - {formatDate(data.endTime)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <FaClock />
              <span>
                {formatDateTime(data.startTime)} -{" "}
                {formatDateTime(data.endTime)} WIB
              </span>
            </div>
            <div className="flex items-center gap-2 lg:pb-36 pb-24">
              <FaMapMarkerAlt />
              <span>{data.location}</span>
            </div>
          </div>
          <hr className="border border-dashed border-gray-400" />
          <p className="mt-4 text-sm text-gray-500">
            Diselenggarakan oleh{" "}
            <span className="font-medium text-lg flex flex-col">
              {data.organizer.username}
            </span>
          </p>
        </div>
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md flex justify-between items-center ">
          <div>
            <p className="text-gray-500">Harga mulai dari</p>
            <p className="text-2xl font-bold">Rp200.000</p>
          </div>
          <Link href="/buy-ticket">
            <button className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
              Beli Tiket
            </button>
          </Link>
        </div>
      </div>

      <div className="mt-8">
        <div className="border-b mb-4">
          <button className="pb-2 px-4 border-b-2 border-blue-500 text-blue-500 font-bold">
            DESKRIPSI
          </button>
          <button className="pb-2 px-4 text-gray-500">TIKET</button>
        </div>
        <p className="text-gray-700">{data.description}</p>

        <h3 className="mt-6 font-bold text-gray-800">Syarat & Ketentuan</h3>
        <ul className="list-disc list-inside mt-2 text-gray-600">
          <li>
            <strong>No outside food or drink allowed</strong>
          </li>
          <li className="italic text-red-500">
            Dilarang membawa makanan atau minuman dari luar event
          </li>

          <li>Tickets are non-refundable</li>
          <li className="italic text-red-500">
            Tiket yang sudah dibeli tidak dapat dikembalikan
          </li>
        </ul>
      </div>
    </div>
  );
}
