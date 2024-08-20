export default function SingleProfile({ params }: any) {
  return (
    <div className="flex justify-center gap-3 items-center w-full h-screen">
      hi this is you
      <span className="p-2 rounded-lg bg-orange-500 text-black">{params.id}</span>
    </div>
  );
}
