import React from 'react';
import { useDropzone } from 'react-dropzone';

type DropZoneProps = {
  className?: string;
  handleFileSelect: (fileName: File) => void;
  deleteFile: () => void;
};

type FileWithPreview = File & { preview: string };

const DropZone: React.FC<DropZoneProps> = ({ className, handleFileSelect, deleteFile }) => {
  const [file, setFile] = React.useState<FileWithPreview | null>(null);

  const onDrop = React.useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles[0]) {
        const fileWithPreview: FileWithPreview = Object.assign(acceptedFiles[0], {
          preview: URL.createObjectURL(acceptedFiles[0]),
        });
        setFile(fileWithPreview);
      }
      handleFileSelect(acceptedFiles[0]);
    },
    [handleFileSelect],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  React.useEffect(() => {
    return () => {
      if (file) {
        URL.revokeObjectURL(file.preview);
      }
    };
  }, [file]);

  return (
    <div {...getRootProps({ className: className })}>
      <div>
        <input {...getInputProps()} />
        {file ? (
          <div
            className="relative flex flex-col justify-center items-center
          gap-[3px] mt-3"
          >
            <div className="relative flex justify-center">
              <button
                className=" absolute
              -top-[3%]
              right-[12%]
              bg-black
              text-white
              justify-center
              rounded-full
              items-center
              cursor-pointer
              p-[3px]"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteFile();
                  setFile(null);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="white"
                  className="w-4 h-4 drop-shadow-lg"
                >
                  <path strokeLinecap="square" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <img src={file.preview} alt="Preview" className="w-[70%] max-h-[400px]" />
            </div>
            <p className={` text-center w-full`}>{file.name}</p>
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 64 64"
              width="40px"
              height="40px"
              className="fill-richGreen"
            >
              <g fill="#11221G">
                <path d="M51.8 50.4H12.3c-2.3 0-4.2-1.9-4.2-4.2V18c0-2.3 1.9-4.2 4.2-4.2h39.5c2.3 0 4.2 1.9 4.2 4.2v28.2c0 2.3-1.9 4.2-4.2 4.2zM12.2 16.5c-.8 0-1.4.6-1.4 1.4v28.2c0 .8.6 1.4 1.4 1.4h39.5c.8 0 1.4-.6 1.4-1.4V17.9c0-.8-.6-1.4-1.4-1.4H12.2z"></path>
                <path d="M39.1 30.5c-3.1 0-5.5-2.5-5.5-5.5s2.5-5.5 5.5-5.5 5.5 2.5 5.5 5.5-2.5 5.5-5.5 5.5zm0-8.5c-1.6 0-2.9 1.3-2.9 2.9 0 1.6 1.3 2.9 2.9 2.9 1.6 0 2.9-1.3 2.9-2.9 0-1.6-1.3-2.9-2.9-2.9zM46.6 49.9 23.5 28.2 10.3 40.4l-1.8-1.9 15-13.9L48.4 48l-1.8 1.9"></path>
                <path d="m53.8 42.7-7.7-6.2-6.4 5.3-1.7-2.1 8.1-6.6 9.3 7.6-1.6 2"></path>
              </g>
            </svg>

            <p className="text-richGreen text-base text-center">
              {' '}
              {isDragActive ? (
                'Drop the image here ...'
              ) : (
                <>
                  Drag and drop a image here, <br /> or click to select a file
                </>
              )}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DropZone;
