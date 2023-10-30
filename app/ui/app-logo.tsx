import { GlobeAltIcon } from '@heroicons/react/outline';
import { lusitana } from '@/app/ui/fonts';

export default function AppLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center  text-white`}
    >
      <GlobeAltIcon className="h-12 w-12 rotate-[15deg]" />
      <p className="ml-1 text-[20px]">GrowwStonks</p>
    </div>
  );
}
