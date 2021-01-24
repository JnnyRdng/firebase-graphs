import { Button } from "../ui/UIElements";
import BarChart from "../d3/BarChart";

export default function Graph({ data, vars, type }) {

  const download = () => {
    return true;
  }

  return (
    <div>
      <BarChart data={data} vars={vars} type={type} />
      <Button text="download graph" click={download} size="large" />
    </div>
  )
}