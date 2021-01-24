function BarChart({ vars, type }) {


  return (
    <svg
      ref={ref}
      style={{
        border: "1px solid black",
        height: height,
        width: width,
        // marginRight: "0px",
        // marginLeft: "0px",
      }}
    >
      <g className="plot-area" />
      <g className="x-axis" />
      <g className="y-axis" />
      <g className="y-axis-lines" />
    </svg>
  );
}

export default BarChart;
