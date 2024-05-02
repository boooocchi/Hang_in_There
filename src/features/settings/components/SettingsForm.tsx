import { Categories } from '@prisma/client';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import Button from '@/components/elements/button/Button';
import Input from '@/components/elements/form/Input';

type SettingsFormProps = {
  userData?: {
    userName: string;
    password: string;
    email: string;
    limitEntries: {
      id: string;
      category: Categories;
      value: number;
      userId: string;
    }[];
    googleSignin: boolean;
  };
};

type SettingsFormValuesType = {
  userName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  LIGHTTOPS: number | null;
  HEAVYTOPS: number | null;
  OUTERWEAR: number | null;
  BOTTOMS: number | null;
  SHOES: number | null;
  ACCESSORIES: number | null;
};

const SettingsForm: React.FC<SettingsFormProps> = ({ userData }) => {
  const form = useForm<SettingsFormValuesType>({
    defaultValues: {
      userName: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      LIGHTTOPS: null,
      HEAVYTOPS: null,
      OUTERWEAR: null,
      BOTTOMS: null,
      SHOES: null,
      ACCESSORIES: null,
    },
  });
  const { register, handleSubmit, setValue } = form;
  // const errors = formState.errors;

  useEffect(() => {
    if (userData) {
      setValue('userName', userData.userName);
      setValue('email', userData.email);
      setValue('password', userData.password);
      const categoryToFieldMap: {
        [key in Categories]: 'LIGHTTOPS' | 'HEAVYTOPS' | 'OUTERWEAR' | 'BOTTOMS' | 'SHOES' | 'ACCESSORIES';
      } = {
        LIGHTTOPS: 'LIGHTTOPS',
        HEAVYTOPS: 'HEAVYTOPS',
        OUTERWEAR: 'OUTERWEAR',
        BOTTOMS: 'BOTTOMS',
        SHOES: 'SHOES',
        ACCESSORIES: 'ACCESSORIES',
      };
      userData.limitEntries.forEach((entry) => {
        const fieldName = categoryToFieldMap[entry.category];
        if (fieldName) {
          setValue(fieldName, entry.value);
        }
      });
    }
  }, [setValue, userData]);

  const onSubmit = (data: SettingsFormValuesType) => {
    console.error(data);
  };

  return (
    <div className="h-full w-full flex flex-col ">
      <form className="flex  gap-3xl">
        <div className="flex flex-col gap-sm w-1/2">
          <h2 className="font-boldest text-xl tracking-tight">User Information</h2>
          <Input register={register('userName')} name="userName" label="User Name" />
          <Input register={register('email')} name="email" label="Email" />
          <div className="relative">
            <Input register={register('password')} name="password" label="Password" placeholder="Input password" />
          </div>
          <Input
            register={register('password')}
            name="passwordConfirmation"
            label="Password Confirmation"
            placeholder="Input password again"
          />
        </div>
        <div className="flex flex-col gap-sm w-1/2">
          <h2 className="font-boldest text-xl tracking-tight">Wardrobe Limits</h2>
          <div className="grid grid-cols-2 gap-x-md gap-y-sm">
            {userData?.limitEntries.map((limitEntry, index) => {
              switch (limitEntry.category) {
                case 'LIGHTTOPS':
                  return (
                    <div key={index} className="flex gap-sm">
                      <Input
                        register={register(limitEntry.category)}
                        name={`limitEntries.${index}`}
                        label="Light tops"
                      />
                    </div>
                  );
                case 'HEAVYTOPS':
                  return (
                    <div key={index} className="flex gap-sm">
                      <Input
                        register={register(limitEntry.category)}
                        name={`limitEntries.${index}`}
                        label="Heavy tops"
                      />
                    </div>
                  );
                case 'OUTERWEAR':
                  return (
                    <div key={index} className="flex gap-sm">
                      <Input
                        register={register(limitEntry.category)}
                        name={`limitEntries.${index}`}
                        label="Outerwear"
                      />
                    </div>
                  );
                case 'BOTTOMS':
                  return (
                    <div key={index} className="flex gap-sm">
                      <Input register={register(limitEntry.category)} name={`limitEntries.${index}`} label="Bottoms" />
                    </div>
                  );
                case 'SHOES':
                  return (
                    <div key={index} className="flex gap-sm">
                      <Input register={register(limitEntry.category)} name={`limitEntries.${index}`} label="Shoes" />
                    </div>
                  );
                case 'ACCESSORIES':
                  return (
                    <div key={index} className="flex gap-sm">
                      <Input
                        register={register(limitEntry.category)}
                        name={`limitEntries.${index}`}
                        label="Accessories"
                      />
                    </div>
                  );
                default:
                  return <div key={index}>Error</div>;
              }
            })}
          </div>
        </div>
      </form>
      <Button onClick={handleSubmit(onSubmit)} style="mt-auto">
        Complete edit
      </Button>
    </div>
  );
};

export default SettingsForm;
