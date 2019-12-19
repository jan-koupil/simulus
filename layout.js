let layout = {};

layout.historyLength = 0; //number of points to display. Set to 0 to show full history, set to 1 to show current position only


layout.chartProps = { //use canvasjs documentation to find all properties
    title: {
        text: "Simulation"
      },

    axisX: {
        minimum: 0,
        maximum: 600,
        gridThickness: 0
    },

    axisY: {
        minimum: 0,
        maximum: 70,
        gridThickness: 0
    },

    data: [ //prepare as many datasets as required
        {
            type: "scatter",
            color: "#778899",
            //markerType: "cross",
            markerSize: 5,
            dataPoints: [
            ]
        },
        {
            type: "scatter",
            color: "#ff0000",
            //markerType: "cross",
            markerSize: 30,
            dataPoints: [
            ]
        }
    ]
};
