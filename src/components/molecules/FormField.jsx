import Input from "@/components/atoms/Input";
import Textarea from "@/components/atoms/Textarea";

const FormField = ({ 
  label, 
  type = "text", 
  error, 
  multiline = false,
  ...props 
}) => {
  const Component = multiline ? Textarea : Input;

  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-slate-700">
        {label}
      </label>
      <Component type={type} error={error} {...props} />
      {error && (
        <p className="text-sm text-error font-medium">{error}</p>
      )}
    </div>
  );
};

export default FormField;