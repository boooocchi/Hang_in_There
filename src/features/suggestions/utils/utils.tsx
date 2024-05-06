import Link from 'next/link';
import React from 'react';

export const convertAiMessage = (message: string) => {
  const options = message.trim().split('\n\n');
  const formattedOptions = options.map((option) => {
    const [itemName, reason] = option.split('\n');
    if (!itemName || !reason) return { itemName: '', reason: '' };
    return {
      itemName: itemName.trim().substring(9).trim(),
      reason: reason.trim().substring(8),
    };
  });

  return (
    <div>
      <ul className="flex flex-col gap-3">
        {formattedOptions.map((option, index) => (
          <li key={index}>
            <p className="font-extraBold">
              Option{index + 1}: {option.itemName}
            </p>
            <p className="">Reason: {option.reason}</p>
            <SearchLink link={option.itemName} />
          </li>
        ))}
      </ul>
    </div>
  );
};

const SearchLink: React.FC<{ link: string }> = ({ link }) => {
  return (
    <div className="flex items-baseline">
      <span className="">Google Image Search Result: </span>
      <Link
        href={`https://www.google.com/search?q=${link}`}
        className="flex gap-2 items-baseline font-extraBold"
        target="_blank"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="currentColor"
          className="w-[16px] h-[16px]"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
          />
        </svg>
      </Link>
    </div>
  );
};
