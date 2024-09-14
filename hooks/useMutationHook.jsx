import { useMutation, useQueryClient } from "@tanstack/react-query";

const useMutationHook = (mutationFn, config = {}) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: mutationFn,
    onSuccess: (data, variables, context) => {
      config.onSuccess && config.onSuccess(data, variables, context);
      if (config.key) {
        queryClient.invalidateQueries(config.key);
      }
    },
    onError: (error, variables, context) => {
      config.onError && config.onError(error, variables, context);
    },
  });
  return {
    ...mutation,
    isSuccess: mutation.isSuccess && mutation.data?.status === 200,
    errorMessage: mutation.isError
      ? mutation?.error?.response?.data?.message || "An error occurred"
      : null,
  };
};

export default useMutationHook;
