 // create the module and name it scotchApp
	var scotchApp = angular.module('scotchApp', ['ngRoute']);

	// configure our routes
	scotchApp.config(function($routeProvider) {
		$routeProvider

			// route for the home page
			.when('/', {
				templateUrl : 'pages/home.html',
			//	controller  : 'booksCtrl'
			})

			// route for the rules page
			.when('/rules', {
				templateUrl : 'pages/rules.html',
				controller  : 'rulesController'
			})

	// route for the team  page
			.when('/teams', {
				templateUrl : 'pages/teams.html',
				controller  : 'regionController'
			})


		// route for the team  page
			.when('/entries', {
				templateUrl : 'pages/entries.html',
				controller  : 'regionController'
			})

			// route for the team  page
				.when('/notes', {
					templateUrl : 'pages/notes.html',
					controller  : 'regionController'
				})

				// route for the team  page

					.when('/note/:noteID', {
						templateUrl : 'pages/note.html',
						controller  : 'booksCtrl'
				})

				// route for the team  page

					.when('/entry', {
						templateUrl : 'pages/entry.html',
						controller  : 'booksCtrl'
				});




	});



	scotchApp.controller('booksCtrl', function($scope, $http, $routeParams) {

/////----CONSTANTS
$scope.entrytitle = "Entry";
$scope.entrymessage = 'Add a Note';
$scope.notestitle = "Notes";
$scope.notesmessage = 'View your Notes';
$scope.notetitle = "Note";
$scope.notemessage = 'View your Note';
$scope.maintitle = "Play Coach";
$scope.mainmessage = 'Play Coach Note Viewer';


/////----CONSTANTS

		$scope.saveData = function() {

				console.log($scope.formInfo);
				$http.post('/notes', $scope.formInfo)
				.then(function(response) {
				console.log("test");
				 });
				//  $location.path('#/notes');
		};

	  //$http.get("https://whispering-woodland-9020.herokuapp.com/getAllBooks")
		$http.get("/stats/")
	    .then(function(response) {
	      $scope.data = response.data;
	    });

			$http.get('/notes')
		.then(function(response) {
			$scope.notes = response.data;
		});

    $http.get("/notes/tags/scouting")
    .then(function(response) {
      $scope.scouting = response.data;
    });


		$scope.taggedresults = function(tag)
 		{
			// console.write('tester');
			$scope.tag = tag;
			$http.get("/notes/tags/"+ $scope.tag)
        .then(function(response) {
          $scope.search= response.data;
        });
			};

			$scope.deletenote = function(_id)
			{
				// console.write('tester');
				$scope.deleteid = _id;
				$http.delete("/notes/"+ $scope.deleteid)
					.then(function(response) {
					// $scope.search= response.data;
					});
				};


			$scope.getdetails = function(_id)
	 		{
				// console.write('tester');

				$http.get("/notes/"+ _id)
	        .then(function(response) {
	          $scope.search2 = response.data;
	        });
				};



							$scope.getdetails2 = function()
					 		{
								// console.write('tester');

								$http.get("/notes/"+ $routeParams.noteID)
					        .then(function(response) {
					          $scope.search3 = response.data;
					        });
								};




//figure out how to call api with input
    // $scope.getID = function(input)
    // $http.get("http://localhost:3000/notes")
    // .then(function(response) {
    //   $scope.notes = response.data;
    // });


			$scope.domath2 = function(num1, num2){return num1+num2;};
	  		$scope.domath = function(num1, num2){return num1+num2;};

				// $scope.selectednoteID = $routeParams.noteID;


});











	// create the controller and inject Angular's $scope
	scotchApp.controller('mainController', function($scope) {
		// create a message to display in our view
	  $scope.title = "NCAA Pick 8 Challenge";
		$scope.message = 'Pick 8 Site';
		//$scope.tester = 'Tester was successful';
	});

	scotchApp.controller('rulesController', function($scope) {
		$scope.title = "About";
		$scope.message = 'Tourney Rules';
		$scope.rules ="Hello March Madness fans, The NCAA men's college basketball tournament is back! Known for its surprising upsets, buzzer beating shots, and cinderella teams, this year's tournament should prove to be just as exciting as tournaments in years past. Overall #1 seed Kentucky enters the tournament undefeated at 34-0 and is attempting to be the first team to win the tournament and go undefeated since the 1976 Indiana team. Will any team in this tournament field be able to defeat Kentucky? We'll find out over the next 3 weeks of action. Adam Gleichenhaus and Sam Seto will be running this pool again. Also, Adam and Sam will be participating and Jeffrey Barrow will validate Adam and Sam's entries and ensure that they are submitted on time.This pool is not a typical bracket pool and primarily involves picking just 8 teams. We hope you find it to be unique and challenging. The pool rules as well as the entry form can be found in the attached file.Each person is allowed up to two entries and they cannot be identical ($15 per entry). All entries must be in by Thursday, March 19th 12PM EST. Entries sent prior to Thursday morning are appreciated. Please send entries to Adam (adamgleich@aol.com) and Sam (seto.sam@gmail.com). Please do not reply to this email. Send a separate email as the entry may be lost because of the way gmail sorts emails.lease pay Adam or Sam in person (by noon on Thursday, March 19th). If this is not possible, the following payment options are available to you: Chase Quickpay (please contact Adam) or arrange payment by check (please contact Sam). Check must be postmarked no later than Wednesday, March 18th.ailure to make or arrange for payment on time will invalidate entries that are submitted.ll Credit Suisse employees should give their money to Adam.The 2015 NCAA tournament bracket can be found at:http://www.cbssports.com/collegebasketball/ncaa-tournament/brackets/viewable_menGood luck to all and enjoy the Madness!";

	});


	scotchApp.controller('regionController', function($scope) {
		$scope.titleTeams = "Tourney Teams";
		$scope.titleEntries = "Entries";
		$scope.message = 'Use the search to see your entry';

    //sample functions
    $scope.double = function(value) { return value * 2; };
    $scope.domath= function(num1, num2){return num1+num2;};

    //computing core value for the wins
    teamvalue = function(rank, wins){

          //important stat for bonus pools and lost teams
          //var completedround = 0;

          i = 1;
          total = 0;

          //stoppage on teams with zero wins - just return 0
          if (wins === 0){
            return 0;
          }

          //loop for core points (rank + wins - looped)
          do {
          test = i * rank;
          total = total + test;
            i++;
          } while (i <= wins);


          //section for bonus points
          //Championship Team: + 20
          //Reaching Championship Game: + 10
          //Reaching Final Four: + 5

          if (wins === 6){
          total += 20
          }

          if (wins === 5){
          total += 10
          }

          if (wins === 4){
          total += 5
          }

          return total;
          };

    var completedrounds = 3;

    underdogvalue = function(rank,wins){
         //control on not doing this for > 4 seeds
      if (rank < 8){
        return 0
      }

      return wins * 2

    };
    longshotvalue = function(rank,wins){
       if (rank < 10){
        return 0
      }

      return 3 * wins;

    };
    upsetvalue = function(rank,wins){
          //control on not doing this for > 4 seeds
      if (rank > 4){
        return 0
      }

      if (rank === 1) {
         if ((wins < completedrounds) && (wins < 3)){
         return 10
         }
       return 0
      }

       if (rank === 2) {
         if ((wins < completedrounds) && (wins < 3)){
         return 5
         }
        return 0
      }

       if (rank === 3) {
         if ((wins < completedrounds) && (wins < 2)){
         return 5
         }
        return 0
      }

       if (rank === 4) {
         if ((wins < completedrounds) && (wins < 2)){
         return 3
         }
        return 0
      }
      }
      eliminationvalue = function(rounds, wins){
          //control on not doing this for > 4 seeds
        if (rounds > wins){
          return "Yes"
        }
        else{
          return "No"
        }

      }





    //applying the value to the teams

    $scope.getteams = function() {
        //added line
       for (var i = 0; i < 63; i++){
        teams[i].points = teamvalue(teams[i].rank, teams[i].wins);
        teams[i].underdog_points = underdogvalue(teams[i].rank, teams[i].wins);
        teams[i].longshot_points = longshotvalue(teams[i].rank, teams[i].wins);
        teams[i].upset_points = upsetvalue(teams[i].rank, teams[i].wins);
        teams[i].eliminated = eliminationvalue(completedrounds, teams[i].wins);

        }

        //end added line
        return teams;
        };


      $scope.getfilteredteams = function(listofteam){

        //create blank array for filtered team view by person
            for (var i = 0; i < 8; i++){
                entry[i].type = "Pick 8"
                entry[i].name = teams[listofteam[i]].name;
                entry[i].rank = teams[listofteam[i]].rank;
                entry[i].points =  teams[listofteam[i]].points;
                entry[i].wins = teams[listofteam[i]].wins;
                entry[i].eliminated = teams[listofteam[i]].eliminated;


            }

          //9
                entry[8].type = "Underdog"
                entry[8].name = teams[listofteam[8]].name
                entry[8].rank = teams[listofteam[8]].rank
                entry[8].points =  teams[listofteam[8]].underdog_points
                entry[8].wins =  teams[listofteam[8]].wins
                 entry[8].eliminated = teams[listofteam[8]].eliminated;

          //10
                entry[9].type = "LongShot"
                entry[9].name = teams[listofteam[9]].name;
                entry[9].rank = teams[listofteam[9]].rank;
                entry[9].points =  teams[listofteam[9]].longshot_points;
                  entry[9].wins =  teams[listofteam[9]].wins;
                entry[9].eliminated = teams[listofteam[9]].eliminated;
          //11

                entry[10].type = "Upset"
                entry[10].name = teams[listofteam[10]].name
                entry[10].rank = teams[listofteam[10]].rank
                entry[10].points =  teams[listofteam[10]].upset_points
               entry[10].wins =  teams[listofteam[10]].wins
                  entry[10].eliminated = teams[listofteam[10]].eliminated;

        return  entry
         }





       var newfilterentry = [];
       var totalAmount = 0;

        $scope.getnewfilteredentry = function(listof){

         for (var p = 0; p < 44; p++){
                  totalAmount  = 0;

                  for (var i = 0; i < 8; i++){
                      totalAmount =  totalAmount + teams[ncaaentries[p].entries[i]].points;
                  }
                      totalAmount = totalAmount + teams[ncaaentries[p].entries[8]].underdog_points;
                      totalAmount = totalAmount + teams[ncaaentries[p].entries[9]].longshot_points;
                      totalAmount = totalAmount + teams[ncaaentries[p].entries[10]].upset_points;

                   ncaaentries[p].points =  totalAmount

         }

        return  ncaaentries  ;
      };




    var ncaaentries = [

{name: 'Adam Loucks', entries:  [0, 2, 38, 39, 58, 57, 19, 24, 39, 58, 16], something: 'Hello', points: 0, final: []},
{name: 'David Sharpe', entries:  [0, 16, 6, 35, 48, 52, 28, 53, 28, 45, 32], something: 'Hello', points: 0, final: []},
{name: 'Mat Buxbaum 1', entries:  [0, 16, 17, 34, 48, 18, 10, 35, 39, 42, 33], something: 'Hello', points: 0, final: []},
{name: 'Mat Buxbaum 2', entries:  [0, 16, 17, 18, 32, 35, 48, 50, 26, 25, 49], something: 'Hello', points: 0, final: []},
{name: 'Kyle Marsh', entries:  [0, 25, 10, 6, 19, 37, 38, 54, 10, 25, 1], something: 'Hello', points: 0, final: []},
{name: 'John Coff', entries:  [0, 17, 52, 33, 6, 19, 49, 10, 55, 25, 48], something: 'Hello', points: 0, final: []},
{name: 'Karen Barrow', entries:  [0, 6, 36, 33, 58, 59, 16, 26, 44, 12, 48], something: 'Hello', points: 0, final: []},
{name: 'Michael Todisco', entries:  [0, 52, 50, 38, 19, 18, 32, 6, 57, 11, 1], something: 'Hello', points: 0, final: []},
{name: 'Doug Levine', entries:  [0, 10, 26, 27, 22, 42, 48, 57, 23, 9, 2], something: 'Hello', points: 0, final: []},
{name: 'Leon Frohlich', entries:  [2, 12, 57, 48, 16, 25, 35, 33, 12, 14, 35], something: 'Hello', points: 0, final: []},
{name: 'David McNamara', entries:  [0, 21, 12, 18, 32, 61, 41, 2, 57, 11, 16], something: 'Hello', points: 0, final: []},
{name: 'Stacy McNamara', entries:  [0, 16, 49, 33, 32, 56, 21, 2, 57, 45, 32], something: 'Hello', points: 0, final: []},
{name: 'Seung Hyun Ko', entries:  [0, 38, 11, 49, 17, 35, 6, 19, 56, 27, 48], something: 'Hello', points: 0, final: []},
{name: 'Alan Cardoso 1', entries:  [0, 39, 27, 5, 50, 11, 18, 33, 58, 60, 32], something: 'Hello', points: 0, final: []},
{name: 'Alan Cardoso 2', entries:  [17, 35, 19, 38, 6, 57, 3, 52, 26, 43, 16], something: 'Hello', points: 0, final: []},
{name: 'Rene Lopez 1', entries:  [0, 17, 32, 48, 2, 23, 38, 53, 57, 45, 49], something: 'Hello', points: 0, final: []},
{name: 'Rene Lopez 2', entries:  [1, 3, 16, 18, 33, 35, 51, 52, 59, 13, 0], something: 'Hello', points: 0, final: []},
{name: 'Lee Gross 1', entries:  [0, 6, 11, 17, 19, 51, 50, 33, 11, 11, 49], something: 'Hello', points: 0, final: []},
{name: 'Lee Gross 2', entries:  [0, 10, 16, 57, 53, 48, 38, 35, 10, 10, 32], something: 'Hello', points: 0, final: []},
{name: 'Jeffrey Barrow 1', entries:  [0, 17, 19, 42, 38, 58, 54, 49, 39, 58, 1], something: 'Hello', points: 0, final: []},
{name: 'Jeffrey Barrow 2 ', entries:  [0, 23, 22, 26, 35, 33, 55, 51, 55, 25, 1], something: 'Hello', points: 0, final: []},
{name: 'Bill Noonan 1', entries:  [2, 3, 16, 17, 37, 35, 48, 50, 57, 9, 0], something: 'Hello', points: 0, final: []},
{name: 'Bill Noonan 2', entries:  [2, 4, 19, 16, 32, 37, 48, 53, 8, 11, 0], something: 'Hello', points: 0, final: []},
{name: 'Jeffrey Turk', entries:  [10, 38, 59, 26, 0, 17, 50, 36, 59, 10, 1], something: 'Hello', points: 0, final: []},
{name: 'Sam Seto 1', entries:  [0, 10, 36, 6, 48, 50, 57, 18, 10, 10, 32], something: 'Hello', points: 0, final: []},
{name: 'Sam Seto 2', entries:  [0, 6, 36, 34, 59, 57, 50, 17, 57, 57, 32], something: 'Hello', points: 0, final: []},
{name: 'Dustin Schiavi', entries:  [57, 11, 16, 38, 21, 59, 36, 53, 57, 11, 33], something: 'Hello', points: 0, final: []},
{name: 'Anthony Rose', entries:  [0, 53, 50, 16, 36, 37, 60, 6, 58, 60, 51], something: 'Hello', points: 0, final: []},
{name: 'Michael Ascenzi 1', entries:  [11, 6, 17, 19, 33, 36, 50, 52, 39, 11, 1], something: 'Hello', points: 0, final: []},
{name: 'Michael Ascenzi 2', entries:  [2, 21, 17, 3, 42, 0, 49, 29, 45, 25, 34], something: 'Hello', points: 0, final: []},
{name: 'Leron Thumim', entries:  [0, 52, 38, 17, 6, 19, 25, 32, 25, 10, 18], something: 'Hello', points: 0, final: []},
{name: 'Jonathan Ong', entries:  [0, 2, 6, 17, 32, 51, 50, 35, 11, 10, 1], something: 'Hello', points: 0, final: []},
{name: 'Adam Gleichenhaus 1', entries:  [0, 6, 17, 33, 38, 48, 50, 59, 57, 26, 1], something: 'Hello', points: 0, final: []},
{name: 'Adam Gleichenhaus 2', entries:  [0, 6, 26, 17, 33, 36, 48, 53, 57, 59, 1], something: 'Hello', points: 0, final: []},
{name: 'Eugene Markman', entries:  [0, 19, 49, 18, 26, 44, 14, 12, 12, 59, 3], something: 'Hello', points: 0, final: []},
{name: 'Jay Wong', entries:  [0, 16, 49, 38, 17, 25, 6, 32, 12, 59, 3], something: 'Hello', points: 0, final: []},
{name: 'Saydra Battersby Quintanilla', entries:  [17, 35, 38, 55, 54, 0, 34, 19, 55, 46, 48], something: 'Hello', points: 0, final: []},
{name: 'Marc Nosti 1', entries:  [0, 60, 10, 50, 35, 17, 52, 21, 55, 25, 49], something: 'Hello', points: 0, final: []},
{name: 'Marc Nosti 2', entries:  [0, 19, 38, 32, 25, 6, 42, 50, 59, 57, 33], something: 'Hello', points: 0, final: []},
{name: 'Steve Varvaro', entries:  [48, 6, 28, 37, 5, 50, 3, 38, 11, 57, 33], something: 'Hello', points: 0, final: []},
{name: 'Ryan Breznovits', entries:  [0, 48, 38, 35, 50, 25, 18, 2, 11, 59, 17], something: 'Hello', points: 0, final: []},
{name: 'Denise Zhang', entries:  [0, 35, 7, 17, 48, 22, 52, 33, 43, 58, 1], something: 'Hello', points: 0, final: []},
{name: 'Victoria Lau', entries:  [19, 0, 16, 49, 35, 33, 11, 53, 56, 43, 32], something: 'Hello', points: 0, final: []},
{name: 'Danielle Rufo', entries:  [0, 59, 49, 11, 17, 36, 34, 38, 11, 59, 48], something: 'Hello', points: 0, final: []}
  ];

 var entry = [

{type: 'Hold', name:'Hold', eliminated: 'No', wins: 0, rank: 0, points:0, underdog_points: 0, longshot_points: 0, upset_points: 0},
{type: 'Hold', name:'Hold', eliminated: 'No', wins: 0, rank: 0, points:0, underdog_points: 0, longshot_points: 0, upset_points: 0},
{type: 'Hold', name:'Hold', eliminated: 'No', wins: 0, rank: 0, points:0, underdog_points: 0, longshot_points: 0, upset_points: 0},
{type: 'Hold', name:'Hold', eliminated: 'No', wins: 0, rank: 0, points:0, underdog_points: 0, longshot_points: 0, upset_points: 0},
{type: 'Hold', name:'Hold', eliminated: 'No', wins: 0, rank: 0, points:0, underdog_points: 0, longshot_points: 0, upset_points: 0},
{type: 'Hold', name:'Hold', eliminated: 'No', wins: 0, rank: 0, points:0, underdog_points: 0, longshot_points: 0, upset_points: 0},
{type: 'Hold', name:'Hold', eliminated: 'No', wins: 0, rank: 0, points:0, underdog_points: 0, longshot_points: 0, upset_points: 0},
{type: 'Hold', name:'Hold', eliminated: 'No', wins: 0, rank: 0, points:0, underdog_points: 0, longshot_points: 0, upset_points: 0},
{type: 'Hold', name:'Hold', eliminated: 'No', wins: 0, rank: 0, points:0, underdog_points: 0, longshot_points: 0, upset_points: 0},
{type: 'Hold', name:'Hold', eliminated: 'No', wins: 0, rank: 0, points:0, underdog_points: 0, longshot_points: 0, upset_points: 0},
{type: 'Hold', name:'Hold', eliminated: 'No', wins: 0, rank: 0, points:0, underdog_points: 0, longshot_points: 0, upset_points: 0}
 ];
          var teams = [
{id: 0, name:'Kentucky', rank: 1, wins: 3, region:'midwest', points:0, underdog_points: 0, longshot_points: 0, upset_points: 0, eliminated: 'No'},
{id: 1, name:'Kansas', rank: 2, wins: 1, region:'midwest', points: 0, underdog_points: 0, longshot_points: 0, upset_points: 0, eliminated: 'No'},
{id: 2, name:'Notre Dame', rank: 3, wins: 3, region:'midwest', points: 0, underdog_points: 0, longshot_points: 0, upset_points: 0, eliminated: 'No'},
{id: 3, name:'Maryland', rank: 4, wins: 1, region:'midwest', points: 0, underdog_points: 0, longshot_points: 0, upset_points: 0, eliminated: 'No'},
{id: 4, name:'West Virginia', rank: 5, wins: 2, region:'midwest', points: 0, underdog_points: 0, longshot_points: 0, upset_points: 0, eliminated: 'No'},
{id: 5, name:'Butler', rank: 6, wins: 1, region:'midwest', points: 0, underdog_points: 0, longshot_points: 0, upset_points: 0, eliminated: 'No'},
{id: 6, name:'Wichita State', rank: 7, wins: 2, region:'midwest', points: 0, underdog_points: 0, longshot_points: 0, upset_points: 0, eliminated: 'No'},
{id: 7, name:'Cincinnati', rank: 8, wins: 1, region:'midwest', points: 0, underdog_points: 0, longshot_points: 0, upset_points: 0, eliminated: 'No'},
{id: 8, name:'Purdue', rank: 9, wins: 0, region:'midwest', points: 0, underdog_points: 0, longshot_points: 0, upset_points: 0, eliminated: 'No'},
{id: 9, name:'Indiana', rank: 10, wins: 0, region:'midwest', points: 0, underdog_points: 0, longshot_points: 0, upset_points: 0, eliminated: 'No'},
{id: 10, name:'Texas', rank: 11, wins: 0, region:'midwest', points: 0, underdog_points: 0, longshot_points: 0, upset_points: 0, eliminated: 'No'},
{id: 11, name:'Buffalo', rank: 12, wins: 0, region:'midwest', points: 0, underdog_points: 0, longshot_points: 0, upset_points: 0, eliminated: 'No'},
{id: 12, name:'Valparaiso', rank: 13, wins: 0, region:'midwest', points: 0, underdog_points: 0, longshot_points: 0, upset_points: 0, eliminated: 'No'},
{id: 13, name:'Northeastern', rank: 14, wins: 0, region:'midwest', points: 0, underdog_points: 0, longshot_points: 0, upset_points: 0, eliminated: 'No'},
{id: 14, name:'New Mexico State', rank: 15, wins: 0, region:'midwest', points: 0, underdog_points: 0, longshot_points: 0, upset_points: 0, eliminated: 'No'},
{id: 15, name:'Hampton', rank: 16, wins: 0, region:'midwest', points: 0, underdog_points: 0, longshot_points: 0, upset_points: 0, eliminated: 'No'},
{id: 16, name:'Wisconsin', rank: 1, wins: 3, region:'west', points: 0, underdog_points: 0, longshot_points: 0, upset_points: 0, eliminated: 'No'},
{id: 17, name:'Arizona', rank: 2, wins: 3, region:'west', points: 0, underdog_points: 0, longshot_points: 0, upset_points: 0, eliminated: 'No'},
{id: 18, name:'Baylor', rank: 3, wins: 0, region:'west', points: 0, underdog_points: 0, longshot_points: 0, upset_points: 0, eliminated: 'No'},
{id: 19, name:'North Carolina', rank: 4, wins: 2, region:'west', points: 0, underdog_points: 0, longshot_points: 0, upset_points: 0, eliminated: 'No'},
{id: 20, name:'Arkansas', rank: 5, wins: 1, region:'west', points: 0, underdog_points: 0, longshot_points: 0, upset_points: 0, eliminated: 'No'},
{id: 21, name:'Xavier', rank: 6, wins: 2, region:'west', points: 0, underdog_points: 0, longshot_points: 0, upset_points: 0, eliminated: 'No'},
{id: 22, name:'VCU', rank: 7, wins: 0, region:'west', points: 0, underdog_points: 0, longshot_points: 0, upset_points: 0, eliminated: 'No'},
{id: 23, name:'Oregon', rank: 8, wins: 1, region:'west', points: 0, underdog_points: 0, longshot_points: 0, upset_points: 0, eliminated: 'No'},
{id: 24, name:'Oklahoma State', rank: 9, wins: 0, region:'west', points: 0, underdog_points: 0, longshot_points: 0, upset_points: 0, eliminated: 'No'},
{id: 25, name:'Ohio State', rank: 10, wins: 1, region:'west', points: 0, underdog_points: 0, longshot_points: 0, upset_points: 0, eliminated: 'No'},
{id: 26, name:'Mississippi', rank: 11, wins: 0, region:'west', points: 0, underdog_points: 0, longshot_points: 0, upset_points: 0, eliminated: 'No'},
{id: 27, name:'Wofford', rank: 12, wins: 0, region:'west', points: 0, underdog_points: 0, longshot_points: 0, upset_points: 0, eliminated: 'No'},
{id: 28, name:'Harvard', rank: 13, wins: 0, region:'west', points: 0, underdog_points: 0, longshot_points: 0, upset_points: 0, eliminated: 'No'},
{id: 29, name:'Georgia State', rank: 14, wins: 1, region:'west', points: 0, underdog_points: 0, longshot_points: 0, upset_points: 0, eliminated: 'No'},
{id: 30, name:'Texas Southern', rank: 15, wins: 0, region:'west', points: 0, underdog_points: 0, longshot_points: 0, upset_points: 0, eliminated: 'No'},
{id: 31, name:'Coastal Carolina', rank: 16, wins: 0, region:'west', points: 0, underdog_points: 0, longshot_points: 0, upset_points: 0, eliminated: 'No'},
{id: 32, name:'Villanova', rank: 1, wins: 1, region:'east', points: 0, underdog_points: 0, longshot_points: 0, upset_points: 0, eliminated: 'No'},
{id: 33, name:'Virginia', rank: 2, wins: 1, region:'east', points: 0, underdog_points: 0, longshot_points: 0, upset_points: 0, eliminated: 'No'},
{id: 34, name:'Oklahoma', rank: 3, wins: 2, region:'east', points: 0, underdog_points: 0, longshot_points: 0, upset_points: 0, eliminated: 'No'},
{id: 35, name:'Louisville', rank: 4, wins: 3, region:'east', points: 0, underdog_points: 0, longshot_points: 0, upset_points: 0, eliminated: 'No'},
{id: 36, name:'Northern Iowa', rank: 5, wins: 1, region:'east', points: 0, underdog_points: 0, longshot_points: 0, upset_points: 0, eliminated: 'No'},
{id: 37, name:'Providence', rank: 6, wins: 0, region:'east', points: 0, underdog_points: 0, longshot_points: 0, upset_points: 0, eliminated: 'No'},
{id: 38, name:'Michigan State', rank: 7, wins: 3, region:'east', points: 0, underdog_points: 0, longshot_points: 0, upset_points: 0, eliminated: 'No'},
{id: 39, name:'North Carolina State', rank: 8, wins: 2, region:'east', points: 0, underdog_points: 0, longshot_points: 0, upset_points: 0, eliminated: 'No'},
{id: 40, name:'LSU', rank: 9, wins: 0, region:'east', points: 0, underdog_points: 0, longshot_points: 0, upset_points: 0, eliminated: 'No'},
{id: 41, name:'Georgia', rank: 10, wins: 0, region:'east', points: 0, underdog_points: 0, longshot_points: 0, upset_points: 0, eliminated: 'No'},
{id: 42, name:'Dayton', rank: 11, wins: 1, region:'east', points: 0, underdog_points: 0, longshot_points: 0, upset_points: 0, eliminated: 'No'},
{id: 43, name:'Wyoming', rank: 12, wins: 0, region:'east', points: 0, underdog_points: 0, longshot_points: 0, upset_points: 0, eliminated: 'No'},
{id: 44, name:'UC Irvine', rank: 13, wins: 0, region:'east', points: 0, underdog_points: 0, longshot_points: 0, upset_points: 0, eliminated: 'No'},
{id: 45, name:'Albany', rank: 14, wins: 0, region:'east', points: 0, underdog_points: 0, longshot_points: 0, upset_points: 0, eliminated: 'No'},
{id: 46, name:'Belmont', rank: 15, wins: 0, region:'east', points: 0, underdog_points: 0, longshot_points: 0, upset_points: 0, eliminated: 'No'},
{id: 47, name:'Lafayette', rank: 16, wins: 0, region:'east', points: 0, underdog_points: 0, longshot_points: 0, upset_points: 0, eliminated: 'No'},
{id: 48, name:'Duke', rank: 1, wins: 3, region:'south', points: 0, underdog_points: 0, longshot_points: 0, upset_points: 0, eliminated: 'No'},
{id: 49, name:'Gonzaga', rank: 2, wins: 3, region:'south', points: 0, underdog_points: 0, longshot_points: 0, upset_points: 0, eliminated: 'No'},
{id: 50, name:'Iowa State', rank: 3, wins: 0, region:'south', points: 0, underdog_points: 0, longshot_points: 0, upset_points: 0, eliminated: 'No'},
{id: 51, name:'Georgetown', rank: 4, wins: 1, region:'south', points: 0, underdog_points: 0, longshot_points: 0, upset_points: 0, eliminated: 'No'},
{id: 52, name:'Utah', rank: 5, wins: 2, region:'south', points: 0, underdog_points: 0, longshot_points: 0, upset_points: 0, eliminated: 'No'},
{id: 53, name:'SMU', rank: 6, wins: 0, region:'south', points: 0, underdog_points: 0, longshot_points: 0, upset_points: 0, eliminated: 'No'},
{id: 54, name:'Iowa', rank: 7, wins: 1, region:'south', points: 0, underdog_points: 0, longshot_points: 0, upset_points: 0, eliminated: 'No'},
{id: 55, name:'San Diego State', rank: 8, wins: 1, region:'south', points: 0, underdog_points: 0, longshot_points: 0, upset_points: 0, eliminated: 'No'},
{id: 56, name:'St. Johns', rank: 9, wins: 0, region:'south', points: 0, underdog_points: 0, longshot_points: 0, upset_points: 0, eliminated: 'No'},
{id: 57, name:'Davidson', rank: 10, wins: 0, region:'south', points: 0, underdog_points: 0, longshot_points: 0, upset_points: 0, eliminated: 'No'},
{id: 58, name:'UCLA', rank: 11, wins: 2, region:'south', points: 0, underdog_points: 0, longshot_points: 0, upset_points: 0, eliminated: 'No'},
{id: 59, name:'Stephen F Austin', rank: 12, wins: 0, region:'south', points: 0, underdog_points: 0, longshot_points: 0, upset_points: 0, eliminated: 'No'},
{id: 60, name:'Eastern Washington', rank: 13, wins: 0, region:'south', points: 0, underdog_points: 0, longshot_points: 0, upset_points: 0, eliminated: 'No'},
{id: 61, name:'UAB', rank: 14, wins: 1, region:'south', points: 0, underdog_points: 0, longshot_points: 0, upset_points: 0, eliminated: 'No'},
{id: 62, name:'North Dakota State', rank: 15, wins: 0, region:'south', points: 0, underdog_points: 0, longshot_points: 0, upset_points: 0, eliminated: 'No'},
{id: 63, name:'Robert Morris', rank: 16, wins: 0, region:'south', points: 0, underdog_points: 0, longshot_points: 0, upset_points: 0, eliminated: 'No'},

    ];

   	});
