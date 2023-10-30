import { CheckIcon, ClockIcon } from '@heroicons/react/outline';
import { ArrowCircleDownIcon, ArrowCircleUpIcon } from '@heroicons/react/solid';
import clsx from 'clsx';

export default function InvoiceStatus({ status }: { status: string }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-xs',
        {
          'bg-red-500 text-white': status.startsWith('-'),
          'bg-green-500 text-white': !status.startsWith('-'),
        },
      )}
    >
      {status.startsWith('-') ? (
        <>
          <p>{status}</p>
          <ArrowCircleDownIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
      {!status.startsWith('-') ? (
        <>
          {status}
          <ArrowCircleUpIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
    </span>
  );
}
