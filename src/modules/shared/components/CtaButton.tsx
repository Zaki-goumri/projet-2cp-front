interface CtaButtonProps {
  Text:string,
  onClick?:(input:any)=>void
  Color?:string
  Style?:string
  type?:"submit"|"button"|"reset"
}
const CtaButton = ({Color,Text,onClick,Style,type}:CtaButtonProps) => {
  return (
    <div className="w-full">
  <button type={type} className={`${Color} text-white font-bold py-4 px-6 rounded-lg text-center cursor-pointer  ${Style}`} >{Text}</button>

    </div>
  )
}

export default CtaButton
