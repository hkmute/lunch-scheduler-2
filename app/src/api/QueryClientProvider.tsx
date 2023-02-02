import { useUpdateError } from "@/context/ErrorContext";
import { AppErrorResponse } from "@/types";
import {
  QueryClient,
  QueryClientProvider as ReactQueryClientProvider,
} from "@tanstack/react-query";
import { AxiosError } from "axios";

type Props = {
  children: React.ReactElement;
};

const QueryClientProvider: React.FC<Props> = ({ children }) => {
  const updateError = useUpdateError();

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        onError: handleError(updateError),
      },
      mutations: {
        onError: handleError(updateError),
      },
    },
  });

  return (
    <ReactQueryClientProvider client={queryClient}>
      {children}
    </ReactQueryClientProvider>
  );
};

function handleError(updateError: ReturnType<typeof useUpdateError>) {
  return (error: AxiosError<AppErrorResponse>) => {
    const errorDetails = error.toJSON();
    if (
      errorDetails.code === "ECONNABORTED" ||
      errorDetails.code === "ERR_NETWORK"
    ) {
      return updateError({ message: "Network Error" });
    }
    return updateError({
      message: error.response?.data?.error || "Unexpected Error",
    });
  };
}

export default QueryClientProvider;
