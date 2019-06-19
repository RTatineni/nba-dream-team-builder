// Initializing Firebase

$(document).ready(function() {
  $("#back-btn-card").hide();
  $("#back-btn-roster").hide();
  $("#back-btn-search").hide();
  $("#add-to-roster-btn").hide();
  var firebaseConfig = {
    apiKey: "AIzaSyASNxFpWnUnEbpKox3TQKajO_UH5pyFHS8",
    authDomain: "nba-page.firebaseapp.com",
    databaseURL: "https://nba-page.firebaseio.com",
    projectId: "nba-page",
    storageBucket: "nba-page.appspot.com",
    messagingSenderId: "75407839994",
    appId: "1:75407839994:web:f0498ddbbc807e28"
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
  var email;
  document.getElementById("btnSignUp").addEventListener("click", function(e) {
    $("#results").empty();
    email = null;
    email = document.getElementById("txtEmail").value;
    // ***Need to validate email*** //

    const pass = document.getElementById("txtPassword").value;
    const auth = firebase.auth();
    // ***Need to validate Psw- 6 character length min ***/
    // Validate length

    if (pass.length < 6) {
      $("#results").html("Password must contain: Minimum 6 characters");
    }

    // Create user with email and psw in firebase//
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, pass)
      .catch(function(error) {
        $("#results").html(error.message);
      });
  });

  //Sign in returning user with username and password//
  document.getElementById("btnLogin").addEventListener("click", e => {
    email = document.getElementById("txtEmail").value;
    const pass = document.getElementById("txtPassword").value;
    const auth = firebase.auth();
    const promise = firebase.auth().signInWithEmailAndPassword(email, pass);

    console.log("Logging in");
    $("#results").html("Loggin in");

    if(email != null){
      database.ref("/user_rosters/" + email.substring(0,3)).on("child_added", function(childSnapshot) {
        //console.log(childSnapshot.val().player_name)
        $("#dream-roster").append("<br>name: "+childSnapshot.val().player_name)
        $("#dream-roster").append("<br><img src=" + childSnapshot.val().url_link + " width='250px'>");
        $("#dream-roster").append("<br> games played: "+childSnapshot.val().g );
        $("#dream-roster").append("<br>fg: "+childSnapshot.val().fg );
        $("#dream-roster").append("<br>ft: "+childSnapshot.val().ft );
        $("#dream-roster").append("<br>rpg: "+childSnapshot.val().rpg );
        $("#dream-roster").append("<br>apg: "+childSnapshot.val().apg );
        $("#dream-roster").append("<br>spg: "+childSnapshot.val().spg);
        $("#dream-roster").append("<br>bpg: "+childSnapshot.val().bpg );
        $("#dream-roster").append("<br>ppg: "+childSnapshot.val().ppg );


        //console.log(player_name)
  
      })
    }

    promise.catch(e => {
      $("#results").html(e.massage);
    });
  });

  $('.modal').modal()
  $('.modal2').modal()

  //Acting upon state change (Sign in/Sign out)/
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      document.getElementById("btnLogOut").classList.remove("hide");
      $("#results").html("Welcome Back User!");
      console.log(user);
    } else {
      document.getElementById("btnLogOut").classList.add("hide");
      $("#results").html("Not Logged In!");
    }
  });

  //Logging out//

  document.getElementById("btnLogOut").addEventListener("click", e => {
    firebase.auth().signOut();

    console.log("logged out");
    $("#results").html("Logged out");
  });

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
    "./assets/images/washingtonwizards.png",
    
  ];

  // Loop through the teams and display each team logo on the screen.
  var team_names = [
    "atlantahawks",
    "bostonceltics",
    "brooklynnets",
    "char",
    "chic",
    "cle",
    "dallas",
    "denver",
    "detroit",
    "gsw",
    "hous",
    "indiana",
    "laclippers",
    "lal",
    "memphisgrizzlies",
    "miami",
    "milwaukeebucks",
    "minnesotatimberwolves",
    "neworleanspelicans",
    "newyorkknicks",
    "okcthunder",
    "orlandomagic",
    "philadelphia",
    "pho",
    "portland",
    "sacremento",
    "sana",
    "torontoraptors",
    "utahjazz",
    "washington"
  ];
  for (i in logos) {
    var logo =
      "<img src=" +
      logos[i] +
      " class='png'" +
      "data-name=" +
      team_names[i] +
      " width='100px'" +
      ">";
    $("#logo-holder").append(logo);
  }
  // Inputs:
  //team: the team name for the player selected
  // Calls the api for acquiring team roster appends each player on the roster to the screen.
  function getPlayerRoster(team) {
    var queryURL =
      "https://nba-players.herokuapp.com/players-stats-teams/" +
      team.substring(0, 3);
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      $("#back-btn-roster").show();

      for (i in response) {
        var player =
          "<a class='player'" +
          "data-name='" +
          response[i].name +
          "' data-team=" +
          team +
          " data-id='" +
          i +
          "' width='100px'" +
          ">" +
          response[i].name +
          "<a><br>";
        console.log(player);
        $("#roster-holder").append(player);
      }
    });
  }
  // Inputs:
  //player_id: the id that the player coresponds to in the roster array.
  //team: the team name for the player selected
  //url : a url for getting the player headshot
  // Calls the api for acquiring stats for a specific player, and appends the stats as well as the picture to the screen.
  var g;
  var fg;
  var ft;
  var rpg;
  var apg;
  var spg;
  var bpg;
  var ppg;
  var url_link;
  var position;
  var player_name;

  function getPlayerCard(player_id, team, url) {
    var queryURL =
      "https://nba-players.herokuapp.com/players-stats-teams/" + team;
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      url_link = url;
      g = response[player_id].games_played;
      fg = response[player_id].field_goal_percentage;
      ft = response[player_id].free_throw_percentage;
      rpg = response[player_id].rebounds_per_game;
      apg = response[player_id].assists_per_game;
      spg = response[player_id].steals_per_game;
      bpg = response[player_id].blocks_per_game;
      ppg = response[player_id].points_per_game;
      $("#back-btn-card").show();
      $("#add-to-roster-btn").show()
      $("#player-card").html("<img src=" + url + " width='300px'><br>");
      $("#player-card").append("g: " + g + "<br>");
      $("#player-card").append("fg%: " + fg + "<br>");
      $("#player-card").append("ft%: " + ft + "<br>");
      $("#player-card").append("rpg: " + rpg + "<br>");
      $("#player-card").append("apg: " + apg + "<br>");
      $("#player-card").append("spg: " + spg + "<br>");
      $("#player-card").append("bpg: " + bpg + "<br>");
      $("#player-card").append("ppg: " + ppg + "<br>");
      
    });
  }

  function getPlayerPosition(name) {
    var queryURL = "https://www.balldontlie.io/api/v1/players/?search=" + name;
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      position = response.data[0].position;
    });
  }


  $("#add-to-roster-btn").on("click", function(event) {
    event.preventDefault();

    database.ref("user_rosters/" + email.substring(0, 3)).push({
      player_name: player_name,
      position: position,
      url_link: url_link,
      g: g,
      fg: fg,
      ft: ft,
      rpg: rpg,
      apg: apg,
      spg: spg,
      bpg: bpg,
      ppg: ppg
    });
  });
  // Search Featuresteve

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
    $(".bannertext").hide()
    getPlayerRoster($(this).data("name"));
  });

  // When user selects a specific player in roster screen acquire playercard by passing in variables of player and team.
  $(document).on("click", ".player", function(e) {
    e.preventDefault();
    //$("#add-to-roster-btn").show();

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
    $(".bannertext").show()
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
