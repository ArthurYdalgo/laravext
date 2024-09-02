export default function InputError({ message, className = '', ...props }) {

    // if message is a list, join them
    if (message && Array.isArray(message)) {
        message = message.join(', ');
    }

    return message ? (
        <p {...props} className={'text-sm text-red-600 ' + className}>
            {message}
        </p>
    ) : null;
}
