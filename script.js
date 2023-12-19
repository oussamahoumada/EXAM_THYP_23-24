let AllItems;
const url = "http://localhost/Paris8/master2/omeka-s/api/items";
loadItems(url);
function loadItems(url) {
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
      const t = new String(d["o:title"]);
      return t.includes(text);
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

  let cardBody = cards.append("div").attr("class", "card-body");

  cardBody
    .append("h2")
    .text((d) => d["o:id"])
    .append("p")
    .text((d) => d["o:title"])
    .append("h4")
    .text((d) => {
      if (d["jxo:hasSport"] != undefined)
        return "sport : " + d["jxo:hasSport"][0]["@value"];
    })
    .append("h4")
    .text((d) => {
      if (d["jxo:hasSportif"] != undefined)
        return "sportif : " + d["jxo:hasSportif"][0]["@value"];
    })
    .append("h4")
    .text((d) => {
      if (d["jxo:score"] != undefined)
        return "score : " + d["jxo:score"][0]["@value"];
    });
}
