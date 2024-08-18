interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="text-center text-red-600 mt-8">
      <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
      <p>{message}</p>
    </div>
  );
};

export default ErrorMessage;
