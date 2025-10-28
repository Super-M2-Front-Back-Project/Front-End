interface IProps {
    label: string;
}

const Index = ({ label }:IProps) => {
  return (
    <div>
      <label htmlFor="">
        <input type="checkbox" />
        {label}
      </label>
    </div>
  );
};
export default Index;