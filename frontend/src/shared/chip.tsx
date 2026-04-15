import "./chip.scss";

const Chip = ({
  text,
  image,
  variant = "advanced",
}: {
  text: string;
  image: string;
  variant?: "advanced" | "familiar";
}) => {
  return (
    <div className={`chip ${variant}`}>
      {image && <img src={`/icons/${image}`} alt="" />}
      <div className="text">{text}</div>
    </div>
  );
};

export default Chip;
