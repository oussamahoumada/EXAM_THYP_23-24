let AllItems;
const url = "http://localhost/Paris8/master2/omeka-s/api/items";
getData(url);
function getData(url) {
  d3.json(url, (error, results) => {
    if (error) throw error;
    AllItems = results;
    showItems(AllItems);
  });
}

function doFiltre() {
  const text = document.getElementById("filter").value;
  if (text != "") {
    let new_data = AllItems.filter(function (d) {
      const title = new String(d["o:title"]);
      return title.includes(text);
    });
    showItems(new_data);
    return;
  }
  showItems(AllItems);
}

function showItems(data) {
  document.getElementById("card_items").innerHTML = "";

  let cards = d3
    .select("#card_items")
    .selectAll("div")
    .data(data)
    .enter()
    .append("div")
    .attr("class", "card");
  cards
    .append("div")
    .attr("class", "card-body")
    .append("h2")
    .text((d) => d["o:id"])
    .append("p")
    .text((d) => d["o:title"])
    .append("p")
    .text((d) => {
      if (d["jxo:score"] != undefined)
        return "score : " + d["jxo:score"][0]["@value"];
    });
}
