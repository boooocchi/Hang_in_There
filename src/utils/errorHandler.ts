import { ApolloError, isApolloError } from '@apollo/client';
import { GraphQLError } from 'graphql';
import { ValidationError } from 'yup';

type InnerGraphQLError = GraphQLError & {
  extensions?: GraphQLError['extensions'] & {
    validationErrors?: ValidationError[];
  };
};

const convertApolloErrorToValidationError = (error?: InnerGraphQLError): ValidationError[] => {
  if (!error) {
    return [];
  }
  return (error.extensions?.validationErrors || []).map(
    (innerError) => new ValidationError(innerError.message, innerError.value, innerError.path, innerError.type),
  );
};

const nonApolloErrorMessage = (error: ApolloError): string | null => {
  const validationErrors = convertApolloErrorToValidationError(error?.graphQLErrors[0]);
  if (validationErrors.length === 0 && error?.graphQLErrors[0]) {
    return error.message;
  }
  return null;
};

export const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) {
    return isApolloError(error) ? nonApolloErrorMessage(error) : error.message;
  } else {
    return null;
  }
};
