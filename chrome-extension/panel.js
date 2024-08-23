// Function to fetch and display the JSON

function fetchAndDisplayJSON() {
  chrome.devtools.inspectedWindow.eval(
    '__laravext.page_data',
    function(result, isException) {
      if (isException) {
        result = {}
      } 
        // In case you don't want ziggy to bloat the output,
        // you can uncomment this line
        // delete result.shared_props.ziggy;

        var jsonViewer = new JSONViewer();
        document.getElementById("json").innerHTML = ""; // Clear previous content
        document.getElementById("json").appendChild(jsonViewer.getContainer());
        jsonViewer.showJSON(result);
      
    }
  );
}

fetchAndDisplayJSON();

// when refresh button is clicked, fetch and display JSON
document.getElementById('refresh').addEventListener('click', fetchAndDisplayJSON);