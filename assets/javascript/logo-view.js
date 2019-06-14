$(document).ready(function() {
  $("#back-btn").hide()
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
    "./assets/images/indianapacers.png",
    "./assets/images/losangelesclippers.png",
    "./assets/images/losangeleslakers.png",
    "./assets/images/memphisgrizzlies.png",
    "./assets/images/miamiheat.png",
    "./assets/images/milwaukeebucks.png",
    "./assets/images/minnesotatimberwolves.png",
    "./assets/images/neworleanspelicans.png",
    "./assets/images/newyorkknicks.png",
    "./assets/images/okcthunder.png",
    "./assets/images/orlandomagic.png",
    "./assets/images/philadelphia76ers.png",
    "./assets/images/phoenixsuns.png",
    "./assets/images/portlandtrailblazers.png",
    "./assets/images/sacramentokings.png",
    "./assets/images/sanantoniospurs.png",
    "./assets/images/torontoraptors.png",
    "./assets/images/utahjazz.png",
    "./assets/images/washingtonwizards.png"
  ];
  var team_names = ["atlantahawks", "bostonceltics", "brooklynnets","char","chic","cle","dallas","denver","detroit","golden","hous","indiana","clippers","losangeleslakers","memphisgrizzlies","miami","milwaukeebucks","minnesotatimberwolves","neworleanspelicans","newyorkknicks","okcthunder","orlandomagic","philadelphia","pheonix","portland","sacremento","sanantoniospurs","torontoraptors","utah","washington"];
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
            var player = "<a class='player'" +"data-name=" +response[i].name + " data-id="+i+" width='100px'" +">"+response[i].name + "<a><br>"
            $("#roster-holder").append(player);
            //console.log(response[i].name)
        }
        $(document).on("click", ".player", function(e) {
            $("#roster-holder").hide()
            player_id = $(this).data("id")
            getPlayerCard(player_id, team.substring(0,3))
            console.log(player_id)
        });

    });
  }


  function getPlayerCard(player_id, team){
      var queryURL = "https://nba-players.herokuapp.com/players-stats-teams/"+team;
      $.ajax({
          url: queryURL,
          method: "GET"
      }).then(function(response){

          console.log(player_id)
        $("#player-card").append("g: "+ response[player_id].games_played + "<br>")
        $("#player-card").append("fg%: "+ response[player_id].field_goal_percentage + "<br>")
        $("#player-card").append("ft%: "+ response[player_id].free_throw_percentage + "<br>")
        $("#player-card").append("rpg: "+ response[player_id].rebounds_per_game + "<br>")
        $("#player-card").append("apg: "+ response[player_id].assists_per_game + "<br>")
        $("#player-card").append("spg: "+ response[player_id].steals_per_game + "<br>")
        $("#player-card").append("bpg: "+ response[player_id].blocks_per_game + "<br>")
        $("#player-card").append("ppg: "+ response[player_id].points_per_game + "<br>")
      })

      $(document).on("click","#back-btn",function(){
        $("#back-btn").hide()
        getPlayerRoster()
      })
      
  }
});