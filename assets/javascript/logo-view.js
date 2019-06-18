$(document).ready(function() {
  $("#back-btn-card").hide()
  $("#back-btn-roster").hide()
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
  var team_names = ["atlantahawks", "bostonceltics", "brooklynnets","char","chic","cle","dallas","denver","detroit","gsw","hous","indiana","laclippers","lal","memphisgrizzlies","miami","milwaukeebucks","minnesotatimberwolves","neworleanspelicans","newyorkknicks","okcthunder","orlandomagic","philadelphia","pho","portland","sacremento","sanantoniospurs","torontoraptors","utah","washington"];
  for (i in logos) {
    var logo ="<img src=" +logos[i] +" class='png'" +"data-name=" +team_names[i] +" width='100px'" +">";
    $("#logo-holder").append(logo);
  }

  $(document).on("click", ".png", function() {
    $(".bannertext").hide()
    $("#logo-holder").hide();
    $("#roster-holder").empty()
    console.log(($(this).data("name")))
    getPlayerRoster($(this).data("name"));
    $("#roster-holder").show()
  });

  function getPlayerRoster(team) {
    var queryURL ="https://nba-players.herokuapp.com/players-stats-teams/" +team.substring(0, 3);
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
        $("#back-btn-roster").show()
        for(i in response){
            //$("#roster-holder").append(response[i].name + "<br>")
            var player = "<a class='player'" +"data-name=" +response[i].name + " data-id="+i+" width='100px'" +">"+response[i].name + "<a><br>"
            $("#roster-holder").append(player);
            //console.log(response[i].name)
        }
        $(document).on("click", ".player", function() {
            $("#roster-holder").hide()
            var player_id = $(this).data("id")
            var name = response[player_id].name.split(" ")
            getPlayerCard(player_id, team.substring(0,3),name[0],name[1])
            console.log(player_id)
            $("#back-btn-roster").hide()
        });
        $(document).on("click","#back-btn-roster",function(){
            $("#back-btn-roster").hide()
            $(".bannertext").show()
            $("#logo-holder").show()
            $("#roster-holder").hide()
        })
    });
  }

  function getPlayerCard(player_id, team,fname,lname){
      var queryURL = "https://nba-players.herokuapp.com/players-stats-teams/"+team;
      $.ajax({
          url: queryURL,
          method: "GET"
      }).then(function(response){
        $("#back-btn-card").show()
        $("#player-card").show()
          console.log(player_id)
        var url = 'https://nba-players.herokuapp.com/players/'+lname+'/'+fname;
        console.log(fname,lname)
        $("#player-card").html("<img src="+url+ " width='300px'><br>")
        $("#player-card").append("g: "+ response[player_id].games_played + "<br>")
        $("#player-card").append("fg%: "+ response[player_id].field_goal_percentage + "<br>")
        $("#player-card").append("ft%: "+ response[player_id].free_throw_percentage + "<br>")
        $("#player-card").append("rpg: "+ response[player_id].rebounds_per_game + "<br>")
        $("#player-card").append("apg: "+ response[player_id].assists_per_game + "<br>")
        $("#player-card").append("spg: "+ response[player_id].steals_per_game + "<br>")
        $("#player-card").append("bpg: "+ response[player_id].blocks_per_game + "<br>")
        $("#player-card").append("ppg: "+ response[player_id].points_per_game + "<br>")
      })

      $(document).on("click","#back-btn-card",function(){
        $("#back-btn-card").hide()
        $("#roster-holder").show()
        $("#back-btn-roster").show()
        $("#player-card").hide()
        
      })
      
  }
});
