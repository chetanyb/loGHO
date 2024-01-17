const Button = ({ children, onClick, className }) => {
    return (
      <button
        className={`bg-gho-dark-primary text-white font-bold py-2 px-4 rounded-full hover:bg-gho-light-primary ${className}`}
        onClick={onClick}
      >
        {children}
      </button>
    );
  };
  
  export default Button;
  