import { Piece } from '@prisma/client';
import React from 'react';
import { useForm } from 'react-hook-form';

import Button from '@/components/elements/button/Button';
// import { generateAIAdviseWithImage } from '@/features/advise/utils/chatGPT';
import { usePieceSelectModal } from '@/hooks/usePieceSelectModal';

import { OpenAiValues } from '../types/types';

const Form = () => {
  const [selectedPiece, setSelectedPiece] = React.useState<null | Piece>(null);

  const { handleSubmit, register, setValue } = useForm<OpenAiValues>({
    defaultValues: {
      message: '',
      piece: {
        title: '',
        description: '',
        color: null,
        category: null,
      },
    },
  });
  // const [isResponseLoading, setResponseLoading] = React.useState(false);

  React.useEffect(() => {
    if (selectedPiece === null) return;
    setValue('piece.title', selectedPiece.title);
    setValue('piece.description', selectedPiece.description);
    setValue('piece.color', selectedPiece.color);
    setValue('piece.category', selectedPiece.category);
  }, [selectedPiece, setValue]);

  const onSubmit = async () => {
    // console.log(data);
    // setResponseLoading(true);
    // const response = await generateAIAdviseWithImage('can you say hello in japanese');
    // console.log(response);
  };

  const { Modal, setIsModalOpen } = usePieceSelectModal({ setSelectedPiece });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="h-full ">
      <div className="h-full w-full gap-3">
        <div className="h-[90%]">chat section</div>
        <div className="h-[10%] flex items-end">
          <div className="flex  relative  bg-lightGreen rounded-md py-1 w-full ">
            <input
              placeholder="Ask for an AI suggestion on your outfit"
              className="bg-lightGreen rounded-md p-sm w-full"
              {...register('message')}
            />
            <Button classname="px-sm py-xs mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                />
              </svg>
            </Button>
          </div>
        </div>
      </div>
      <button onClick={() => setIsModalOpen(true)}>modal</button>
      {Modal}
    </form>
  );
};

export default Form;
