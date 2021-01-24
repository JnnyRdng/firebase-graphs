import { HotTable } from '@handsontable/react';
import 'handsontable/dist/handsontable.full.css';

export default function SpreadSheet(props) {

  const dummy = [
    ['', 'Tesla', 'Mercedes', 'Toyota', 'Volvo'],
    ['2019', 10, 11, 12, 13],
    ['2020', 20, 11, 14, 13],
    ['2021', 30, 15, 12, 13]
  ];

  return (
    <HotTable data={dummy} colHeaders={true} rowHeaders={true} width="600" height="300" licenseKey="non-commercial-and-evaluation" />
  );
}