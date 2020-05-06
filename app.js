    // STEP #1: Import data

d3.json("samples.json").then((importedData) => {

    var data = importedData;

    
    // STEP #2: Append IDs to the dropdown menu

    idArr = []
    
    for (var i = 0; i < data.samples.length; i++) {
        console.log(i);
        idArr.push(data.samples[i].id);
    };

    for (var i = 0; i < idArr.length; i++) {

        d3.select("#selDataset")
            .selectAll("option")
            .data(idArr)
            .enter()
            .append("option")
            .html(function(data) {
                return `<option value="${data}">${data}</option>`
        })
        .exit();
    }
    // STEP #3: Update the demographic info

    var target = d3.select("#sample-metadata")
    target.append("p").text(`ID: ${data.metadata[0].id}`);
    target.append("p").text(`Age: ${data.metadata[0].age}`);
    target.append("p").text(`Ethnicity: ${data.metadata[0].ethnicity}`);
    target.append("p").text(`Gender: ${data.metadata[0].gender}`);
    target.append("p").text(`Location: ${data.metadata[0].location}`);
    target.append("p").text(`BBType: ${data.metadata[0].bbtype}`);


    // STEP #4: Filter the top 10 sample_values

    var printies = data.samples[0].sample_values;
    printies = printies.slice(0, 10);
    var printyIDs = data.samples[0].otu_ids;
    printyIDs = printyIDs.slice(0, 10);
    printyIDs = JSON.stringify(printyIDs)
    var printyLabels = data.samples[0].otu_labels;
    printyLabels = printyLabels.slice(0, 10);


    // STEP #5: Create the Horizontal Bar Plot

    var trace1 = {
        x: printies,
        y: printyIDs,
        type: "bar",
        orientation: "h",
        text: printyLabels
    };

    var hPlot = [trace1];
    
    Plotly.newPlot("bar", hPlot);


    // STEP #6: Create the Bubble Chart

    var trace2 = {
        x: data.samples[0].otu_ids,
        y: data.samples[0].sample_values,
        mode: "markers",
        marker: {
            color: data.samples[0].otu_ids,
            size: data.samples[0].sample_values
        }
    };

    var bubblePlot = [trace2];

    var layout = {
        height: 700,
        width: 1200
    };

    Plotly.newPlot('bubble', bubblePlot, layout);

    // STEP #7: Update the data on change

    d3.selectAll("#selDataset").on("change", optionChanged);

    function optionChanged() {
        var dropdownMenu = d3.select("#selDataset");
        var dropdownSelection = dropdownMenu.property("value");

        for (var i = 0; i < idArr.length; i++) {
            if (dropdownSelection == idArr[i]) {
                var target = d3.select("#sample-metadata")
                target.html("")
                target.append("p").text(`ID: ${data.metadata[i].id}`);
                target.append("p").text(`Age: ${data.metadata[i].age}`);
                target.append("p").text(`Ethnicity: ${data.metadata[i].ethnicity}`);
                target.append("p").text(`Gender: ${data.metadata[i].gender}`);
                target.append("p").text(`Location: ${data.metadata[i].location}`);
                target.append("p").text(`BBType: ${data.metadata[i].bbtype}`);

                var printies = data.samples[i].sample_values;
                printies = printies.slice(0, 10);
                var printyIDs = data.samples[i].otu_ids;
                printyIDs = printyIDs.slice(0, 10);
                printyIDs = JSON.stringify(printyIDs)
                var printyLabels = data.samples[i].otu_labels;
                printyLabels = printyLabels.slice(0, 10);

                var trace1 = {
                    x: printies,
                    y: printyIDs,
                    type: "bar",
                    orientation: "h",
                    text: printyLabels
                };
            
                var hPlot = [trace1];
                
                Plotly.newPlot("bar", hPlot);

                var trace2 = {
                    x: data.samples[i].otu_ids,
                    y: data.samples[i].sample_values,
                    mode: "markers",
                    marker: {
                        color: data.samples[i].otu_ids,
                        size: data.samples[i].sample_values
                    }
                };
            
                var bubblePlot = [trace2];
            
                var layout = {
                    height: 700,
                    width: 1200
                };
            
                Plotly.newPlot('bubble', bubblePlot, layout);
            }
        }
    }

});