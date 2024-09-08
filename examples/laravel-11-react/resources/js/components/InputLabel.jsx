export default function InputLabel({ value, className = '', fontSizeClass = 'text-sm', children, ...props }) {
    return (
        <label {...props} className={`block font-medium ${fontSizeClass} text-gray-700 dark:text-gray-300 ${className}`}>
            {value ? value : children}
        </label>
    );
}
