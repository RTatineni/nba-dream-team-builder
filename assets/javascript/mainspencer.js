$(document).ready(function() {
  $("#back-btn-card").hide()
  $("#back-btn-roster").hide()
  $(".bannertext2").hide()
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
    $("bannertext2").show()
  });

  function getPlayerRoster(team) {
    var queryURL ="https://nba-players.herokuapp.com/players-stats-teams/" +team.substring(0, 3);
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
        $("#back-btn-roster").show()
        var container = $('<div class="container"></div>')
        //create a container -- var container = $('<div class="container">')
        var newTable = $("<table class='highlight responsive-table bordered'>")
        //create a table -- var newTable = $("<table class='highlight responsive-table bordered'>")
        var thead = $('<thead><tr><th>"Playername"</th></tr></thead>')
        //create a thead with tr and th 'player name'-- var thead = $('<thead><tr><th>"Playername"</th></tr></thead>')
        var tbody=$('<tbody>')
        //create a tbody-- var tbody=$('<tbody>')
        newTable.append(thead)
        //newTable.append(thead)
        container.append(newTable)
        //container.append(newTable)
        //yay the top of the table is built!
        for(i in response){
            $("#roster-holder").append(response[i].name + "<br>")
            var name = response[i].name
            var tr = $('<tr>');
            var td = $('<td>');
            td.text(name);
            tr.append(td);
            tbody.append(tr);
            var player = "<a class='player'" +"data-name=" +response[i].name + " data-id="+i+" width='100px'" +">"+response[i].name + "<a><br>";
            
            $("#roster-holder").append(player);
            // console.log(response[i].name)
        }
        container.append(tbody)
        $(document).on("click", '.player', function() {
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

  $('.modal').modal()


var firebaseConfig = {
  apiKey: "AIzaSyDjquF_i-ha4twszQrxG09zFCZWXjEDMsc",
  authDomain: "nba-dream-team-f5550.firebaseapp.com",
  databaseURL: "https://nba-dream-team-f5550.firebaseio.com",
  projectId: "nba-dream-team-f5550",
  storageBucket: "nba-dream-team-f5550.appspot.com",
  messagingSenderId: "847958678823",
  appId: "1:847958678823:web:c9f3e25ddf001643"
};

firebase.initializeApp(firebaseConfig);

var database = firebase.database();



//Code for Authorization user to firebase//

// const auth = firebase.auth();

// const promise = auth.signInWithEmailAndPassword(email, pass);
// auth.createUserWithEmailAndPassword(email, pass);

//method which listens to authentication changes- sign in/out//
// firebase.auth().onAuthStateChanged()

//Register First time users with username and password//

document.getElementById("btnSignUp").addEventListener('click', function(e) {
  $("#results").empty();

  console.log("button works");
  const email = document.getElementById("txtEmail").value;
  console.log(email);
// ***Need to validate email*** //

  const pass = document.getElementById("txtPassword").value;
  console.log(pass);
  const auth = firebase.auth();
// ***Need to validate Psw- 6 character length min ***/
 // Validate length

 if(pass.length < 6) {
$("#results").html("Password must contain: Minimum 6 characters");
} 
 
// Create user with email and psw in firebase//
  firebase.auth().createUserWithEmailAndPassword(email, pass).catch(function(error) {
  
    $("#results").html(error.message);
  

  });
});

//Sign in returning user with username and password//

document.getElementById("btnLogin").addEventListener('click', e=>{
  
  const email = document.getElementById("txtEmail").value;
  const pass = document.getElementById("txtPassword").value;
  const auth = firebase.auth();
  const promise = firebase.auth().signInWithEmailAndPassword(email, pass);
  
console.log("Logging in");
$("#results").html("Loggin in");


  promise.catch(e=>{ $("#results").html(e.massage)})
});


 //Acting upon state change (Sign in/Sign out)/
firebase.auth().onAuthStateChanged(user=>{ 
  if(user){
    document.getElementById("btnLogOut").classList.remove('hide')
    $("#results").html("Welcome Back User!");
    console.log(user);
  } else{
    document.getElementById("btnLogOut").classList.add('hide')
    $("#results").html("Not Logged In!")
  }
})

//Logging out//

document.getElementById("btnLogOut").addEventListener('click', e=>{
  firebase.auth().signOut();
 
  console.log('logged out');
  $("#results").html("Logged out");

})

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
  $("#add-player").on("click", function(e) {
    e.preventDefault();
    // api call for uset input - player
    var usersearch = $("#player-input")
      .val()
      .trim();
    var usersearcharray = $("#player-input")
      .val()
      .trim()
      .split(" ");
    //$("#back-btn-search").show();
    console.log(usersearcharray);
    var url =
      "https://nba-players.herokuapp.com/players/" +
      usersearcharray[1] +
      "/" +
      usersearcharray[0];
    $.ajax({
      url: url,
      method: "GET"
    }).then(function(response) {
      $("#logo-holder").hide();
      $("#back-btn-search").show();
      $("#player-card").append("<img src=" + url + " width='300px'><br>");
      $("#add-to-roster-btn").show()
      var playerstats =
        "http://nba-players.herokuapp.com/players-stats/" +
        usersearcharray[1] +
        "/" +
        usersearcharray[0];

      $.ajax({
        url: playerstats,
        method: "GET"
      }).then(function(response) {
        //$("#back-btn-search").show();
        // $("#player-card").html("<img src=" + url + " width='300px'><br>");
        url_link = url;
        player_name = usersearcharray[0] + usersearcharray[1]
        g = response.games_played;
        fg = response.field_goal_percentage;
        ft = response.free_throw_percentage;
        rpg = response.rebounds_per_game;
        apg = response.assists_per_game;
        spg = response.steals_per_game;
        bpg = response.blocks_per_game;
        ppg = response.points_per_game;
        $("#player-card").append("g: " + g + "<br>");
        $("#player-card").append("fg%: " + fg + "<br>" );
        $("#player-card").append("ft%: " + ft + "<br>");
        $("#player-card").append("rpg: " + rpg + "<br>");
        $("#player-card").append("apg: " + apg + "<br>");
        $("#player-card").append("spg: " + spg + "<br>");
        $("#player-card").append("bpg: " + bpg + "<br>");
        $("#player-card").append("ppg: " + ppg + "<br>");
      });
    });
  });

  // When user selects a specific logo, call the GetPlayerRoster function. and hide logos
  $(document).on("click", ".png", function() {
    $("#logo-holder").hide();
    getPlayerRoster($(this).data("name"));
  });

  // When user selects a specific player in roster screen acquire playercard by passing in variables of player and team.
  $(document).on("click", ".player", function(e) {
    e.preventDefault();
    $("#add-to-roster-btn").show();

    var name = $(this)
      .data("name")
      .split(" ");
    
    var team = $(this).data("team");
    var url =
      "https://nba-players.herokuapp.com/players/" + name[1] + "/" + name[0];
    player_name = $(this).data("name");
    $("#player-card").empty();
    getPlayerCard($(this).data("id"), team.substring(0, 3), url);
    getPlayerPosition($(this).data("name"));
    $("#back-btn-roster").hide();
    $("#roster-holder").hide();
  });
  // When user selects back go back to logos by hiding this back button and showing logos
  $(document).on("click", "#back-btn-roster", function(e) {
    e.preventDefault();
    $("#back-btn-roster").hide();
    $("#logo-holder").show();
    $("#roster-holder").empty();
  });
  // When user slects back go back to roster screen and empty before so that new player can be rendered.
  $(document).on("click", "#back-btn-card", function(e) {
    e.preventDefault();
    $("#back-btn-card").hide();
    $("#roster-holder").show();
    $("#back-btn-roster").show();
    $("#player-card").empty();
  });
  $(document).on("click", "#back-btn-search", function(e) {
    $("#player-card").hide();
    $("#back-btn-search").hide();
    $("#logo-holder").show();
  });
  
});
