$(document).ready(function() {
    
  var logos = [
    "./assets/images/atlantahawks.png",
    "./assets/images/bostonceltics.png",
    "./assets/images/brooklynnets.png",
    "./assets/images/charlottehornets.png",
    "./assets/images/chicagobulls.png",
    "./assets/images/clevelandcavaliers.png",
    "./assets/images/dallasmavericks.png",
    "./assets/images/denvernuggets.png",
    "./assets/images/detroitpistons.png",
    "./assets/images/goldenstatewarriors.png",
    "./assets/images/houstonrockets.png",
    "./assets/images/indianapacers.png"

  ];
  var team_names = ["atlantahawks", "bostonceltics", "brooklynnets","char","chic","cle","dallas","denver","detroit","golden","hous","indiana"];
  for (i in logos) {
    var logo ="<img src=" +logos[i] +" class='png'" +"data-name=" +team_names[i] +" width='100px'" +">";
    $("#logo-holder").append(logo);
  }

  $(document).on("click", ".png", function() {
    $("#logo-holder").hide();
    getPlayerRoster($(this).data("name"));
  });

 

  function getPlayerRoster(team) {
    var queryURL =
      "https://nba-players.herokuapp.com/players-stats-teams/" +
      team.substring(0, 3);
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
        for(i in response){
            //$("#roster-holder").append(response[i].name + "<br>")
            var player = "<a class='player'" +"data-name=" +response[i].name + "data-id="+i +" width='100px'" +">"+response[i].name + "<a><br>"
            $("#roster-holder").append(player);

            //console.log(response[i].name)
        }
        $(document).on("click", ".player", function() {
            $("#roster-holder").hide()
            console.log(response[$(this).data("id")])
            $("#player-card").append("g: "+ response[$(this).data("id")].games_played + "<br>")
            $("#player-card").append("fg%: "+ response[$(this).data("id")].field_goal_percentage + "<br>")
            $("#player-card").append("ft%: "+ response[$(this).data("id")].free_throw_percentage + "<br>")
            $("#player-card").append("rpg: "+ response[$(this).data("id")].rebounds_per_game + "<br>")
            $("#player-card").append("apg: "+ response[$(this).data("id")].assists_per_game + "<br>")
            $("#player-card").append("spg: "+ response[$(this).data("id")].steals_per_game + "<br>")
            $("#player-card").append("bpg: "+ response[$(this).data("id")].blocks_per_game + "<br>")
            $("#player-card").append("ppg: "+ response[$(this).data("id")].points_per_game + "<br>")

        });

    });
  }
});
