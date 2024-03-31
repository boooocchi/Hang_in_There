import { Piece } from '@prisma/client';
import React from 'react';

import Button from '@/components/elements/button/Button';
import { generateAIAdvise } from '@/features/advise/utils/chatGPT';
import { usePieceSelectModal } from '@/hooks/usePieceSelectModal';

const Form = () => {
  const [message, setMessage] = React.useState('');
  const [aiResponse, setAiResoponse] = React.useState<string>('');
  const [sentMessage, setSentMessage] = React.useState<string>('');

  const [isResponseLoading, setResponseLoading] = React.useState(false);

  const createMessage = (piece: Piece) => {
    setMessage(
      `I would like to ask for good matching pieces for this item below

Name: ${piece.title}
Description: ${piece.description}
Color: ${piece.color}`,
    );
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!message) return;
    setAiResoponse('');
    setSentMessage(message);
    setMessage('');

    setResponseLoading(true);
    const response = await generateAIAdvise(message);
    setAiResoponse(response.message.content);
    setResponseLoading(false);
  };

  const { Modal, setIsModalOpen } = usePieceSelectModal({ createMessage });

  return (
    <form onSubmit={(e) => onSubmit(e)} className="h-full max-h-full relative">
      <div className="flex flex-col h-full w-full overflow-y-scroll">
        <div className="h-[85%] overflow-y-scroll flex flex-col gap-3">
          {sentMessage && (
            <div className="w-full flex justify-end">
              <div className="relative bg-lightGreen w-[70%] whitespace-pre-wrap p-md rounded-md mr-[30px] userSpeechBubble">
                {sentMessage}
              </div>
            </div>
          )}
          {isResponseLoading && (
            <div className="relative ml-[30px] bg-lightGreen whitespace-pre-wrap p-md rounded-md aiSpeechBubble w-[50%]">
              waiting for AI response...
            </div>
          )}
          {aiResponse && (
            <div className="relative ml-[30px] bg-lightGreen w-[70%] whitespace-pre-wrap p-md rounded-md aiSpeechBubble">
              {aiResponse}
            </div>
          )}
        </div>

        <div className="bottom-0 absolute flex min-h-[10%] max-h-[150px] items-end w-full flex-col">
          <div className="w-full flex justify-end">
            <button
              onClick={() => {
                setIsModalOpen(true);
              }}
              type="button"
              className="underline mb-1"
            >
              Wanna ask about your piece?
            </button>
          </div>
          <div className="py-xs bg-gray w-full">
            <div className="w-full">
              <div className="relative">
                <div
                  className=" py-sm px-md   overflow-y-hidden whitespace-pre-wrap   invisible 
             break-words max-h-[150px] min-h-[44px] leading-normal"
                >
                  {message}
                </div>
                <textarea
                  placeholder="Ask for an AI suggestion on your outfit"
                  className="absolute right-0 top-0 bottom-0 left-0 bg-lightGreen rounded-md py-sm px-md w-full  resize-none leading-normal "
                  value={message}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value)}
                />
                <Button classname="px-sm py-xs  absolute right-3 top-[22px] -translate-y-1/2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5"
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
        </div>
      </div>
      {Modal}
    </form>
  );
};

export default Form;
