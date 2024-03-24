import { Toaster } from 'react-hot-toast';

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen py-2 shadow-sm m-20 rounded-lg bg-slate-500">
      <Toaster toastOptions={{ position: 'top-center' }} />
      <div className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1>Product Demo App</h1>
        <p>List of products</p>
      </div>
      <div className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center"></div>
    </section>
  );
}
