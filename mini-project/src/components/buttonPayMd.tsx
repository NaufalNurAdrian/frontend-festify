"use client";

export default function PayButton({ token }: { token: string }) {
  const handleClick = async () => {
    window.snap.pay(token);
  };
  return (
    <button
      onClick={handleClick}
      className="py-2 bg-lightBlue text-white font-medium rounded-2xl bg-red w-[15%]"
    >
      Pay Now
    </button>
  );
}
