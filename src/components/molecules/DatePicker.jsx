import Input from "@/components/atoms/Input";
import ApperIcon from "@/components/ApperIcon";

const DatePicker = ({ label, value, onChange, error, ...props }) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-slate-700">
        {label}
      </label>
      <div className="relative">
        <ApperIcon 
          name="Calendar" 
          size={20} 
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
        />
        <Input
          type="date"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          error={error}
          className="pl-12"
          {...props}
        />
      </div>
      {error && (
        <p className="text-sm text-error font-medium">{error}</p>
      )}
    </div>
  );
};

export default DatePicker;