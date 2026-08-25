type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    children: React.ReactNode;
};

function Button({ children, className = "", ...props }: Props) {
    return (
        <button
            {...props}
            className={`cursor-pointer active:scale-95 transition-transform duration-100 ${className}`}
        >
            {children}
        </button>
    );
}

export default Button;