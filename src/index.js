import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import  { ContextProvider } from './context/store'
import { QueryClientProvider, QueryClient } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // tat chuc nang refetch khi chuyen cua so
      refetchOnWindowFocus: false,
      staleTime: 60 * 1000,
    }
  }
})
axios.defaults.baseURL = 'http://localhost:5000/api'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ContextProvider>
        <QueryClientProvider client={queryClient}>
        <App />
        <ToastContainer />
        <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </ContextProvider>
    </BrowserRouter>
   </React.StrictMode>,
  document.getElementById('root')
);


