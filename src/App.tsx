import { QueryClient, QueryClientProvider } from 'react-query'
import Form from './components/Form';
import Result from './components/Result';

import { FormProvider } from './context/FormProvider';

import './App.css';

const queryClient = new QueryClient()

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="global--container">
        <FormProvider>
          <Form />
          <Result />
        </FormProvider>
      </div>
    </QueryClientProvider>
  );
}

export default App;
