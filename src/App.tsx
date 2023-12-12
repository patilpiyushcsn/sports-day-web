import "./App.css";
import { RootRoute } from "./routes/root-route";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a client
const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RootRoute />
    </QueryClientProvider>
  );
};

export default App;
