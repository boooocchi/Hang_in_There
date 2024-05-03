import { gql, useMutation } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';
import { Categories } from '@prisma/client';
import React, { useEffect } from 'react';
import { FieldErrors, useForm } from 'react-hook-form';

import Button from '@/components/elements/button/Button';
import Input from '@/components/elements/form/Input';
import { useToast } from '@/contexts/ToastContext';
import { useAuth } from '@/hooks/useAuth';
import { getErrorMessage } from '@/utils/errorHandler';

import { settingsValidationSchema } from '../validation/settingsValidation';

const UPDATE_USER_INFO_MUTATION = gql`
  mutation Mutation($userId: String!, $userName: String!, $email: String!, $limitEntries: [LimitEntryInput]!) {
    update_user_info(userId: $userId, userName: $userName, email: $email, limitEntries: $limitEntries) {
      success
    }
  }
`;

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
  password?: string;
  passwordConfirmation?: string;
  LIGHTTOPS: number;
  HEAVYTOPS: number;
  OUTERWEAR: number;
  BOTTOMS: number;
  SHOES: number;
  ACCESSORIES: number;
};
interface CustomError extends FieldErrors<SettingsFormValuesType> {
  samePassword?: { message: string; type: string; ref?: React.RefObject<HTMLInputElement> };
}

const SettingsForm: React.FC<SettingsFormProps> = ({ userData }) => {
  const { userId } = useAuth();
  const form = useForm<SettingsFormValuesType>({
    resolver: yupResolver(settingsValidationSchema),
  });
  const { register, handleSubmit, setValue, formState } = form;
  const errors: CustomError = formState.errors;
  const { addToastMessage } = useToast();

  const [update_user_info] = useMutation(UPDATE_USER_INFO_MUTATION);

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

  const onSubmit = async (data: SettingsFormValuesType) => {
    const args = {
      userId,
      userName: data.userName,
      email: data.email,
      password: data.password ?? undefined,
      limitEntries: [
        { category: Categories.LIGHTTOPS, value: data.LIGHTTOPS },
        { category: Categories.HEAVYTOPS, value: data.HEAVYTOPS },
        { category: Categories.OUTERWEAR, value: data.OUTERWEAR },
        { category: Categories.BOTTOMS, value: data.BOTTOMS },
        { category: Categories.SHOES, value: data.SHOES },
        { category: Categories.ACCESSORIES, value: data.ACCESSORIES },
      ],
    };

    try {
      await update_user_info({
        variables: args,
      });
      addToastMessage('User information updated successfully');
    } catch (error) {
      addToastMessage(getErrorMessage(error), true);
    }
  };

  return (
    <div className="h-full w-full flex flex-col ">
      <form className="flex  flex-col h-full" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex xs:flex-row flex-col  xs:gap-3xl gap-xl">
          <div className="flex flex-col gap-md xs:w-1/2">
            <h2 className="font-boldest text-xl tracking-tight">User Information</h2>
            <Input
              register={register('userName')}
              name="userName"
              label="User Name"
              errorMessage={errors?.userName?.message}
            />
            <Input register={register('email')} name="email" label="Email" errorMessage={errors?.email?.message} />
            <div className="relative">
              <Input
                register={register('password')}
                name="password"
                label="Password"
                placeholder="Input password"
                errorMessage={errors?.samePassword?.message || errors?.password?.message}
              />
              <p></p>
            </div>
            <Input
              register={register('passwordConfirmation')}
              name="passwordConfirmation"
              label="Password Confirmation"
              placeholder="Input password again"
              errorMessage={errors?.passwordConfirmation?.message}
            />
          </div>
          <div className="flex flex-col gap-md xs:w-1/2">
            <h2 className="font-boldest text-xl tracking-tight">Wardrobe Limits</h2>
            <div className="grid grid-cols-2 gap-x-md gap-y-md">
              {userData?.limitEntries.map((limitEntry, index) => {
                switch (limitEntry.category) {
                  case 'LIGHTTOPS':
                    return (
                      <div key={index} className="flex gap-sm">
                        <Input
                          register={register(limitEntry.category)}
                          name={`limitEntries.${index}`}
                          label="Light tops"
                          errorMessage={errors?.LIGHTTOPS?.message}
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
                          errorMessage={errors?.HEAVYTOPS?.message}
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
                          errorMessage={errors?.OUTERWEAR?.message}
                        />
                      </div>
                    );
                  case 'BOTTOMS':
                    return (
                      <div key={index} className="flex gap-sm">
                        <Input
                          register={register(limitEntry.category)}
                          name={`limitEntries.${index}`}
                          label="Bottoms"
                          errorMessage={errors?.BOTTOMS?.message}
                        />
                      </div>
                    );
                  case 'SHOES':
                    return (
                      <div key={index} className="flex gap-sm">
                        <Input
                          register={register(limitEntry.category)}
                          name={`limitEntries.${index}`}
                          label="Shoes"
                          errorMessage={errors.SHOES?.message}
                        />
                      </div>
                    );
                  case 'ACCESSORIES':
                    return (
                      <div key={index} className="flex gap-sm">
                        <Input
                          register={register(limitEntry.category)}
                          name={`limitEntries.${index}`}
                          label="Accessories"
                          errorMessage={errors.ACCESSORIES?.message}
                        />
                      </div>
                    );
                  default:
                    return <div key={index}>Error</div>;
                }
              })}
            </div>
          </div>
        </div>
        <Button style="xs:mt-auto mt-2xl">Complete edit</Button>
      </form>
    </div>
  );
};

export default SettingsForm;
