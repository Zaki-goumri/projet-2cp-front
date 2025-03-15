interface CtaButtonProps {
  Text: string;
  onClick?: (input: any) => void;
  Color?: string;
  Style?: string;
  type?: 'submit' | 'button' | 'reset';
}
const CtaButton = ({ Color, Text, onClick, Style, type }: CtaButtonProps) => {
  return (
    <div className="w-fit">
      <button
        type={type}
        className={`${Color} cursor-pointer rounded-lg px-6 py-4 text-center font-bold text-white ${Style}`}
      >
        {Text}
      </button>
    </div>
  );
};

export default CtaButton;
